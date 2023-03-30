// Définition des variables

const choices = document.querySelectorAll('.choices img');
const userScore = document.getElementById('user-score');
const computerScore = document.getElementById('computer-score');
const result = document.getElementById('result');
const scoresTable = document.getElementById('scores');
let userChoice;
let computerChoice;
let userScoreValue = 0;
let computerScoreValue = 0;
let resultText = "";

// Fonction de choix aléatoire de l'ordinateur

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Fonction de comparaison des choix et mise à jour du score

function updateScore() {
  if (userChoice === computerChoice) {
    resultText = "It's a tie!";
  } else if ((userChoice === 'rock' && computerChoice === 'scissors') ||
             (userChoice === 'paper' && computerChoice === 'rock') ||
             (userChoice === 'scissors' && computerChoice === 'paper')) {
    userScoreValue++;
    resultText = "You win!";
  } else {
    computerScoreValue++;
    resultText = "You lose!";
  }

  userScore.textContent = userScoreValue;
  computerScore.textContent = computerScoreValue;

  // Ajout d'une ligne au tableau des scores

  const row = scoresTable.insertRow(-1);
  const userCell = row.insertCell(0);
  const computerCell = row.insertCell(1);
  const resultCell = row.insertCell(2);
  userCell.textContent = userChoice;
  computerCell.textContent = computerChoice;
  resultCell.textContent = resultText;
}

// Fonction principale de jeu

function play() {
  computerChoice = getComputerChoice();

  // Détection du choix de l'utilisateur et mise à jour de l'image

  choices.forEach(choice => {
    choice.addEventListener('click', function() {
      userChoice = choice.id;
      this.classList.add('selected');
      setTimeout(() => this.classList.remove('selected'), 500);
      updateScore();
      result.textContent = resultText;
    });
  });
}

play();
