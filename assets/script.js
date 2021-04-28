var introScreen = document.querySelector("#intro");
var timerScreen = document.querySelector("#timer");
var questionScreen = document.querySelector("#questions-screen");
var timeUpScreen = document.querySelector("#time-up");
var scoreScreen = document.querySelector("#score-screen");
var scoreButton = document.querySelector("#initials-button");
var finalScreen = document.querySelector("#final-screen");
var finalScoreDisplay = document.querySelector("#final-score");
var startButton = document.querySelector("#start-button");
var timeUpButton = document.querySelector("#time-up-button");
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
var finalScoreList = JSON.parse(localStorage.getItem("scores")) || [];
var randomQuestion;
var userAnswer;
var playerScore = 0;
var timeLeft = 60;

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
var currentQuestion = quiz[0];
var index = quiz.indexOf(currentQuestion);
startButton.addEventListener("click", startGame);
// timeUpButton.addEventListener("click", renderScore);
submitButton.addEventListener("click", checkAnswer);
scoreButton.addEventListener("click", displayScore);

function startTime() {
  timerScreen.textContent = "Time remaining: " + timeLeft;
  var timerInterval = setInterval(function () {
    timeLeft--;
    timerScreen.textContent = "Time remaining: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerScreen.textContent = "Time remaining: 0";
      return;
    }
  }, 1000);
}

function startGame() {
  startTime();
  introScreen.style.display = "none";
  questionScreen.style.display = "block";

  questionText.textContent = currentQuestion.question;
  option1.textContent = currentQuestion.answers[0];
  option2.textContent = currentQuestion.answers[1];
  option3.textContent = currentQuestion.answers[2];
  option4.textContent = currentQuestion.answers[3];
}

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
    timeLeft -= 5;
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

function renderFinalScore() {
  timeUpScreen.style.display = "none";
  questionScreen.style.display = "none";
  finalScreen.style.display = "block";
  finalScoreDisplay.textContent = "Final Score: " + playerScore;
}

function displayScore() {
  console.log(playerInitials.value);
  finalScreen.style.display = "none";
  scoreScreen.style.display = "block";
  let scoreObject = { initials: playerInitials.value, score: playerScore };
  finalScoreList.push(scoreObject);
  console.log(finalScoreList);
  localStorage.setItem("scores", JSON.stringify(finalScoreList));
  for (var i = 0; i < finalScoreList.length; i++) {
    var newLi = document.createElement("LI");
    newLi.textContent =
      finalScoreList[i].initials + ":   " + finalScoreList[i].score;
    scoreUl.appendChild(newLi);
  }
}
console.log(finalScoreList);
