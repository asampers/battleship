// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import { gameInitialize } from "./dom4Game";
import Game from "./game";
import { placeShipsHuman, rKeyListenter } from "./humanPlayer";

const game = Game();
gameInitialize();
placeShipsHuman();

window.addEventListener("keydown", rKeyListenter);

export { game };
