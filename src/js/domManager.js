import { game } from "./main";
import { playAndRenderHumanTurn } from "./listeners";

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
      return "Game Over. Press RESET button to play again.";
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

  updateElementText(".play", "Reset");
  playAgain.className = "play btn btn-primary";
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

const replaceBoard = () => {
  const board = document.createElement("div");
  board.className = "board grid container";
  renderBoardTiles(board);
  const player1Board = document.querySelector(".Player .board");
  player1Board.parentNode.replaceChild(board, player1Board);
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

const renderBoardTiles = (board) => {
  for (let x = 0; x < 10; x++) {
    renderRow(x, board);
  }
};

const renderRow = (x, board) => {
  for (let y = 0; y < 10; y++) {
    const tile = renderTile(x, y);
    board.appendChild(tile);
  }
};

const renderTile = (x, y) => {
  const tile = createDomElement(
    "button",
    "tile border border-black rounded empty",
    ""
  );
  tile.setAttribute("data-x", x);
  tile.setAttribute("data-y", y);

  return tile;
};

const findTile = (player, position) => {
  let x = position[0];
  let y = position[1];
  const board = document.querySelector(`.${player} .board`);
  const tile = board.querySelector(`[data-x='${x}'][data-y='${y}']`);

  return tile;
};

const isOnTheBoard = (coord) => {
  let tile = findTile(game.playerName(), coord);
  return tile;
};

const arraysAreEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const validCoords = (totalCoords) => {
  return totalCoords.every(isOnTheBoard);
};

const overlappingShips = (totalCoords) => {
  let overlap = null;
  totalCoords.forEach((coord) => {
    game.playerShips().forEach((ship) => {
      ship.coordinates.forEach((position) => {
        if (arraysAreEqual(position, coord)) {
          overlap = true;
        }
      });
    });
  });
  return overlap;
};

const cannotPlaceShip = (here) => {
  return overlappingShips(here) || !validCoords(here);
};

const previewShip = (totalCoords) => {
  if (cannotPlaceShip(totalCoords)) {
    totalCoords.forEach((coord) => {
      if (isOnTheBoard(coord)) {
        renderShipPreview(coord, "invalid");
      }
    });
  } else if (validCoords(totalCoords)) {
    totalCoords.forEach((coord) => {
      renderShipPreview(coord, "preview");
    });
  }
};

const setTileColor = (tile) => {
  tile.classList.remove("empty");
  tile.classList.remove("preview");
  tile.classList.add("occupied");
};

const setTileStatus = (tile, tileStatus) => {
  tile.classList.add(tileStatus);
};

const renderShips = (player, gameShips) => {
  for (const ship of gameShips) {
    ship.coordinates.forEach((position) => {
      let tile = findTile(player, position);
      setTileColor(tile);
    });
  }
};

const renderShipPreview = (coord, status) => {
  let tile = findTile(game.playerName(), coord);
  tile.classList.toggle(status);
};

const renderAttack = (coord, attack) => {
  let thisBoard = game.opponentName();
  let thisPlayer = game.playerName();
  let tile = findTile(thisBoard, coord);

  setTileStatus(tile, attack);
  updateElementText(`.${thisPlayer} .result`, message(attack));
};

const renderBoard = (player, actionText, boardGame) => {
  const display = createDomElement(
    "div",
    `${player} container d-flex flex-column align-items-center`,
    ""
  );
  const title = createDomElement("h1", "", player);
  const action = createDomElement("div", "action", actionText);
  const info = createDomElement(
    "div",
    "info",
    `Ships placed: ${boardGame.ships.length}`
  );
  const result = createDomElement("div", "result", "No moves yet.");
  const board = createDomElement("div", "board grid container", "");

  renderBoardTiles(board);

  display.append(title, action, info, result, board);

  return display;
};

export {
  renderBoard,
  renderShips,
  renderAttack,
  updateElementText,
  createDomElement,
  renderGameOver,
  renderGameReady,
  previewShip,
  cannotPlaceShip,
  renderBoardTiles,
  renderPlayerReady,
  replaceBoard,
  message,
};
