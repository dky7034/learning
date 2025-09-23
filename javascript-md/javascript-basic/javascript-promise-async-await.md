# JavaScript 비동기 마스터하기: Promise와 async/await

이 문서는 콜백 지옥을 해결하고 비동기 코드를 우아하게 작성하게 해주는 JavaScript의 `Promise`와 `async/await`에 대해 상세히 설명합니다.

---

## 1. 사전 학습

이 문서를 더 깊이 이해하기 위해 다음 개념에 대한 사전 지식이 있으면 좋습니다.

-   JavaScript 함수 및 콜백 함수
-   JavaScript 비동기 처리와 이벤트 루프

---

## 2. Promise: 비동기 처리의 약속

### 2.1. Promise란?

`Promise`는 비동기 작업의 최종 **성공(완료) 또는 실패**를 나타내는 객체입니다. 비동기 처리가 완료된 후 결과를 받아 처리하겠다는 '약속'과 같습니다.

### 2.2. Promise의 세 가지 상태

Promise는 항상 다음 세 가지 상태 중 하나를 가집니다.

-   **`Pending` (대기)**: 비동기 작업이 아직 시작되지 않았거나, 진행 중인 초기 상태입니다.
-   **`Fulfilled` (이행)**: 비동기 작업이 성공적으로 완료된 상태입니다. 이때 결과 값을 함께 반환합니다.
-   **`Rejected` (거절)**: 비동기 작업이 실패한 상태입니다. 이때 실패 원인(에러)을 함께 반환합니다.

**특징**: 한 번 `Fulfilled` 또는 `Rejected` 상태가 된 Promise는 다른 상태로 절대 변하지 않습니다. (불변성)

### 2.3. Promise 생성하기

`new Promise()` 생성자 함수를 사용하여 Promise 객체를 만듭니다. 이 생성자는 비동기 작업을 수행할 콜백 함수를 인자로 받으며, 이 콜백 함수는 `resolve`와 `reject`라는 두 개의 함수를 인자로 받습니다.

-   `resolve(value)`: 비동기 작업이 **성공**했을 때 호출하며, Promise를 `Fulfilled` 상태로 만들고 결과 `value`를 전달합니다.
-   `reject(error)`: 비동기 작업이 **실패**했을 때 호출하며, Promise를 `Rejected` 상태로 만들고 `error` 객체를 전달합니다.

```javascript
const myPromise = new Promise((resolve, reject) => {
  // 비동기 작업을 시뮬레이션하기 위해 setTimeout 사용
  setTimeout(() => {
    const randomNumber = Math.random();

    if (randomNumber > 0.5) {
      // 성공 시 resolve 호출
      resolve(`성공! 숫자는 ${randomNumber} 입니다.`);
    } else {
      // 실패 시 reject 호출
      reject(new Error(`실패! 숫자가 너무 낮습니다: ${randomNumber}`));
    }
  }, 1000);
});
```

### 2.4. Promise 사용하기: `.then()`, `.catch()`, `.finally()`

생성된 Promise는 후속 처리 메서드를 통해 결과를 다룰 수 있습니다.

-   `.then(onFulfilled)`: Promise가 `Fulfilled` 상태가 되면 실행됩니다. `resolve`가 전달한 결과 값을 인자로 받습니다.
-   `.catch(onRejected)`: Promise가 `Rejected` 상태가 되면 실행됩니다. `reject`가 전달한 에러 객체를 인자로 받습니다.
-   `.finally(onFinally)`: Promise의 성공/실패 여부와 관계없이 항상 마지막에 한 번 실행됩니다.

```javascript
myPromise
  .then((successMessage) => {
    // 성공(Fulfilled) 시 실행될 코드
    console.log(successMessage);
  })
  .catch((errorMessage) => {
    // 실패(Rejected) 시 실행될 코드
    console.error(errorMessage.message);
  })
  .finally(() => {
    // 성공하든 실패하든 항상 실행될 코드
    console.log("Promise 작업이 종료되었습니다.");
  });
```

### 2.5. Promise 체이닝 (Chaining)

`.then()` 메서드는 또 다른 Promise를 반환할 수 있어, 여러 비동기 작업을 순차적으로 연결하여 처리할 수 있습니다. 이를 **Promise 체이닝**이라고 합니다.

```javascript
new Promise((resolve, reject) => {
  resolve(1);
})
  .then((result1) => {
    console.log("첫 번째 then:", result1); // 1
    return result1 + 1; // 다음 then으로 2를 전달
  })
  .then((result2) => {
    console.log("두 번째 then:", result2); // 2
    return result2 + 2; // 다음 then으로 4를 전달
  })
  .then((result3) => {
    console.log("세 번째 then:", result3); // 4
  });
```

---

## 3. 콜백 지옥(Callback Hell)과 Promise를 이용한 해결

Promise의 가장 큰 장점 중 하나는 '콜백 지옥'을 해결하고 코드의 가독성을 높이는 것입니다.

### 3.1. 문제: 콜백 지옥

비동기 작업을 순차적으로 처리해야 할 때 콜백 함수가 계속 중첩되는 문제입니다.

```javascript
// 파일 읽기 -> 처리 -> 저장 순으로 실행하는 콜백 지옥 코드
readFile("document.txt", (file) => {
  processFile(file, (processedFile) => {
    saveFile(processedFile, (savedFile) => {
      console.log("모든 작업 완료");
    });
  });
});
```

### 3.2. 해결: Promise 체이닝

각 비동기 작업을 Promise를 반환하는 함수로 만들면, 코드를 평평하게 만들 수 있습니다.

```javascript
// 각 함수는 Promise를 반환한다고 가정
function readFile(filename) { /* ... */ }
function processFile(file) { /* ... */ }
function saveFile(processedFile) { /* ... */ }

readFile("document.txt")
  .then(file => processFile(file))
  .then(processedFile => saveFile(processedFile))
  .then(savedFile => console.log("모든 작업 완료"))
  .catch(error => console.error("작업 중 에러 발생:", error));
```
코드가 순차적으로 읽히고, 에러 처리도 `.catch` 하나로 통합되어 훨씬 깔끔해졌습니다.

---

## 4. async/await: 더 깔끔한 비동기 코드 작성법

`async/await`는 ES2017에 도입된, Promise를 동기 코드처럼 보이게 만드는 **문법적 설탕(Syntactic Sugar)** 입니다.

-   `async`: 함수 선언부 앞에 붙이며, 해당 함수가 항상 Promise를 반환한다는 것을 명시합니다.
-   `await`: `async` 함수 내부에서만 사용할 수 있으며, Promise가 `Fulfilled` 상태가 될 때까지 기다렸다가 결과 값을 반환합니다. 만약 Promise가 `Rejected`되면 에러를 발생시킵니다.

### 4.1. 기본 사용법 (try...catch)

`await`가 발생시키는 에러는 `try...catch` 구문으로 잡을 수 있습니다. 이는 `.catch()`의 역할을 대신합니다.

```javascript
// 2.3절에서 만든 myPromise를 재사용
async function handlePromise() {
  try {
    // myPromise가 완료될 때까지 기다림
    const result = await myPromise;
    console.log("성공 결과:", result);
  } catch (error) {
    // Promise가 reject되면 catch 블록이 실행됨
    console.error("실패 원인:", error.message);
  } finally {
    console.log("async/await 작업 종료");
  }
}

handlePromise();
```

---

## 5. async/await를 활용한 순차 및 병렬 처리

### 5.1. 순차 처리 (Sequential)

여러 `await`를 순서대로 나열하면 비동기 작업이 하나씩 순차적으로 실행됩니다.

```javascript
async function sequentialProcess() {
  console.time("순차 처리");

  const result1 = await someAsyncTask("작업1", 1000);
  const result2 = await someAsyncTask("작업2", 1000);
  const result3 = await someAsyncTask("작업3", 1000);

  console.log("순차 처리 완료");
  console.timeEnd("순차 처리"); // 약 3000ms 소요
}
```

### 5.2. 병렬 처리 (Parallel)

서로 의존성이 없는 여러 비동기 작업을 동시에 처리하려면 `Promise.all()`을 사용합니다. 이는 성능상 큰 이점을 가집니다.

`Promise.all()`은 Promise 배열을 인자로 받아 모든 Promise가 `Fulfilled`될 때까지 기다린 후, 모든 결과 값을 담은 배열을 반환합니다.

```javascript
async function parallelProcess() {
  console.time("병렬 처리");

  const results = await Promise.all([
    someAsyncTask("작업1", 1000),
    someAsyncTask("작업2", 1000),
    someAsyncTask("작업3", 1000),
  ]);

  console.log("병렬 처리 완료:", results);
  console.timeEnd("병렬 처리"); // 약 1000ms 소요
}
```

---

## 6. 결론

-   **Promise**는 비동기 작업의 상태와 결과를 관리하고, 콜백 지옥을 해결하는 강력한 패턴입니다.
-   **async/await**는 Promise를 기반으로, 비동기 코드를 동기 코드처럼 읽고 쓰기 쉽게 만들어 가독성을 극대화합니다.

현대 JavaScript 개발에서 이 두 가지 개념은 필수적이므로, 정확히 이해하고 활용하는 것이 중요합니다.
