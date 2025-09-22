# JavaScript 콜백 함수 (Callback Function)

## 개요

이 문서는 JavaScript의 핵심 개념 중 하나인 콜백(Callback) 함수에 대해 상세히 설명합니다. 이 문서를 통해 개발자는 다음 내용을 학습할 수 있습니다.

- 일급 객체로서의 JavaScript 함수의 특징
- 고차 함수(Higher-Order Function)와 콜백 함수의 개념 및 관계
- 콜백 함수의 필요성과 동기적/비동기적 활용 사례

### 사전 학습

이 문서를 이해하기 위해 JavaScript 함수와 기본 반복문에 대한 지식이 필요합니다.

## 일급 객체(First-Class Object)로서의 함수

JavaScript에서 함수는 **일급 객체(First-Class Object)**로 취급됩니다. 이는 함수가 다른 객체(예: 숫자, 문자열, 배열)처럼 다루어질 수 있음을 의미하며, 다음과 같은 특징을 가집니다.

1.  **변수에 할당할 수 있습니다.**
2.  **다른 함수의 인자(Argument)로 전달될 수 있습니다.**
3.  **다른 함수의 반환값(Return Value)으로 사용될 수 있습니다.**

이러한 특징은 함수형 프로그래밍의 기반이 되며, 콜백 함수와 고차 함수를 가능하게 하는 핵심 원리입니다.

### 1. 변수에 함수 할당

```javascript
// 함수 표현식을 사용하여 변수에 함수를 할당합니다.
const sayHello = (name) => {
  return `안녕하세요, ${name}님!`;
};

const greeting = sayHello; // 다른 변수에도 할당 가능

console.log(greeting("철수")); // "안녕하세요, 철수님!"
```

### 2. 함수의 인자로 함수 전달

```javascript
function applyOperation(func, number) {
  // 인자로 받은 함수(func)를 실행합니다.
  return func(number);
}

const double = (x) => x * 2;
const square = (x) => x * x;

// double 함수와 square 함수를 인자로 전달합니다.
console.log(applyOperation(double, 5)); // 10
console.log(applyOperation(square, 5)); // 25
```

### 3. 함수의 반환값으로 함수 사용

```javascript
function createMultiplier(multiplier) {
  // 함수를 생성하여 반환합니다.
  return (number) => {
    return number * multiplier;
  };
}

// createMultiplier가 반환한 함수를 변수에 할당합니다.
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 2 * 5 = 10
console.log(triple(5)); // 3 * 5 = 15
```

## 고차 함수와 콜백 함수

- **고차 함수 (Higher-Order Function)**: 다른 함수를 인자로 받거나, 함수를 반환하는 함수를 말합니다. 위 예제의 `applyOperation`과 `createMultiplier`가 고차 함수에 해당합니다.

- **콜백 함수 (Callback Function)**: 고차 함수의 인자로 전달되어, 고차 함수 내부에서 실행되는 함수를 말합니다. 위 예제의 `double`과 `square`가 콜백 함수에 해당합니다.

쉽게 비유하자면, "작업이 끝나면 이 번호로 전화주세요(Callback)"라고 요청하는 것과 같습니다. 여기서 '전화'라는 행위가 콜백 함수이며, 요청을 받아 작업을 수행하고 나중에 전화를 거는 주체가 고차 함수입니다.

### 콜백 함수의 기본 구조

```javascript
// 나중에 호출될 함수: 콜백 함수
function callbackFunction() {
  console.log("콜백 함수가 실행되었습니다.");
}

// 콜백 함수를 인자로 받는 함수: 고차 함수
function highOrderFunction(callback) {
  console.log("고차 함수 실행 중...");
  callback(); // 인자로 받은 콜백 함수를 실행
}

// 고차 함수에 콜백 함수를 전달하여 실행
highOrderFunction(callbackFunction);
```

## 콜백 함수의 필요성 및 활용

### 1. 코드의 재사용성 및 유연성 (동기적 콜백)

콜백 함수를 사용하면 반복되는 코드 구조를 하나로 묶고, 변화하는 부분만 콜백 함수로 주입하여 코드의 재사용성과 유연성을 크게 향상시킬 수 있습니다.

**콜백 함수를 사용하지 않은 경우**

덧셈, 곱셈, 뺄셈을 수행하는 각 함수에 공통적인 로직(작업 시작/완료 로그)이 중복됩니다.

```javascript
const add = (x, y) => {
  console.log(`작업 시작`);
  const result = x + y;
  console.log(`작업 완료`);
  console.log(`결과: ${result}`);
};

const multiply = (x, y) => {
  console.log(`작업 시작`);
  const result = x * y;
  console.log(`작업 완료`);
  console.log(`결과: ${result}`);
};

add(5, 3);
multiply(5, 3);
```

**콜백 함수를 사용한 경우**

공통 로직은 `performAction`이라는 고차 함수에 한 번만 정의하고, 실제 연산 부분만 콜백 함수(`add`, `multiply`)로 전달하여 중복을 제거합니다.

```javascript
// 고차 함수: 공통 로직 담당
function performAction(a, b, callback) {
  console.log(`작업 시작`);
  const result = callback(a, b); // 콜백 함수에 따라 다른 연산 수행
  console.log(`작업 완료`);
  console.log(`결과: ${result}`);
}

// 콜백 함수: 실제 연산 담당
const add = (x, y) => x + y;
const multiply = (x, y) => x * y;
const subtract = (x, y) => x - y;

performAction(5, 3, add); // 결과: 8
performAction(5, 3, multiply); // 결과: 15
performAction(5, 3, subtract); // 결과: 2
```

### 2. 비동기 처리 (비동기적 콜백)

콜백 함수의 가장 중요한 사용 사례는 **비동기(Asynchronous) 처리**입니다. 시간이 걸리는 작업(예: 서버에 데이터 요청, 파일 읽기, 타이머 설정)이 끝났을 때 특정 코드를 실행하도록 예약하는 데 사용됩니다.

`setTimeout`은 대표적인 비동기 함수이며, 두 번째 인자로 전달된 시간(ms)이 지난 후에 첫 번째 인자로 전달된 콜백 함수를 실행합니다.

```javascript
console.log("작업 1: 시작");

// 2초(2000ms) 후에 콜백 함수를 실행하도록 예약합니다.
setTimeout(() => {
  console.log("작업 2: 2초 후 실행된 콜백 함수");
}, 2000);

console.log("작업 3: setTimeout은 기다리지 않고 바로 실행됨");

// 출력 순서:
// 작업 1: 시작
// 작업 3: setTimeout은 기다리지 않고 바로 실행됨
// (2초 후)
// 작업 2: 2초 후 실행된 콜백 함수
```

## 콜백 지옥(Callback Hell)과 대안

비동기 처리를 위해 콜백 함수를 중첩해서 사용하다 보면 코드가 깊어지고 가독성이 떨어지는 **콜백 지옥(Callback Hell)** 현상이 발생할 수 있습니다.

```javascript
step1(function (value1) {
  step2(value1, function (value2) {
    step3(value2, function (value3) {
      // ... 계속 중첩
    });
  });
});
```

이러한 문제를 해결하기 위해 현대 JavaScript에서는 **`Promise`**와 **`async/await`** 구문을 사용하는 것이 일반적입니다. 이들은 비동기 코드를 마치 동기 코드처럼 더 깔끔하고 순차적으로 작성할 수 있도록 도와줍니다.
