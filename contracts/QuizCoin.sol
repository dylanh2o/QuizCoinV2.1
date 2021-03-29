pragma solidity ^0.5.16;
//pragma experimental ABIEncoderV2;

contract QuizCoin {
    address payable owner;
    string public name = "Quiz Coin";
    uint public quizCount = 0;
    //store quiz
    mapping(uint => Quiz) public quizzes;
    // Adresses ayant répondu
    mapping(address => bool) answered;
    //question begin
    uint begin;

    struct Quiz {
        uint idQuiz;
        uint endQuizDate;
        string question;
        string goodChoice;
        string choice2;
        string choice3;
        uint uploadTime;
        address payable author;
    }

    event QuizSend(
        uint idQuiz,
        uint endQuizDate,
        string question,
        string goodChoice,
        string choice2,
        string choice3,
        uint uploadTime,
        address payable author
    );

    event QuizCreated(
        uint idQuiz,
        uint endQuizDate,
        string question,
        string goodChoice,
        string choice2,
        string choice3,
        uint uploadTime,
        address payable author
    );

    constructor() public {
        // save time
        begin = block.timestamp;
        owner=msg.sender;
    }

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }







    //create quiz
    function createQuiz( uint _endQuizDate, string memory _question, string memory _goodChoice, string memory _choice2, string memory _choice3) public {
        //make sure data exists
        require(_endQuizDate > 0);
        require(bytes(_question).length > 0);
        require(bytes(_goodChoice).length > 0);
        require(bytes(_choice2).length > 0);
        require(bytes(_choice3).length > 0);

        //make sur date is dont pass
        require(_endQuizDate > block.timestamp, "date antérieur a celle du jours");

        //make sure uploader address exists
        require(msg.sender != address(0x0));

        //increment quiz id
        quizCount ++;

        //add quiz to contract
        quizzes[quizCount] = Quiz(quizCount,  _endQuizDate, _question, _goodChoice, _choice2, _choice3, block.timestamp, msg.sender);

        //trigger an event
        emit QuizCreated(quizCount,  _endQuizDate, _question, _goodChoice, _choice2, _choice3, block.timestamp, msg.sender);



    }


    modifier notAnswered() {
        require(!answered[msg.sender], "Vous avez déjà répondu");
        _;
    }

    modifier timeNotElapsed(uint _id) {
        //make sur id is valid
        require(_id > 0 && _id <= quizCount);
        //fetch the quiz
        Quiz memory _quiz = quizzes[_id];
        require(block.timestamp - begin < _quiz.endQuizDate, "Le questionnaire n'est pas encore fini");
        _;
    }

    modifier timeElapsed(uint _id) {
        //make sur id is valid
        require(_id > 0 && _id <= quizCount);
        //fetch the quiz
        Quiz memory _quiz = quizzes[_id];
        require(block.timestamp - begin >= _quiz.endQuizDate, "Le questionnaire est fini");
        _;
    }


    function sendChoice(uint _id) public payable notAnswered() timeNotElapsed(_id) {
        //make sur id is valid
        require(_id > 0 && _id <= quizCount);
        //fetch the quiz
        Quiz memory _quiz = quizzes[_id];

           address payable _author = _quiz.author;
           address payable _participant = msg.sender;
            //pay the author by sending them ether
          // address(_author).transfer(msg.value);
        address(_author).transfer(msg.value);
            //update the quiz
          quizzes[_id] = _quiz;
            //trigger event
           emit QuizSend(_id,  _quiz.endQuizDate, _quiz.question, _quiz.goodChoice, _quiz.choice2, _quiz.choice3, _quiz.uploadTime, _author);

    }

    function endQuiz(uint _id) public onlyOwner timeElapsed(_id) {
        selfdestruct(owner);
    }
}





