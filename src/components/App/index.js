import './styles.css';
import './App/index.js';
import { src } from '../../../config/paths';


let wins = 0; let loses = 0;
var choices = ["papier", "caillou","ciseaux"];
var gameStatus = document.getElementById("gameStatus");
var gameScore = document.getElementById("gameScore");
const Paper = document.getElementById("paper");
const buttonScissors = document.getElementById("scissors");
const buttonRock = document.getElementById("rock");

 

buttonPaper.addEventListener('click', event => {
  console.log(clickPaper.target.value)
})
buttonScissors.addEventListener('click', event => {
  console.log(clickScissors.target.value)
})
document.addEventListener('click', event => {
  console.log(clickRock.target.value)
})

 
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
  }bot.runGame();
 


  clickRock.getElementByTag('button').addEventListener('click',clickRock);
 clickPaper.getElementByTag('button').addEventListener('click',clickPaper);
clickScissors.addEventListener("click", clickScissors("scissors"));

const Rock = runGame('rock');
  const buttonPaper = runGame('paper');
  const buttonScissors = runGame('rock');
  gameScore.innerHTML = `ME: ${wins} | COMPUTER: ${loses}`;
}
export default src;




