const renderBoardTiles = (board) => {
  for (let x = 0; x < 10; x++) {
    renderRow(x, board);
  }
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

const findTile = (player, position) => {
  const board = document.querySelector(`.${player}-board`);
  const tile = board.querySelector(`[data-id='${position}']`);

  return tile;
};

const setTileColor = (tile) => {
  tile.classList.remove("empty");
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

const renderAttack = (player, coord, attack) => {
  let tile = findTile(player, coord);

  setTileStatus(tile, attack);
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

export { renderBoard, renderShips, renderAttack };
