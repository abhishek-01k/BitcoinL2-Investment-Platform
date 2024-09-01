// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import "./interfaces/IBTS.sol";
import "./interfaces/IBTSPair.sol";
import "./utils/Error.sol";
import "./utils/Helper.sol";

contract Factory is Initializable, OwnableUpgradeable {
    using ClonesUpgradeable for address;

    address public alva;
    address public btsImplementation;
    address public btsPairImplementation;
    uint public minPercentALVA;

    address[] public listOfBTS;
    mapping(address => address[]) public ownerToBTS;

    event CreatedBTS(
        string name,
        string symbol,
        address bts,
        address btsPair,
        address creator,
        uint amount,
        uint _slippage,
        string description
    );
    event UpdatedAlva(address indexed alva);
    event UpdatedMinPercentALVA(uint256 indexed percent);
    event UpdatedBTSImplementation(address indexed btsImplementation);
    event UpdatedBTSPairImplementation(address indexed btsPairImplementation);

    function initialize(
        address _alva,
        uint _minPercentALVA,
        address _btsImplementation,
        address _btsPairImplementation
    ) external initializer {
        __Ownable_init();

        if (
            _alva == address(0) ||
            _btsImplementation == address(0) ||
            _btsPairImplementation == address(0)
        ) {
            revert InvalidToken();
        }

        alva = _alva;
        btsImplementation = _btsImplementation;
        btsPairImplementation = _btsPairImplementation;
        minPercentALVA = _minPercentALVA;
    }

    function createBTS(
        string calldata _name,
        string calldata _symbol,
        address[] calldata _tokens,
        uint[] calldata _weights,
        string memory _tokenURI,
        bool _enableAutoRebalance,
        uint _slippage,
        string memory _description
    ) external payable {
        // if (msg.value < 1 ether) revert InvalidAmount();
        require(
            _slippage > 0 && _slippage < 5000,
            "Factory :- BTS Creation Failed, Check Slippage Value"
        );
        require(
            (bytes(_name).length > 0) &&
                (bytes(_symbol).length > 0) &&
                (bytes(_tokenURI).length > 0),
            "Error: Invalid array length"
        );

        (address _bts, address _btsPair) = _initializeBTSWithPair(
            _name,
            _symbol,
            _tokens,
            _weights,
            _tokenURI,
            _enableAutoRebalance,
            _description
        );

        uint256 totalETHswapped = 0;

        for (uint i = 0; i < _tokens.length; ) {
            uint _amountInMin = (msg.value * _weights[i]) /
                Constants.PERCENT_PRECISION;

            address[] memory path = Helper.getPath(Constants.WETH, _tokens[i]);

            uint256 _amountOutMin = (Helper.getAmountsOut(_amountInMin, path) *
                (Constants.PERCENT_PRECISION - _slippage)) /
                Constants.PERCENT_PRECISION;

            IUniswapV2Router(Constants.ROUTER)
                .swapExactETHForTokensSupportingFeeOnTransferTokens{
                value: _amountInMin
            }(_amountOutMin, path, _btsPair, block.timestamp);
            totalETHswapped += _amountInMin;

            unchecked {
                ++i;
            }
        }

        listOfBTS.push(_bts);
        ownerToBTS[msg.sender].push(_bts);
        IBTSPair(_btsPair).mint(msg.sender);
        IBTSPair(_btsPair).transferOwnership(_bts);

        if (totalETHswapped > msg.value) {
            revert();
        } else if (totalETHswapped < msg.value) {
            (bool success, ) = payable(msg.sender).call{
                value: msg.value - totalETHswapped
            }("");
            require(success);
        }

        emit CreatedBTS(
            _name,
            _symbol,
            _bts,
            _btsPair,
            msg.sender,
            msg.value,
            _slippage,
            _description
        );
    }

    function updateBTSImplementation(
        address _btsImplementation
    ) external payable onlyOwner {
        if (_btsImplementation == address(0)) revert InvalidToken();
        btsImplementation = _btsImplementation;

        emit UpdatedBTSImplementation(_btsImplementation);
    }

    function updateBTSPairImplementation(
        address _btsPairImplementation
    ) external payable onlyOwner {
        if (_btsPairImplementation == address(0)) revert InvalidToken();
        btsPairImplementation = _btsPairImplementation;

        emit UpdatedBTSPairImplementation(_btsPairImplementation);
    }

    function _initializeBTSWithPair(
        string memory _name,
        string memory _symbol,
        address[] memory _tokens,
        uint[] memory _weights,
        string memory _tokenURI,
        bool _autoRebalance,
        string memory _description
    ) private returns (address _bts, address _btsPair) {
        _bts = ClonesUpgradeable.clone(btsImplementation);
        _btsPair = ClonesUpgradeable.clone(btsPairImplementation);

        IBTS(_bts).initialize(
            _name,
            _symbol,
            msg.sender,
            address(this),
            _tokens,
            _weights,
            _btsPair,
            _tokenURI,
            _autoRebalance,
            _description
        );

        IBTSPair(_btsPair).initialize(_symbol, _tokens);
    }

    function totalBTS() external view returns (uint) {
        return listOfBTS.length;
    }

    function updateALVA(address _alva) external payable onlyOwner {
        if (_alva == address(0)) revert InvalidToken();
        alva = _alva;

        emit UpdatedAlva(_alva);
    }

    function updateMinPercentALVA(
        uint _minPercentALVA
    ) external payable onlyOwner {
        if (
            _minPercentALVA == 0 ||
            _minPercentALVA > Constants.PERCENT_PRECISION
        ) revert InvalidToken();

        minPercentALVA = _minPercentALVA;

        emit UpdatedMinPercentALVA(_minPercentALVA);
    }
}
