export default function player(name) {
  const player = {
    name: name,
    makeGuess(coord) {
      return coord;
    },
  };

  return player;
}
