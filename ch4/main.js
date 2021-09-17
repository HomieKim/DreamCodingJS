'use strict';

const field = document.querySelector('.game__field');
const fieldRec = field.getBoundingClientRect();
const startButton = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const pop = document.querySelector('.pop-up');
const pop__message = document.querySelector('.pop-up__message');
const pop__refresh = document.querySelector('.pop-up__refresh');

const carrot_sound = new Audio('./sound/carrot_pull.mp3');
const alert_sound = new Audio('./sound/alert.wav');
const bug_sound = new Audio('./sound/bug_pull.mp3');
const win_sound = new Audio('./sound/game_win.mp3');
const bg_sound = new Audio('./sound/bg.mp3');

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION = 10;

let start = false;
let timer = undefined;
let score = 0;


function initGame(){
    console.log(fieldRec);
    addItem('carrot', CARROT_COUNT, 'img/carrot.png')
    addItem('bug', BUG_COUNT, 'img/bug.png')
}

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRec.width - CARROT_SIZE;
    const y2 = fieldRec.height- CARROT_SIZE;
    for(let i = 0; i < count;i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNum(x1, x2);
        const y = randomNum(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNum(min, max){
    return Math.random() * (max-min) +min;
}

startButton.addEventListener('click',()=>{

    if(start){
        stopGame();
    }else{
        startGame();
    }
    
});
pop__refresh.addEventListener('click',()=>{
    clearInterval(timer);
    score = 0;
    pop.classList.add('pop-up__hide');
    showStartButton();
    startGame();
});

field.addEventListener('click', onFieldClick);

function onFieldClick(event){
    if(!start){
        return;
    }
    const target =event.target;
    if(target.matches('.carrot')){
        target.remove();
        score++;
        playSound(carrot_sound);
        updateSocreBoard();
        if(score === CARROT_COUNT){
            stopGameTimer();
            fnishGame(true);
        }
    }else if(target.matches('.bug')){
        stopGameTimer();
        fnishGame(false);
    }
}
function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSuond(sound){
    sound.pause();
}
function updateSocreBoard(){
    gameScore.innerText =  CARROT_COUNT - score;
}
function startGame(){
    start =true;
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    initGame();
    showStopButton();
    showTimerAndScore();
    startTimer();
    playSound(bg_sound);
}
function stopGame(){
    start= false;
    stopGameTimer()
    showPopuUp_Text('RETRY❓🐇');
    playSound(alert_sound);
    stopSuond(bg_sound);
}
function fnishGame(rst){
    start =false;
    hideStartButton();
    if(rst){
        playSound(win_sound);
        stopSuond(bg_sound);
    }else{
        playSound(bug_sound);
        stopSuond(bg_sound);
    }
    showPopuUp_Text(rst ? 'YOU WON✨' : 'YOU LOST😫')

    
}
function showPopuUp_Text(text) {
    pop.classList.remove('pop-up__hide');
    pop__message.innerText = `${text}`;
}
function stopGameTimer(){
    clearInterval(timer);
    hideStartButton();
    
}
function hideStartButton(){
    startButton.style.visibility = 'hidden';
}
function showStartButton(){
    startButton.style.visibility = '';
}
function showStopButton(){
    
    const icon = startButton.querySelector('i');
    if(icon.classList.contains('fa-play')){
        icon.classList.add('fa-pause');
        icon.classList.remove('fa-play');
    }
}

function startTimer(){
    let remainSec = GAME_DURATION; 
    updateTimerText(remainSec);
    timer = setInterval(()=>{
        if(remainSec <= 0){
            clearInterval(timer);
            fnishGame(CARROT_COUNT === score)
            return;
        }
        updateTimerText(--remainSec);
    }, 1000)
}

function updateTimerText(time){
    const min = Math.floor(time/60);
    const sec = time%60;
    gameTimer.innerText = `${min}:${sec}`;
}

function showTimerAndScore(){
    gameScore.style.visibility = 'visible';
    gameTimer.style.visibility = 'visible';
}