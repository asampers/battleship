import { game } from "./main";

function message(attack) {
  switch (attack) {
    case "miss":
      return "took a shot and missed.";
    case "hit":
      return "hit a ship!";
    case "sunk":
      return "sunk a ship!";
  }
}

const renderGameOver = () => {
  let resultNodes = document.querySelectorAll(".result");
  let actionNodes = document.querySelectorAll(".action");
  let playAgain = document.querySelector(".play");

  for (const node of resultNodes) {
    node.textContent = `${game.players[game.current].name} won!`;
  }

  for (const node of actionNodes) {
    node.textContent = "Game Over. Press RESET button to play again.";
  }

  playAgain.textContent = "Reset";
  playAgain.addEventListener("click", () => {
    window.location.reload();
  });
};

const activatePlayBtn = () => {
  let playBtn = document.querySelector(".play");
  playBtn.className = "play btn btn-primary";
};

const replaceBoard = () => {
  const board = document.createElement("div");
  board.className = "board grid container";
  renderBoardTiles(board);
  const player1Board = document.querySelector(".Player .board");
  player1Board.parentNode.replaceChild(board, player1Board);
};

const renderGameReady = () => {
  let actionNode = document.querySelector(".Player .action");
  actionNode.textContent = "All ships placed. Waiting for Computer!";
  activatePlayBtn();
  replaceBoard();
};

const updateShipsRemain = () => {
  let player = game.players[game.opponent].name;
  let ships = game.gameBoards[game.opponent].remainingShips();
  const info = document.querySelector(`.${player} .info`);
  info.textContent = `Ships remaining: ${ships}`;
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
  const tile = document.createElement("button");
  tile.setAttribute("data-x", x);
  tile.setAttribute("data-y", y);
  tile.className = "tile border border-black rounded empty";

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
  let tile = findTile(game.players[game.current].name, coord);
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
    game.gameBoards[game.current].ships.forEach((ship) => {
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

const setResultStatus = (player, attack) => {
  let result = document.querySelector(`.${player} .result`);
  result.textContent = `${player} ${message(attack)}`;
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
  let tile = findTile(game.players[game.current].name, coord);
  tile.classList.toggle(status);
};

const renderAttack = (coord, attack) => {
  let thisBoard = game.players[game.opponent].name;
  let thisPlayer = game.players[game.current].name;
  let tile = findTile(thisBoard, coord);

  setTileStatus(tile, attack);
  setResultStatus(thisPlayer, attack);
};

const renderBoard = (player, actionText, boardGame) => {
  const display = document.createElement("div");
  display.className = `${player} container d-flex flex-column align-items-center`;

  const title = document.createElement("h1");
  title.textContent = player;

  const action = document.createElement("div");
  action.className = "action";
  action.textContent = actionText;

  const info = document.createElement("div");
  info.className = "info";
  info.textContent = `Ships placed: ${boardGame.ships.length}`;

  const result = document.createElement("div");
  result.className = "result";
  result.textContent = "No moves yet.";

  const board = document.createElement("div");
  board.className = "board grid container";
  renderBoardTiles(board);

  display.append(title, action, info, result, board);

  return display;
};

export {
  renderBoard,
  renderShips,
  renderAttack,
  updateShipsRemain,
  renderGameOver,
  previewShip,
  cannotPlaceShip,
  renderBoardTiles,
  renderGameReady,
  replaceBoard,
};
