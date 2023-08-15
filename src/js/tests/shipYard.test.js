import { ShipYard } from "../shipYard";

test("gives correct coordinates for horizontal", () => {
  let coords = ShipYard.getTotalCoords([1, 1]);
  expect(coords).toEqual([
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
  ]);
});

describe("testing changeOrientation", () => {
  beforeAll(() => {
    ShipYard.changeOrientation();
  });

  test("gives correct coordinates for vertical", () => {
    let coords = ShipYard.getTotalCoords([1, 1]);
    expect(coords).toEqual([
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
    ]);
  });
});

test("can launch ship", () => {
  ShipYard.launchShip();
  expect(ShipYard.shipLengths[0]).toBe(4);
});
