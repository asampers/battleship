import {
  renderShips,
  previewShip,
  cannotPlaceShip,
  renderPlayerReady,
  replaceBoard,
  updateElementText,
  createDomElement,
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
  updateElementText(
    `.${game.playerName()} .info`,
    `Ships placed: ${game.playerShips().length} of 5`
  );

  if (ShipYard.allShipsPlaced()) {
    renderPlayerReady();
    window.removeEventListener("keydown", rKeyListenter);
    game.switchPlayers();
    updateElementText(
      `.${game.playerName()} .action`,
      "...is placing ships..."
    );
    let actionNode = document.querySelector(".Computer .action");
    let spinner = createDomElement(
      "span",
      "spinner-border text-secondary spinner-border-sm me-2",
      ""
    );
    let spinner2 = createDomElement(
      "span",
      "spinner-border text-secondary spinner-border-sm me-2",
      ""
    );
    actionNode.prepend(spinner);
    actionNode.append(spinner2);
    setTimeout(randomlyPlaceShips, 3000);
  }
  renderShips("Player", ships);
}

export { previewShipListener, placeShipListener, rKeyListenter };
