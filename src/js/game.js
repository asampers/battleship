import gameboardFactory from "./gameboardFactory";
import shipFactory from "./shipFactory";
import player from "./player";

export default () => {
  const game = {
    players: [player(), player()],
    gameBoards: [gameboardFactory(), gameboardFactory()],
    currentPlayer: 0,
    enemyPlayer: 1,
    switchPlayers() {
      [this.currentPlayer, this.enemyPlayer] = [
        this.currentPlayer === 0,
        this.enemyPlayer === 1,
      ]
        ? [1, 0]
        : [0, 1];
    },
    over() {
      return this.gameBoards[this.enemyPlayer].allShipsSunk();
    },
  };

  return game;
};
