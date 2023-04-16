// Définition des constantes

const resultMsgElement = document.getElementById('result');
const choices = document.querySelectorAll('.choices img');
const resetBtn = document.querySelector("#reset");

// Définition des variables
var playerScore = 0;
var computerScore = 0;

// Ajouter un écouteur d'événement à chaque bouton
choices.forEach(choice => {
  choice.addEventListener('click', handleChoiceClick);
});

// Ajouter un écouteur d'événement au bouton de réinitialisation
resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  updateScores();
  resultMsgElement.textContent = "";
});

// Définir la fonction pour gérer les clics sur les images  
function handleChoiceClick(event) {
  // Récupérer l'ID de l'image cliquée pour déterminer le choix du joueur
  const playerChoice = event.target.id;

  // Déterminer le choix de l'ordinateur
  const computerChoice = getComputerChoice();

  // Déterminer le résultat du jeu
  const result = getResult(playerChoice, computerChoice);

  // Mettre à jour le score en fonction du résultat
  if (result === 'player') {
    playerScore++;
  } else if (result === 'computer') {
    computerScore++;
  }

  // Afficher le résultat du jeu
  resultMsgElement.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;

  // Mettre à jour les scores affichés dans la page HTML
  updateScores();
}

// Définir une fonction pour générer le choix aléatoire de l'ordinateur
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

// Définir une fonction pour déterminer le résultat du jeu
function getResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return alert "Tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return alert"You win!";
  } else {
    return alert"Computer wins!";
  }
}
  // Définir les éléments HTML pour afficher les scores
    var playerScoreElement = document.getElementById("playerScore");
    var computerScoreElement = document.getElementById("computerScore");

    // Définir une fonction pour mettre à jour les scores affichés dans la page HTML
    function updateScores() {
      playerScore++;
      computerScore++;
      playerScoreElement.textContent = playerScore;
      computerScoreElement.textContent = computerScore;

      // Afficher une fenêtre contextuelle pour afficher le score
      window.alert("Le score est Joueur: " + playerScore + " Ordinateur: " + computerScore);
    }
}
