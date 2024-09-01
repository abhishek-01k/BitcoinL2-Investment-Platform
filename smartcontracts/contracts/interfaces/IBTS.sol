// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

interface IBTS {
    function initialize(
        string memory name,
        string memory symbol,
        address creator,
        address factory,
        address[] memory tokens,
        uint[] memory weights,
        address btsPair,
        string memory tokenURI,
        bool autoRebalance,
        string memory description
    ) external;
}
