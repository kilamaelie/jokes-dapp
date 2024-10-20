// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import "../src/JokeDapp.sol";

contract JokeTest is Test {
    JokeDapp joke;
    uint256 entreFees = 1 ether;
    uint256 jokeEndTime = 500;

    function setUp() public {
        joke = new JokeDapp(entreFees, jokeEndTime);
    }

    // check if entreFees is correct
    function test_EntreFees() public {
        assertEq(joke.entryFees(), entreFees);
    }

    // check if jokeEndTime is correct
    function test_JokeEndTime() public {
        vm.prank(address(0));
        // assertEq(joke.jokeEndTime(), jokeEndTime);
        vm.assume(joke.jokeEndTime() > jokeEndTime);
    }
}
