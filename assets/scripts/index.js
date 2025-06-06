// TO-DO:
// add background to the score, if you won this round, green – lost – red, tie – yellow
// Extra thing to add:
// Logs (history) of your current game, battles (rounds) and each outcome;
// Logs of previous games, too
// Add Images so you can visually see what Computer and what you Played
// Add ARIA-labels
// Condense Rock, Paper and Scissors outcome
//
// Here's how Janken typically goes:
//
// "最初はグー" (Saisho wa gū!): "First is rock!" (Everyone makes a rock hand)
// "じゃんけんぽん!" (Janken pon!): This is the signal to throw your hand shape (rock, paper, or scissors).
// If it's a tie: "あいこでしょ!" (Aiko desho!): "It's a tie, isn't it?" (Everyone throws again immediately on "sho!")
// Repeat "あいこでしょ!" until there's a winner.
// So, to "restart" Janken, you just go back to "最初はグー!" and begin the round again.
//
// If you win (勝った！ - Katta!):
// The most common and enthusiastic thing to say when you win, especially in a casual game like Janken, is:
//
// 勝った！ (Katta!) - "I won!" / "Won!"
// This is the past tense of the verb 勝つ (katsu) meaning "to win." It's direct and expresses joy.
// You might also hear or say:
//
// やった！ (Yatta!) - "Yay!" / "Alright!" / "I did it!"
// This is a general exclamation of accomplishment and excitement, often used in conjunction with Katta!, like やった！勝った！ (Yatta! Katta!).
// 私の勝ち！ (Watashi no kachi!) - "My win!" / "It's my victory!"
// 私の (watashi no) means "my" and 勝ち (kachi) means "win" or "victory." This is a bit more formal but still perfectly natural.
// If you lose (負けた！ - Maketa!):
// The most common way to acknowledge a loss is:
//
// 負けた！ (Maketa!) - "I lost!" / "Lost!"
// This is the past tense of the verb 負ける (makeru) meaning "to lose."
// You might also say, depending on your feeling about the loss:
//
// 残念！ (Zannen!) - "Too bad!" / "What a shame!" / "Darn!"
// This expresses a feeling of disappointment or regret.
// くそっ！ (Kuso!) - "Damn it!" / "Crap!"
// This is a more informal and slightly stronger exclamation of frustration (use with caution depending on who you're playing with!).
// 悔しい！ (Kuyashii!) - "Frustrating!" / "Annoying!" (because of a loss)
// This expresses a feeling of vexation or chagrin at having lost.
//





let userScore = 0;
let computerScore = 0;
const elementUserScore = document.querySelector('#player-score');
const elementComputerScore = document.querySelector('#computer-score');
const choicesSection = document.querySelector('section#choices');
const gameBtnChoices = document.querySelectorAll('button.choice-button');
const scoresSection = document.querySelector('section#scores');
const roundOutcomeCssClasses = ['round-win', 'round-lose', 'round-tie'];
const JANKEN_MOVES_IMAGES_DIR = 'assets/media/img/moveImg/'
const JANKEN_REACTION_IMAGES_DIR = 'assets/media/img/reactionImg/'
const playerReactionImageBlock = document.querySelector('#player-reaction');
const playerMoveImageBlock = document.querySelector('#player-reaction-image');
const computerReactionImageBlock = document.querySelector('#computer-reaction');

const getScoreNumKanji = function getKanjiBasedOnNumberUpToFive(number) {
  switch (number) {
    case 0:
      return "零";
      break;
    case 1:
      return "壱";
      break;
    case 2:
      return "弐";
      break;
    case 3:
      return "参";
      break;
    case 4:
      return "肆";
      break;
    case 5:
      return "伍";
      break;
  }

  return number;
}



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
      return 'TIE';
    case 'PAPER':
      return 'LOSE';
    case 'SCISSORS':
      return 'WIN';
  }
}

const getPaperOutcome = function (computerChoice) {
  switch (computerChoice) {
    case 'ROCK':
      return 'WIN';
    case 'PAPER':
      return 'TIE';
    case 'SCISSORS':
      return 'LOSE';
  }
}

const getScissorsOutcome = function (computerChoice) {
  switch (computerChoice) {
    case 'ROCK':
      return 'LOSE';
    case 'PAPER':
      return 'WIN';
    case 'SCISSORS':
      return 'TIE';
  }
}

const renderScore = function incrementScoreUpdateUI(outcome) {
  scoresSection.classList.remove(...roundOutcomeCssClasses);

  switch (outcome) {
    case 'WIN':
      scoresSection.classList.add('round-win');
      userScore++;
      break;
    case 'LOSE':
      scoresSection.classList.add('round-lose');
      computerScore++;
      break;
    case 'TIE':
      scoresSection.classList.add('round-tie');
      break;
    default:
       throw new Error(`Unexpected outcome: ${outcome}`);
  }

  elementUserScore.textContent = getScoreNumKanji(userScore);
  elementComputerScore.textContent = getScoreNumKanji(computerScore);
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
  // make this object later {currentGame} or whatever where it is all automatically calculated.
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

const createDisplayGameOver = function createGameOverSectionWithGameResultAsClass(surrendered) {
  const won = userScore > computerScore;
  const tie = userScore === computerScore;
  const outcomeTexts = getGameOutcomeMessage(surrendered);
  const outcomeSection = document.createElement('section');
  outcomeSection.id = 'game-result';

  if (surrendered) {
    outcomeSection.classList.add('game-surrender');
  } else if (tie) {
      outcomeSection.classList.add('game-tie');
  } else if (won) {
      outcomeSection.classList.add('game-won');
  } else {
      outcomeSection.classList.add('game-lost');
  }

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
  const restartButton = document.createElement('button');
  restartButton.textContent = 'ニューゲーム';
  outcomeSection.appendChild(restartButton);
  choicesSection.classList.add('hidden');
  return restartButton;
}

const gameOver = function removeScoresColorDisplayGameOutcome(surrendered) {
  const restartButton = createDisplayGameOver(surrendered);
  const restartGame = function restartOnClick() { restart(choicesSection)};
  restartButton.addEventListener('click', restartGame);
  scoresSection.classList.remove(...roundOutcomeCssClasses);
}

const resetNodes = function showButtonsAgainAndResultGameResult(node) {
  node.classList.remove('hidden');
  const resultSection = document.querySelector('section#game-result');
  if (resultSection) resultSection.remove();
}

const resetScores = function setScoresToZeroAndUpdateUIScores() {
  userScore = 0;
  computerScore = 0;
  elementUserScore.textContent = getScoreNumKanji(0);
  elementComputerScore.textContent = getScoreNumKanji(0);
}

const restart = function resetVariablesRecreateNodeRestartGame(node) {
  resetScores();
  resetNodes(node);
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
