import gameboardFactory from "./gameboardFactory";
import player from "./player";

export default () => {
  const game = {
    players: [player("Player"), player("Computer")],
    gameBoards: [gameboardFactory(), gameboardFactory()],
    current: 0,
    opponent: 1,
    winner: false,
    switchPlayers() {
      this.current = this.current === 0 ? 1 : 0;
      this.opponent = this.opponent === 0 ? 1 : 0;
    },
    over() {
      return this.gameBoards[this.opponent].allShipsSunk();
    },
    takeTurn(guess) {
      let coord = this.players[this.current].makeGuess(guess);
      return this.gameBoards[this.opponent].receiveAttack(coord);
    },
    playRound(guess) {
      let status = this.takeTurn(guess);
      if (status === "miss") {
        this.switchPlayers();
      }
      if (status == "sunk" && this.over()) {
        this.winner = true;
      }

      return status;
    },
  };

  return game;
};
