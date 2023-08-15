import player from "./player";
import { shipYard } from "./shipYard";
import { game } from "./main";
import { updateElementText, createDomElement, message } from "./domGame";
import { DomShip } from "./domShip";

const computer = player("Computer");
const shipyard = shipYard();

const randomlyChangeOrientation = () => {
  let roll = Math.floor(Math.random() * 11);
  if (roll <= 5) {
    shipyard.changeOrientation();
  }
};

const getValidShipPlacement = () => {
  let totalCoords = shipyard.getTotalCoords(computer.newRandomGuess());
  while (DomShip.cannotPlaceShip(totalCoords)) {
    randomlyChangeOrientation();
    totalCoords = shipyard.getTotalCoords(computer.newRandomGuess());
  }
  for (const coord of totalCoords) {
    computer.addGuess(coord);
  }
  return totalCoords;
};

const randomlyPlaceShips = () => {
  while (!shipyard.allShipsPlaced()) {
    let totalCoords = getValidShipPlacement();
    game.gameBoards[game.current].placeShip(totalCoords);
    shipyard.launchShip();
  }
  updateElementText(`.${game.playerName()} .action`, message("placed"));
  updateElementText(
    `.${game.playerName()} .info`,
    `Ships placed: ${game.playerShips().length} of 5`
  );
  DomShip.renderShips(game.playerName(), game.playerShips());
  game.switchPlayers();
};

const letComputerPlaceShips = async () => {
  updateElementText(`.${game.playerName()} .action`, "...is placing ships...");
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
};

export { letComputerPlaceShips };
