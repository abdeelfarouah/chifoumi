let wins = 0; let loses = 0;
var choices = ["papier", "caillou","ciseaux"];
var gameStatus = document.getElementById("gameStatus");
var gameScore = document.getElementById("gameScore");
const buttonPaper = document.getElementById("paper");
const buttonScissors = document.getElementById("scissors");
const buttonRock = document.getElementById("scissors");



function runGame(userChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  switch (userChoice + '_' + computerChoice){
    case 'papier_ciseaux':
    case 'caillou_papier':
    case 'ciseaux_caillou':
        loses += 1;
        gameStatus.innerHTML = `ME: ${userChoice} | COMPUTER: ${computerChoice} -> Computer wins`
        break;
    case 'papier_caillou':
    case 'caillou_ciseaux':
    case 'ciseaux_papier':
        wins += 1;
        gameStatus.innerHTML = `ME: ${userChoice} | COMPUTER: ${computerChoice} -> Me wins`
        break;
    case 'papier_papier':
    case 'caillou_caillou':
    case 'ciseaux_ciseaux':
        wins += 1;
        gameStatus.innerHTML = `ME: ${userChoice} | COMPUTER: ${computerChoice} -> Egalité`
        break;
  }
 
  const buttonRock = clickRock('rock');
  const buttonPaper = clickPaper('paper')
  const buttonScissors = runGame('rock')

buttonRock.addEventListener("click", clickRock("rock")) 
buttonPaper.addEventListener("click" ,clickPaper("paper"));
buttonScissors.addEventListener("click", clickScissors("scissors"));

  gameScore.innerHTML = `ME: ${wins} | COMPUTER: ${loses}`;
}





