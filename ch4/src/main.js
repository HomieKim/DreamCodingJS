"use strict";

import PopUp from "./popup.js";
import {GameBuilder, Reason} from "./game.js";
import * as sound from "./sound.js";

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION = 10;

const gameFinishBanner = new PopUp();

const game = new GameBuilder()
.gameDuration(GAME_DURATION)
.carrotCount(CARROT_COUNT)
.bugCount(BUG_COUNT)
.bulid();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
        message = 'Replay❓'
        sound.palayAlert();
      break;
    case Reason.win:
        message = 'YOU WIN🎉';
        sound.palayWin();
      break;
    case Reason.lose:
        message = 'YOU LOST😢'
        sound.palayBug();
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
