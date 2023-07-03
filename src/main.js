const gameBoard = document.querySelector("#gameboard");
const info = document.querySelector("#info");

const startCells = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

let go = "circle";
info.textContent = "Circle goes first";

let score = 0;
let p1Score = 0;
let p2Score = 0;

function resetBoard() {
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
  }

  createBoard();
  go = "circle";
  info.textContent = "Circle goes first";
}

function writeScore() {
  document.getElementById("score-1").innerHTML = p1Score;
  document.getElementById("score-2").innerHTML = p2Score;
}

writeScore();

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  info.textContent = `It is now ${go}'s turn`;
  e.target.removeEventListener("click", addGo);
  /* console.log(p1Score, p2Score) */
  checkFull();
  checkScore();
  writeScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check if circle won
  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      info.textContent = "Circle Wins!";
      p1Score++;
      writeScore();
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  // Check if cross won
  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (circleWins) {
      info.textContent = "Cross Wins!";
      p2Score++;
      writeScore();
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
  return 0;
}

function checkFull() {
  const allSquares = document.querySelectorAll(".square");
  let childs = 0;
  allSquares.forEach((square) => {
    if (square.hasChildNodes()) {
      childs++;
    }
  });

  if (childs == 9) {
    info.textContent = "It's a tie!";
    return;
  }
}

function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener(
      "click",
      addGo,
    );
    gameBoard.append(cellElement);
  });
}

createBoard();
