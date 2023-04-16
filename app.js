// Définition des constantes
const resultMsgElement = document.getElementById('result');
const choices = document.querySelectorAll('.choices img');

// Définition des variables
var playerScore = 0;
var computerScore = 0;

// Ajouter un écouteur d'événement à chaque bouton
choices.forEach(choice => {
  choice.addEventListener('click', handleChoiceClick);
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
  function updateScores() {
  const playerScoreElement = document.getElementById('playerScore');
  const computerScoreElement = document.getElementById('computerScore');

  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}
