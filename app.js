// Sélection des éléments HTML
const buttons = document.querySelectorAll('.choices button');
const score = document.querySelector('.score-board');
const result = document.querySelector('.resultat');
const userScore = document.querySelector('#user-label');
const computerScore = document.querySelector('#computer-label');

// Initialisation des scores
let userScoreCount = 0;
let computerScoreCount = 0;

// Fonction pour l'ordinateur choisissant aléatoirement Pierre, Papier ou Ciseaux
function computerPlay() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Fonction pour mettre à jour le score affiché
function updateScore() {
  userScore.textContent = `ME: ${userScoreCount} |`;
  computerScore.textContent = ` COMPUTER: ${computerScoreCount}`;
}

// Fonction qui compare le choix du joueur et celui de l'ordinateur pour déterminer le gagnant
function playRound(playerSelection) {
  const computerSelection = computerPlay();
  if (playerSelection === computerSelection) {
    result.textContent = "It's a tie!";
    return;
  }
  if (playerSelection === 'rock') {
    if (computerSelection === 'scissors') {
      userScoreCount++;
      result.textContent = 'You win! Rock beats scissors.';
      updateScore();
      return;
    } else {
      computerScoreCount++;
      result.textContent = 'You lose! Paper beats rock.';
      updateScore();
      return;
    }
  }
  if (playerSelection === 'paper') {
    if (computerSelection === 'rock') {
      userScoreCount++;
      result.textContent = 'You win! Paper beats rock.';
      updateScore();
      return;
    } else {
      computerScoreCount++;
      result.textContent = 'You lose! Scissors beats paper.';
      updateScore();
      return;
    }
  }
  if (playerSelection === 'scissors') {
    if (computerSelection === 'paper') {
      userScoreCount++;
      result.textContent = 'You win! Scissors beats paper.';
      updateScore();
      return;
    } else {
      computerScoreCount++;
      result.textContent = 'You lose! Rock beats scissors.';
      updateScore();
      return;
    }
  }
}

// Écoute des clics sur les boutons de choix
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const playerSelection = button.id;
    playRound(playerSelection);
  });
});
