"use strict";

import PopUp from "./popup.js";
import Game from "./game.js";

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION = 10;

const gameFinishBanner = new PopUp();

const game = new Game(GAME_DURATION, CARROT_COUNT, BUG_COUNT);
game.setGameStopListener((reason) => {
  console.log(reason);
  let message;
  switch (reason) {
    case "cancel":
        message = 'Replay❓'
      break;
    case "win":
        message = 'YOU WIN🎉';
      break;
    case "lose":
        message = 'YOU LOST😢'
      break;
    default:
        throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});


gameFinishBanner.setClickListener(() => {
    game.start();
  });




  
//gameFild.addEventListener('click', onFieldClick);
