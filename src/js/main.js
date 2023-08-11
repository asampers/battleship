// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import {
  renderBoard,
  renderShips,
  renderAttack,
  updateShipsRemain,
  renderGameOver,
  previewShip,
  cannotPlaceShip,
  renderBoardTiles,
  renderGameReady,
  replaceBoard,
} from "./domManager";
import Game from "./game";
import { ShipYard } from "./shipYard";

const game = Game();

const player1 = renderBoard(
  "Player",
  "place ships on this board.",
  game.gameBoards[game.current]
);

const player2 = renderBoard(
  "Computer",
  "waiting for Player to place their ships!",
  game.gameBoards[game.opponent]
);

function processCoords(e) {
  return [
    Number(e.target.getAttribute("data-x")),
    Number(e.target.getAttribute("data-y")),
  ];
}

const renderTurn = (coord, attack) => {
  renderAttack(coord, attack);
  updateShipsRemain();
  game.winner ? renderGameOver() : null;
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

/*
player1.addEventListener("click", (e) => {
  if (game.winner || game.current == 0) return;
  playAndRenderHumanTurn(e);
});

player2.addEventListener("click", (e) => {
  if (game.winner || game.current == 1) return;
  playAndRenderHumanTurn(e);
});
*/

const boards = document.createElement("div");
boards.className = "d-flex";
boards.append(player1, player2);

const content = document.querySelector(".container");
content.append(boards);

const placeShipsInit = () => {
  const player1Board = document.querySelector(".Player .board");

  //preview ship placement when mouse enters tile
  player1Board.addEventListener("mouseover", (e) => {
    let totalCoords = ShipYard.getTotalCoords(e);
    previewShip(totalCoords);
  });

  //clear ship preview when mouse leaves tile
  player1Board.addEventListener("mouseout", (e) => {
    let totalCoords = ShipYard.getTotalCoords(e);
    previewShip(totalCoords);
  });

  //place ship (if possible) onClick
  player1Board.addEventListener("click", (e) => {
    let totalCoords = ShipYard.getTotalCoords(e);
    if (cannotPlaceShip(totalCoords)) return;

    game.gameBoards[game.current].placeShip(totalCoords);
    let ships = game.playerShips();
    ShipYard.launchShip();

    const info = document.querySelector(`.${game.playerName()} .info`);
    info.textContent = `Ships placed: ${ships.length} of 5`;

    if (ShipYard.allShipsPlaced()) {
      renderGameReady();
    }
    renderShips("Player", ships);
  });
};

placeShipsInit();

window.addEventListener("keydown", (e) => {
  if (e.key == "r") {
    ShipYard.changeOrientation();
    replaceBoard();
    placeShipsInit();
    renderShips("Player", game.playerShips());
  }
});

export { game };
