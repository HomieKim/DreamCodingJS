const carrot_sound = new Audio('./sound/carrot_pull.mp3');
const alert_sound = new Audio('./sound/alert.wav');
const bug_sound = new Audio('./sound/bug_pull.mp3');
const win_sound = new Audio('./sound/game_win.mp3');
const bg_sound = new Audio('./sound/bg.mp3');

export function palyCarrot(){
    playSound(carrot_sound);
}

export function palayBug(){
    playSound(bug_sound);
}

export function palayAlert(){
    playSound(alert_sound);
}

export function palayWin(){
    playSound(win_sound);
}

export function palayBackground(){
    playSound(bg_sound);
}

export function stopBackground(){
   stopSuond(bg_sound);
}


function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSuond(sound){
    sound.pause();
}