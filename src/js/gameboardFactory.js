import shipFactory from "./shipFactory";

export default function gameboardFactory() {
  const gameboard = {
    ships: [],
    missedAttacks: [],
    placeShip(coord) {
      const ship = shipFactory(coord.length);
      ship.coordinates = coord;
      this.ships.push(ship);
    },
    receiveAttack(coord) {},
    allShipsSunk() {},
  };

  return gameboard;
}
