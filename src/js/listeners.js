import {
  renderShips,
  previewShip,
  cannotPlaceShip,
  renderGameReady,
  replaceBoard,
} from "./domManager";
import { randomlyPlaceShips } from "./computerPlayer";
import { shipYard } from "./shipYard";
import { game, placeShipsInit } from "./main";

const ShipYard = shipYard();

function rKeyListenter(e) {
  if (e.key == "r") {
    ShipYard.changeOrientation();
    replaceBoard();
    placeShipsInit();
    renderShips(game.playerName(), game.playerShips());
  }
}

function previewShipListener(e) {
  previewShip(ShipYard.getTotalCoords(e));
}

function placeShipListener(e) {
  let totalCoords = ShipYard.getTotalCoords(e);
  if (cannotPlaceShip(totalCoords)) return;

  game.gameBoards[game.current].placeShip(totalCoords);
  let ships = game.playerShips();
  ShipYard.launchShip();

  const info = document.querySelector(`.${game.playerName()} .info`);
  info.textContent = `Ships placed: ${ships.length} of 5`;

  if (ShipYard.allShipsPlaced()) {
    renderGameReady();
    window.removeEventListener("keydown", rKeyListenter);
    game.switchPlayers();
    randomlyPlaceShips();
    game.switchPlayers();
  }
  renderShips("Player", ships);
}

export { previewShipListener, placeShipListener, rKeyListenter };
