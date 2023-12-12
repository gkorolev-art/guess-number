"use strict";

function getRandomInt() {
  return Math.floor(Math.random() * 20 + 1);
}
getRandomInt();

// Рандомайзер и счётчики
let randomNumber = getRandomInt();
console.log(randomNumber);
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
  } else if (inputNumber.value == randomNumber) {
    handleScoreFunction();
    win();
  } else if (inputNumber.value < randomNumber) {
    handleScoreFunction();
    message.textContent = `${inputNumber.value}? Маловато...`;
    inputNumber.value = "";
  } else if (inputNumber.value > randomNumber) {
    handleScoreFunction();
    message.textContent = `${inputNumber.value}? Слишком много!`;
    inputNumber.value = "";
  }
}

// Функция счетчика очков
function handleScoreFunction() {
  scoreCounter--;
  score.textContent = scoreCounter;
}

// Функция, срабатывающая при угадывании
function win() {
  message.textContent = "Вы угадали!";
  theNumber.textContent = randomNumber;
  background.style.background = "#60b347";
  buttonCheck.removeEventListener("click", checkNumber);
  if (scoreCounter > highScoreCounter) {
    highScoreCounter = scoreCounter;
    highScore.textContent = highScoreCounter;
  }
}

// Слушатели по клику
buttonCheck.addEventListener("click", checkNumber);
buttonAgain.addEventListener("click", restart);

//Функция перезагрузки
function restart() {
  randomNumber = getRandomInt();
  console.log(randomNumber);
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
}
