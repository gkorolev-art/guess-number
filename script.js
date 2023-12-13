"use strict";

// Рандомайзер и счётчики
function getRandomInt() {
  return Math.trunc(Math.random() * 20) + 1;
}

let secretNumber = getRandomInt();
let scoreCounter = 20;
let highScoreCounter = 0;

// Константы
const background = document.querySelector("body");
const theNumber = document.querySelector(".number");
const inputNumber = document.querySelector(".guess");
const buttonCheck = document.querySelector(".check");
const buttonAgain = document.querySelector(".again");
const score = document.querySelector(".score");
const highScore = document.querySelector(".highscore");
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

// Функция проверки введённого числа
function checkNumber() {
  handleScoreFunction();
  if (!inputNumber.value) {
    displayMessage("Вы не ввели число");
  } else if (Number(inputNumber.value) === secretNumber) {
    win();
  } else if (Number(inputNumber.value) !== secretNumber) {
    if (scoreCounter > 0) {
      Number(inputNumber.value) > secretNumber
        ? displayMessage(`${inputNumber.value}? Слишком много!`)
        : displayMessage(`${inputNumber.value}? Маловато...`);
    } else {
      displayMessage("Вы проиграли");
      background.style.background = "#CD5C5C";
    }
  }
  inputNumber.value = "";
}

// Функция, срабатывающая при угадывании
function win() {
  displayMessage("Вы угадали!");
  theNumber.textContent = secretNumber;
  background.style.background = "#60b347";
  buttonCheck.removeEventListener("click", checkNumber);
  buttonCheck.setAttribute("disabled", "");
  if (scoreCounter > highScoreCounter) {
    highScoreCounter = scoreCounter;
    highScore.textContent = highScoreCounter;
  }
}

// Функция счетчика очков
function handleScoreFunction() {
  scoreCounter--;
  score.textContent = scoreCounter;
}

//Слушатель клика на кнопку проверки + клик по нажатию клавиши Enter
buttonCheck.addEventListener("click", checkNumber);
inputNumber.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    buttonCheck.click();
  }
});

//Функция перезагрузки
function restart() {
  secretNumber = getRandomInt();
  scoreCounter = 20;
  score.textContent = scoreCounter;
  theNumber.textContent = "?";
  displayMessage("Начните угадывать");
  inputNumber.value = "";
  background.style.background = `radial-gradient(
    circle,
    rgba(35, 34, 41, 1) 51%,
    rgba(56, 59, 60, 1) 100%
  )`;
  buttonCheck.addEventListener("click", checkNumber);
  buttonCheck.removeAttribute("disabled");
}

buttonAgain.addEventListener("click", restart);
