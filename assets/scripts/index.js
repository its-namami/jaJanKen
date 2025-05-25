// TO-DO:
// add background to the score, if you won this round, green – lost – red, tie – yellow
// Extra thing to add:
// Logs (history) of your current game, battles (rounds) and each outcome;
// Logs of previous games, too
// Add Images so you can visually see what Computer and what you Played
// Add ARIA-labels
// Condense Rock, Paper and Scissors outcome
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

const renderScore = function incrementScoreUpdateUI(outcome) {
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
       throw new Error(`Unexpected outcome: ${outcome}`);
  }

  elementUserScore.textContent = userScore;
  elementComputerScore.textContent = computerScore;
}

const determineOutcome = function returnOutcomeOfTheRound(userChoice, computerChoice) {
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

  return outcome;
}

const round = function playersChoices(userChoice) {
  const randomThree = Math.floor(Math.random() * 3);
  const computerChoice = getStringComputerChoice(randomThree);
  const outcome = determineOutcome(userChoice, computerChoice);
  renderScore(outcome);
  console.log(`あなた: ${userChoice} | コンピューター: ${computerChoice} => ${outcome}`);
  return outcome;
};

const getGameOutcomeMessage = function getConditionalOutcomeMessage(surrendered) {
  const gitLink = '//github.com/its-namami/jajanken';
  const gitText = `ゲームを楽しんでいただけたら、私の<a href='${gitLink}' target='_blank' rel='noopener noreferrer'>GitHubリポジトリ</a>にスターを残していただけると嬉しいです！`;
  const won = userScore > computerScore;
  const tie = userScore === computerScore;
  let heading;
  let mainText;

  if (surrendered) {
    heading = '降参しました';
    mainText = '敵の強大な力の前に降参することを決意しました。';
  } else if (tie) {
    heading = "引き分けです";
    mainText = 'ゲームは引き分けに終わりました。よく頑張りました！';
  } else if (won) {
    heading = 'あなたの勝ちです';
    mainText = 'おめでとうございます！コンピューターに勝利しました。';
  } else {
    heading = 'あなたの負けです';
    mainText = '今回はコンピューターの勝ちです。次のラウンドはもっと頑張りましょう！';
  }

  return {
    heading,
    mainText,
    gitText
  };
}

const gameOutcomeDisplay = function addTextsAndCleanUpChoicesSection(surrendered) {
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
  outcomeGitText.innerHTML = outcomeTexts.gitText; // because there's a link inside with <a> tag
  outcomeSection.appendChild(outcomeGitText);
}

const gameOver = function hideChoicesSectionDisplayGameOverSection(surrendered) {
  gameOutcomeDisplay(surrendered);
  choicesSection.classList.add('hidden');
  //restart(choicesSection);
}

const resetScores = function setScoresToZeroAndUpdateUIScores() {
  userScore = 0;
  computerScore = 0;
  elementUserScore.textContent = 0;
  elementComputerScore.textContent = 0;
}

const restart = function resetVariablesRecreateNodeRestartGame(node) {
  resetScores();
  node.classList.remove('hidden');
  const resultSection = document.querySelector('section#game-result');

  if (resultSection) resultSection.remove();

  // TO-DO:
  // make restart a new custom event
}

const game = function playGameUntilOneReachesMaxScore(userChoice, maxScore) {
  if (userChoice === 'SURRENDER') return gameOver(true);

  round(userChoice);

  if (userScore >= maxScore || computerScore >= maxScore) gameOver(false);
}

gameBtnChoices.forEach(choiceButton => {
  choiceButton.addEventListener('click', () => {
    // Button ID name is directly interpreted as user input
    const thisBtnID = choiceButton.getAttribute('id');
    const uppercaseBtnID = thisBtnID.toUpperCase();
    game(uppercaseBtnID, 5);
  });
});
