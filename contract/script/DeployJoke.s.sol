// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;
import {Script} from "forge-std/Script.sol";
import {JokeDapp} from "../src/JokeDapp.sol";

contract DeployJoke is Script {
    JokeDapp joke;
    uint256 entryFees = 0.2 ether;
    uint256 jokeEndTime = 500;
    function run() external returns (JokeDapp) {
        vm.startBroadcast();
        joke = new JokeDapp(entryFees, jokeEndTime);
        vm.stopBroadcast();
        return joke;
    }
}
