import { createDomElement } from "./domGame";
import { game } from "./main";

export const DomBoard = (() => {
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

  const renderBoardTiles = (board) => {
    for (let x = 0; x < 10; x++) {
      renderRow(x, board);
    }
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
    const result = createDomElement("div", "result", "");
    const board = createDomElement("div", "board grid container", "");

    renderBoardTiles(board);

    display.append(title, action, info, result, board);

    return display;
  };

  const replaceBoard = () => {
    const board = document.createElement("div");
    board.className = "board grid container";
    renderBoardTiles(board);
    const playerBoard = document.querySelector(`.${game.playerName()} .board`);
    playerBoard.parentNode.replaceChild(board, playerBoard);
  };

  return { renderBoard, replaceBoard };
})();
