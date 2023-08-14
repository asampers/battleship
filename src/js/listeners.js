import {
  renderShips,
  previewShip,
  cannotPlaceShip,
  renderPlayerReady,
  replaceBoard,
  updateElementText,
} from "./domManager";
import { letComputerPlaceShips } from "./computerPlayer";
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
  updateElementText(
    `.${game.playerName()} .info`,
    `Ships placed: ${game.playerShips().length} of 5`
  );

  if (ShipYard.allShipsPlaced() && game.playingAgainstComputer()) {
    renderPlayerReady();
    window.removeEventListener("keydown", rKeyListenter);
    game.switchPlayers();
    letComputerPlaceShips();
  }
  renderShips("Player", ships);
}

export { previewShipListener, placeShipListener, rKeyListenter };
