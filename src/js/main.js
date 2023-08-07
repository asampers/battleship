// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import { renderBoard, renderShips, renderAttack } from "./domManager";
import Game from "./game";

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

const game = Game();
player1Default.forEach((ship) => game.gameBoards[game.current].placeShip(ship));
player2Default.forEach((ship) =>
  game.gameBoards[game.opponent].placeShip(ship)
);

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

player1.addEventListener("click", (e) => {
  let coord = [
    Number(e.target.getAttribute("data-x")),
    Number(e.target.getAttribute("data-y")),
  ];
  let attack = game.gameBoards[game.current].receiveAttack(coord);
  renderAttack("Player", coord, attack);
});

player2.addEventListener("click", (e) => {
  let coord = [
    Number(e.target.getAttribute("data-x")),
    Number(e.target.getAttribute("data-y")),
  ];
  let attack = game.gameBoards[game.opponent].receiveAttack(coord);
  renderAttack("Computer", coord, attack);
});

const boards = document.createElement("div");
boards.className = "d-flex";
boards.append(player1, player2);

const content = document.querySelector(".container");
content.append(boards);

renderShips("Player", game.gameBoards[game.current].ships);
renderShips("Computer", game.gameBoards[game.opponent].ships);
