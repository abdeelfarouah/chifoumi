// Récupérer les éléments de l'interface utilisateur
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resultDiv = document.getElementById("result");
const scoresTable = document.getElementById("scores");

// Initialiser les scores des joueurs
let userScore = 0;
let computerScore = 0;

// Ajouter des écouteurs d'événements sur les boutons de choix
rockBtn.addEventListener("click", function() {
  playRound("rock");
});

paperBtn.addEventListener("click", function() {
  playRound("paper");
});

scissorsBtn.addEventListener("click", function() {
  playRound("scissors");
});

// Fonction pour jouer un tour de jeu
function playRound(playerSelection) {
  // Générer une sélection aléatoire pour l'ordinateur
  const options = ["rock", "paper", "scissors"];
  const computerSelection = options[Math.floor(Math.random() * 3)];
  
  // Vérifier qui a gagné ou s'il y a une égalité
  if (playerSelection === computerSelection) {
    resultDiv.textContent = "Égalité!";
  } else if (playerSelection === "rock" && computerSelection === "scissors" ||
             playerSelection === "paper" && computerSelection === "rock" ||
             playerSelection === "scissors" && computerSelection === "paper") {
    userScore++;
    resultDiv.textContent = "Vous avez gagné!";
  } else {
    computerScore++;
    resultDiv.textContent = "Vous avez perdu!";
  }
  
  // Mettre à jour les scores et le tableau des résultats
  document.getElementById("user-score").textContent = userScore;
  document.getElementById("computer-score").textContent = computerScore;
  const newRow = scoresTable.insertRow(-1);
  const userCell = newRow.insertCell(0);
  const computerCell = newRow.insertCell(1);
  const resultCell = newRow.insertCell(2);
  userCell.textContent = userScore;
  computerCell.textContent = computerScore;
  resultCell.textContent = resultDiv.textContent;
}
