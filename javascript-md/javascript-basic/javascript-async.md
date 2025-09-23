# JavaScript 비동기 처리 마스터 가이드

## 1. 개요

이 문서는 JavaScript의 비동기(Asynchronous) 처리에 대한 핵심 개념과 동작 원리를 상세히 설명합니다. 이 문서를 통해 다음과 같은 내용을 학습할 수 있습니다.

### 학습 목표

- 비동기 처리의 개념과 필요성 이해
- 콜백 지옥(Callback Hell) 문제와 해결 방법 탐색
- JavaScript의 비동기 처리 메커니즘(이벤트 루프, 콜백 큐 등) 파악

---

## 2. 사전 학습

이 문서를 더 깊이 이해하기 위해 다음 개념에 대한 사전 지식이 있으면 좋습니다.

- **JavaScript 함수 및 콜백 함수**: 함수의 기본 개념과 다른 함수의 인자로 전달되는 콜백 함수에 대한 이해
- **스레드(Thread)**: 프로그램 내에서 작업을 처리하는 실행 단위

---

## 3. 핵심 개념: 스레드, 동기, 비동기

### 3.1. 스레드 (Thread)

- **정의**: 프로그램 내에서 코드를 실행하는 작업 처리 단위입니다.
- **JavaScript의 특징**: JavaScript는 **싱글 스레드(Single Thread)** 언어입니다. 이는 한 번에 하나의 작업만 처리할 수 있음을 의미합니다.

### 3.2. 동기적 처리 (Synchronous)

- **정의**: 하나의 작업이 완전히 끝날 때까지 다음 작업을 시작하지 않고 기다리는 처리 방식입니다.
- **특징**:
  - 코드가 작성된 순서대로 정확하게 실행됩니다.
  - 앞선 작업의 실행 시간이 길어지면 전체 프로그램의 실행이 지연되거나 멈추는 **블로킹(Blocking)** 이 발생합니다.

### 3.3. 비동기적 처리 (Asynchronous)

- **정의**: 시간이 오래 걸리는 작업을 별도의 공간(백그라운드)에서 처리하도록 위임하고, 그 작업이 끝날 때까지 기다리지 않고 다음 코드를 즉시 실행하는 방식입니다.
- **특징**:
  - 여러 작업을 동시에 처리하는 것처럼 보여 프로그램의 응답성을 높입니다.
  - 작업이 완료되는 순서는 예측할 수 없습니다.
  - 프로그램이 멈추지 않는 **논블로킹(Non-Blocking)** 방식으로 동작합니다.

### 3.4. 블로킹(Blocking)과 논블로킹(Non-Blocking) 요약

- **블로킹 (Blocking)**: 하나의 작업이 끝날 때까지 다음 작업을 막는 방식으로, **동기 처리**의 특징입니다.
- **논블로킹 (Non-Blocking)**: 하나의 작업이 끝날 때까지 기다리지 않고 다음 작업을 바로 실행하는 방식으로, **비동기 처리**의 특징입니다.

---

## 4. 문제 상황: 동기 처리의 한계

만약 모든 작업이 동기적으로 처리된다면 어떤 문제가 발생할까요?

```javascript
console.log("작업 1 시작");

// 5초 동안 CPU를 점유하는 무거운 작업 (예시)
let start = Date.now();
while (Date.now() - start < 5000) {
  // 5초 대기
}

console.log("작업 1 완료");
console.log("작업 2 시작");
```

### 문제점

- **프로그램 정지**: 위 코드를 실행하면 `while` 루프가 실행되는 5초 동안 브라우저(또는 프로그램)가 완전히 멈춥니다.
- **사용자 경험 저하**: 웹 서비스의 경우, 사용자는 5초 동안 아무런 클릭이나 입력도 할 수 없는 최악의 경험을 하게 됩니다.

---

## 5. 해결책: 비동기 처리의 도입

이러한 블로킹 문제를 해결하기 위해 비동기 처리를 사용합니다.

```javascript
console.log("작업 1 시작");

// setTimeout: 대표적인 비동기 API. 특정 시간 후에 콜백 함수를 실행하도록 위임합니다.
setTimeout(() => {
  console.log("작업 1 완료");
}, 5000);

// setTimeout은 작업을 위임하고 즉시 다음 코드를 실행합니다.
console.log("작업 2 시작");

// 실행 결과:
// 작업 1 시작
// 작업 2 시작
// (5초 후)
// 작업 1 완료
```

`setTimeout`은 5초를 기다리는 작업을 브라우저(Web API)에 위임하고, 자신은 즉시 다음 코드인 `console.log("작업 2 시작")`을 실행합니다. 덕분에 프로그램은 멈추지 않고 다른 작업을 계속할 수 있습니다.

---

## 6. JavaScript의 주요 비동기 처리 API

웹 브라우저나 Node.js 환경은 다양한 비동기 처리 API를 제공합니다. 이 API들은 대부분 **콜백 함수**를 인자로 받아 작업 완료 후 실행을 예약합니다.

### 6.1. `setTimeout()`

지정된 시간(delay)이 지난 후 콜백 함수를 **한 번** 실행합니다.

- **기본 구조**: `setTimeout(callback, delay);`
- **`callback`**: 지연 후 실행할 함수
- **`delay`**: 실행을 지연할 시간 (밀리초 단위, 1000ms = 1초)

#### 예시

```javascript
function printMessage(number) {
  console.log(number);
}

printMessage(1);

setTimeout(() => {
  printMessage(2);
}, 2000); // 2초 후 실행

printMessage(3);

// 실행 결과: 1, 3, (2초 후) 2
```

### 6.2. `setInterval()`

지정된 시간(delay)마다 콜백 함수를 **반복적으로** 실행합니다.

- **기본 구조**: `const intervalId = setInterval(callback, delay);`
- **`clearInterval(intervalId)`**: `setInterval`의 반복 실행을 중지시킵니다.

#### 예시

```javascript
function printMessage(number) {
  console.log(`현재 숫자: ${number}`);
}

let count = 0;

const intervalId = setInterval(() => {
  printMessage(count);
  count++;
  if (count === 3) {
    clearInterval(intervalId); // count가 3이 되면 반복 중지
    console.log("타이머 중지");
  }
}, 1000); // 1초마다 반복

// 실행 결과:
// 현재 숫자: 0
// (1초 후) 현재 숫자: 1
// (1초 후) 현재 숫자: 2
// (1초 후) 타이머 중지
```

### 6.3. `requestAnimationFrame()`

브라우저의 렌더링 주기에 맞춰 콜백 함수를 실행합니다. 주로 부드러운 애니메이션을 구현할 때 사용됩니다.

- **특징**:
  - 모니터 주사율(예: 60Hz, 144Hz)에 맞춰 콜백 함수를 실행하여 최적의 성능을 보장합니다.
  - **Node.js 환경에서는 사용할 수 없으며, 웹 브라우저에서만 사용 가능합니다.**
- **기본 구조**: `const animationFrameId = requestAnimationFrame(callback);`
- **`cancelAnimationFrame(animationFrameId)`**: 콜백 함수의 실행을 취소합니다.

#### 타이머 예시

```html
<html>
  <body>
    <h1>애니메이션 타이머</h1>
    <script>
      let startTime;
      let animationFrameId;

      // 콜백 함수: timestamp는 페이지 로드 후 경과 시간입니다.
      function updateTimerCallBack(timestamp) {
        if (startTime === undefined) {
          startTime = timestamp;
        }

        // 경과 시간 계산
        const elapsedTime = timestamp - startTime;
        console.log(`경과 시간: ${elapsedTime.toFixed(0)}ms`);

        // 재귀 호출을 통해 애니메이션을 계속 실행
        animationFrameId = requestAnimationFrame(updateTimerCallBack);
      }

      // 타이머 시작
      animationFrameId = requestAnimationFrame(updateTimerCallBack);
    </script>
  </body>
</html>
```

---

## 7. JavaScript 비동기 처리의 내부 동작 원리

JavaScript 엔진은 어떻게 싱글 스레드임에도 불구하고 비동기 처리를 할 수 있을까요? 그 비밀은 JavaScript가 실행되는 환경(브라우저, Node.js)에 있습니다.

### 7.1. 구성 요소

- **콜 스택 (Call Stack)**
  - 현재 실행 중인 함수의 목록을 관리하는 LIFO(Last-In, First-Out) 구조의 스택입니다.
  - JavaScript는 싱글 스레드이므로 콜 스택이 하나뿐입니다.
- **Web APIs (또는 Background)**
  - `setTimeout`, `fetch`, DOM 이벤트 등 비동기 작업을 처리하는 별도의 멀티 스레드 환경입니다.
  - JavaScript 엔진과 분리되어 독립적으로 동작합니다.
- **콜백 큐 (Callback Queue / Task Queue)**
  - Web API에서 처리 완료된 비동기 작업의 콜백 함수가 대기하는 FIFO(First-In, First-Out) 구조의 큐입니다.
- **이벤트 루프 (Event Loop)**
  - **콜 스택**과 **콜백 큐**를 지속적으로 감시하는 역할입니다.
  - **콜 스택이 비어있을 때**, 콜백 큐에서 대기 중인 가장 오래된 함수를 콜 스택으로 이동시켜 실행합니다.

### 7.2. 동작 예시

```javascript
function printMessage() {
  console.log("작업 완료");
}

setTimeout(printMessage, 3000); // 3초 후 실행
console.log("다른 작업 실행");
```

1.  `setTimeout(printMessage, 3000)`이 **콜 스택**에 추가된 후 즉시 실행됩니다.
2.  `setTimeout`은 `printMessage` 콜백 함수와 지연 시간 `3000ms`를 **Web API**에 전달하고, 자신은 콜 스택에서 제거됩니다.
3.  `console.log("다른 작업 실행")`이 **콜 스택**에 추가되고 실행된 후 제거됩니다. "다른 작업 실행"이 콘솔에 출력됩니다.
4.  **Web API**는 3초 타이머를 작동시킵니다.
5.  3초가 지나면, Web API는 `printMessage` 함수를 **콜백 큐**로 이동시킵니다.
6.  **이벤트 루프**는 콜 스택이 비어있는 것을 확인하고, 콜백 큐에 있던 `printMessage` 함수를 **콜 스택**으로 이동시킵니다.
7.  `printMessage` 함수가 실행되어 "작업 완료"가 콘솔에 출력됩니다.

---

## 8. 콜백 지옥 (Callback Hell)

여러 비동기 작업을 순차적으로 처리해야 할 때, 콜백 함수가 계속해서 중첩되는 현상이 발생합니다. 이를 **콜백 지옥**이라고 부릅니다.

### 예시 상황: 파일 읽기 → 처리 → 저장

```javascript
readFile("document.txt", (file) => {
  // 1. 파일 읽기 완료 후 실행
  console.log("파일 읽기 성공");
  processFile(file, (processedFile) => {
    // 2. 파일 처리 완료 후 실행
    console.log("파일 처리 성공");
    saveFile(processedFile, (savedFile) => {
      // 3. 파일 저장 완료 후 실행
      console.log("모든 작업 완료!");
    });
  });
});
```

- **문제점**:
  - 코드가 오른쪽으로 계속 파고들어 가독성이 급격히 저하됩니다.
  - 에러 처리와 디버깅이 매우 복잡해집니다.

이러한 콜백 지옥 문제를 해결하기 위해 ES6부터는 **Promise**와 **async/await**라는 더 발전된 비동기 처리 패턴이 도입되었습니다.
