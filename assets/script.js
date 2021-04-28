//variable declaration
var introScreen = document.querySelector("#intro");
var timerScreen = document.querySelector("#timer");
var questionScreen = document.querySelector("#questions-screen");
var timeUpScreen = document.querySelector("#time-up");
var scoreScreen = document.querySelector("#score-screen");
var scoreButton = document.querySelector("#initials-button");
var finalScreen = document.querySelector("#final-screen");
var finalScoreDisplay = document.querySelector("#final-score");
var startButton = document.querySelector("#start-button");
var userResponse = document.querySelector("#response");
var submitButton = document.querySelector("#submit-button");
var questionText = document.querySelector("#question-text");
var option1 = document.querySelector("#answer-1");
var option2 = document.querySelector("#answer-2");
var option3 = document.querySelector("#answer-3");
var option4 = document.querySelector("#answer-4");
var initialDisplay = document.querySelector("#initial-display");
var playerInitials = document.querySelector("#player-initials");
var scoreUl = document.querySelector("#scores");
//an array that starts out as empty, then parses items from storage to display
var finalScoreList = JSON.parse(localStorage.getItem("scores")) || [];
var randomQuestion;
var userAnswer;
var playerScore = 0;
var timeLeft = 60;

//array of questions and answers
var quiz = [
  {
    question: "What does DOM stand for?",
    answers: [
      "Document Objective Mode",
      "Document Object Model",
      "Development Objective Model",
      "Development Origin Model",
    ],
    correctAnswer: "Document Object Model",
  },
  {
    question: "How to stop a button from refreshing the page?",
    answers: [
      "event.cancelDefault();",
      "event.horizon();",
      "event.preventDefault();",
      "document.cancelDefault();",
    ],
    correctAnswer: "event.preventDefault();",
  },
  {
    question: "How to store data in local storage?",
    answers: [
      "localStorage.getItem();",
      "globalStorage.setItem();",
      "globalStorage.getItem();",
      "localStorage.setItem();",
    ],
    correctAnswer: "localStorage.setItem();",
  },
  {
    question: "How to view what is currently in local storage in the browser?",
    answers: [
      "Inspect->Elements->Storage->Local Storage",
      "Inspect->Console->Storage->Local Storage",
      "Inspect->Application->Local Storage->file",
      "Inspect->Application->Cache",
    ],
    correctAnswer: "Inspect->Application->Local Storage->file",
  },
  {
    question: "Which is a primitive boolean value?",
    answers: ["True", "undefined", "0", "Yes"],
    correctAnswer: "True",
  },
];
//set variable for current position in array
var currentQuestion = quiz[0];
//variable to target the numerical value of the index of the current question
var index = quiz.indexOf(currentQuestion);

//event listeners to use buttons
startButton.addEventListener("click", startGame);
submitButton.addEventListener("click", checkAnswer);
scoreButton.addEventListener("click", displayScore);

//timer function, counting down by one second and displaying the current time in the header
function startTime() {
  timerScreen.textContent = "Time remaining: " + timeLeft;
  var timerInterval = setInterval(function () {
    timeLeft--;
    timerScreen.textContent = "Time remaining: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerScreen.textContent = "Time remaining: 0";
      renderFinalScore();
      return;
    }
  }, 1000);
}

//function that changes display to the current question and starts the timer
function startGame() {
  startTime();
  introScreen.style.display = "none";
  scoreScreen.style.display = "none";
  timerScreen.style.display = "block";
  questionScreen.style.display = "flex";

  questionText.textContent = currentQuestion.question;
  option1.textContent = currentQuestion.answers[0];
  option2.textContent = currentQuestion.answers[1];
  option3.textContent = currentQuestion.answers[2];
  option4.textContent = currentQuestion.answers[3];
}

//function that checks if answer is correct, adds to player score if true, takes away time if false.  Also increments the index of the question array to display the next question
function checkAnswer() {
  if (index + 1 === quiz.length) {
    renderFinalScore();
  }
  var userAnswer = currentQuestion.answers[userResponse.selectedIndex - 1];
  console.log(userAnswer);
  console.log(currentQuestion.correctAnswer);
  if (userAnswer === currentQuestion.correctAnswer) {
    playerScore++;
  } else {
    timeLeft -= 10;
  }
  index++;
  currentQuestion = quiz[index];
  console.log(playerScore);
  console.log(index);
  questionText.textContent = currentQuestion.question;
  option1.textContent = currentQuestion.answers[0];
  option2.textContent = currentQuestion.answers[1];
  option3.textContent = currentQuestion.answers[2];
  option4.textContent = currentQuestion.answers[3];
}

//function that displays the players score and an input for their initials
function renderFinalScore() {
  timerScreen.style.display = "none";
  questionScreen.style.display = "none";
  finalScreen.style.display = "flex";
  finalScoreDisplay.textContent = "Final Score: " + playerScore;
}

//function that displays the players previous scores, stores the current score into an array, turns the array into a string, and stores the string in local storage.  For each new score submitted, a list item element is added to display
function displayScore() {
  finalScreen.style.display = "none";
  scoreScreen.style.display = "flex";
  let scoreObject = { initials: playerInitials.value, score: playerScore };
  finalScoreList.push(scoreObject);
  localStorage.setItem("scores", JSON.stringify(finalScoreList));
  for (var i = 0; i < finalScoreList.length; i++) {
    var newLi = document.createElement("LI");
    newLi.textContent =
      finalScoreList[i].initials + ":   " + finalScoreList[i].score;
    scoreUl.appendChild(newLi);
  }
}
