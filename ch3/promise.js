"use strict";
// 1. producer
const promise = new Promise((resolve, reject) => {
  //doing some heavy work
  console.log("doing something");
  setTimeout(() => {
    resolve("ellie");
  }, 2000);
});

// 2. consumer : then, catch, fianlly
promise
  .then((value) => {
    // value는 pomise정상적으로 실행 시 resolve로 전달된 값'
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("resolve, reject 상관없이 무조건 수행되는 finally");
  });

// 3. promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`🐇`), 1000);
  });

const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen} => 👌`), 1000);
  });

const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 😎`), 1000);
  });

getHen().then(getEgg).then(cook).then(console.log);
