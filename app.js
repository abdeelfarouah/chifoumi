const userscore = 0;
const computerscore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard = document.querySelector(".score-board");
const result = document.querySelector(".resultat");
const rock = document.getElementById("r");
const paper = document.getElementById("p");
const scissors = document.getElementById("s");

function getComputerChoice(){
  const choices = ['r', 'p', 's'];
  const randomNumber = Math.floor(Math.random()*3);
  return choices[randomNumber];
}

function game(userChoice){
  const computerChoice =getComputerChoice();
  console.log(computerChoice);

}

function main(){
rock.addEventListener('click', function(){
  game("r");
},
scissors.addEventListener('click', function(){
  game("r");
},
paper.addEventListener('click', function(){
 game("p");
})
}
main();
