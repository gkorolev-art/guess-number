"use strict";

// Рандомайзер и счётчики
function getRandomInt() {
  return Math.floor(Math.random() * 20 + 1);
}

let randomNumber = getRandomInt();
let scoreCounter = 20;
let highScoreCounter = 0;

// Константы
const background = document.querySelector("body");
const theNumber = document.querySelector(".number");
const inputNumber = document.querySelector(".guess");
const buttonCheck = document.querySelector(".check");
const buttonAgain = document.querySelector(".again");
const message = document.querySelector(".message");
const score = document.querySelector(".score");
const highScore = document.querySelector(".highscore");

// Функция проверки введённого числа
function checkNumber() {
  if (!inputNumber.value) {
    message.textContent = "Вы не ввели число";
  } else if (Number(inputNumber.value) === randomNumber) {
    handleScoreFunction();
    win();
  } else if (Number(inputNumber.value) < randomNumber) {
    message.textContent = `${inputNumber.value}? Маловато...`;
    handleScoreFunction();
  } else if (Number(inputNumber.value) > randomNumber) {
    message.textContent = `${inputNumber.value}? Слишком много!`;
    handleScoreFunction();
  }
}

buttonCheck.addEventListener("click", checkNumber);
inputNumber.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    buttonCheck.click();
  }
});

// Функция счетчика очков
function handleScoreFunction() {
  scoreCounter--;
  score.textContent = scoreCounter;
  inputNumber.value = "";
}

// Функция, срабатывающая при угадывании
function win() {
  message.textContent = "Вы угадали!";
  theNumber.textContent = randomNumber;
  background.style.background = "#60b347";
  buttonCheck.removeEventListener("click", checkNumber);
  buttonCheck.setAttribute("disabled", "");
  if (scoreCounter > highScoreCounter) {
    highScoreCounter = scoreCounter;
    highScore.textContent = highScoreCounter;
  }
}

//Функция перезагрузки
function restart() {
  randomNumber = getRandomInt();
  scoreCounter = 20;
  score.textContent = 20;
  theNumber.textContent = "?";
  message.textContent = "Начните угадывать";
  highScore.textContent = highScoreCounter;
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
