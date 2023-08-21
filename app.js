document.addEventListener("DOMContentLoaded", () => {
  const playerNameInput = document.getElementById("playerName");
  const startButton = document.getElementById("startButton");
  const resultElement = document.getElementById("result");
  const nameErrorMessage = document.getElementById("nameErrorMessage");
  const scoreTableBody = document.getElementById("scoreBody");

  const choices = ["rock", "paper", "scissors"];
  const choiceImages = {
    rock: document.getElementById("rock"),
    paper: document.getElementById("paper"),
    scissors: document.getElementById("scissors"),
  };

  let players = [];

  playerNameInput.addEventListener("input", () => {
    const playerName = playerNameInput.value.trim();
    if (playerName === "") {
      startButton.disabled = true;
      nameErrorMessage.style.display = "block";
    } else {
      startButton.disabled = false;
      nameErrorMessage.style.display = "none";
    }
  });

  startButton.addEventListener("click", () => {
    const playerName = playerNameInput.value.trim();
    if (playerName === "") {
      resultElement.textContent = "Please enter a valid name.";
      return;
    }

    resultElement.textContent = "Choose your weapon:";
    const currentPlayer = players.find((player) => player.name === playerName);
    if (!currentPlayer) {
      const newPlayer = {
        name: playerName,
        playerScore: 0,
        computerScore: 0,
      };
      players.push(newPlayer);
      addNewPlayerRow(newPlayer);
    }
    enableChoiceButtons();
  });

  function playRound(playerSelection, computerSelection, currentPlayer) {
    if (!currentPlayer) {
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
      currentPlayer.playerScore++;
      return "You win!";
    } else {
      currentPlayer.computerScore++;
      return "Computer wins!";
    }
  }

  choices.forEach((choice) => {
    choiceImages[choice].addEventListener("click", () => {
      const playerName = playerNameInput.value.trim();
      const currentPlayer = players.find((player) => player.name === playerName);

      if (!currentPlayer) {
        resultElement.textContent = "Please enter a valid name before playing.";
        return;
      }

      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const result = playRound(choice, computerChoice, currentPlayer);
      resultElement.textContent = `${result} ${
        currentPlayer.name
      } chose ${choice} and the computer chose ${computerChoice}.`;

      updateScores();
      if (
        currentPlayer.playerScore === 10 ||
        currentPlayer.computerScore === 10
      ) {
        if (currentPlayer.playerScore === 10) {
          alert(`Congratulations ${currentPlayer.name}! You win the game!`);
        } else {
          alert(`Oops ${currentPlayer.name}! You lose the game.`);
        }
      }
    });
  });

  function enableChoiceButtons() {
    choices.forEach((choice) => {
      choiceImages[choice].style.pointerEvents = "auto";
    });
  }

  function addNewPlayerRow(player) {
    const newRow = scoreTableBody.insertRow();
    const nameCell = newRow.insertCell(0);
    const playerScoreCell = newRow.insertCell(1);
    const computerScoreCell = newRow.insertCell(2);

    nameCell.textContent = player.name;
    playerScoreCell.textContent = player.playerScore;
    computerScoreCell.textContent = player.computerScore;
  }

  function updateScores() {
    players.forEach((player) => {
      const playerRow = [...scoreTableBody.rows].find(
        (row) => row.cells[0].textContent === player.name
      );

      if (playerRow) {
        playerRow.cells[1].textContent = player.playerScore;
        playerRow.cells[2].textContent = player.computerScore;
      }
    });
  }
});
