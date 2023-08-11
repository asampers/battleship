import player from "./player";
import { shipYard } from "./shipYard";
import { game } from "./main";
import { cannotPlaceShip, renderShips } from "./domManager";

const computer = player("Computer");
const shipyard = shipYard();

const getValidShipPlacement = () => {
  let totalCoords = shipyard.getTotalCoords(computer.newRandomGuess());
  while (cannotPlaceShip(totalCoords)) {
    totalCoords = shipyard.getTotalCoords(computer.newRandomGuess());
  }
  for (const coord of totalCoords) {
    computer.addGuess(coord);
  }
  return totalCoords;
};

const randomlyPlaceShips = () => {
  console.log(shipyard.allShipsPlaced());
  while (!shipyard.allShipsPlaced()) {
    let totalCoords = getValidShipPlacement();
    game.gameBoards[game.current].placeShip(totalCoords);
    shipyard.launchShip();
  }
  renderShips("Computer", game.playerShips());
};

export { randomlyPlaceShips };
