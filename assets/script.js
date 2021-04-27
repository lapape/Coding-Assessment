var introScreen = document.querySelector("#intro");
var timerScreen = document.querySelector("#timer");
var questionScreen = document.querySelector("#questions-screen");
var timeUpScreen = document.querySelector("#time-up");
var finalScreen = document.querySelector("#final-screen");
var startButton = document.querySelector("#start-button");
var timeUpButton = document.querySelector("#time-up-button");
var userResponse = document.querySelector("#response");
var submitButton = document.querySelector("#submit-button");
var questionText = document.querySelector("#question-text");
var option1 = document.querySelector("#answer-1");
var option2 = document.querySelector("#answer-2");
var option3 = document.querySelector("#answer-3");
var option4 = document.querySelector("#answer-4");
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
    asked: false,
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
    asked: false,
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
    asked: false,
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
    asked: false,
  },
  {
    question: "Which is a primitive boolean value?",
    answers: ["True", "undefined", "0", "Yes"],
    correctAnswer: "True",
    asked: false,
  },
];

startButton.addEventListener("click", startGame);
// timeUpButton.addEventListener("click", renderScore);
submitButton.addEventListener("click", checkAnswer);

function startGame() {
  //start timer
  introScreen.style.display = "none";
  questionScreen.style.display = "block";

  randomQuestion = quiz[Math.floor(Math.random() * quiz.length)];
  questionText.textContent = randomQuestion.question;
  option1.textContent = randomQuestion.answers[0];
  option2.textContent = randomQuestion.answers[1];
  option3.textContent = randomQuestion.answers[2];
  option4.textContent = randomQuestion.answers[3];
  randomQuestion.asked = true;
}

function checkAnswer() {
  var userAnswer = randomQuestion.answers[userResponse.selectedIndex - 1];
  console.log(userAnswer);
  console.log(randomQuestion.correctAnswer);
  if (userAnswer === randomQuestion.correctAnswer) {
    playerScore++;
  } else {
    timeLeft -= 5;
  }
  console.log(playerScore);
  do {
    randomQuestion.asked = true;
    randomQuestion = quiz[Math.floor(Math.random() * quiz.length)];
    questionText.textContent = randomQuestion.question;
    option1.textContent = randomQuestion.answers[0];
    option2.textContent = randomQuestion.answers[1];
    option3.textContent = randomQuestion.answers[2];
    option4.textContent = randomQuestion.answers[3];
  } while (randomQuestion.asked === false);
}
