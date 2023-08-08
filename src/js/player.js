function AIGuess() {
  let guess = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  return guess;
}

const arraysAreEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

function alreadyGuessed(guess, previousGuesses) {
  for (const previous of previousGuesses) {
    if (arraysAreEqual(previous, guess)) {
      return true;
    }
  }

  return false;
}

export default function player(name) {
  const player = {
    name: name,
    previousGuesses: [],
    makeGuess(guess) {
      return guess ? guess : this.newRandomGuess();
    },
    newRandomGuess() {
      let guess = AIGuess();
      while (alreadyGuessed(guess, this.previousGuesses)) {
        guess = AIGuess();
      }
      this.previousGuesses.push(guess);

      return guess;
    },
  };

  return player;
}
