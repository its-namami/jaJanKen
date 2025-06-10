// TO-DO:
// add background to the score, if you won this round, green – lost – red, tie – yellow
// Extra thing to add:
// Logs (history) of your current game, battles (rounds) and each outcome;
// Logs of previous games, too
// Add Images so you can visually see what opponent and what you Played
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
// TO-DO:
// Add Timer (5s max for move);
// Make Mobile-Compatible
// Find a better place for buttons (perhaps absolute?)
// Add Stats - counter of how many MATCHES were won and lost - and display - for each player!





let playerScore = 0;
let opponentScore = 0;
const elementUserScore = document.querySelector('#player-score');
const elementopponentScore = document.querySelector('#opponent-score');
const choicesSection = document.querySelector('section#choices');
const gameBtnChoices = document.querySelectorAll('button.choice-button');
const playersSection = document.querySelector('section#players');
const roundOutcomeCssClasses = ['round-win', 'round-lose', 'round-tie'];
const JANKEN_MOVES_IMAGES_DIR = 'assets/media/img/moveImg'
const JANKEN_REACTION_IMAGES_DIR = 'assets/media/img/reactionImg'
const playerReactionImage = document.querySelector('#player .reaction-image');
const playerMoveImage = document.querySelector('#player .move-image');
const opponentReactionImage = document.querySelector('#opponent .reaction-image');
const opponentMoveImage = document.querySelector('#opponent .move-image');
const gameLogs = {
  scores: [
    // my idea - logsObject.scores[0] ==> { playerScore: 3, opponentScore: 5 }
    // { 
      // playerScore: 3,
      // opponentScore: 5,
    // },
    // ...
  ],
  wins: {
    player: 0,
    opponent: 0,
  }
};

const updateLogs = function logCurrentScoreAndWinPlayerOrOpponent(outcome) { // will get its value from global constant
  gameLogs.scores.push({playerScore, opponentScore});

  switch (outcome) {
    case 'WIN':
      gameLogs.wins.player++;
      break;
    case 'LOSE':
      gameLogs.wins.opponent++;
      break;
  }

  console.dir(gameLogs);
}

const setDefaultImg = function setDefaultPlyaerAndOpponentReactionAndMoveImg() {
  playerMoveImage.removeAttribute('src');
  opponentMoveImage.removeAttribute('src');
  playerReactionImage.setAttribute('src', `${JANKEN_REACTION_IMAGES_DIR}/default.jpg`);
  opponentReactionImage.setAttribute('src', `${JANKEN_REACTION_IMAGES_DIR}/default.jpg`);
  // TO-DO: Reaction Img Default
}

const setReactionImg = function setPlayerAndOpponentReactionImgs(playerOutcome) {
  let opponentOutcome;
  playerOutcome = playerOutcome.toLowerCase();

  if (playerOutcome === 'win') {
    opponentOutcome = 'lose';
  } else if (playerOutcome === 'lose') {
    opponentOutcome = 'win';
  } else if (playerOutcome === 'tie') {
    opponentOutcome = 'tie'
  } else {
    throw new Error(`Unexpected Player Outcome: ${playerOutcome}`);
  }

  playerReactionImage.setAttribute('src', `${JANKEN_REACTION_IMAGES_DIR}/${playerOutcome}.jpg`);
  opponentReactionImage.setAttribute('src', `${JANKEN_REACTION_IMAGES_DIR}/${opponentOutcome}.jpg`);
}

const setMoveImg = function setPlayerAndOpponentMoveImgs(movePlayer, moveOpponent) {
  movePlayer = movePlayer.toLowerCase();
  moveOpponent = moveOpponent.toLowerCase();
  playerMoveImage.setAttribute('src', `${JANKEN_MOVES_IMAGES_DIR}/${movePlayer}.jpg`);
  opponentMoveImage.setAttribute('src', `${JANKEN_MOVES_IMAGES_DIR}/${moveOpponent}.jpg`);
}

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



const getStringOpponentChoice = function getPredeterminedChoiceStringBasedOnRandomThree(opponentChoice) {
  let stringopponentChoice;

  switch (opponentChoice) {
    case 0:
      stringopponentChoice = 'ROCK';
      break;
    case 1:
      stringopponentChoice = 'PAPER';
      break;
    case 2:
      stringopponentChoice = 'SCISSORS';
      break;
    default:
      throw new Error(`Unexpected opponent choice value: ${opponentChoice}`);
  }

  return stringopponentChoice;
}

const getRockOutcome = function (opponentChoice) {
  switch (opponentChoice) {
    case 'ROCK':
      return 'TIE';
    case 'PAPER':
      return 'LOSE';
    case 'SCISSORS':
      return 'WIN';
  }
}

const getPaperOutcome = function (opponentChoice) {
  switch (opponentChoice) {
    case 'ROCK':
      return 'WIN';
    case 'PAPER':
      return 'TIE';
    case 'SCISSORS':
      return 'LOSE';
  }
}

const getScissorsOutcome = function (opponentChoice) {
  switch (opponentChoice) {
    case 'ROCK':
      return 'LOSE';
    case 'PAPER':
      return 'WIN';
    case 'SCISSORS':
      return 'TIE';
  }
}

const renderScore = function incrementScoreUpdateUI(outcome) {
  playersSection.classList.remove(...roundOutcomeCssClasses);

  switch (outcome) {
    case 'WIN':
      playersSection.classList.add('round-win');
      playerScore++;
      break;
    case 'LOSE':
      playersSection.classList.add('round-lose');
      opponentScore++;
      break;
    case 'TIE':
      playersSection.classList.add('round-tie');
      break;
    default:
       throw new Error(`Unexpected outcome: ${outcome}`);
  }

  elementUserScore.textContent = getScoreNumKanji(playerScore);
  elementopponentScore.textContent = getScoreNumKanji(opponentScore);
}

const determineOutcome = function returnOutcomeOfTheRound(userChoice, opponentChoice) {
  let outcome;

  switch (userChoice) {
    case 'ROCK':
      outcome = getRockOutcome(opponentChoice);
      break;
    case 'PAPER':
      outcome = getPaperOutcome(opponentChoice)
      break;
    case 'SCISSORS':
      outcome = getScissorsOutcome(opponentChoice);
      break;
    default:
       throw new Error(`Unexpected user choice: ${userChoice}`)  ;
  }

  return outcome;
}

const round = function playersChoices(userChoice) {
  const randomThree = Math.floor(Math.random() * 3);
  const opponentChoice = getStringOpponentChoice(randomThree);
  const outcome = determineOutcome(userChoice, opponentChoice);
  renderScore(outcome);
  setMoveImg(userChoice, opponentChoice);
  setReactionImg(outcome);
  console.log(`あなた: ${userChoice} | 相手: ${opponentChoice} => ${outcome}`);
  return outcome;
};

const getGameOutcomeMessage = function getConditionalOutcomeMessage(surrendered) {
  const gitLink = '//github.com/its-namami/jajanken';
  const gitText = `ゲームを楽しんでいただけたら、私の<a href='${gitLink}' target='_blank' rel='noopener noreferrer'>GitHubリポジトリ</a>にスターを残していただけると嬉しいです！`;
  // make this object later {currentGame} or whatever where it is all automatically calculated.
  const won = playerScore > opponentScore;
  const tie = playerScore === opponentScore;
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
  const won = playerScore > opponentScore;
  const tie = playerScore === opponentScore;
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

const gameOver = function removeScoresColorDisplayGameOutcome(surrendered, outcome) {
  updateLogs(outcome);
  const restartButton = createDisplayGameOver(surrendered);
  const restartGame = function restartOnClick() { restart(choicesSection)};
  restartButton.addEventListener('click', restartGame);
  playersSection.classList.remove(...roundOutcomeCssClasses);
}

const resetNodes = function showButtonsAgainAndResultGameResult(node) {
  node.classList.remove('hidden');
  const resultSection = document.querySelector('section#game-result');
  setDefaultImg();
  if (resultSection) resultSection.remove();
}

const resetScores = function setScoresToZeroAndUpdateUIScores() {
  playerScore = 0;
  opponentScore = 0;
  elementUserScore.textContent = getScoreNumKanji(0);
  elementopponentScore.textContent = getScoreNumKanji(0);
}

const restart = function resetVariablesRecreateNodeRestartGame(node) {
  resetScores();
  resetNodes(node);
  // TO-DO:
  // make restart a new custom event
}

const game = function playGameUntilOneReachesMaxScore(userChoice, maxScore) {
  if (userChoice === 'SURRENDER') return gameOver(true);

  const roundOutcome = round(userChoice);

  if (playerScore >= maxScore || opponentScore >= maxScore) gameOver(false, roundOutcome);
}

setDefaultImg();

gameBtnChoices.forEach(choiceButton => {
  choiceButton.addEventListener('click', () => {
    // Button ID name is directly interpreted as user input
    const thisBtnID = choiceButton.getAttribute('id');
    const uppercaseBtnID = thisBtnID.toUpperCase();
    game(uppercaseBtnID, 5);
  });
});
