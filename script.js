// ===============================
// Computer Fundamentals & Knowledge Quiz
// ===============================
let correctCount = 0;
let wrongCount = 0;

const questions = [
  {
    questionText: "Who is known as the father of computers?",
    options: ["1. Charles Babbage", "2. Alan Turing", "3. Bill Gates", "4. Steve Jobs"],
    answer: "1. Charles Babbage",
  },
  {
    questionText: "What does CPU stand for?",
    options: [
      "1. Central Program Unit",
      "2. Central Processing Unit",
      "3. Control Processing User",
      "4. Computer Personal Unit",
    ],
    answer: "2. Central Processing Unit",
  },
  {
    questionText: "Which of the following is NOT an input device?",
    options: ["1. Keyboard", "2. Mouse", "3. Monitor", "4. Scanner"],
    answer: "3. Monitor",
  },
  {
    questionText: "The 'brain' of the computer is:",
    options: ["1. RAM", "2. Hard Disk", "3. CPU", "4. GPU"],
    answer: "3. CPU",
  },
  {
    questionText: "Which of the following is volatile memory?",
    options: ["1. ROM", "2. Hard Disk", "3. RAM", "4. DVD"],
    answer: "3. RAM",
  },
  {
    questionText: "Which company developed the Windows operating system?",
    options: ["1. Apple", "2. Microsoft", "3. IBM", "4. Intel"],
    answer: "2. Microsoft",
  },
  {
    questionText: "Which of the following is an example of system software?",
    options: ["1. MS Word", "2. Google Chrome", "3. Windows 10", "4. Photoshop"],
    answer: "3. Windows 10",
  },
  {
    questionText: "One kilobyte (KB) is equal to:",
    options: ["1. 1000 bytes", "2. 1024 bytes", "3. 1200 bytes", "4. 1240 bytes"],
    answer: "2. 1024 bytes",
  },
  {
    questionText: "Which device is used to connect a computer to a network?",
    options: ["1. Printer", "2. Router", "3. Keyboard", "4. UPS"],
    answer: "2. Router",
  },
  {
    questionText: "What does URL stand for?",
    options: [
      "1. Uniform Resource Locator",
      "2. Universal Resource List",
      "3. Uniform Record Link",
      "4. User Resource Locator",
    ],
    answer: "1. Uniform Resource Locator",
  },
  {
    questionText: "Which storage device has no moving parts?",
    options: ["1. Hard Disk Drive", "2. Floppy Disk", "3. SSD", "4. CD-ROM"],
    answer: "3. SSD",
  },
  {
    questionText: "What does BIOS stand for?",
    options: [
      "1. Basic Input Output System",
      "2. Binary Integrated Operating System",
      "3. Basic Internal Organ System",
      "4. Built-In Operating Software",
    ],
    answer: "1. Basic Input Output System",
  },
  {
    questionText: "Which of these is an example of open-source software?",
    options: ["1. Windows", "2. Linux", "3. macOS", "4. MS Office"],
    answer: "2. Linux",
  },
  {
    questionText: "What does HTTP stand for?",
    options: [
      "1. HyperText Transfer Protocol",
      "2. HighText Transfer Program",
      "3. Hyperlink Transmission Protocol",
      "4. HyperText Technical Process",
    ],
    answer: "1. HyperText Transfer Protocol",
  },
  {
    questionText: "Which company developed the Java programming language?",
    options: ["1. Microsoft", "2. Sun Microsystems", "3. Google", "4. IBM"],
    answer: "2. Sun Microsystems",
  },
  {
    questionText: "Which part of the computer is responsible for graphics rendering?",
    options: ["1. CPU", "2. RAM", "3. GPU", "4. SSD"],
    answer: "3. GPU",
  },
  {
    questionText: "Which of these is not an operating system?",
    options: ["1. Windows", "2. Linux", "3. Oracle", "4. macOS"],
    answer: "3. Oracle",
  },
  {
    questionText: "In binary, the value of 1010 is:",
    options: ["1. 8", "2. 9", "3. 10", "4. 12"],
    answer: "3. 10",
  },
  {
    questionText: "Which of the following is an output device?",
    options: ["1. Scanner", "2. Microphone", "3. Monitor", "4. Keyboard"],
    answer: "3. Monitor",
  },
  {
    questionText: "What does IP in IP address stand for?",
    options: [
      "1. Internet Provider",
      "2. Internal Protocol",
      "3. Internet Protocol",
      "4. Information Path",
    ],
    answer: "3. Internet Protocol",
  },
];

// ===============================
// DOM elements
// ===============================
const startCard = document.querySelector("#start-card");
const questionCard = document.querySelector("#question-card");
const scoreCard = document.querySelector("#score-card");
const leaderboardCard = document.querySelector("#leaderboard-card");
const resultDiv = document.querySelector("#result-div");
const resultText = document.querySelector("#result-text");
const timeDisplay = document.querySelector("#time");

// ===============================
// Helpers
// ===============================
function hideCards() {
  startCard.setAttribute("hidden", true);
  questionCard.setAttribute("hidden", true);
  scoreCard.setAttribute("hidden", true);
  leaderboardCard.setAttribute("hidden", true);
}
function hideResultText() {
  resultDiv.style.display = "none";
}

// Global vars
let intervalID;
let time;
let currentQuestion;

// ===============================
// Quiz Start
// ===============================
document.querySelector("#start-button").addEventListener("click", startQuiz);

function startQuiz() {
  hideCards();
  questionCard.removeAttribute("hidden");

  currentQuestion = 0;
  correctCount = 0;
  wrongCount = 0;

  displayQuestion();

  time = questions.length * 10;
  intervalID = setInterval(countdown, 1000);
  displayTime();
}

function countdown() {
  time--;
  displayTime();
  if (time < 1) {
    endQuiz();
  }
}
function displayTime() {
  timeDisplay.textContent = time;
}

// ===============================
// Questions
// ===============================
function displayQuestion() {
  let question = questions[currentQuestion];
  let options = question.options;

  document.querySelector("#question-text").textContent = question.questionText;

  for (let i = 0; i < options.length; i++) {
    let optionButton = document.querySelector("#option" + i);
    optionButton.textContent = options[i];
  }
}

document.querySelector("#quiz-options").addEventListener("click", checkAnswer);

function optionIsCorrect(optionButton) {
  return optionButton.textContent === questions[currentQuestion].answer;
}

function checkAnswer(eventObject) {
  if (!eventObject.target.matches("button")) return;

  let optionButton = eventObject.target;
  resultDiv.style.display = "block";

  if (optionIsCorrect(optionButton)) {
    resultText.textContent = "✅ Correct!";
    correctCount++;
  } else {
    resultText.textContent = "❌ Incorrect!";
    wrongCount++;
    if (time >= 10) {
      time -= 10;
    } else {
      time = 0;
      endQuiz();
    }
  }
  setTimeout(hideResultText, 1000);

  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// ===============================
// End Quiz
// ===============================
function endQuiz() {
  clearInterval(intervalID);
  hideCards();
  scoreCard.removeAttribute("hidden");

  document.querySelector("#score").textContent = correctCount;
  document.querySelector("#total-questions").textContent = questions.length;
  document.querySelector("#correct-count").textContent = correctCount;
  document.querySelector("#wrong-count").textContent = wrongCount;
}

// ===============================
// Leaderboard
// ===============================
const submitButton = document.querySelector("#submit-button");
const inputElement = document.querySelector("#initials");

submitButton.addEventListener("click", storeScore);

function storeScore(event) {
  event.preventDefault();

  if (!inputElement.value) {
    alert("Please enter your name before pressing submit!");
    return;
  }

  let leaderboardItem = {
    initials: inputElement.value,
    score: correctCount,
  };

  updateStoredLeaderboard(leaderboardItem);

  hideCards();
  leaderboardCard.removeAttribute("hidden");
  renderLeaderboard();
}

function updateStoredLeaderboard(leaderboardItem) {
  let leaderboardArray = getLeaderboard();
  leaderboardArray.push(leaderboardItem);
  localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
}

function getLeaderboard() {
  let storedLeaderboard = localStorage.getItem("leaderboardArray");
  return storedLeaderboard ? JSON.parse(storedLeaderboard) : [];
}

function renderLeaderboard() {
  let sortedLeaderboardArray = sortLeaderboard();
  const highscoreList = document.querySelector("#highscore-list");
  highscoreList.innerHTML = "";
  sortedLeaderboardArray.forEach(entry => {
    let newListItem = document.createElement("li");
    newListItem.textContent = `${entry.initials} - ${entry.score}`;
    highscoreList.append(newListItem);
  });
}

function sortLeaderboard() {
  let leaderboardArray = getLeaderboard();
  leaderboardArray.sort((a, b) => b.score - a.score);
  return leaderboardArray;
}

document.querySelector("#clear-button").addEventListener("click", () => {
  localStorage.clear();
  renderLeaderboard();
});
document.querySelector("#back-button").addEventListener("click", () => {
  hideCards();
  startCard.removeAttribute("hidden");
});

document.querySelector("#leaderboard-link").addEventListener("click", () => {
  hideCards();
  leaderboardCard.removeAttribute("hidden");
  clearInterval(intervalID);
  time = undefined;
  displayTime();
  renderLeaderboard();
});
