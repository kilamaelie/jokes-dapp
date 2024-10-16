// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import {Test} from "forge-std/Test.sol";
import "../src/Joke.sol";

contract JokeTest is Test {
    JokeDapp joke;
    uint256 entreFees = 1 ether;
    uint256 jokeEndTime = 301;
    function setUp() public {
        joke = new JokeDapp(entreFees, jokeEndTime);
    }

    // check if entreFees is correct
    function testEntreFees() public {
        assertEq(joke.entryFees(), entreFees);
    }

    // check if jokeEndTime is correct
    function testJokeEndTime() public {
        assertEq(joke.jokeEndTime(), jokeEndTime);
    }
}
