// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

/**
 * @title A sample Jokes Dapp  Contract
 * @author Kilama Elie
 * @notice This contract is for creating a sample joke contract
 * @dev No implementation of any packages
 */

contract JokeDapp {
    // Errors
    error JokeDapp__OnlyOwner();

    // state variables
    uint256 public entryFees; // in Ether
    uint256 public jokeEndTime; // unit as seconds
    uint256 public rewardPool;
    address public owner;
    address public lastWinner;

    struct Joke {
        string question;
        string[] answerOptions;
        uint256 correctAnswerIndex;
        bool isActive;
    }

    Joke[] public jokes;
    mapping(address => bool) public hasParticipanted;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public participants;

    // Event
    event JokeAnsweredCorrectly(address indexed winner, uint256 rewaord);
    event Withdrawal(address indexed owner, uint256 amount);
    event NewJokeAdded(uint256 indexed jokeIndex, string question);

    // constructor
    constructor(uint256 _entryfees, uint256 _jokeEndTime) {
        owner = msg.sender;
        entryFees = _entryfees;
        jokeEndTime = block.timestamp + _jokeEndTime;
    }

    // modifier
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert JokeDapp__OnlyOwner();
        }
        _;
    }
    modifier jokeActive(uint256 jokeIndex) {
        require(jokes[jokeIndex].isActive, "This joke is no longer active");
        _;
    }

    modifier jokeEnded() {
        require(
            block.timestamp >= jokeEndTime,
            "The joke period has not ended yet"
        );
        _;
    }

    // update the jokeEndTime
    function updateJokeEndTime(
        uint256 _updateJokeEndTime
    ) public onlyOwner returns (uint256) {
        return jokeEndTime += _updateJokeEndTime;
    }
    // update entryFees
    function updateEntryFees(uint256 _updateEntryFee) public returns (uint256) {
        return entryFees += _updateEntryFee;
    }
    // Add a new joke with multiple choice answers
    function addJoke(
        string memory _question,
        string[] memory _answerOptions,
        uint256 _correctAnswerIndex
    ) public onlyOwner {
        require(
            _correctAnswerIndex < _answerOptions.length,
            "Invalid correct answer index: "
        );
        jokes.push(
            Joke({
                question: _question,
                answerOptions: _answerOptions,
                correctAnswerIndex: _correctAnswerIndex,
                isActive: true
            })
        );
        emit NewJokeAdded(jokes.length - 1, _question);
    }
    // Participate by selecting an answer to a joke
    function particate(
        uint256 jokeIndex,
        uint256 selectedAnswerIndex
    ) public payable jokeActive(jokeIndex) {
        require(
            msg.value == entryFees,
            "Insuffisante balance to participate in the Jokes"
        );
        require(
            !hasParticipanted[msg.sender],
            "You have already participated in this joke"
        );
        require(
            selectedAnswerIndex < jokes[jokeIndex].answerOptions.length,
            "Invalid selected answer index: "
        );
        hasParticipanted[msg.sender] = true;
        rewardPool += msg.value;

        // check if the answer is correct
        if (selectedAnswerIndex == jokes[jokeIndex].correctAnswerIndex) {
            uint256 reward = rewardPool;
            rewardPool = 0; // reset to zero after the winner is found
            rewards[msg.sender] = reward;
            lastWinner = msg.sender;
            jokes[jokeIndex].isActive = false;

            emit JokeAnsweredCorrectly(msg.sender, reward);
        }
    }
    // Claim reward after joke ends
    function claimReward() public jokeEnded {
        require(rewards[msg.sender] > 0, "No reward to claim");
        uint256 reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        payable(msg.sender).transfer(reward);
    }
    // Withdraw funds by the owner after the joke period ends
    function withdrawal() public onlyOwner jokeEnded {
        uint256 amount = address(this).balance;
        require(amount > 0, "No funds to withdraw");
        payable(owner).transfer(amount);
        emit Withdrawal(owner, amount);
    }
    // Get remaining time for the current joke
    function getRemaindingTime() public view returns (uint256) {
        if (block.timestamp < jokeEndTime) {
            return 0;
        } else {
            return jokeEndTime - block.timestamp;
        }
    }
    // Get details of a joke
    function getJoke(
        uint256 jokeIndex
    )
        public
        view
        returns (
            string memory question,
            string[] memory answerOptions,
            uint256 correctAnswerIndex,
            bool isActive
        )
    {
        Joke memory joke = jokes[jokeIndex];
        return (
            joke.question,
            joke.answerOptions,
            joke.correctAnswerIndex,
            joke.isActive
        );
    }

    // Get all the jokes
    function getAllJokes()
        public
        view
        returns (
            string[] memory questions,
            string[][] memory answerOptions,
            uint256[] memory correctAnswerIndexes,
            bool[] memory isActive
        )
    {
        uint256 jokesCount = jokes.length;

        // Initialize arrays with the number of jokes
        questions = new string[](jokesCount);
        answerOptions = new string[][](jokesCount);
        correctAnswerIndexes = new uint256[](jokesCount);
        isActive = new bool[](jokesCount);

        for (uint256 i = 0; i < jokesCount; i++) {
            questions[i] = jokes[i].question;
            answerOptions[i] = jokes[i].answerOptions;
            correctAnswerIndexes[i] = jokes[i].correctAnswerIndex;
            isActive[i] = jokes[i].isActive;
        }
    }
    // Get the last winner's address
    function getWinner() public view returns (address) {
        return lastWinner;
    }

    // get contract balance

    function getContractBalance() public view returns (uint256) {
        uint256 amount = address(this).balance;
        return amount;
    }

    receive() external payable {
        rewardPool += msg.value;
    }
}
