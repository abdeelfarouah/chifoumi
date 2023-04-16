// Définir la variable pour le score maximum
var maxScore = 10;

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
  updateScores();

  // Vérifier si un joueur a atteint le score maximum
  if (playerScore === maxScore || computerScore === maxScore) {
    // Afficher le message de fin de jeu
    resultMsgElement.textContent = `${playerScore === maxScore ? 'You' : 'Computer'} won!`;

    // Désactiver les boutons pour arrêter le jeu
    choices.forEach(choice => {
      choice.removeEventListener('click', handleChoiceClick);
      choice.style.pointerEvents = 'none';
    });
  }
}

// Ajouter un écouteur d'événement au bouton de réinitialisation
resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  updateScores();
  resultMsgElement.textContent = "";

  // Réactiver les boutons pour recommencer le jeu
  choices.forEach(choice => {
    choice.addEventListener('click', handleChoiceClick);
    choice.style.pointerEvents = 'auto';
  });
});
// Ajouter un écouteur d'événement à chaque bouton
choices.forEach(choice => {
  choice.addEventListener('click', handleChoiceClick);

  // Ajouter l'animation pour faire pivoter l'image
  anime({
    targets: choice,
    rotate: '1turn',
    duration: 500,
    autoplay: false
  });
});

// Définir la fonction pour gérer les clics sur les images
function handleChoiceClick(event) {
  // Récupérer l'ID de l'image cliquée pour déterminer le choix du joueur
  const playerChoice = event.target.id;

  // Faire pivoter l'image choisie
  anime({
    targets: event.target,
    rotate: '1turn',
    duration: 500,
    autoplay: true
  });

  // Déterminer le choix de l'ordinateur
  const computerChoice = getComputerChoice();

  // Déterminer le résultat du jeu
  const result = getResult(playerChoice, computerChoice);
