document.addEventListener("DOMContentLoaded", () => {
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

  let playerName = null;
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
      resultElement.textContent = "Please enter a valid name.";
      return;
    }

    resultElement.textContent = "Choose your weapon:";
    enableChoiceButtons();
  });

  function playRound(playerSelection, computerSelection) {
    if (!playerName) {
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

  // Fonction pour mélanger les images
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

  choices.forEach((choice) => {
    choiceImages[choice].addEventListener("click", () => {
      if (!playerName) {
        resultElement.textContent = "Please enter a valid name before playing.";
        return;
      }

      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const result = playRound(choice, computerChoice);
      resultElement.textContent = `${result} ${playerName} chose ${choice} and the computer chose ${computerChoice}.`;

      // Mélanger les images après chaque clic
      const shuffledChoices = shuffleImages();
      choices.forEach((choice, index) => {
        const imgPath = imagePaths[shuffledChoices[index]];
        choiceImages[choice].src = imgPath;
      });

      if (playerScore === 10 || computerScore === 10) {
        if (playerScore === 10) {
          alert(`Congratulations ${playerName}! You win the game!`);
        } else if (computerScore === 10) {
          alert(`Oops ${playerName}! You lose the game.`);
        } else {
          alert(`It's a tie!`);
        }

        // Mettez à jour le tableau des scores avec le nom du joueur et le score final
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

        // Ajoutez la nouvelle ligne au tableau des scores
        scoreTableBody.appendChild(newRow);

        // Réinitialisez les scores
        playerScore = 0;
        computerScore = 0;
      }
    });
  });
});
