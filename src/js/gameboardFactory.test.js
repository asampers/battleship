import gameboardFactory from "./gameboardFactory";

const gameboard = gameboardFactory();
gameboard.placeShip([
  [1, 1],
  [1, 2],
  [1, 3],
]);
const placedShip = gameboard.ships[0];

test("it can place a ship", () => {
  expect(placedShip.length).toBe(3);
  expect(placedShip.coordinates).toEqual([
    [1, 1],
    [1, 2],
    [1, 3],
  ]);
});

test("can record a hit", () => {
  gameboard.receiveAttack([1, 1]);
  expect(gameboard.missedAttacks).toEqual([]);
  expect(placedShip.hits).toEqual([[1, 1]]);
});
