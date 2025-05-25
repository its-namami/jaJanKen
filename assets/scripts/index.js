// TO-DO: Capture dynamically all action buttons, add HTML of button to press, and if pressing
// that button, then choose that thing, as if you were to click it.
// Obviously create clicking event too, and first and foremost.
// Change the rounds to unlimited until score of someone is 5 – that's when it ends.
//
// What is needed:
// add background to the score, if you won this round, green – lost – red, tie – yellow

let userScore = 0;
let computerScore = 0;
const elementUserScore = document.querySelector('#player-score');
const elementComputerScore = document.querySelector('#computer-score');

const getStringComputerChoice = function getPredeterminedChoiceStringBasedOnRandomThree(computerChoice) {
  let stringComputerChoice;

  switch (computerChoice) {
    case 0:
      stringComputerChoice = "ROCK";
      break;
    case 1:
      stringComputerChoice = "PAPER";
      break;
    case 2:
      stringComputerChoice = "SCISSORS";
      break;
    default:
      throw new Error(`Unexpected computer choice value: ${computerChoice}`);
  }

  return stringComputerChoice;
}

const getRockOutcome = function (computerChoice) {
  switch (computerChoice) {
    case 'ROCK':
      return 'Tie';
    case 'PAPER':
      return 'Lose';
    case 'SCISSORS':
      return 'Win';
  }
}

const getPaperOutcome = function (computerChoice) {
  switch (computerChoice) {
    case 'ROCK':
      return 'Win';
    case 'PAPER':
      return 'Tie';
    case 'SCISSORS':
      return 'Lose';
  }
}

const getScissorsOutcome = function (computerChoice) {
  switch (computerChoice) {
    case 'ROCK':
      return 'Lose';
    case 'PAPER':
      return 'Win';
    case 'SCISSORS':
      return 'Tie';
  }
}

const updateUIScore = function () {
  elementUserScore.innerText = userScore;
  elementComputerScore.innerText = computerScore;
}

const updateScore = function updateScoreVariablesAndUI (outcome) {
  switch (outcome) {
    case 'Win':
      userScore++;
      break;
    case 'Lose':
      computerScore++;
      break;
    case 'Tie':
      break;
    default:
       throw new Error(`Unexpected outcome: ${outcome}`)  ;
  }

  updateUIScore();
}

const getOutcome = function getOutcomeAndUpdateScore (userChoice, computerChoice) {
  let outcome;

  switch (userChoice) {
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
       throw new Error(`Unexpected user choice: ${userChoice}`)  ;
  }

  updateScore(outcome);
}

const getRoundResult = function (userChoice, computerChoice) {
  userChoice = userChoice.toUpperCase();
  computerChoice = computerChoice.toUpperCase();
  let outcome = getOutcome(userChoice, computerChoice);
}

const round = function playersChoices(userChoice) {
  const randomThree = Math.floor(Math.random() * 3);
  const computerChoice = getStringComputerChoice(randomThree);
  getRoundResult(userChoice, computerChoice);
};

const showResult = function showGameResult(surrendered) {
  // TO-DO:
  // show game over screen, maybe in form of a <dialog>
  // if willingly surrendered, then a bit different one
  // CTA: restart
}

const gameOver = function removeBtnsDisplayFinalScoreDialog(surrendered = false) {
  removeChoiceBtns();
  showResult(surrendered);
}

const surrender = function usrSurrender() {
  gameOver(true);
  // TO-DO:
  // Display (likewise the game over) in a (<dialog>?)
  // an encouraging and possibly sympathetic
  // And then simply continue with the normal restart button
}

const restart = function resetVariablesRestartGame () {
  // TO-DO
}

const game = function playGameMaxScoreX(userChoice, maxScore = 5) {
  if (userChoice === 'surrender') return surrender(); // TO-DO: surrender function with new game screen;

  round(userChoice);

  if (userScore >= maxScore || computerScore >= maxScore) gameOver();
}

const gameBtnChoices = document.querySelectorAll('button.choice-button');

gameBtnChoices.forEach(choiceButton => {
  choiceButton.addEventListener('click', event => {
    // Button ID name is logical and will be directly interpreted as user input
    let thisBtnID = event.target.attributes.id.nodeValue;
    game(thisBtnID);
  });
});

