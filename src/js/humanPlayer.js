import {
  DomGame,
  updateElementText,
  createDomElement,
  message,
} from "./domGame";
import { DomBoard } from "./domBoard";
import { DomShip } from "./domShip";
import {
  letComputerPlaceShips,
  playAndRenderComputerTurn,
} from "./computerPlayer";
import { shipYard } from "./shipYard";
import { game } from "./main";

const ShipYard = shipYard();

function processCoords(e) {
  return [
    Number(e.target.getAttribute("data-x")),
    Number(e.target.getAttribute("data-y")),
  ];
}

function activatePlayBtn() {
  let playBtn = createDomElement(
    "button",
    "play btn btn-success mt-4",
    "Click here to start!"
  );
  let instructions = document.querySelector(".instructions");
  instructions.textContent = "";
  instructions.append(playBtn);
  playBtn.addEventListener("click", DomGame.renderGameReady);
}

function rKeyListenter(e) {
  if (e.key == "r") {
    ShipYard.changeOrientation();
    DomBoard.replaceBoard();
    addShipListeners();
    DomShip.renderShips(game.playerName(), game.playerShips());
  }
}

function previewShipListener(e) {
  DomShip.previewShip(ShipYard.getTotalCoords(e));
}

function placeShipListener(e) {
  let totalCoords = ShipYard.getTotalCoords(e);
  if (DomShip.cannotPlaceShip(totalCoords)) return;

  game.gameBoards[game.current].placeShip(totalCoords);
  let ships = game.playerShips();
  ShipYard.launchShip();
  updateElementText(
    `.${game.playerName()} .info`,
    `Ships placed: ${ships.length} of 5`
  );

  if (ShipYard.allShipsPlaced() && game.playingAgainstComputer()) {
    renderPlayerReady();
    game.switchPlayers();
    letComputerPlaceShips();
    setTimeout(activatePlayBtn, 3000);
  }
  DomShip.renderShips("Player", ships);
}

const renderPlayerReady = () => {
  updateElementText(`.${game.playerName()} .action`, message("placed"));
  removeShipListeners();
};

const renderTurn = (coord, attack) => {
  let player = game.opponentName();
  let ships = game.gameBoards[game.opponent].remainingShips();
  DomShip.renderAttack(coord, attack);
  updateElementText(`.${player} .info`, `Ships remaining: ${ships}`);

  game.winner ? DomGame.renderGameOver() : null;
};

const playAndRenderHumanTurn = (e) => {
  let coord = processCoords(e);
  if (game.players[game.current].alreadyGuessed(coord)) return;
  let attack = game.playRound(coord);
  renderTurn(coord, attack);
  game.switchPlayersIfNeeded(attack);
  if (game.playingAgainstComputer() && game.isComputersTurn()) {
    playAndRenderComputerTurn();
  }
};

const addShipListeners = () => {
  const playerBoard = document.querySelector(`.${game.playerName()} .board`);

  //preview ship placement when mouse enters tile
  playerBoard.addEventListener("mouseover", previewShipListener);

  //clear ship preview when mouse leaves tile
  playerBoard.addEventListener("mouseout", previewShipListener);

  //place ship (if possible) onClick
  playerBoard.addEventListener("click", placeShipListener);
};

const removeShipListeners = () => {
  const playerBoard = document.querySelector(`.${game.playerName()} .board`);

  playerBoard.removeEventListener("mouseover", previewShipListener);
  playerBoard.removeEventListener("mouseout", previewShipListener);
  playerBoard.removeEventListener("click", placeShipListener);
  window.removeEventListener("keydown", rKeyListenter);
};

export {
  rKeyListenter,
  playAndRenderHumanTurn,
  addShipListeners,
  renderPlayerReady,
  renderTurn,
};
