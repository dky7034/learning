# Promise 실행 원리 심층 분석: resolve, then, 그리고 이벤트 루프

이 문서는 `Promise`가 생성되고 상태가 전환될 때, `.then()`, `.catch()`, `.finally()` 콜백이 어떤 원리로 실행되는지 그 내부 동작을 심층적으로 분석합니다. 코드 예제와 타임라인 스냅샷을 통해 이벤트 루프와의 상호작용을 명확히 이해하는 것을 목표로 합니다.

---

## 1. 핵심 구성 요소의 역할

먼저 각 요소의 역할을 정확히 정의해 보겠습니다.

-   **`new Promise(executor)`**: Promise 객체를 생성합니다. `executor`라는 실행 함수는 즉시 동기적으로 실행됩니다.
-   **`resolve(value)`**: `executor` 내부에서 호출되며, Promise의 상태를 `pending`에서 `fulfilled`로 바꾸고, 결과 `value`를 Promise 내부에 저장하는 **상태 전환 트리거**입니다.
-   **`reject(reason)`**: `executor` 내부에서 호출되며, 상태를 `pending`에서 `rejected`로 바꾸고, 실패 원인 `reason`을 저장하는 **상태 전환 트리거**입니다.
-   **`.then(onFulfilled)`**: Promise가 `fulfilled` 상태가 되었을 때 그 결과 값을 받아 처리할 콜백 함수(`onFulfilled`)를 **마이크로태스크 큐에 등록**하는 메서드입니다.
-   **`.catch(onRejected)`**: Promise가 `rejected` 상태가 되었을 때 그 실패 원인을 받아 처리할 콜백 함수(`onRejected`)를 **마이크로태스크 큐에 등록**하는 메서드입니다.
-   **`.finally(onFinally)`**: 성공/실패 여부와 관계없이, Promise가 처리된 후 항상 실행될 콜백(`onFinally`)을 **마이크로태스크 큐에 등록**합니다.

> **가장 중요한 점**: `.then`, `.catch`, `.finally`는 **즉시 실행되지 않습니다.** 이들은 미래에 실행될 콜백 함수를 예약(등록)하는 역할을 하며, 실제 실행은 이벤트 루프의 마이크로태스크 처리 규칙에 따릅니다.

---

## 2. 전체 흐름을 보여주는 예제 코드

아래 코드는 `resolve`/`reject`와 `then`/`catch`의 상호작용을 모두 포함하고 있습니다.

```javascript
console.log("① 스크립트 시작");

const p = new Promise((resolve, reject) => {
  console.log("② Promise executor 실행");

  setTimeout(() => {
    console.log("③ 타이머 콜백 실행 (매크로태스크)");
    const ok = Math.random() > 0.5;
    if (ok) {
      // 상태: pending → fulfilled
      resolve("성공 값");
    } else {
      // 상태: pending → rejected
      reject(new Error("실패 이유"));
    }
  }, 0);
});

p.then((value) => {
  console.log("④ then 콜백 (마이크로태스크):", value);
}).catch((err) => {
  console.log("⑤ catch 콜백 (마이크로태스크):", err.message);
}).finally(() => {
  console.log("⑥ finally 콜백 (마이크로태스크)");
});

console.log("⑦ 스크립트 끝");
```

---

## 3. 시간 순으로 따라가는 실행 흐름 (타임라인 스냅샷)

### 3.1. 1단계: 동기 코드 실행 (Synchronous Execution)

스크립트가 처음 실행될 때, 콜 스택에 있는 모든 동기 코드가 즉시 처리됩니다.

1.  `console.log("① 스크립트 시작")` 실행.
2.  `new Promise()`의 `executor` 함수가 **즉시 동기적으로 실행**되어 `console.log("② ...")`가 출력됩니다.
3.  `setTimeout`이 Web APIs에 타이머(0ms) 등록을 요청합니다.
4.  `.then`, `.catch`, `.finally`는 Promise `p`에 각각의 콜백 함수를 **등록**만 하고 지나갑니다.
5.  `console.log("⑦ 스크립트 끝")` 실행.

| Call Stack | Web APIs | Microtask Queue | Macrotask Queue |
| :--- | :--- | :--- | :--- |
| `main()` | `Timer(0ms)` | (비어있음) | (비어있음) |

이 단계가 끝나면 모든 동기 코드가 실행되고 콜 스택은 비워집니다.

### 3.2. 2단계: 타이머 만료 (Macrotask Queued)

-   Web APIs에서 0ms 타이머가 즉시 만료되고, `setTimeout`의 콜백 함수(③번)를 **매크로태스크 큐**로 보냅니다.

| Call Stack | Web APIs | Microtask Queue | Macrotask Queue |
| :--- | :--- | :--- | :--- |
| (비어있음) | (비어있음) | (비어있음) | `[타이머 콜백]` |

### 3.3. 3단계: 매크로태스크 실행 및 Promise 상태 변경

-   이벤트 루프는 콜 스택이 비어있음을 확인하고, 매크로태스크 큐에서 타이머 콜백을 꺼내 콜 스택으로 옮겨 실행합니다.
-   `console.log("③ ...")`가 출력됩니다.
-   `resolve()` 또는 `reject()`가 호출됩니다. **바로 이 순간, Promise의 상태가 변경됩니다.**
-   상태 변경과 함께, 이 Promise에 연결되어 있던 `.then` 또는 `.catch` 콜백과 `.finally` 콜백이 **마이크로태스크 큐**에 등록됩니다.

| Call Stack | Web APIs | Microtask Queue | Macrotask Queue |
| :--- | :--- | :--- | :--- |
| `타이머 콜백` | (비어있음) | `[then/catch, finally]` | (비어있음) |

### 3.4. 4단계: 마이크로태스크 실행

-   타이머 콜백 실행이 끝나 콜 스택이 다시 비워집니다.
-   이벤트 루프는 다음 매크로태스크를 확인하기 **전에**, **마이크로태스크 큐를 먼저 확인**합니다.
-   마이크로태스크 큐에 있는 모든 작업(`then` 또는 `catch`, 그리고 `finally` 콜백)을 순서대로 콜 스택으로 옮겨 모두 실행합니다.
-   `console.log("④ ...")` 또는 `console.log("⑤ ...")`가 출력됩니다.
-   `console.log("⑥ ...")`가 출력됩니다.

---

## 4. 최종 실행 순서 요약

위 과정을 거쳐 나타나는 최종 출력 순서는 두 가지 경우로 나뉩니다.

-   **성공 시**: ① → ② → ⑦ → ③ → ④ (`then`) → ⑥ (`finally`)
-   **실패 시**: ① → ② → ⑦ → ③ → ⑤ (`catch`) → ⑥ (`finally`)

**핵심 이유**: 동기 코드(①, ②, ⑦)가 가장 먼저 실행됩니다. 그 후 이벤트 루프는 매크로태스크(③)를 실행합니다. 이 매크로태스크 안에서 `resolve`/`reject`가 호출되면서 마이크로태스크(④/⑤, ⑥)가 큐에 등록되고, 매크로태스크가 끝나자마자 즉시 실행됩니다.

---

## 5. Promise 상태 흐름 도식

`resolve`/`reject`와 `then`/`catch`의 관계를 시각적으로 표현하면 다음과 같습니다.

```
           ┌─────────── resolve(value) ───────────┐
new Promise ─► pending ─────────────────► fulfilled ──► .then(onFulfilled)
           └──────────── reject(reason) ───────────┘
                                      └──► rejected ──► .catch(onRejected)

(어느 쪽이든 공통) ──────────────────────────────────► .finally(onFinally)

※ .then/.catch/.finally 콜백들은 "마이크로태스크 큐"에서 실행됩니다.
```

---

## 6. 핵심 정리

-   `resolve`/`reject`는 Promise의 **상태를 바꾸는 트리거**이며, Promise 내부에 결과(값 또는 이유)를 저장합니다.
-   `.then`/`.catch`는 그 결과를 소비하기 위해 **콜백을 마이크로태스크 큐에 등록**하는 예약 메서드입니다.
-   이벤트 루프의 실행 우선순위는 항상 **`콜 스택(동기)` → `마이크로태스크 큐` → `매크로태스크 큐`** 순입니다.
-   Promise의 상태는 한 번 `fulfilled` 또는 `rejected`가 되면 절대 변하지 않습니다.
