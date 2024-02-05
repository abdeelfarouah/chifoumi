document.addEventListener("DOMContentLoaded", () => {
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
    if (!playerName) {
      displayResult("Please enter a valid name.");
      return;
    }

    displayResult("Choose your weapon:");
    enableChoiceButtons();
  });

  function playRound(playerSelection, computerSelection) {
    if (!playerName) {
      displayResult("Please enter a valid name before playing.");
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

  function shuffleImages() {
    const shuffledChoices = [...choices];
    for (let i = shuffledChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledChoices[i], shuffledChoices[j]] = [shuffledChoices[j], shuffledChoices[i]];
    }
    return shuffledChoices;
  }

  function enableChoiceButtons() {
    choices.forEach((choice) => {
      choiceImages[choice].style.pointerEvents = "auto";
    });
  }

  function displayResult(message) {
    resultElement.textContent = message;
  }

  function updateScoreTable() {
    const newRow = document.createElement("tr");
    const nameCell = document.createElement("td");
    const playerScoreCell = document.createElement("td");
    const computerScoreCell = document.createElement("td");

    nameCell.textContent = playerName;
    playerScoreCell.textContent = playerScore;
    computerScoreCell.textContent = computerScore;

    newRow.appendChild(nameCell);
    newRow.appendChild(playerScoreCell);
    newRow.appendChild(computerScoreCell);

    scoreTableBody.appendChild(newRow);
  }

  choices.forEach((choice) => {
    choiceImages[choice].addEventListener("click", () => {
      if (!playerName) {
        displayResult("Please enter a valid name before playing.");
        return;
      }

      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const result = playRound(choice, computerChoice);
      displayResult(`${result} ${playerName} chose ${choice} and the computer chose ${computerChoice}.`);

      const shuffledChoices = shuffleImages();
      choices.forEach((choice, index) => {
        const imgPath = imagePaths[shuffledChoices[index]];
        choiceImages[choice].src = imgPath;
      });

      if (playerScore === MAX_VICTORIES || computerScore === MAX_VICTORIES) {
        saveDataToJson(); // Sauvegarde des données après chaque partie
        updateScoreTable();

        playerScore = 0;
        computerScore = 0;
      }
    });
  });

  function saveDataToJson() {
    const dataToSave = {
      playerName: playerName,
      playerScore: playerScore,
      computerScore: computerScore,
    };

    const jsonData = JSON.stringify(dataToSave);
    localStorage.setItem("gameData", jsonData);
  }

  function loadGameDataFromLocalStorage() {
    const savedData = localStorage.getItem("gameData");
    if (savedData) {
      const loadedData = JSON.parse(savedData);

      playerName = loadedData.playerName;
      playerScore = loadedData.playerScore;
      computerScore = loadedData.computerScore;

      updateScoreTable();
    }
  }

  // Appeler la fonction pour charger les données depuis le stockage local
  loadGameDataFromLocalStorage();
});
