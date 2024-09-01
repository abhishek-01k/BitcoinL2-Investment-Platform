// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "../interfaces/IUniswap.sol";
import "./Constants.sol";

library Helper {
    function getPath(address _tokenA, address _tokenB)
        internal
        pure
        returns (address[] memory)
    {
        address[] memory path = new address[](2);
        path[0] = _tokenA;
        path[1] = _tokenB;

        return path;
    }

    function getAmountsOut(uint _amount, address[] memory _path)
        internal
        view
        returns (uint)
    {
        return
            IUniswapV2Router(Constants.ROUTER).getAmountsOut(_amount, _path)[1];
    }
}
