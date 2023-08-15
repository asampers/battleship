import gameboardFactory from "../gameboardFactory";

const gameboard = gameboardFactory();
gameboard.placeShip([
  [1, 1],
  [1, 2],
  [1, 3],
]);
const placedShip = gameboard.ships[0];

test("can place a ship", () => {
  expect(placedShip.length).toBe(3);
  expect(placedShip.coordinates).toEqual([
    [1, 1],
    [1, 2],
    [1, 3],
  ]);
});

test("can record a hit", () => {
  let attack = gameboard.receiveAttack([1, 1]);
  expect(gameboard.missedAttacks).toEqual([]);
  expect(placedShip.hits).toEqual([[1, 1]]);
  expect(attack).toBe("hit");
});

test("can record a miss", () => {
  let attack = gameboard.receiveAttack([2, 1]);
  expect(gameboard.missedAttacks).toEqual([[2, 1]]);
  expect(attack).toBe("miss");
});

test("can tell when ships not all sunk", () => {
  expect(gameboard.allShipsSunk()).toBe(false);
});

test("can tell when all ships sunk", () => {
  gameboard.receiveAttack([1, 2]);
  gameboard.receiveAttack([1, 3]);
  expect(gameboard.allShipsSunk()).toBe(true);
});

test("can tell when ships not all sunk with 2+ ships", () => {
  gameboard.placeShip([[2, 2]]);
  expect(gameboard.allShipsSunk()).toBe(false);
});

test("can tell when all ships sunk with 2+ ships", () => {
  gameboard.receiveAttack([2, 2]);
  expect(gameboard.allShipsSunk()).toBe(true);
});
