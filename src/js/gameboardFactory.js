import shipFactory from "./shipFactory";

const arraysAreEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

function getHitShip(coord, ships) {
  let hitShip = null;
  for (const ship of ships) {
    ship.coordinates.forEach((position) => {
      if (arraysAreEqual(position, coord)) {
        return (hitShip = ship);
      }
    });
  }

  return hitShip;
}

export default function gameboardFactory() {
  const gameboard = {
    ships: [],
    missedAttacks: [],
    placeShip(coord) {
      const ship = shipFactory(coord.length);
      ship.coordinates = coord;
      this.ships.push(ship);
    },
    receiveAttack(coord) {
      let hitShip = getHitShip(coord, this.ships);

      hitShip ? hitShip.hit(coord) : this.missedAttacks.push(coord);
      if (hitShip && hitShip.isSunk()) {
        return "sunk";
      }
      return hitShip ? "hit" : "miss";
    },

    allShipsSunk() {
      return this.ships.every((ship) => ship.isSunk());
    },

    remainingShips() {
      let remainingShips = this.ships.length;
      for (const ship of this.ships) {
        if (ship.isSunk()) {
          remainingShips -= 1;
        }
      }
      return remainingShips;
    },
  };

  return gameboard;
}
