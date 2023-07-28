import shipFactory from "./shipFactory";

const ship = shipFactory(5);

test("should return an object", () => {
  expect(typeof shipFactory()).toBe("object");
});

test("should have correct length and num of hits", () => {
  expect(ship).toHaveProperty("length", 5);
  expect(ship).toHaveProperty("hits", []);
});

test("should record hits via hit function", () => {
  ship.hit(1);
  ship.hit(2);
  ship.hit(3);
  expect(ship.hits).toEqual([1, 2, 3]);
});

test("isSunk should return false when hits != ship.length", () => {
  expect(ship.isSunk()).toBe(false);
});

test("isSunk should return true when hits === ship.length", () => {
  ship.hit(4);
  ship.hit(5);
  expect(ship.hits.length).toBe(5);
  expect(ship.isSunk()).toBe(true);
});
