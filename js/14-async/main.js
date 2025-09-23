// 비동기 처리 함수
// setTimeout, setInterval, fetch ...

// setTimeout(콜백, 밀리초)
// 밀리초 뒤에 콜백함수를 실행하는 비동기처리 함수
// function pringMesssage() {
//   console.log("5초 뒤 실행");
// }

// setTimeout(() => {
//   pringMesssage();
// }, 5000);

// console.log("setTimeout 전 코드");

// setTimeout(() => {
//   console.log("5000ms 후 실행");
// }, 5000);

// console.log("setTimeout 후 코드");

// console.log("시작"); // 콜 스택에 push - 실행 - pop

// // 콜 스택에 push - 비동기 함수이므로 WebAPIs에 등록 - pop - 콜백함수는 콜백 큐로 offer
// setTimeout(() => {
//   console.log("1000ms 후 실행"); // 콜 스택이 비어있으면 이벤트 루프에 의해 콜백함수가 다시 콜 스택에 push - 실행 - pop
// }, 1000);

// // 콜 스택에 push - 비동기 함수이므로 WebAPIs에 등록 - pop
// setTimeout(() => {
//   console.log("2000ms 후 실행");
// }, 2000);

// // 콜 스택에 push - 비동기 함수이므로 WebAPIs에 등록 - pop
// setTimeout(() => {
//   console.log("3000ms 후 실행");
// }, 3000);

// console.log("끝"); // 콜 스택에 push - 실행 - pop

// 출력 순서
// 시작 - 스택에 첫 번째로 push, 실행 후 바로 pop
// 끝 - 스택에 두 번째로 push, 실행 후 바로 pop
// 1000ms 후 실행 - 스택이 비어있으므로 이벤트 루프에 의해 스택으로 push, 실행 후 바로 pop
// 2000ms 후 실행
// 3000ms 후 실행

// Promise 객체
// 비동기 처리의 성공과 실패
// 예) 네트워크 통신의 성공과 실패
// 성공 상태일 때 수행할 처리 메서드
// Promise데이터.then(콜백함수)

// 실패 상태일 때 수행할 처리 메서드
// Promise데이터.catch(콜백함수)
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const randomNumber = Math.random();

    if (randomNumber > 0.5) {
      resolve(`성공! 숫자는 ${randomNumber}입니다.`);
    } else {
      reject(new Error(`실패! 숫자는 ${randomNumber}입니다.`));
    }
  }, 1000);
});

promise
  .then((successMessage) => {
    console.log("fulfilled:", successMessage);
  })
  .catch((err) => {
    console.log("rejected:", err);
  });

// fetch: 네트워크 통신 함수
fetch("https://example.com")
  .then((response) => {
    console.log(response);
    return response.text();
  })
  .then((responseText) => {
    console.log(responseText.length);
    console.log(responseText);
    return responseText.length;
  })
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
