import Game from "./game";

const game = Game();

test("can switch players", () => {
  game.switchPlayers();
  expect(game.currentPlayer).toBe(1);
  expect(game.enemyPlayer).toBe(0);
});

test("can tell when game is not over", () => {});
