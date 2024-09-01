// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

library Constants {
    uint public constant PERCENT_PRECISION = 10000;
    uint public constant REBALANCE_MARGIN = 0.05 ether;
    address public constant FACTORY =
        0x7E0987E5b3a30e3f2828572Bb659A548460a3003;
    address public constant ROUTER = 0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008;
    address public constant WETH = 0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9; // Mainnet
    // address public constant WETH = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6; // Testnet
    address public constant DEAD_ADDRESS =
        0x000000000000000000000000000000000000dEaD;
}
