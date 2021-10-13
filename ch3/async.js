
// 1. async
async function fetchUser(){
    // 이름을 리턴하는데 10초가 걸린다고 가정
    return 'ellie'
}

const user = fetchUser(); // 만약 비동기 처리 하지않으면 데이터를 가져오는데 10초가 걸린다(이벤트 루프 개념)

user.then(console.log);

// 2. await
function delay(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function getApple(){
    await delay(1000);
    return '🍎';
}

async function getBanana(){
    await delay(1000);
    return '🍌';
}

async function pickFruit(){
    const applePromise = getApple();
    const bananaPromise = getBanana();
    const apple = await applePromise;
    const banana = await bananaPromise;
    return `${apple} + ${banana}`;
}

pickFruit().then(console.log);

// 3. useful Promise APIs
function pickAllFruits() {
    return Promise.all([getApple(), getBanana()]).then(fruit => fruit.join(' + '));
    
}
pickAllFruits().then(console.log);

function pickOnlyOne(){
    return Promise.race([getApple(),getBanana()]);
}

pickOnlyOne().then(console.log);