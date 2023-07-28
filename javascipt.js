// this is where I made my questions
var quizQuestions = [
  {
    question: "what does function do?",
    answers: [
      { text: "Acts as a line break", correct: false },
      { text: "Block of code designed to perform a particular task", correct: true },
      { text: "Acts as a line break", correct: false },
      { text: "Converts all letters to lowercase", correct: false },
    ],
  },
  {
    question: "what does pop do?",
    answers: [
      { text: "Used to get rid of the last element in an array", correct: true },
      { text: "What happens when you poke a balloon with a sharp object", correct: false },
      { text: "Used to get rid of a section in CSS", correct: false },
      { text: "Used to get rid of sections in html", correct: false },
    ],
  },
  {
    question: "what is concat? and what does it do?",
    answers: [
      { text: "Term used in javascript/ used to combine ", correct: true },
      { text: "Term used in CSS/ used to break lines", correct: false },
      { text: "Term used in css/ used to break lines", correct: false },
      { text: "Term used in javascript/cat that is a conman", correct: false },
    ],
  },
  {
    question: "What does .unshift do?",
    answers: [
      { text: "This makes it so you add a new element to the beginning of an existing array", correct: true },
      { text: "This command shows notes in the console", correct: false },
      { text: "Removes the last element of an array", correct: false },
      { text: "Converts letters to uppercase", correct: false },
    ],
  },
];

// declaring variable for later refrence/ 45-50 is grabbing elements from our html 
var quizTimer = 60;
var quizScore = 0;
var currentQuestionIndex = 0;
var quizTimerInterval;
var startButton = document.getElementById("start-button");
var quizQuestionElement = document.getElementById("quiz-question");
var quizAnswerButtons = document.getElementById("quiz-answer-buttons");
var quizTimerElement = document.getElementById("quiz-timer");
var quizScoreElement = document.getElementById("quiz-score");
var quizHighScoresElement = document.getElementById("quiz-high-scores");
var quizHighScores = JSON.parse(localStorage.getItem("quizHighScores")) || [];
var quizTimeLeft = quizTimer;

startButton.addEventListener("click", startQuiz);

// declared on line 55 given functionality on line 58
function startQuiz() {
  startButton.classList.add("hide");
  quizQuestionElement.classList.remove("hide");
  quizAnswerButtons.classList.remove("hide");
  quizTimerElement.classList.remove("hide");
  quizScoreElement.classList.remove("hide");
  quizTimerElement.textContent = quizTimeLeft;
  quizTimerInterval = setInterval(() => {
    quizTimeLeft--;
    quizTimerElement.textContent = quizTimeLeft;

    // Stop the timer if time reaches 0
    if (quizTimeLeft <= 0) {
      endQuiz();
      clearInterval(quizTimerInterval); 
    }
  }, 1000);

  loadQuizQuestion();
}

//line 72 is declared and line 76 will that code 
function loadQuizQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  quizQuestionElement.textContent = currentQuestion.question;
  quizAnswerButtons.innerHTML = "";
  currentQuestion.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectQuizAnswer);
    quizAnswerButtons.appendChild(button);
  });
}
function selectQuizAnswer(event) {
  var selectedButton = event.target;
  var correct = selectedButton.dataset.correct;

  if (correct) {
    quizScore += 1;
    quizScoreElement.textContent = quizScore;
    var resultElement = document.createElement("p");
    resultElement.textContent = "Correct!";
    quizAnswerButtons.appendChild(resultElement);
  } else {
    quizTimeLeft -= 3;
    quizTimerElement.textContent = quizTimeLeft;
    var resultElement = document.createElement("p");
    resultElement.textContent = "Wrong!";
    quizAnswerButtons.appendChild(resultElement);
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    loadQuizQuestion();
  } else {
    endQuiz();
  }
}
// the endQuiz function will run line 71 of our javascript
function endQuiz() {
  clearInterval(quizTimerInterval);
  quizQuestionElement.classList.add("hide");
  quizAnswerButtons.classList.add("hide");
  quizTimerElement.classList.add("hide");
  quizScoreElement.classList.add("hide");
  quizHighScoresElement.classList.remove("hide");
  quizHighScores.push(quizScore);
  localStorage.setItem("quizHighScores", JSON.stringify(quizHighScores));
}
