// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import {
  renderBoard,
  renderAttack,
  updateElementText,
  renderGameOver,
} from "./domManager";
import Game from "./game";
import {
  previewShipListener,
  placeShipListener,
  rKeyListenter,
} from "./listeners";

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
  let player = game.opponentName();
  let ships = game.gameBoards[game.opponent].remainingShips();
  renderAttack(coord, attack);
  updateElementText(`${player} .info`, `Ships remaining: ${ships}`);

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
  player1Board.addEventListener("mouseover", previewShipListener);

  //clear ship preview when mouse leaves tile
  player1Board.addEventListener("mouseout", previewShipListener);

  //place ship (if possible) onClick
  player1Board.addEventListener("click", placeShipListener);
};

placeShipsInit();

window.addEventListener("keydown", rKeyListenter);

export { game, placeShipsInit };
