// Initialiser les scores
let playerScore = 0;
let computerScore = 0;

// Fonction pour choisir l'arme de l'ordinateur aléatoirement
function computerPlay() {
  const weapons = ['rock', 'paper', 'scissors'];
  const weaponIndex = Math.floor(Math.random() * weapons.length);
  return weapons[weaponIndex];
}

// Fonction pour jouer une manche
function playRound(playerSelection) {
  const computerSelection = computerPlay();
  let result = '';
  if (playerSelection === 'rock') {
    if (computerSelection === 'paper') {
      computerScore++;
      result = 'You lose! Paper beats rock.';
    } else if (computerSelection === 'scissors') {
      playerScore++;
      result = 'You win! Rock beats scissors.';
    } else {
      result = 'Tie!';
    }
  } else if (playerSelection === 'paper') {
    if (computerSelection === 'scissors') {
      computerScore++;
      result = 'You lose! Scissors beats paper.';
    } else if (computerSelection === 'rock') {
      playerScore++;
      result = 'You win! Paper beats rock.';
    } else {
      result = 'Tie!';
    }
  } else {
    if (computerSelection === 'rock') {
      computerScore++;
      result = 'You lose! Rock beats scissors.';
    } else if (computerSelection === 'paper') {
      playerScore++;
      result = 'You win! Scissors beats paper.';
    } else {
      result = 'Tie!';
    }
  }
  // Afficher le résultat de la manche
  const resultElement = document.getElementById('result');
  resultElement.textContent = result;
  // Afficher les scores
  const playerScoreElement = document.getElementById('playerScore');
  const computerScoreElement = document.getElementById('computerScore');
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  function afficherScorePopup(playerScore, computerScore) {
    const popup = window.open('', 'Score', 'width=200,height=100');
    const content = document.createElement('div');
    content.style.backgroundColor = '#f2f2f2';
    content.style.fontFamily = 'Arial, sans-serif';
    content.style.textAlign = 'center';
    content.style.padding = '10px';
    const title = document.createElement('h1');
    title.style.marginTop = '0';
    title.style.fontSize = '20px';
    title.style.color = '#333';
    title.innerText = 'Score';
    const playerScoreText = document.createElement('p');
    playerScoreText.style.margin = '5px';
    playerScoreText.style.fontSize = '16px';
    playerScoreText.style.color = '#333';
    playerScoreText.innerText = `Player: ${playerScore}`;
    const computerScoreText = document.createElement('p');
    computerScoreText.style.margin = '5px';
    computerScoreText.style.fontSize = '16px';
    computerScoreText.style.color = '#333';
    computerScoreText.innerText = `Computer: ${computerScore}`;
    content.appendChild(title);
    content.appendChild(playerScoreText);
    content.appendChild(computerScoreText);
    popup.document.body.appendChild(content);
  }
  // Vérifier si le jeu est terminé
  if (playerScore === 10) {
    alert('You win the game!');
    resetGame();
  } else if (computerScore === 10) {
    alert('You lose the game!');
    resetGame();
  }
}

// Fonction pour réinitialiser le jeu
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  const playerScoreElement = document.getElementById('playerScore');
  const computerScoreElement = document.getElementById('computerScore');

  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  const resultElement = document.getElementById('result');
  resultElement.textContent = '';
}
// Ajouter des gestionnaires d'événements aux images pour jouer une manche lorsqu'elles sont cliquées
const rock = document.getElementById('rock');
rock.addEventListener('click', () => playRound('rock'));
const paper = document.getElementById('paper');
paper.addEventListener('click', () => playRound('paper'));
const scissors = document.getElementById('scissors');
scissors.addEventListener('click', () => playRound('scissors'));
