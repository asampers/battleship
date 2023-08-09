function AIGuess() {
  let guess = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  return guess;
}

const arraysAreEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export default function player(name) {
  const player = {
    name: name,
    previousGuesses: [],
    makeGuess(guess) {
      return guess ? guess : this.newRandomGuess();
    },
    newRandomGuess() {
      let guess = AIGuess();
      while (this.alreadyGuessed(guess)) {
        guess = AIGuess();
      }

      return guess;
    },
    alreadyGuessed(guess) {
      for (const previous of this.previousGuesses) {
        if (arraysAreEqual(previous, guess)) {
          return true;
        }
      }

      return false;
    },
    addGuess(guess) {
      this.previousGuesses.push(guess);
    },
  };

  return player;
}
