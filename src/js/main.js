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
} from "./domManager";
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

const enemyIsComputer = game.players[1].name == "Computer";

const stepThruPlayerTurn = (enemy, current, coord, attack) => {
  renderAttack(
    game.players[enemy].name,
    game.players[current].name,
    coord,
    attack
  );
  updateShipsRemain(
    game.players[enemy].name,
    game.gameBoards[enemy].remainingShips()
  );
  game.winner ? renderGameOver(game.players[current].name) : null;
};

player1.addEventListener("click", (e) => {
  let coord = [
    Number(e.target.getAttribute("data-x")),
    Number(e.target.getAttribute("data-y")),
  ];
  let attack = game.playRound(coord);
  stepThruPlayerTurn(0, 1, coord, attack);
});

player2.addEventListener("click", (e) => {
  let coord = [
    Number(e.target.getAttribute("data-x")),
    Number(e.target.getAttribute("data-y")),
  ];
  let attack = game.playRound(coord);
  stepThruPlayerTurn(1, 0, coord, attack);

  if (enemyIsComputer && attack == "miss") {
    let attack;
    while (attack != "miss") {
      let coord = game.players[1].makeGuess();
      attack = game.playRound(coord);
      stepThruPlayerTurn(0, 1, coord, attack);
    }
  }
});

const boards = document.createElement("div");
boards.className = "d-flex";
boards.append(player1, player2);

const content = document.querySelector(".container");
content.append(boards);

renderShips("Player", game.gameBoards[game.current].ships);
renderShips("Computer", game.gameBoards[game.opponent].ships);
