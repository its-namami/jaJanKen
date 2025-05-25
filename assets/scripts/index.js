// TO-DO: Capture dynamically all action buttons, add HTML of button to press, and if pressing
// that button, then choose that thing, as if you were to click it.
// Obviously create clicking event too, and first and foremost.
// Change the rounds to unlimited until score of someone is 5 – that's when it ends.
//
// What is needed:
// add background to the score, if you won this round, green – lost – red, tie – yellow
//
// Extra thing to add:
// Logs (history) of your current game, battles (rounds) and each outcome;
// Logs of previous games, too

let userScore = 0;
let computerScore = 0;
const elementUserScore = document.querySelector('#player-score');
const elementComputerScore = document.querySelector('#computer-score');
const choicesSection = document.querySelector('section#choices');
const gameBtnChoices = document.querySelectorAll('button.choice-button');

const getStringComputerChoice = function getPredeterminedChoiceStringBasedOnRandomThree(computerChoice) {
  let stringComputerChoice;

  switch (computerChoice) {
    case 0:
      stringComputerChoice = 'ROCK';
      break;
    case 1:
      stringComputerChoice = 'PAPER';
      break;
    case 2:
      stringComputerChoice = 'SCISSORS';
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
  elementUserScore.textContent = userScore;
  elementComputerScore.textContent = computerScore;
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

const getOutcome = function getOutcomeUserVsComputer (userChoice, computerChoice) {
  userChoice = userChoice.toUpperCase();
  computerChoice = computerChoice.toUpperCase();

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

const round = function playersChoices(userChoice) {
  const randomThree = Math.floor(Math.random() * 3);
  const computerChoice = getStringComputerChoice(randomThree);
  getOutcome(userChoice, computerChoice);
};

const removeNodes = function removeNodesAndReturnThem (selectedNodes, isIterable = true) {
  let btnsCopy;
  if (isIterable) {
    btnsCopy = [...selectedNodes];
    selectedNodes.forEach(node => node.remove());
  } else {
    btnsCopy = selectedNodes.cloneNode(true);
    selectedNodes.remove();
  }
  return btnsCopy;
}

const getGameOutcomeMessage = function getConditionalOutcomeMessage(surrendered) {
  const gitLink = '//github.com/its-namami/jajanken';
  const gitText = `ゲームを楽しんでいただけたら、私の<a href='${gitLink}' target='_blank' rel='noopener noreferrer'>GitHubリポジトリ</a>にスターを残していただけると嬉しいです！`;
  let won;
  let tie;
  let heading;
  let mainText;

  if (userScore > computerScore) {
    won = true;
  } else {
    won = false;
  }

  if (userScore == computerScore) {
    tie = true;
  } else {
    tie = false;
  }

  if (surrendered) {
    heading = '降参しました';
    mainText = '敵の強大な力の前に降参することを決意しました。';
  } else if (tie) {
    heading = "引き分けです";
    mainText = 'ゲームは引き分けに終わりました。よく頑張りました！';
  } else if (won) {
    heading = 'あなたの勝ちです';
    mainText = 'おめでとうございます！コンピューターに勝利しました。';
  } else if (!won) {
    heading = 'あなたの負けです';
    mainText = '今回はコンピューターの勝ちです。次のラウンドはもっと頑張りましょう！';
  }

  return {
    heading,
    mainText,
    gitText
  }
}

const showResult = function showGameResult(surrendered, removeNode) {
  const outcomeTexts = getGameOutcomeMessage(surrendered);
  const outcomeSection = document.createElement('section');
  outcomeSection.id = 'game-result';
  choicesSection.parentElement.insertBefore(outcomeSection, choicesSection);
  const outcomeHeading = document.createElement('h3');
  outcomeHeading.textContent = outcomeTexts.heading;
  outcomeSection.appendChild(outcomeHeading);
  const outcomeMainText = document.createElement('p');
  outcomeMainText.textContent = outcomeTexts.mainText;
  outcomeSection.appendChild(outcomeMainText);
  const outcomeGitText = document.createElement('p');
  outcomeGitText.innerHTML = outcomeTexts.gitText; // there's a link inside
  outcomeSection.appendChild(outcomeGitText);
  const removedChoiceBtns = removeNodes(choicesSection, false);

  // TO-DO:
  // show game over screen, maybe in form of a <dialog>
  // if willingly surrendered, then a bit different one
  // CTA: restart
}

const gameOver = function removeBtnsDisplayFinalScoreDialog(surrendered = false) {
  showResult(surrendered, gameBtnChoices);
}

const surrender = function usrSurrender() {
  gameOver(true);
  // TO-DO:
  // Display (likewise the game over) in a (<dialog>?)
  // an encouraging and possibly sympathetic
  // And then simply continue with the normal restart button
}

const restart = function resetVariablesRestartGame (removedNode) {
  // TO-DO
}

const game = function playGameMaxScoreX(userChoice, maxScore = 5) {
  if (userChoice === 'surrender') return surrender(); // TO-DO: surrender function with new game screen;

  round(userChoice);

  if (userScore >= maxScore || computerScore >= maxScore) gameOver();
}

gameBtnChoices.forEach(choiceButton => {
  choiceButton.addEventListener('click', () => {
    // Button ID name is logical and will be directly interpreted as user input
    let thisBtnID = choiceButton.getAttribute('id');
    game(thisBtnID);
  });
});

