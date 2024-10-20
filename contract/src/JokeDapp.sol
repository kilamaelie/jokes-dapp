// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract JokeDapp {
    // Errors
    error JokeDapp__OnlyOwner();

    // State variables
    uint256 public entryFees; // in Ether
    uint256 public jokeEndTime; // in seconds
    uint256 public rewardPool;
    uint256 public ownerPool; // Added to track owner's balance
    address public owner;
    address public lastWinner;

    struct Joke {
        string question;
        string[] answerOptions;
        uint256 correctAnswerIndex;
        bool isActive;
    }

    Joke[] public jokes;
    mapping(address => bool) public hasPaidEntryFees; // Track if the user has paid entry fees
    mapping(address => bool) public hasParticipated;
    mapping(address => uint256) public rewards;

    // Events
    event JokeAnsweredCorrectly(address indexed winner, uint256 reward);
    event Withdrawal(address indexed owner, uint256 amount);
    event NewJokeAdded(uint256 indexed jokeIndex, string question);
    event EntryFeePaid(address indexed participant, uint256 amount);

    // Constructor
    constructor(uint256 _entryFees, uint256 _jokeEndTime) {
        owner = msg.sender;
        entryFees = _entryFees;
        jokeEndTime = block.timestamp + _jokeEndTime;
    }

    // Modifiers
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

    // Update the joke end time
    function updateJokeEndTime(
        uint256 _updateJokeEndTime
    ) public onlyOwner returns (uint256) {
        return jokeEndTime += _updateJokeEndTime;
    }

    // Update entry fees, restricted to owner
    function updateEntryFees(uint256 _updateEntryFee) public onlyOwner {
        entryFees = _updateEntryFee;
    }

    // Pay the entry fees
    function payEntryFees() public payable {
        require(msg.value >= entryFees, "Incorrect entry fee");
        require(!hasPaidEntryFees[msg.sender], "Entry fee already paid");

        // Mark the user as having paid
        hasPaidEntryFees[msg.sender] = true;

        uint256 fee = msg.value;
        uint256 rewardPortion = (fee * 90) / 100; // 90% goes to the reward pool
        uint256 ownerPortion = fee - rewardPortion; // 10% goes to the owner

        rewardPool += rewardPortion;
        ownerPool += ownerPortion; // Track owner's portion separately

        emit EntryFeePaid(msg.sender, msg.value);
    }

    // Participate in the joke after paying entry fees
    function participate(
        uint256 jokeIndex,
        uint256 selectedAnswerIndex
    ) public jokeActive(jokeIndex) {
        require(
            hasPaidEntryFees[msg.sender],
            "You must pay the entry fee first"
        );
        require(
            !hasParticipated[msg.sender],
            "You have already participated in this joke"
        );
        require(
            selectedAnswerIndex < jokes[jokeIndex].answerOptions.length,
            "Invalid selected answer index"
        );

        // Mark the user as having participated
        hasParticipated[msg.sender] = true;

        // Check if the answer is correct
        if (selectedAnswerIndex == jokes[jokeIndex].correctAnswerIndex) {
            uint256 reward = rewardPool; // Send the full reward pool to the winner
            rewardPool = 0; // Reset reward pool after the winner is found

            rewards[msg.sender] = reward;
            lastWinner = msg.sender;
            jokes[jokeIndex].isActive = false;

            emit JokeAnsweredCorrectly(msg.sender, reward);
        }
    }

    // Claim reward after joke ends
    function claimReward() public jokeEnded {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No reward to claim");

        rewards[msg.sender] = 0;
        payable(msg.sender).transfer(reward);
    }

    // Withdraw funds by the owner after the joke period ends
    function withdrawal() public onlyOwner jokeEnded {
        uint256 amount = ownerPool; // Withdraw from the owner's pool
        require(amount > 0, "No funds to withdraw");

        ownerPool = 0; // Reset owner's pool after withdrawal
        payable(owner).transfer(amount);

        emit Withdrawal(owner, amount);
    }

    // Add a new joke with multiple choice answers
    function addJoke(
        string memory _question,
        string[] memory _answerOptions,
        uint256 _correctAnswerIndex
    ) public onlyOwner {
        require(
            _correctAnswerIndex < _answerOptions.length,
            "Invalid correct answer index"
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

    // Get remaining time for the current joke
    function getRemaindingTime() public view returns (uint256) {
        if (block.timestamp >= jokeEndTime) {
            return 0; // No time left
        } else {
            return jokeEndTime - block.timestamp;
        }
    }

    // Get details of a joke
    function getJoke(
        uint256 jokeIndex
    ) public view returns (string memory, string[] memory, uint256, bool) {
        Joke memory joke = jokes[jokeIndex];
        return (
            joke.question,
            joke.answerOptions,
            joke.correctAnswerIndex,
            joke.isActive
        );
    }

    // Get the last winner's address
    function getWinner() public view returns (address) {
        return lastWinner;
    }

    // Get contract balance
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Get all the jokes
    function getAllJokes() public view returns (Joke[] memory) {
        return jokes;
    }

    // Allow the contract to receive funds
    receive() external payable {
        rewardPool += msg.value; // If anyone sends Ether directly to the contract, it goes to the reward pool
    }
}
