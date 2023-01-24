const playButton = document.querySelector('#play-btn');
const cells = Array.from(document.querySelectorAll('.cell'));

const PLAYER_ONE = 'X';
const PLAYER_TWO = 'O';
let currentPlayer = PLAYER_ONE;

let spaces = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
];

let isDead = true;

let playerOneWins = 0;
let playerTwoWins = 0;
const playerOneWinsElement = document.querySelector('#player1-wins');
const playerTwoWinsElement = document.querySelector('#player2-wins');

cells.forEach(cell => cell.addEventListener('click', () => {
  const cellId = cell.id;

  if (isDead || spaces[cellId] !== null)
    return;
    
  spaces[cellId] = currentPlayer;
  cell.textContent = currentPlayer;

  currentPlayer = currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;

  checkWinner();

  playerOneWinsElement.textContent = `Wins: ${playerOneWins}`;
  playerTwoWinsElement.textContent = `Wins: ${playerTwoWins}`;
}));


playButton.addEventListener('click', () => {
  if (!isDead)
    return;

  isDead = false;
  currentPlayer = PLAYER_ONE;

  spaces.fill(null);

  cells.forEach(cell => {
    cell.textContent = '';
  });
});

const checkWinner = () => {
  for (const combination of winningCombinations) {
    let [firstCell, secondCell, thirdCell] = combination;

    if (
      spaces[firstCell] === PLAYER_ONE &&
      spaces[secondCell] === PLAYER_ONE &&
      spaces[thirdCell] === PLAYER_ONE
    ) {
      isDead = true;
      playerOneWins++;

      alert('Player 1 has won!');
    }

    if (
      spaces[firstCell] === PLAYER_TWO &&
      spaces[secondCell] === PLAYER_TWO &&
      spaces[thirdCell] === PLAYER_TWO
    ) {
      isDead = true;
      playerTwoWins++;

      alert('Player 2 has won!');
    }  

    if (spaces.every(space => space !== null)) {
      isDead = true;

      alert('It\'s a tie!');
      return;
    }
  }
};