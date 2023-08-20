document.addEventListener("DOMContentLoaded", () => {
  const playerNameInput = document.getElementById("playerName");
  const startButton = document.getElementById("startButton");
  const resultElement = document.getElementById("result");
  const playerScoreElement = document.getElementById("playerScore");
  const computerScoreElement = document.getElementById("computerScore");
  const nameErrorMessage = document.getElementById("nameErrorMessage");
  const scoreTable = document.getElementById("scoreTable");
  const scoreTableBody = document.getElementById("scoreTableBody");

  let playerName = "";
  let playerScore = 0;
  let computerScore = 0;

  // Tableau pour stocker les données des scores
  let scoreData = [];

  const choices = ["rock", "paper", "scissors"];
  const choiceImages = {
    rock: document.getElementById("rock"),
    paper: document.getElementById("paper"),
    scissors: document.getElementById("scissors")
  };

  playerNameInput.addEventListener("input", () => {
    playerName = playerNameInput.value.trim();
    if (playerName === "") {
      startButton.disabled = true;
      nameErrorMessage.style.display = "block";
    } else {
      startButton.disabled = false;
      nameErrorMessage.style.display = "none";
    }
  });

  startButton.addEventListener("click", () => {
    if (playerName === "") {
      resultElement.textContent = "Please enter a valid name.";
      return;
    }

    resultElement.textContent = "Choose your weapon:";
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;

    enableChoiceButtons();
  });

  function playRound(playerSelection, computerSelection) {
    if (playerName === "") {
      resultElement.textContent = "Please enter a valid name before playing.";
      return;
    }

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

  choices.forEach(choice => {
    choiceImages[choice].addEventListener("click", () => {
      if (playerName === "") {
        resultElement.textContent = "Please enter a valid name before playing.";
        return;
      }

      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const result = playRound(choice, computerChoice);
      resultElement.textContent = `${result} ${playerName} chose ${choice} and the computer chose ${computerChoice}.`;

      playerScoreElement.textContent = playerScore;
      computerScoreElement.textContent = computerScore;

      if (playerScore === 10) {
        alert(`Congratulations ${playerName}! You win the game!`);
        resetGame();
      } else if (computerScore === 10) {
        alert(`Oops ${playerName}! You lose the game.`);
        resetGame();
      }

      shuffleChoiceImages();
    });
  });

  function resetGame() {
    // Sauvegarder le score dans le tableau des scores
    saveScore(playerName, playerScore, computerScore);

    // Mettre à jour le tableau des scores
    updateScoreTable();

    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    resultElement.textContent = "";
    enableChoiceButtons();
  }

  function enableChoiceButtons() {
    choiceImages.rock.disabled = false;
    choiceImages.paper.disabled = false;
    choiceImages.scissors.disabled = false;
  }

  function shuffleChoiceImages() {
    const shuffledChoices = choices.slice();
    for (let i = shuffledChoices.length - 1; i >


