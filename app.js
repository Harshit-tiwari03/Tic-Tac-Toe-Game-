let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.getElementById("turn-indicator");

let playerXTurn = true; // true for X, false for O
let count = 0; // To track draw

const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],
];

function updateTurnIndicator() {
  if (msgContainer.classList.contains("hide")) {
    turnIndicator.textContent = playerXTurn ? "Player X's turn" : "Player O's turn";
  } else {
    turnIndicator.textContent = "";
  }
}

const resetGame = () => {
  playerXTurn = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  updateTurnIndicator();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return; // Prevent overwriting a box

    if (playerXTurn) {
      box.innerText = "X";
    } else {
      box.innerText = "O";
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();

    if (isWinner) {
      showWinner(playerXTurn ? "X" : "O");
    } else if (count === 9) {
      gameDraw();
    } else {
      playerXTurn = !playerXTurn;
      updateTurnIndicator();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  turnIndicator.textContent = "";
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  turnIndicator.textContent = "";
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let valA = boxes[a].innerText;
    let valB = boxes[b].innerText;
    let valC = boxes[c].innerText;
    if (valA && valA === valB && valB === valC) {
      return true;
    }
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Initialize turn indicator at page load
updateTurnIndicator();
