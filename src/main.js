const gameBoard = document.querySelector('#gameboard')
const info = document.querySelector('#info')

const startCells = [
  "","","","","","","","",""
]

let go = "circle"
info.textContent = "Circle goes first"

function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement('div')
    cellElement.classList.add('square')
    cellElement.id = index
    cellElement.addEventListener(
      'click', addGo
    )
    gameBoard.append(cellElement)
  })
};

function resetBoard() {
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild)
  }

  createBoard()
  go = "circle"
  info.textContent = "Circle goes first"
}

function addGo(e) {
  const goDisplay = document.createElement('div')
  goDisplay.classList.add(go)
  e.target.append(goDisplay)
  go = go === "circle" ? "cross" : "circle"
  info.textContent = `It is now ${go}'s turn`
  e.target.removeEventListener("click", addGo)
  checkScore()
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square")
  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ]

  // Check if circle won
  winningCombos.forEach(array => {
    const circleWins = array.every(cell => 
      allSquares[cell].firstChild?.classList.contains('circle'))
    if (circleWins) {
      info.textContent = "Circle Wins!"
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      return
    }
  })

  // Check if cross won
  winningCombos.forEach(array => {
    const circleWins = array.every(cell => 
      allSquares[cell].firstChild?.classList.contains('cross'))
    if (circleWins) {
      info.textContent = "Cross Wins!"
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      return
    }
  })

}

createBoard()
