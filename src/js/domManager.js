const renderBoardTiles = (board) => {
  for (let x = 0; x < 10; x++) {
    renderRow(x, board);
  }

  board.addEventListener("click", (e) => {
    alert(e.target.getAttribute("data-id"));
  });
};

const renderRow = (x, board) => {
  for (let y = 0; y < 10; y++) {
    const tile = renderTile([x, y]);
    board.appendChild(tile);
  }
};

const renderTile = (id) => {
  const tile = document.createElement("button");
  tile.setAttribute("data-id", id);
  tile.className = "tile border border-black rounded empty";

  return tile;
};

const setTileColor = (player, position) => {
  const board = document.querySelector(`.${player}-board`);
  const tile = board.querySelector(`[data-id='${position}']`);
  tile.classList.remove("empty");
  tile.classList.add("occupied");
};

const renderShips = (player, gameShips) => {
  for (const ship of gameShips) {
    ship.coordinates.forEach((position) => {
      setTileColor(player, position);
    });
  }
};

const renderBoard = (player, actionText, boardGame) => {
  const display = document.createElement("div");
  display.className = `${player} container d-flex flex-column align-items-center`;

  const title = document.createElement("h1");
  title.textContent = player;

  const action = document.createElement("div");
  action.textContent = actionText;

  const info = document.createElement("div");
  info.textContent = `Ships remaining: ${boardGame.ships.length}`;

  const result = document.createElement("div");

  const board = document.createElement("div");
  board.className = `${player}-board grid container`;
  renderBoardTiles(board);

  display.append(title, action, info, result, board);

  return display;
};

export { renderBoard, renderShips };
