document.addEventListener("DOMContentLoaded", async () => {
  const playerNameInput = document.getElementById("playerName");
  const startButton = document.getElementById("startButton");
  const resultElement = document.getElementById("result");
  const nameErrorMessage = document.getElementById("nameErrorMessage");
  const scoreTableBody = document.getElementById("scoreTableBody");
  const choices = ["rock", "paper", "scissors"];
  const choiceImages = {
    rock: document.getElementById("rock"),
    paper: document.getElementById("paper"),
    scissors: document.getElementById("scissors"),
  };
  const MAX_VICTORIES = 10;
  const MAX_PLAYERS = 20;

  let playerName = null;
  let playerScore = 0;
  let computerScore = 0;
  let gameActive = false;

  // Chargement des données de jeu depuis le localStorage (ou un objet vide si pas de données)
  let gameData = JSON.parse(localStorage.getItem("gameData")) || {};

  // Affichage des scores précédents
  updateScoreTable();

  // Gestion du nom du joueur
  playerNameInput.addEventListener("input", () => {
    playerName = playerNameInput.value.trim();
    if (!playerName) {
      startButton.disabled = true;
      nameErrorMessage.style.display = "block";
    } else {
      startButton.disabled = false;
      nameErrorMessage.style.display = "none";
    }
  });

  startButton.addEventListener("click", () => {
    if (!playerName) {
      displayResult("Please enter a valid name.");
      return;
    }
    if (Object.keys(gameData).length >= MAX_PLAYERS && !gameData[playerName]) {
      displayResult("Maximum players reached. Please choose another name.");
      return;
    }
    startNewGame();
  });

  function startNewGame() {
    gameActive = true;
    playerScore = 0;
    computerScore = 0;
    updateScoreUI();
    displayResult("Choose your weapon!");
  }

  choices.forEach((choice) => {
    choiceImages[choice].addEventListener("click", () => {
      if (!gameActive) {
        displayResult("Game is not active. Start a new game.");
        return;
      }

      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const result = playRound(choice, computerChoice);

      displayResult(`${result} You chose ${choice}, computer chose ${computerChoice}.`);
      updateScoreUI();

      if (playerScore === MAX_VICTORIES || computerScore === MAX_VICTORIES) {
        endGame();
      }
    });
  });

  function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
      return "It's a tie!";
    } else if (
      (playerSelection === "rock" && computerSelection === "scissors") ||
      (playerSelection === "paper" && computerSelection === "rock") ||
      (playerSelection === "scissors" && computerSelection === "paper")
    ) {
      playerScore++;
      return "You win!";
    } else {
      computerScore++;
      return "Computer wins!";
    }
  }

  function displayResult(message) {
    resultElement.textContent = message;
  }

  function updateScoreUI() {
    scoreTableBody.innerHTML = `
      <tr>
        <td>${playerName}</td>
        <td>${playerScore}</td>
        <td>${computerScore}</td>
      </tr>
    `;
  }

  function updateScoreTable() {
    scoreTableBody.innerHTML = ""; // Clear the table before re-populating

    // Trier les joueurs par leur score
    const sortedGameData = Object.entries(gameData)
      .sort(([, a], [, b]) => b.playerScore - a.playerScore) // Trier par score décroissant
      .slice(0, MAX_PLAYERS); // Limiter à MAX_PLAYERS

    sortedGameData.forEach(([name, { playerScore, computerScore }]) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${name}</td>
        <td>${playerScore}</td>
        <td>${computerScore}</td>
      `;
      scoreTableBody.appendChild(row);
    });
  }

  function endGame() {
    gameActive = false;
    const winnerMessage = playerScore === MAX_VICTORIES
      ? "Congratulations! You won!"
      : "Computer wins! Better luck next time.";
    alert(winnerMessage);
    saveDataToLocalStorage();
    resetGame();
  }

  function saveDataToLocalStorage() {
    // Ajouter ou mettre à jour le score pour le joueur actuel
    gameData[playerName] = { playerScore, computerScore };

    // Limiter à 20 joueurs
    if (Object.keys(gameData).length > MAX_PLAYERS) {
      const firstPlayer = Object.keys(gameData)[0]; // Obtenir le premier joueur (qui sera supprimé)
      delete gameData[firstPlayer]; // Supprimer ce joueur pour ne pas dépasser 20 joueurs
    }

    // Sauvegarder le tableau dans le localStorage
    localStorage.setItem("gameData", JSON.stringify(gameData));

    // Mettre à jour l'affichage du tableau des scores
    updateScoreTable();
  }

  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScoreUI();
  }
});
