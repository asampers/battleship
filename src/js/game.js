import gameboardFactory from "./gameboardFactory";
import player from "./player";

export default () => {
  const game = {
    players: [player("Player"), player("Computer")],
    gameBoards: [gameboardFactory(), gameboardFactory()],
    current: 0,
    opponent: 1,
    winner: false,
    playerShips() {
      return this.gameBoards[this.current].ships;
    },
    playerName() {
      return this.players[this.current].name;
    },
    opponentName() {
      return this.players[this.opponent].name;
    },
    playingAgainstComputer() {
      return this.players[1].name === "Computer";
    },
    isComputersTurn() {
      return this.players[this.current].name === "Computer";
    },
    switchPlayers() {
      this.current = this.current === 0 ? 1 : 0;
      this.opponent = this.opponent === 0 ? 1 : 0;
    },
    switchPlayersIfNeeded(attack) {
      if (attack === "miss") {
        this.switchPlayers();
      }
    },
    over() {
      return this.gameBoards[this.opponent].allShipsSunk();
    },
    takeTurn(guess) {
      let coord = this.players[this.current].makeGuess(guess);
      this.players[this.current].addGuess(coord);
      return this.gameBoards[this.opponent].receiveAttack(coord);
    },
    playRound(guess) {
      let status = this.takeTurn(guess);
      if (status == "sunk" && this.over()) {
        this.winner = true;
      }

      return status;
    },
  };

  return game;
};
