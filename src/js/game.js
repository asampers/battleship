import gameboardFactory from "./gameboardFactory";
import shipFactory from "./shipFactory";
import player from "./player";

export default () => {
  const game = {
    players: [player(), player()],
    gameBoards: [gameboardFactory(), gameboardFactory()],
    current: 0,
    opponent: 1,
    switchPlayers() {
      [this.current, this.opponent] = [this.current === 0] ? [1, 0] : [0, 1];
    },
    over() {
      return this.gameBoards[this.opponent].allShipsSunk();
    },
  };

  return game;
};
