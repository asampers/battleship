import Game from "./game";

const game = Game();

beforeAll(() => {
  game.gameBoards[0].placeShip([[1, 1]]);
  game.gameBoards[1].placeShip([[2, 2]]);
});

test("can tell when game is not over", () => {
  expect(game.over()).toBe(false);
  expect(game.winner).toBe(false);
});

test("can tell when game is over", () => {
  game.playRound([2, 2]);
  expect(game.over()).toBe(true);
  expect(game.winner).toBe(true);
});

describe("testing playRound function", () => {
  beforeAll(() => {
    game.gameBoards[0].placeShip([
      [4, 4],
      [5, 4],
    ]);
    game.gameBoards[1].placeShip([[5, 5]]);
  });

  test("can record a miss and switchPlayers", () => {
    expect(game.current).toBe(0);
    let status = game.playRound([6, 6]);
    expect(status).toBe("miss");
    expect(game.current).toBe(1);
  });

  test("can record a hit and NOT switchPlayers", () => {
    let status = game.playRound([4, 4]);
    expect(status).toBe("hit");
    expect(game.current).toBe(1);
  });

  test("can record a sunk ship and NOT switchPlayers", () => {
    let status = game.playRound([5, 4]);
    expect(status).toBe("sunk");
    expect(game.current).toBe(1);
  });

  test("can set winner when game is over", () => {
    let status = game.playRound([1, 1]);
    let winner = game.players[game.current].name;
    expect(status).toBe("sunk");
    expect(game.winner).toBe(true);
    expect(winner).toBe("Computer");
  });
});
