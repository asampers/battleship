import player from "./player";
import { shipYard } from "./shipYard";
import { game } from "./main";
import { cannotPlaceShip, renderShips, updateElementText } from "./domManager";

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
  while (cannotPlaceShip(totalCoords)) {
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
  updateElementText(
    `.${game.playerName()} .action`,
    "All ships placed. Ready to Play!"
  );
  updateElementText(`.${game.playerName()} .info`, `Ships placed: 5 of 5`);
  renderShips(game.playerName(), game.playerShips());
  game.switchPlayers();
};

export { randomlyPlaceShips };
