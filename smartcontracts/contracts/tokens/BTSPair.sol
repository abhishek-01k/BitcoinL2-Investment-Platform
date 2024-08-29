// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "../utils/Error.sol";
import "../utils/Helper.sol";

contract BasketTokenStandardPair is ERC20Upgradeable, OwnableUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    address[] public tokens;
    uint[] public reserves;

    function initialize(
        string memory _name,
        address[] memory _tokens
    ) external initializer {
        if (_tokens.length == 0) revert InvalidToken();

        _name = string(abi.encodePacked(_name, "-LP"));

        __ERC20_init(_name, _name);
        __Ownable_init();

        tokens = _tokens;
        reserves = new uint[](tokens.length);
    }

    function rebalance() external payable onlyOwner {
        for (uint i = 0; i < tokens.length; ) {
            IERC20Upgradeable(tokens[i]).safeTransfer(
                owner(),
                IERC20Upgradeable(tokens[i]).balanceOf(address(this))
            );

            unchecked {
                ++i;
            }
        }
    }

    function updateTokens(address[] memory _tokens) external payable onlyOwner {
        tokens = _tokens;
        _updateRebalanceReserve();
    }

    function _updateRebalanceReserve() private {
        reserves = new uint[](tokens.length);

        for (uint i = 0; i < tokens.length; ) {
            reserves[i] = IERC20Upgradeable(tokens[i]).balanceOf(address(this));

            unchecked {
                ++i;
            }
        }
    }

    function mint(
        address _to
    ) external payable onlyOwner returns (uint liquidity) {
        uint[] memory amounts = new uint[](tokens.length);
        uint totalETH;

        for (uint i = 0; i < amounts.length; ) {
            amounts[i] =
                IERC20Upgradeable(tokens[i]).balanceOf(address(this)) -
                reserves[i];
            if (amounts[i] == 0) revert InsufficientLiquidity();

            totalETH += Helper.getAmountsOut(
                amounts[i],
                Helper.getPath(tokens[i], Constants.WETH)
            );

            unchecked {
                ++i;
            }
        }

        for (uint i = 0; i < amounts.length; ) {
            reserves[i] += amounts[i];

            unchecked {
                ++i;
            }
        }

        if (totalSupply() == 0) {
            liquidity = 1000 ether;
        } else {
            liquidity = calculateShareLP(totalETH);
        }

        _mint(_to, liquidity);
    }

    function _totalReservedETH() private view returns (uint totalReservedETH) {
        for (uint i = 0; i < reserves.length; ) {
            totalReservedETH += Helper.getAmountsOut(
                reserves[i],
                Helper.getPath(tokens[i], Constants.WETH)
            );

            unchecked {
                ++i;
            }
        }
    }


    function calculateShareLP(
        uint _amountETH
    ) public view returns (uint amountLP) {
        amountLP = ((_amountETH * totalSupply()) / _totalReservedETH());
    }

    function calculateShareETH(
        uint _amountLP
    ) public view returns (uint amountETH) {
        for (uint i = 0; i < reserves.length; ) {
            amountETH += Helper.getAmountsOut(
                (_amountLP *
                    IERC20Upgradeable(tokens[i]).balanceOf(address(this))) /
                    totalSupply(),
                Helper.getPath(tokens[i], Constants.WETH)
            );

            unchecked {
                ++i;
            }
        }
    }

    function calculateShareTokens(
        uint _amountLP
    ) public view returns (uint[] memory amountTokens) {
        amountTokens = new uint[](tokens.length);
        for (uint i = 0; i < reserves.length; ) {
            amountTokens[i] =
                (_amountLP *
                    IERC20Upgradeable(tokens[i]).balanceOf(address(this))) /
                totalSupply();

            unchecked {
                ++i;
            }
        }
    }

    function burn(
        address _to
    ) external payable onlyOwner returns (uint[] memory amounts) {
        uint _liquidity = balanceOf(address(this));

        _burn(address(this), _liquidity);

        amounts = calculateShareTokens(_liquidity);
        for (uint i = 0; i < tokens.length; ) {
            if (amounts[i] == 0) revert InsufficientLiquidity();
            IERC20Upgradeable(tokens[i]).safeTransfer(_to, amounts[i]);

            reserves[i] -= amounts[i];

            unchecked {
                ++i;
            }
        }
    }
}
