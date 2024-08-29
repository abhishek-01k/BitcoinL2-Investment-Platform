// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

interface IBTSPair {
    function initialize(string memory name, address[] memory tokens) external;

    function transferOwnership(address newOwner) external;

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function mint(address to) external;

    function burn(address to) external returns (uint[] memory amounts);

    function rebalance() external;

    function updateTokens(address[] memory tokens) external;
}
