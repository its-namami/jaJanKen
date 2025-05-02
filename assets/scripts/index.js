let round;
let userScore;
let computerScore;

function getStringComputerChoice(computerChoice){
  let stringComputerChoice;
  switch (computerChoice) {
    case 0:
      stringComputerChoice = "Rock";
      break;
    case 1:
      stringComputerChoice = "Paper";
      break;
    case 2:
      stringComputerChoice = "Scissors";
      break;
    default:
      console.error(new Error("You should not be seeing this; it went beyond the scope"));
      throw new Error("Program died: critical error");
  }
  return stringComputerChoice;
}

function restart(customString){
  const userRestart = confirm(`${customString} Would you like to restart the game?`);
  switch (userRestart){
    case true:
      game();
      break;
    case false:
      round=999;
      break;
  }
}

function noInput() {
  round--;
  console.warn("User provided no input");
  alert("You have provided no input.");
}

function defaultError() {
  round--;
  console.error(new Error("Something went wrong"));
  alert('Something went wrong');
}

function alertPlayer(userChoice, computerChoice, outcome){
  switch(outcome.toUpperCase()){
    case "TIE":
      break;
    case "WIN":
      userScore++;
      break;
    case "LOSE":
      computerScore++;
      break;
    default:
      defaultError();
      break;
  }
  alert(`Round ${round}) User: ${userChoice}, Computer: ${computerChoice}, Outcome: ${outcome}`);
}

function wrongInput(input) {
  round--;
  console.warn("User Choice is not valid");
  alert(`${input} is not a valid input`);
}

function getRockOutcome(computerChoice) {
  switch(computerChoice){
    case 'ROCK':
      return 'Tie';
    case 'PAPER':
      return 'Lose';
    case 'SCISSORS':
      return 'Win';
  }
}

function getPaperOutcome(computerChoice) {
  switch(computerChoice){
    case 'ROCK':
      return 'Win';
    case 'PAPER':
      return 'Tie';
    case 'SCISSORS':
      return 'Lose';
  }
}

function getScissorsOutcome(computerChoice) {
  switch(computerChoice){
    case 'ROCK':
      return 'Lose';
    case 'PAPER':
      return 'Win';
    case 'SCISSORS':
      return 'Tie';
  }
}

function getGameResult(userChoice, computerChoice){
  userChoice=userChoice.toUpperCase();
  computerChoice=computerChoice.toUpperCase();
  let outcome;
  switch(userChoice){
    case 'ROCK':
      outcome = getRockOutcome(computerChoice);
      break;
    case 'PAPER':
      outcome = getPaperOutcome(computerChoice)
      break;
    case 'SCISSORS':
      outcome = getScissorsOutcome(computerChoice);
      break;
    default:
      wrongInput(userChoice);
      return;
  }
  alertPlayer(userChoice, computerChoice, outcome); 
}

function newChoices() {
  round++;
  const getUserChoice = prompt("Rock, Paper or Scissors?: ");
  const getComputerChoice = Math.floor(Math.random()*3);
  const stringComputerChoice = getStringComputerChoice(getComputerChoice);
  console.log(getUserChoice);
  if(getUserChoice==='')
    noInput();
  else if (getUserChoice==null)
      round = 999;
  else
    getGameResult(getUserChoice, stringComputerChoice);
};

function alertCongrats(){
  if(userScore>computerScore)
    restart(`Congratulations, you won with the score of ${userScore}-${computerScore}.`);
  if(userScore<computerScore)
    restart(`You lost with the score of ${userScore}-${computerScore}.`);
  if(userScore==computerScore)
    restart(`Good job, it's a tie with the score of ${userScore}-${computerScore}.`);
}

function game(){
  round=0;
  userScore=0;
  computerScore=0;
  while(round<5){
    newChoices();
  }
  if(round!==999)
    alertCongrats();
}

game();
