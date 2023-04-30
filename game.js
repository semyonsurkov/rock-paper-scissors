const CHOICES = ['rock', 'paper', 'scissors'];
let userRoundWins = 0;
let computerRoundWins = 0;
const MESSAGES = {
  tie: 'The game is a tie!',
  computerWin: 'The computer won!',
  userWin: 'You won!',
  invalidChoice: 'Please enter a valid choice!',
};

const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomNumber];
};

const getUserChoice = () => {
  let userChoice;
  while (!CHOICES.includes(userChoice)) {
    userChoice = prompt('Rock, Paper or Scissors?');
    if (!CHOICES.includes(userChoice)) {
      alert(MESSAGES.invalidChoice);
    }
  }
  return userChoice.toLowerCase();
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
    computerRoundWins += 1;
    return MESSAGES.computerWin;
  }
  userRoundWins += 1;
  return MESSAGES.userWin;
};

const game = () => {
  for (let roundCount = 0; roundCount < 5; roundCount++) {
    const userChoice = getUserChoice();
    const computerChoice = getComputerChoice();
    console.log(
      `Round ${roundCount + 1}: ${determineWinner(userChoice, computerChoice)}`
    );
  }

  if (userRoundWins > computerRoundWins || userRoundWins === 3) {
    console.log('You won the game!');
  } else if (computerRoundWins > userRoundWins || computerRoundWins === 3) {
    console.log('The computer won the game!');
  } else {
    console.log('The game is a tie!');
  }
};

game();
