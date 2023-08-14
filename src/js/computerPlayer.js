import player from "./player";
import { shipYard } from "./shipYard";
import { game } from "./main";
import { cannotPlaceShip, renderShips } from "./domManager";

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
  const actionNode = document.querySelector(".Computer .action");
  const info = document.querySelector(`.${game.playerName()} .info`);
  info.textContent = `Ships placed: ${game.playerShips().length} of 5`;
  actionNode.textContent = "All ships placed. Ready to Play!";
  renderShips(game.playerName(), game.playerShips());
  game.switchPlayers();
};

export { randomlyPlaceShips };
