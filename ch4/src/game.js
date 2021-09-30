import {Field,  ItemType } from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  win : 'win',
  lose : 'lose',
  cancel : 'cancel',
});


//Builder pattern
export class GameBuilder {
  gameDuration(duration){
    this.gameDuration = duration;
    return this;
  }

  carrotCount(num){
    this.carrotCount = num;
    return this;
  }

  bugCount(num){
    this.bugCount = num;
    return this;
  }

  bulid(){
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    )
  }
}

 class Game {
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
          this.stop(Reason.cancel);
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
    if (Item === ItemType.carrot) {
      this.score++;
      this.updateSocreBoard();
      if (this.score === this.carrotCount) {
        this.stopGameTimer();
        this.stop(Reason.win);
      }
    } else if (Item === ItemType.bug) {
      this.stopGameTimer();
      this.stop(Reason.lose);
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
  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideStartButton();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
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
        this.stop( this.carrotCount === this.score ? Reason.win : Reason.lose);
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
