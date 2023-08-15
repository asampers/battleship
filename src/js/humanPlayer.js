import { DomGame, updateElementText, createDomElement } from "./domGame";
import { DomBoard } from "./domBoard";
import { DomShip } from "./domShip";
import { letComputerPlaceShips } from "./computerPlayer";
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
    "play btn btn-success",
    "Click here to start!"
  );
  let instructions = document.querySelector(".instructions");
  instructions.innerHTML = `<span>Start sinking ships by clicking on coordinates on your opponent's board.<br>
    Sink all 5 ships before your opponent to win!</span>`;
  instructions.append(playBtn);
  playBtn.addEventListener("click", DomGame.renderGameReady);
}

function rKeyListenter(e) {
  if (e.key == "r") {
    ShipYard.changeOrientation();
    DomBoard.replaceBoard();
    placeShipsHuman();
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
    `Ships placed: ${game.playerShips().length} of 5`
  );

  if (ShipYard.allShipsPlaced() && game.playingAgainstComputer()) {
    DomGame.renderPlayerReady();
    window.removeEventListener("keydown", rKeyListenter);
    game.switchPlayers();
    letComputerPlaceShips();
    setTimeout(activatePlayBtn, 3000);
  }
  DomShip.renderShips("Player", ships);
}

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

const playAndRenderComputerTurn = () => {
  let attack;
  while (attack != "miss") {
    let coord = game.players[1].makeGuess();
    attack = game.playRound(coord);
    renderTurn(coord, attack);
    game.switchPlayersIfNeeded(attack);
  }
};

const placeShipsHuman = () => {
  const player1Board = document.querySelector(".Player .board");

  //preview ship placement when mouse enters tile
  player1Board.addEventListener("mouseover", previewShipListener);

  //clear ship preview when mouse leaves tile
  player1Board.addEventListener("mouseout", previewShipListener);

  //place ship (if possible) onClick
  player1Board.addEventListener("click", placeShipListener);
};

export { rKeyListenter, playAndRenderHumanTurn, placeShipsHuman };
