import Field from "./field.js";
import * as sound from "./sound.js";





export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.startButton = document.querySelector(".game__button");
    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");

    this.started = false;
    this.timer = undefined;
    this.score = 0;
    this.startButton.addEventListener("click", () => {
        if (this.started) {
          this.stop();
        } else {
          this.start();
        }
      });
    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onFieldClick);
  }




  setGameStopListener(onGameStop){
    this.onGameStop = onGameStop;
  }

  onFieldClick = (Item) => {
    if (!this.started) {
      return;
    }
    if (Item === "carrot") {
      this.score++;
      this.updateSocreBoard();
      if (this.score === this.carrotCount) {
        this.stopGameTimer();
        this.finish(true);
      }
    } else if (Item === "bug") {
      this.stopGameTimer();
      this.finish(false);
    }
  };

  start() {
    this.started = true;
    this.gameScore.innerText =  this.carrotCount;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startTimer();
    sound.palayBackground();
  }
  stop() {
    this.started = false;
    this.stopGameTimer();
    sound.palayAlert();
    sound.stopBackground();
    this.onGameStop && this.onGameStop('cancel');
  }

  finish(rst) {
    this.started = false;
    this.hideStartButton();
    if (rst) {
      sound.palayWin();
      sound.stopBackground();
    } else {
      sound.palayBug();
      sound.stopBackground();
    }
    this.onGameStop && this.onGameStop(rst ? 'win' : 'lose');
  }

  updateSocreBoard() {
    this.gameScore.innerText =  this.carrotCount - this.score;
  }

  stopGameTimer() {
    clearInterval(this.timer);
    this.hideStartButton();
  }
  hideStartButton() {
    this.startButton.style.visibility = "hidden";
  }
  showStartButton() {
    this.startButton.style.visibility = "";
  }
  showStopButton() {
    const icon = this.startButton.querySelector("i");
    if (icon.classList.contains("fa-play")) {
      icon.classList.add("fa-pause");
      icon.classList.remove("fa-play");
    }
  }

  startTimer() {
    let remainSec = this.gameDuration;
    this.updateTimerText(remainSec);
    this.timer = setInterval(() => {
      if (remainSec <= 0) {
        clearInterval(this.timer);
        this.finish( this.carrotCount === this.score);
        return;
      }
      this.updateTimerText(--remainSec);
    }, 1000);
  }

  updateTimerText(time) {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    this.gameTimer.innerText = `${min}:${sec}`;
  }

  showTimerAndScore() {
    this.gameScore.style.visibility = "visible";
    this.gameTimer.style.visibility = "visible";
  }

  initGame() {
    clearInterval(this.timer);
    this.score = 0;
    this.showStartButton();
    this.gameField.init();
  }
}
