import {
  renderShips,
  previewShip,
  cannotPlaceShip,
  renderPlayerReady,
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
    renderPlayerReady();
    window.removeEventListener("keydown", rKeyListenter);
    game.switchPlayers();
    let actionNode = document.querySelector(".Computer .action");
    actionNode.textContent = "is placing ships...";
    let spinner = document.createElement("span");
    spinner.className = "spinner-border text-secondary spinner-border-sm me-2";
    let spinner2 = document.createElement("span");
    spinner2.className = "spinner-border text-secondary spinner-border-sm ms-2";
    actionNode.prepend(spinner);
    actionNode.append(spinner2);
    setTimeout(randomlyPlaceShips, 3000);

    //game.switchPlayers();
  }
  renderShips("Player", ships);
}

export { previewShipListener, placeShipListener, rKeyListenter };
