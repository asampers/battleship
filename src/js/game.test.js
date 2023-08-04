import Game from "./game";

const game = Game();
game.gameBoards[0].placeShip([[1, 1]]);
game.gameBoards[1].placeShip([[2, 2]]);

test("can switch players", () => {
  game.switchPlayers();
  expect(game.currentPlayer).toBe(1);
  expect(game.enemyPlayer).toBe(0);
});

test("can tell when game is not over", () => {
  let coord = game.players[game.currentPlayer].makeGuess([3, 3]);
  game.gameBoards[game.enemyPlayer].receiveAttack(coord);
  expect(game.over()).toBe(false);
  expect(game.currentPlayer).toBe(1);
  expect(game.enemyPlayer).toBe(0);
});

test("can tell when game is over", () => {
  let coord = game.players[game.currentPlayer].makeGuess([1, 1]);
  let enemyShips = game.gameBoards[game.enemyPlayer].ships;
  let enemyGameboard = game.gameBoards[game.enemyPlayer];
  enemyGameboard.receiveAttack(coord);
  expect(enemyShips[0].hits).toEqual([[1, 1]]);
  expect(enemyGameboard.missedAttacks).toEqual([[3, 3]]);
  expect(game.over()).toBe(true);
});
