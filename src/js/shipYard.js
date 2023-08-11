function processCoords(e) {
  return [
    Number(e.target.getAttribute("data-x")),
    Number(e.target.getAttribute("data-y")),
  ];
}

function playerIsHuman(e) {
  return ["click", "mouseover", "mouseout"].includes(e.type);
}
function shipYard() {
  const shipYard = {
    shipLengths: [5, 4, 3, 3, 2],
    orientation: "h",
    changeOrientation() {
      this.orientation = this.orientation == "h" ? "v" : "h";
    },
    nextPosition(position) {
      if (this.orientation == "h") {
        return [position[0], position[1] + 1];
      } else if (this.orientation == "v") {
        return [position[0] + 1, position[1]];
      }
    },
    getTotalCoords(e) {
      let coord = playerIsHuman(e) ? processCoords(e) : e;
      let totalCoords = [coord];
      for (let i = 0; i < this.shipLengths[0] - 1; i++) {
        totalCoords.push(this.nextPosition(totalCoords[i]));
      }
      return totalCoords;
    },
    launchShip() {
      this.shipLengths.shift();
    },
    allShipsPlaced() {
      return this.shipLengths.length == 0;
    },
  };

  return shipYard;
}

export { shipYard };
