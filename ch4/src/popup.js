'use strict'

export default class PopUp{
    constructor(){
    this.pop = document.querySelector('.pop-up');
    this.pop__message = document.querySelector('.pop-up__message');
    this.pop__refresh = document.querySelector('.pop-up__refresh');
    this.pop__refresh.addEventListener('click', ()=>{
        this.onClick && this.onClick();
        this.hide();
    });
    }

    setClickListener(onClick){
        this.onClick = onClick;
    }

    showWithText(text){
        this.pop__message.innerText = text;
        this.pop.classList.remove('pop-up__hide');
    }

    hide(){
        this.pop.classList.add('pop-up__hide');
    }
}

