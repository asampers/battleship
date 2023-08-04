import Game from "./game";

const game = Game();

beforeAll(() => {
  game.gameBoards[0].placeShip([[1, 1]]);
  game.gameBoards[1].placeShip([[2, 2]]);
});

test("can switch players", () => {
  game.switchPlayers();
  expect(game.current).toBe(1);
  expect(game.opponent).toBe(0);
});

test("can tell when game is not over", () => {
  let coord = game.players[game.current].makeGuess([3, 3]);
  game.gameBoards[game.opponent].receiveAttack(coord);
  expect(game.over()).toBe(false);
  expect(game.current).toBe(1);
  expect(game.opponent).toBe(0);
});

test("can tell when game is over", () => {
  let coord = game.players[game.current].makeGuess([1, 1]);
  let enemyShips = game.gameBoards[game.opponent].ships;
  let enemyGameboard = game.gameBoards[game.opponent];
  enemyGameboard.receiveAttack(coord);
  expect(enemyShips[0].hits).toEqual([[1, 1]]);
  expect(enemyGameboard.missedAttacks).toEqual([[3, 3]]);
  expect(game.over()).toBe(true);
});

describe("testing play funtion", () => {
  beforeAll(() => {
    game.gameBoards[0].placeShip([[4, 4]]);
    game.switchPlayers();
  });

  test("can play through rounds successfully", () => {
    let winner = game.play();
    expect(winner).toBe(game.players[game.current]);
    expect(game.gameBoards[game.opponent].missedAttacks).toEqual([[3, 3]]);
    expect(game.opponent).toBe(0);
    expect(game.gameBoards[game.opponent].ships.length).toBe(2);
  });
});
