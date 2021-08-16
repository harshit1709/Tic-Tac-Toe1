// Your scripts here!
const statusDisplay = document.querySelector(".game--status");
// console.log(statusDisplay);

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () =>
  `Congratulations! Player${currentPlayer === "X" ? 1 : 2} wins`;

const drawMessage = "Draw!";
const currentPlayerTurn = () =>
  `It's Player${currentPlayer === "X" ? 1 : 2}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// document
//   .querySelectorAll(".cell")
//   .forEach((cell) => cell.addEventListener("click", handleCellClick));

// fixed by Event Delegation
// Instead of adding listener to individual child elements, add a listener to the parent element
// then access the clicked child through event.target

document
  .querySelector(".game--container")
  .addEventListener("click", handleCellClick);

document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);

function handleCellClick(clickedCellEvent) {
  if (clickedCellEvent.target.classList.contains("cell")) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id) - 1;
    if (!gameActive || gameState[clickedCellIndex] !== "") return;
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") continue;
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  // checking if someone won
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage;
    gameActive = false;
    return;
  }
  // keep the game going!
  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}
