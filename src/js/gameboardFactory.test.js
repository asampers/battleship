import gameboardFactory from "./gameboardFactory";

const gameboard = gameboardFactory();

test("it can place a ship", () => {
  gameboard.placeShip([
    [1, 1],
    [1, 2],
    [1, 3],
  ]);
  const placedShip = gameboard.ships[0];
  expect(placedShip.length).toBe(3);
  expect(placedShip.coordinates).toEqual([
    [1, 1],
    [1, 2],
    [1, 3],
  ]);
});
