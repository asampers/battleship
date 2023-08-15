import { game } from "./main";
import { playAndRenderHumanTurn } from "./humanPlayer";
import { renderBoard, replaceBoard } from "./dom4Board";

function message(attack) {
  switch (attack) {
    case "miss":
      return `${game.playerName()} took a shot and missed.`;
    case "hit":
      return `${game.playerName()} hit a ship!`;
    case "sunk":
      return `${game.playerName()} sunk a ship!`;
    case "won":
      return `${game.playerName()} won!`;
    case "over":
      return "GAME OVER.";
    case "placed":
      return "All ships placed. Ready to Play!";
  }
}

const renderGameOver = () => {
  let resultNodes = document.querySelectorAll(".result");
  let actionNodes = document.querySelectorAll(".action");
  let playAgain = document.querySelector(".play");
  for (const node of resultNodes) {
    node.textContent = message("won");
  }

  for (const node of actionNodes) {
    node.textContent = message("over");
  }

  updateElementText(
    ".instructions span",
    `Congratulations, ${game.playerName()}!`
  );
  playAgain.className = "play btn btn-primary";
  playAgain.textContent = "Reset";
  playAgain.addEventListener("click", () => {
    window.location.reload();
  });
};

const renderGameReady = () => {
  let infoNodes = document.querySelectorAll(".info");
  let actionNodes = document.querySelectorAll(".action");
  let playBtn = document.querySelector(".play");
  let player0 = document.querySelector(`.${game.playerName()}`);
  let player1 = document.querySelector(`.${game.opponentName()}`);
  playBtn.className = "play d-none";

  for (const node of infoNodes) {
    node.textContent = "Ships remaining: 5";
  }

  actionNodes[0].textContent = `${game.opponentName()} guesses on this board.`;
  actionNodes[1].textContent = "Click on this board to sink their ships.";

  player0.addEventListener("click", (e) => {
    if (game.winner || game.current == 0) return;
    playAndRenderHumanTurn(e);
  });

  player1.addEventListener("click", (e) => {
    if (game.winner || game.current == 1) return;
    playAndRenderHumanTurn(e);
  });
};

const createDomElement = (type, className, textContent) => {
  const element = document.createElement(type);
  element.className = className;
  element.textContent = textContent;
  return element;
};

const updateElementText = (className, textContent) => {
  let element = document.querySelector(className);
  element.textContent = textContent;
};

const renderPlayerReady = () => {
  updateElementText(`.${game.playerName()} .action`, message("placed"));
  replaceBoard();
};

const gameInitialize = () => {
  const player1 = renderBoard(
    "Player",
    "place ships on this board.",
    game.gameBoards[game.current]
  );

  const player2 = renderBoard(
    "Computer",
    "waiting for Player to place their ships!",
    game.gameBoards[game.opponent]
  );

  let instructions = document.querySelector(".instructions");
  instructions.innerHTML = `<span>To place your ship, hover over your board and click on a coordinate. <br>
    Press <b>r</b> to rotate your ship prior to placement.</span>`;

  const boards = document.createElement("div");
  boards.className = "d-flex";
  boards.append(player1, player2);

  const content = document.querySelector(".container");
  content.append(boards);
};

export {
  updateElementText,
  createDomElement,
  renderGameOver,
  renderGameReady,
  gameInitialize,
  renderPlayerReady,
  message,
};
