// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import { renderBoard } from "./domManager";
import Game from "./game";

const game = Game();
const player1 = renderBoard(
  "Player",
  "Computer guesses on this board",
  game.gameBoards[game.current]
);

const player2 = renderBoard(
  "Computer",
  "Click on this board to sink their ships!",
  game.gameBoards[game.opponent]
);

const boards = document.createElement("div");
boards.className = "d-flex";
boards.append(player1, player2);

const content = document.querySelector(".container");
content.append(boards);
