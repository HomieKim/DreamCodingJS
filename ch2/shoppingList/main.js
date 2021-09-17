const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');
const form = document.querySelector('.new_form');
/* 
    이벤트 위임 사용하기!
    click 이벤트를 items에 등록하고 delete 클릭되었을 때 삭제되게 만들기
    id를 설정해서 선택된 해당 요소만 삭제하게 만들기
*/

function onAdd(){
    /**
    addBtn 기능
    1. 사용자가 입력한 텍스트를 받아옴
    2. 새로운 아이템을 만듬(텍스트 _ 삭제 버튼)
    3. items  컨테이너안에 새로만든 아이템을 추가한다.
    4. 새로 써진 글에 스크롤링
    4. 인풋을 초기화 한다
     */
    
    const text = input.value;
    if(text ===''){
        input.focus();
        return;
    }
    const item = createItem(text);
    items.appendChild(item);
    item.scrollIntoView({block:'center'});
    input.value= '';
    input.focus();

}

let id = 0;// UUID로 사용하는 것 원래라면 이렇게 integer로 아이디 주는 건 좋지 않은 방법
function createItem(text){
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'list__item');
    itemRow.setAttribute('data-id', id);

    itemRow.innerHTML = `
        <div class="item"> 
            <span class="name">${text}</span>
            <button class="delete">
            <i class="fas fa-trash-alt" data-id=${id}></i>
            </button>
        </div>
        <div class="list__divider"></div>
    `;
    id++;
    // const item = document.createElement('div');
    // item.setAttribute('class', 'item');

    // const span = document.createElement('span');
    // span.setAttribute('class', 'name');
    // span.innerText = text;

    // const delBtn = document.createElement('button');
    // delBtn.setAttribute('class', 'delete');
    // delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // delBtn.addEventListener('click', ()=>{
    //     items.removeChild(itemRow);
    // });
    // item.appendChild(span);
    // item.appendChild(delBtn);


    // const itemDivider = document.createElement('div');
    // itemDivider.setAttribute('class', 'list__divider');

    // itemRow.appendChild(item);
    // itemRow.appendChild(itemDivider);

    return itemRow;
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    onAdd();
});

// addBtn.addEventListener("click", onAdd);
// // keypress 이벤트는 mdn에서 Deprecated로 표시되므로 사용하지 않는게 좋음 -> beforeinput이나 keydown 사용 권장
// input.addEventListener('keypress', (evnet) =>{
//     if(event.key == 'Enter'){
//         onAdd();
//     }
// });
items.addEventListener("click", (event)=>{
    const id = event.target.dataset.id;
    if(id){
        const toBeDelete = document.querySelector(`.list__item[data-id="${id}"]`);
        toBeDelete.remove();
    }
});