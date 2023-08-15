// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import {} from "./dom4Game";
import { renderBoard } from "./dom4Board";
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
let instructions = document.querySelector(".instructions");
instructions.innerHTML = `<span>To place your ship, hover over your board and click on a coordinate. <br>
  Press <b>r</b> to rotate your ship prior to placement.</span>`;

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
