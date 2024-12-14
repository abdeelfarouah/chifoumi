document.addEventListener("DOMContentLoaded", async () => {
  const gameDataResponse = await fetch("gameData.json");
  const gameData = await gameDataResponse.json();

  const MAX_VICTORIES = 10;

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
  const imagePaths = {
    rock: "rock.jpg",
    paper: "paper.png",
    scissors: "scissors.png",
  };

  let playerName = localStorage.getItem("playerName") || null;
  let playerScore = 0;
  let computerScore = 0;
  let gameActive = false;

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

    const isUniqueName = gameData.every((record) => record.playerName !== playerName);
    if (!isUniqueName) {
      displayResult("Name must be unique. Please enter a different name.");
      return;
    }

    startNewGame();
  });

  function startNewGame() {
    gameActive = true;
    playerScore = 0;
    computerScore = 0;
    displayResult("Choose your weapon:");
    enableChoiceButtons();
  }

  function playRound(playerSelection, computerSelection) {
    if (!playerName || !gameActive) {
      displayResult("Please start a new game.");
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

  choices.forEach((choice) => {
    choiceImages[choice].addEventListener("click", () => {
      if (!gameActive) {
        displayResult("Game is not active. Start a new game.");
        return;
      }

      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const result = playRound(choice, computerChoice);

      displayResult(`${result} You chose ${choice}, computer chose ${computerChoice}.`);
      updateGameUI();

      if (playerScore === MAX_VICTORIES || computerScore === MAX_VICTORIES) {
        endGame();
      }
    });
  });

  function updateGameUI() {
    const shuffledChoices = shuffleImages();
    choices.forEach((choice, index) => {
      choiceImages[choice].firstElementChild.src = imagePaths[shuffledChoices[index]];
    });
  }

  function shuffleImages() {
    return choices.sort(() => Math.random() - 0.5);
  }

  function endGame() {
    gameActive = false;
    saveDataToLocalStorage();

    const winnerMessage =
      playerScore === MAX_VICTORIES
        ? "Congratulations! You are the winner!"
        : "Computer is the winner. Better luck next time!";
    setTimeout(() => showPopup(winnerMessage), 1000);
    resetGame();
  }

  function showPopup(message) {
    alert(message);
  }

  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    disableChoiceButtons();
  }

  function enableChoiceButtons() {
    Object.values(choiceImages).forEach((img) => (img.style.pointerEvents = "auto"));
  }

  function disableChoiceButtons() {
    Object.values(choiceImages).forEach((img) => (img.style.pointerEvents = "none"));
  }

  function saveDataToLocalStorage() {
    const newRecord = { playerName, playerScore, computerScore };
    gameData.push(newRecord);
    localStorage.setItem("gameData", JSON.stringify(gameData));
    updateScoreTable();
  }

  function updateScoreTable() {
    scoreTableBody.innerHTML = ""; // Clear table before re-populating
    gameData.forEach(({ playerName, playerScore, computerScore }) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${playerName}</td>
        <td>${playerScore}</td>
        <td>${computerScore}</td>`;
      scoreTableBody.appendChild(row);
    });
  }

  function loadGameDataFromLocalStorage() {
    const savedData = JSON.parse(localStorage.getItem("gameData")) || [];
    savedData.forEach(({ playerName, playerScore, computerScore }) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${playerName}</td>
        <td>${playerScore}</td>
        <td>${computerScore}</td>`;
      scoreTableBody.appendChild(row);
    });
  }

  loadGameDataFromLocalStorage();

  // Define the displayResult function
  function displayResult(message) {
    resultElement.textContent = message;
  }
});
