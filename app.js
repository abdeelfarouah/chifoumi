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

function updateScore(userChoice, computerChoice, userScore, computerScore) {
  let resultText;
  
  switch (userChoice + computerChoice) {
    case 'rockscissors':
    case 'paperrock':
    case 'scissorspaper':
      userScore++;
      resultText = "You win!";
      break;
    case 'rockpaper':
    case 'paperscissors':
    case 'scissorsrock':
      computerScore++;
      resultText = "You lose!";
      break;
    default:
      resultText = "It's a tie!";
  }
  
  return {
    userScore,
    computerScore,
    resultText
  };
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
  });play();
}
function showScores(userScore, computerScore, resultText) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const trHead = document.createElement('tr');
  const thMe = document.createElement('th');
  const thComputer = document.createElement('th');
  const thResult = document.createElement('th');
  
  thMe.textContent = 'ME';
  thComputer.textContent = 'COMPUTER';
  thResult.textContent = 'RESULT';
  
  trHead.appendChild(thMe);
  trHead.appendChild(thComputer);
  trHead.appendChild(thResult);
  
  thead.appendChild(trHead);
  table.appendChild(thead);
  table.appendChild(tbody);
  
  const trBody = document.createElement('tr');
  const tdUserScore = document.createElement('td');
  const tdComputerScore = document.createElement('td');
  const tdResultText = document.createElement('td');
  
  tdUserScore.textContent = userScore;
  tdComputerScore.textContent = computerScore;
  tdResultText.textContent = resultText;
  
  trBody.appendChild(tdUserScore);
  trBody.appendChild(tdComputerScore);
  trBody.appendChild(tdResultText);
  
  tbody.appendChild(trBody);
  
  const popup = window.open('', 'popup', 'width=300,height=200');
  popup.document.body.appendChild(table);
}
const scores = updateScore(userChoice, computerChoice, userScoreValue, computerScoreValue);
userScoreValue = scores.userScore;
computerScoreValue = scores.computerScore;
resultText = scores.resultText;

showScores(userScoreValue, computerScoreValue, resultText);


