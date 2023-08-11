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

/*
const player1Default = [
  [
    [1, 1],
    [1, 2],
    [1, 3],
  ],
  [
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
  ],
];

const player2Default = [
 [
    [2, 6],
    [3, 6],
    [4, 6],
  ],
  [
  [8, 4],
  [7, 4],
],
[
  [5, 9],
  [6, 9],
  [7, 9],
  [8, 9],
],
];
*/

const game = Game();

/*
player1Default.forEach((ship) => game.gameBoards[game.current].placeShip(ship));
player2Default.forEach((ship) =>
  game.gameBoards[game.opponent].placeShip(ship)
);
*/

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
  if (game.playingAgainstComputer() && attack == "miss") {
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

  player1Board.addEventListener("mouseover", (e) => {
    let coord = processCoords(e);
    let totalCoords = ShipYard.getTotalCoords(coord);
    previewShip(totalCoords);
  });

  player1Board.addEventListener("mouseout", (e) => {
    let coord = processCoords(e);
    let totalCoords = ShipYard.getTotalCoords(coord);
    previewShip(totalCoords);
  });

  player1Board.addEventListener("click", (e) => {
    let coord = processCoords(e);
    let totalCoords = ShipYard.getTotalCoords(coord);
    if (cannotPlaceShip(totalCoords)) return;

    game.gameBoards[game.current].placeShip(totalCoords);
    let ships = game.gameBoards[game.current].ships;
    ShipYard.launchShip();

    const info = document.querySelector(
      `.${game.players[game.current].name} .info`
    );
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
    let ships = game.gameBoards[game.current].ships;
    renderShips("Player", ships);
  }
});

//renderShips("Player", game.gameBoards[game.current].ships);
//renderShips("Computer", game.gameBoards[game.opponent].ships);

export { game };
