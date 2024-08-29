// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "./interfaces/IBTSPair.sol";
import "./interfaces/IFactory.sol";
import "./interfaces/IUniswap.sol";
import "./utils/Error.sol";
import "./utils/Helper.sol";

contract BasketTokenStandard is ERC721URIStorageUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    uint private _autoRebalanceTime;

    address public btsPair;
    address public owner;
    address public factory;
    bool public autoRebalanceEnabled;
    uint256 public upperLimit;
    uint256 public lowerLimit;
    string description;

    mapping(address => bool) private _isTokenPresent;

    struct TokenDetails {
        address[] tokens;
        uint[] weights;
    }

    TokenDetails private _tokenDetails;

    modifier checkLength(uint lengthOne, uint lengthTwo) {
        if (lengthOne != lengthTwo) revert InvalidLength();
        _;
    }

    modifier onlyOwner() {
        if (ownerOf(0) != msg.sender) revert InvalidOwner();
        _;
    }

    event ContributedToBTS(address bts, address sender, uint amount);
    event WithdrawnFromBTS(
        address bts,
        address sender,
        address[] tokens,
        uint[] amounts
    );
    event WithdrawnETHFromBTS(address bts, address sender, uint amount);
    event RebalanceBTS(
        address bts,
        address[] tokens,
        uint[] oldWeights,
        uint[] newWeights
    );
    event UpdatedUpperLimit(uint indexed upperLimit);
    event UpdatedLowerLimit(uint indexed lowerLimit);
    event UpdatedAutoRebalanceEnabled(bool _autoRebalanceEnabled);

    function initialize(
        string memory _name,
        string memory _symbol,
        address _owner,
        address _factory,
        address[] memory _tokens,
        uint[] memory _weights,
        address _btsPair,
        string memory _tokenURI,
        bool _enableAutoRebalance,
        string memory _description
    ) external checkLength(_tokens.length, _weights.length) initializer {
        __ERC721_init(_name, _symbol);

        owner = _owner;
        factory = _factory;

        _checkValidTokensAndWeights(_tokens, _weights);

        btsPair = _btsPair;

        _tokenDetails.tokens = _tokens;
        _tokenDetails.weights = _weights;

        autoRebalanceEnabled = _enableAutoRebalance;

        _autoRebalanceTime = block.timestamp;

        description = _description;
        upperLimit = 10500;
        lowerLimit = 9500;

        _mint(_owner, 0);
        _setTokenURI(0, _tokenURI);
    }

    function _checkValidTokensAndWeights(
        address[] memory _tokens,
        uint[] memory _weights
    ) private {
        uint _totalWeight;
        bool isAlvaPresent = false;

        for (uint i = 0; i < _tokens.length; ) {
            if (!_isTokenPresent[_tokens[i]] && _weights[i] != 0) {
                if (_tokens[i] == IFactory(factory).alva()) {
                    isAlvaPresent = true;
                    require(
                        _weights[i] >= IFactory(factory).minPercentALVA(),
                        "ALVA Must Be Minimum Of 5%"
                    );
                }

                _isTokenPresent[_tokens[i]] = true;
                _totalWeight += _weights[i];
            } else {
                revert InvalidToken();
            }

            unchecked {
                ++i;
            }
        }

        if (!isAlvaPresent || _totalWeight != Constants.PERCENT_PRECISION)
            revert InvalidWeight();
    }

    function getTokenDetails(
        uint _index
    ) external view returns (address token, uint weight) {
        token = _tokenDetails.tokens[_index];
        weight = _tokenDetails.weights[_index];
    }

    function totalTokens() external view returns (uint tokenLength) {
        tokenLength = _tokenDetails.tokens.length;
    }

    function contribute(uint256 _slippage) external payable {
        require(
            _slippage > 0 && _slippage < 5000,
            "Error: Check Slippage Value"
        );
        for (uint i = 0; i < _tokenDetails.tokens.length; ) {
            uint _amountInMin = (msg.value * _tokenDetails.weights[i]) /
                Constants.PERCENT_PRECISION;

            uint256 _amountOutMin = (Helper.getAmountsOut(
                _amountInMin,
                Helper.getPath(Constants.WETH, _tokenDetails.tokens[i])
            ) * (Constants.PERCENT_PRECISION - _slippage)) /
                Constants.PERCENT_PRECISION;

            IUniswapV2Router(Constants.ROUTER)
                .swapExactETHForTokensSupportingFeeOnTransferTokens{
                value: _amountInMin
            }(
                _amountOutMin,
                Helper.getPath(Constants.WETH, _tokenDetails.tokens[i]),
                btsPair,
                block.timestamp
            );

            unchecked {
                ++i;
            }
        }
        IBTSPair(btsPair).mint(msg.sender);
        _autoRebalance(_slippage);

        emit ContributedToBTS(address(this), msg.sender, msg.value);
    }

    function _withdraw(
        uint _liquidity,
        address _to
    ) private returns (uint[] memory amounts) {
        IBTSPair(btsPair).transferFrom(msg.sender, btsPair, _liquidity);
        amounts = IBTSPair(btsPair).burn(_to);
    }

    function withdraw(uint _liquidity) external {
        emit WithdrawnFromBTS(
            address(this),
            msg.sender,
            _tokenDetails.tokens,
            _withdraw(_liquidity, msg.sender)
        );

        _autoRebalance(4500);
    }

    function withdrawWETH(
        uint _liquidity,
        uint _slippage
    ) external returns (uint swappedAmount) {
        require(
            _slippage > 0 && _slippage < 5000,
            "Error: Check Slippage Value"
        );
        uint[] memory _amounts = _withdraw(_liquidity, address(this));
        for (uint i = 0; i < _amounts.length; ) {
            swappedAmount += _swapTokensForTokens(
                _tokenDetails.tokens[i],
                Constants.WETH,
                _amounts[i],
                msg.sender,
                _slippage
            );

            unchecked {
                ++i;
            }
        }

        _autoRebalance(_slippage);

        emit WithdrawnETHFromBTS(address(this), msg.sender, swappedAmount);
    }

    function rebalance(
        address[] memory _newTokens,
        uint[] memory _newWeights,
        uint _slippage
    ) external payable onlyOwner {
        require(
            _slippage > 0 && _slippage < 5000,
            "Error: Check Slippage Value"
        );
        _rebalance(_newTokens, _newWeights, _slippage, false);
    }

    function emergencyStable(
        address[] memory _newTokens,
        uint[] memory _newWeights,
        uint _slippage
    ) external payable onlyOwner {
        require(
            _slippage > 0 && _slippage < 5000,
            "Error: Check Slippage Value"
        );
        _rebalance(_newTokens, _newWeights, _slippage, true);
    }

    function _rebalance(
        address[] memory _newTokens,
        uint[] memory _newWeights,
        uint _slippage,
        bool _isEmergencyStable
    ) private checkLength(_newTokens.length, _newWeights.length) {
        for (uint i = 0; i < _tokenDetails.tokens.length; i++) {
            _isTokenPresent[_tokenDetails.tokens[i]] = false;
        }

        if (_isEmergencyStable) {
            require(
                (_newTokens.length == 1) &&
                (_newWeights[0] == Constants.PERCENT_PRECISION),
                "Error: Invalid weight or array length"
            );
        } else {
            _checkValidTokensAndWeights(_newTokens, _newWeights);
        }

        IBTSPair(btsPair).rebalance();

        uint _wethBought;
        for (uint i = 0; i < _tokenDetails.tokens.length; ) {
            _wethBought += _swapTokensForTokens(
                _tokenDetails.tokens[i],
                Constants.WETH,
                IERC20Upgradeable(_tokenDetails.tokens[i]).balanceOf(
                    address(this)
                ),
                address(this),
                _slippage
            );

            unchecked {
                ++i;
            }
        }

        for (uint i = 0; i < _newWeights.length; ) {
            _swapTokensForTokens(
                Constants.WETH,
                _newTokens[i],
                (_wethBought * _newWeights[i]) / Constants.PERCENT_PRECISION,
                btsPair,
                _slippage
            );

            unchecked {
                ++i;
            }
        }

        emit RebalanceBTS(
            address(this),
            _tokenDetails.tokens,
            _tokenDetails.weights,
            _newWeights
        );

        IBTSPair(btsPair).updateTokens(_newTokens);
        _tokenDetails.tokens = _newTokens;
        _tokenDetails.weights = _newWeights;
    }

    function getTokenValueByWETH() private view returns (uint value) {
        for (uint i = 0; i < _tokenDetails.tokens.length; ) {
            value += Helper.getAmountsOut(
                IERC20Upgradeable(_tokenDetails.tokens[i]).balanceOf(btsPair),
                Helper.getPath(_tokenDetails.tokens[i], Constants.WETH)
            );

            unchecked {
                ++i;
            }
        }
    }

    function updateUpperLimit(uint256 _upperLimit) external payable onlyOwner {
        upperLimit = _upperLimit;

        emit UpdatedUpperLimit(_upperLimit);
    }

    function updateAutoRebalanceEnabled(
        bool _autoRebalanceEnabled
    ) external onlyOwner {
        autoRebalanceEnabled = _autoRebalanceEnabled;

        emit UpdatedAutoRebalanceEnabled(_autoRebalanceEnabled);
    }

    function updateLowerLimit(uint256 _lowerLimit) external payable onlyOwner {
        lowerLimit = _lowerLimit;

        emit UpdatedLowerLimit(_lowerLimit);
    }

    function _isRebalanceRequired()
        private
        view
        returns (bool isRebalanceRequired)
    {
        uint _tokenValueByWETH = getTokenValueByWETH();
        uint _upperLimit = (1 ether * upperLimit) / Constants.PERCENT_PRECISION;
        uint _lowerLimit = (1 ether * lowerLimit) / Constants.PERCENT_PRECISION;

        for (uint i = 0; i < _tokenDetails.weights.length; ) {
            uint _tokenWeightValue = (_tokenValueByWETH *
                _tokenDetails.weights[i]) / Constants.PERCENT_PRECISION;

            uint amountOut = Helper.getAmountsOut(
                _tokenWeightValue,
                Helper.getPath(Constants.WETH, _tokenDetails.tokens[i])
            );

            uint margin = (amountOut * 1e18) /
                IERC20Upgradeable(_tokenDetails.tokens[i]).balanceOf(btsPair);

            if (margin > _upperLimit || margin < _lowerLimit) {
                isRebalanceRequired = true;
                break;
            }

            unchecked {
                ++i;
            }
        }
    }

    function _autoRebalance(uint _slippage) private {
        if (
            autoRebalanceEnabled &&
            block.timestamp >= (_autoRebalanceTime + 30 days)
        ) {
            if (_isRebalanceRequired())
                _rebalance(
                    _tokenDetails.tokens,
                    _tokenDetails.weights,
                    _slippage,
                    false
                );
            _autoRebalanceTime = block.timestamp;
        }
    }

    function _swapTokensForTokens(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        address _to,
        uint _slippage
    ) private returns (uint256) {
        IERC20Upgradeable(_tokenIn).safeApprove(Constants.ROUTER, _amountIn);

        address[] memory path = Helper.getPath(_tokenIn, _tokenOut);

        uint256 _amountOutMin = (Helper.getAmountsOut(_amountIn, path) *
            (Constants.PERCENT_PRECISION - _slippage)) /
            Constants.PERCENT_PRECISION;

        uint256 balanceBefore = IERC20Upgradeable(_tokenOut).balanceOf(_to);
        IUniswapV2Router(Constants.ROUTER)
            .swapExactTokensForTokensSupportingFeeOnTransferTokens(
                _amountIn,
                _amountOutMin,
                path,
                _to,
                block.timestamp
            );
        uint256 balanceAfter = IERC20Upgradeable(_tokenOut).balanceOf(_to);

        return balanceAfter - balanceBefore;
    }
}
