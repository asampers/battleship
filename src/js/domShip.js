import { updateElementText, message } from "./domGame";
import { game } from "./main";

export const DomShip = (() => {
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

  const setResultClass = (thisPlayer, status) => {
    let result = document.querySelector(`.${thisPlayer} .result`);
    result.className = `result m-1 p-1 rounded ${status}`;
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
    setResultClass(thisPlayer, attack);
    updateElementText(`.${thisPlayer} .result`, message(attack));
  };

  return { previewShip, cannotPlaceShip, renderShips, renderAttack };
})();
