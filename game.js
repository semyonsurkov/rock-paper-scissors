const CHOICES = ['rock', 'paper', 'scissors'];
let userScore = 0;
let computerScore = 0;
let userChoice = '';
let computerChoice = '';
const MESSAGES = {
  tie: 'The game is a tie!',
  computerWin: 'The computer won!',
  userWin: 'You won!',
  start: "Let's start the game!",
};
const initialMessage = MESSAGES.start;

const bgMusic = document.getElementById('bg-music');
const muteBtn = document.querySelector('.mute-btn');
const userWinSound = new Audio('./sound/win-sound.mp3');
const computerWinSound = new Audio('./sound/lose-sound.mp3');

muteBtn.addEventListener('click', () => {
  const audios = document.querySelectorAll('audio');
  audios.forEach((audio) => {
    if (!audio.muted) {
      audio.muted = true;
      audio.classList.add('muted');
    } else {
      audio.muted = false;
      audio.classList.remove('muted');
    }
  });
  bgMusic.currentTime = 0;
  muteBtn.classList.toggle('muted');
  muteBtn.textContent = audios[0].muted ? 'Unmute' : 'Mute';
});

const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomNumber];
};

const getUserChoice = (choice) => {
  if (CHOICES.includes(choice)) {
    return choice.toLowerCase();
  }
};

const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return MESSAGES.tie;
  }
  if (
    (userChoice === 'rock' && computerChoice === 'paper') ||
    (userChoice === 'paper' && computerChoice === 'scissors') ||
    (userChoice === 'scissors' && computerChoice === 'rock')
  ) {
    computerScore += 1;
    return MESSAGES.computerWin;
  }
  userScore += 1;
  return MESSAGES.userWin;
};

const updateScore = () => {
  const userScoreElement = document.querySelector('.user__score');
  const computerScoreElement = document.querySelector('.computer__score');
  userScoreElement.textContent = `Your Score: ${userScore}`;
  computerScoreElement.textContent = `Computer Score: ${computerScore}`;

  if (userScore >= 5) {
    endGame(MESSAGES.userWin);
    bgMusic.pause();
    if (!userWinSound.muted && !computerWinSound.muted) {
      if (!muteBtn.classList.contains('muted')) {
        userWinSound.play();
      }
    }
  } else if (computerScore >= 5) {
    endGame(MESSAGES.computerWin);
    bgMusic.pause();
    if (!userWinSound.muted && !computerWinSound.muted) {
      if (!muteBtn.classList.contains('muted')) {
        computerWinSound.play();
      }
    }
  }
};

const endGame = (message) => {
  const infoElement = document.querySelector('.info');
  const showUserChoice = document.querySelector('.user__choice');
  const showComputerChoice = document.querySelector('.computer__choice');
  infoElement.textContent = message;
  showUserChoice.textContent = '';
  showComputerChoice.textContent = '';

  const buttons = document.querySelectorAll('.buttons button');
  buttons.forEach((button) => {
    button.disabled = true;
  });
};

const resetScore = () => {
  userScore = 0;
  computerScore = 0;
  userChoice = '';
  computerChoice = '';
  const infoElement = document.querySelector('.info');
  const showUserChoice = document.querySelector('.user__choice');
  const showComputerChoice = document.querySelector('.computer__choice');
  infoElement.textContent = initialMessage;
  showUserChoice.textContent = '';
  showComputerChoice.textContent = '';
  const buttons = document.querySelectorAll('.buttons button');
  buttons.forEach((button) => {
    button.disabled = false;
  });
  userWinSound.pause();
  computerWinSound.pause();
  updateScore();
  bgMusic.currentTime = 0;
  userWinSound.currentTime = 0;
  computerWinSound.currentTime = 0;
};

const game = () => {
  resetScore();

  const buttons = document.querySelectorAll('.buttons button');
  const resetButton = document.querySelector('.reset');

  resetButton.addEventListener('click', resetScore);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      userChoice = getUserChoice(button.value);
      computerChoice = getComputerChoice();
      const roundResult = determineWinner(userChoice, computerChoice);
      const infoElement = document.querySelector('.info');
      const showUserChoice = document.querySelector('.user__choice');
      const showComputerChoice = document.querySelector('.computer__choice');

      infoElement.textContent =
        roundResult !== initialMessage ? roundResult : initialMessage;
      showUserChoice.textContent = `Your chose: ${userChoice}`;
      showComputerChoice.textContent = `Computer chose: ${computerChoice}`;

      updateScore();
    });
  });
};

game();
