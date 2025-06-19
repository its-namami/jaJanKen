"use strict";
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
// Navigation, with menu-list, on the left home page, right next to it choose mode, on the right choose language and my icon (on github).
// Footer, with my copyright and github profile
// Add Timer (5s max for move);
// Make Mobile-Compatible
// Find a better place for buttons (perhaps absolute?)
// Add Stats - counter of how many MATCHES were won and lost - and display - for each player!
// NEW IDEA GAME MODE:
// Make it that who answers the fastest, even if they chose the losing move,
// that they have a chance to win the round depending on how much faster than the opponent





let playerScore = 0;
let opponentScore = 0;
const elementPlayerScore = document.querySelector('#player-score');
const elementopponentScore = document.querySelector('#opponent-score');
const choicesSection = document.querySelector('section#choices');
const gameBtnChoices = document.querySelectorAll('button.choice-button');
const playersSection = document.querySelector('section#players');
const roundOutcomeCssClasses = ['round-win', 'round-lose', 'round-tie'];
const playerReactionIcon = document.querySelector('#player-reaction-icon');
const opponentReactionIcon = document.querySelector('#opponent-reaction-icon');
const playerMoveIcon = document.querySelector('#player-move-icon');
const opponentMoveIcon = document.querySelector('#opponent-move-icon');

const moveIconStatusClasses = [
  'icon-rock',
  'icon-paper',
  'icon-scissors',
];

const reactionIconStatusClasses = [
  'icon-win',
  'icon-tie',
  'icon-lose'
];

const winReactionEmojis = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
];

const tieReactionEmojis = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
]

const loseReactionEmojis = [
  '',
  '',
  '',
  '',
  '',
  '',
]



const gameStats = {
  scores: [],
  wins: {
    player: 0,
    opponent: 0,
  }
};

const updateStats = function statsCurrentScoreAndWinPlayerOrOpponent(outcome, surrendered = false) { // will get its value from global constant
  gameStats.scores.push({playerScore, opponentScore});

  if (surrendered) return;

  switch (outcome) {
    case 'WIN':
      gameStats.wins.player++;
      break;
    case 'LOSE':
      gameStats.wins.opponent++;
      break;
    case 'TIE':
      break;
    default:
      throw new Error(`Unexpected Round Outcome: ${outcome}`);
  }
}

const removeClasses = function removeMultipleClassesFromElement([...classes], element) {
  classes.forEach(cls => {
    element.classList.remove(cls);
  });
}

const resetIconsClasses = () => {
  removeClasses(reactionIconStatusClasses, playerReactionIcon);
  removeClasses(reactionIconStatusClasses, opponentReactionIcon);
  removeClasses(moveIconStatusClasses, playerMoveIcon);
  removeClasses(moveIconStatusClasses, opponentMoveIcon);
}

const setEmojisClasses = function setPlayersEmojiClassesBasedOnOutcome(outcome) {

  if (outcome === 'WIN') {
    playerReactionIcon.classList.add('icon-win');
    opponentReactionIcon.classList.add('icon-lose');
  } else if (outcome === 'TIE') {
    playerReactionIcon.classList.add('icon-tie');
    opponentReactionIcon.classList.add('icon-tie');
  } else if (outcome === 'LOSE') {
    playerReactionIcon.classList.add('icon-lose');
    opponentReactionIcon.classList.add('icon-win');
  }
}

const setRandomEmoji = function setRandomEmojiAsTextContent(element, [...emojiArray]) {
  element.textContent = emojiArray[Math.floor(Math.random() * emojiArray.length)];
}

const updateReactionIcons = function setRectionEmojiAndUpdateClass(playerOutcome) {
  if (playerOutcome === 'WIN') {
    setRandomEmoji(playerReactionIcon.querySelector('span'), winReactionEmojis);
    setRandomEmoji(opponentReactionIcon.querySelector('span'), loseReactionEmojis);
  } else if (playerOutcome === 'TIE') {
    setRandomEmoji(playerReactionIcon.querySelector('span'), tieReactionEmojis);
    setRandomEmoji(opponentReactionIcon.querySelector('span'), tieReactionEmojis);
  } else if (playerOutcome === 'LOSE') {
    setRandomEmoji(playerReactionIcon.querySelector('span'), loseReactionEmojis);
    setRandomEmoji(opponentReactionIcon.querySelector('span'), winReactionEmojis);
  } else {
    throw new Error(`Unexpected Player Outcome: ${playerOutcome}`);
  }

  setEmojisClasses(playerOutcome);
}

const setMoveIconClass = function resetPreviousClassesAndSetNewClass(move, playerElement) {
  if (move === 'ROCK') return playerElement.classList.add('icon-rock');
  if (move === 'SCISSORS') return playerElement.classList.add('icon-scissors');
  if (move === 'PAPER') return playerElement.classList.add('icon-paper');
}

const getMoveIcon = function getMoveIconBasedOnMove(move, icon) {
  if (move === 'ROCK') return '';
  if (move === 'SCISSORS') return '';
  if (move === 'PAPER') return '';
}

const updateMoveIcons = function updateMoveIconsAndTheirClasses(playerMove, opponentMove) {
  playerMoveIcon.querySelector('span').textContent = getMoveIcon(playerMove);
  opponentMoveIcon.querySelector('span').textContent = getMoveIcon(opponentMove);
  setMoveIconClass(playerMove, playerMoveIcon);
  setMoveIconClass(opponentMove, opponentMoveIcon);
}

const updateEmojis = function updateReactionAndMoveIcons (playerOutcome, playerChoice, opponentChoice) {
  resetIconsClasses();
  updateReactionIcons(playerOutcome);
  updateMoveIcons(playerChoice, opponentChoice);
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

const rock = function getRockOutcome(opponentChoice) {
  switch (opponentChoice) {
    case 'ROCK':
      return 'TIE';
    case 'PAPER':
      return 'LOSE';
    case 'SCISSORS':
      return 'WIN';
  }
}

const paper = function getPaperOutcome(opponentChoice) {
  switch (opponentChoice) {
    case 'ROCK':
      return 'WIN';
    case 'PAPER':
      return 'TIE';
    case 'SCISSORS':
      return 'LOSE';
  }
}

const scissors = function getScissorsOutcome(opponentChoice) {
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

  elementPlayerScore.textContent = getScoreNumKanji(playerScore);
  elementopponentScore.textContent = getScoreNumKanji(opponentScore);
}

const determineOutcome = function returnOutcomeOfTheRound(playerChoice, opponentChoice) {
  let outcome;

  switch (playerChoice) {
    case 'ROCK':
      outcome = rock(opponentChoice);
      break;
    case 'PAPER':
      outcome = paper(opponentChoice)
      break;
    case 'SCISSORS':
      outcome = scissors(opponentChoice);
      break;
    default:
       throw new Error(`Unexpected player choice: ${playerChoice}`)  ;
  }

  return outcome;
}

const round = function playersChoices(playerChoice) {
  const randomThree = Math.floor(Math.random() * 3);
  const opponentChoice = getStringOpponentChoice(randomThree);
  const outcome = determineOutcome(playerChoice, opponentChoice);
  renderScore(outcome);
  updateEmojis(outcome, playerChoice, opponentChoice);
  console.log(`あなた: ${playerChoice} | 相手: ${opponentChoice} => ${outcome}`);
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
    mainText = 'おめでとうございます！相手に勝利しました。';
  } else {
    heading = 'あなたの負けです';
    mainText = '今回は相手の勝ちです。次のラウンドはもっと頑張りましょう！';
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
  outcomeHeading.classList.add('gothic-font');
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
  updateStats(outcome, surrendered);
  const restartButton = createDisplayGameOver(surrendered);
  const restartGame = function restartOnClick() { restart(choicesSection)};
  restartButton.addEventListener('click', restartGame);
  playersSection.classList.remove(...roundOutcomeCssClasses);
}

const resetPlayersIcons = function resetReactionAndMoveIcons() {
  playerMoveIcon.textContent = '';
  playerMoveIcon.classList.remove('move-icon');
  opponentMoveIcon.textContent = '';
  opponentMoveIcon.classList.remove('move-icon');
  playerReactionIcon.textContent = '';
  playerReactionIcon.classList.remove('reaction-icon');
  opponentReactionIcon.textContent = '';
  opponentReactionIcon.classList.remove('reaction-icon');
  
}

const resetNodes = function showButtonsAgainAndResultGameResult(node) {
  node.classList.remove('hidden');
  const resultSection = document.querySelector('section#game-result');
  if (resultSection) resultSection.remove();
  resetPlayersIcons()
}

const resetScores = function setScoresToZeroAndUpdateUIScores() {
  playerScore = 0;
  opponentScore = 0;
  elementPlayerScore.textContent = getScoreNumKanji(0);
  elementopponentScore.textContent = getScoreNumKanji(0);
}

const restart = function resetVariablesRecreateNodeRestartGame(node) {
  resetScores();
  resetNodes(node);
  // TO-DO:
  // make restart a new custom event
}

const game = function playGameUntilOneReachesMaxScore(playerChoice, maxScore) {
  if (playerChoice === 'SURRENDER') return gameOver(true);

  const roundOutcome = round(playerChoice);

  if (playerScore >= maxScore || opponentScore >= maxScore) gameOver(false, roundOutcome);
}

const addPlayerIconsClasses = function addReactionClassForPlayerAndOpponent() {
  playerReactionIcon.classList.add('reaction-icon');
  opponentReactionIcon.classList.add('reaction-icon');
  playerMoveIcon.classList.add('move-icon');
  opponentMoveIcon.classList.add('move-icon');
}

const addSpan = function addSpanIfDoesntExist(element) {
  if (!element.querySelector('span')) element.appendChild(document.createElement('span'));
}

const addPlayerIconSpans = function addSpansToPlayersReactionAndMoveIconElement() {
  addSpan(playerReactionIcon);
  addSpan(opponentReactionIcon);
  addSpan(playerMoveIcon);
  addSpan(opponentMoveIcon);
}

gameBtnChoices.forEach(choiceButton => {
  choiceButton.addEventListener('click', () => {
    // Button ID name is directly interpreted as player input
    // since it's not up to the player anyway
    const thisBtnID = choiceButton.getAttribute('id');
    const uppercaseBtnID = thisBtnID.toUpperCase();
    addPlayerIconsClasses();
    addPlayerIconSpans();
    game(uppercaseBtnID, 5);
  });
});
