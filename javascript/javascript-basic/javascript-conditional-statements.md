# JavaScript 조건문 (Conditional Statements)

이 문서는 JavaScript의 조건문에 대해 설명합니다. 문서를 통해 다음 내용을 학습할 수 있습니다.

- `if`, `else if`, `else`를 사용한 기본적인 조건 분기 방법
- 여러 조건을 처리하는 방법과 중첩 조건문 사용법
- 간단한 조건 처리를 위한 삼항 연산자 활용법
- `switch` 문의 기본 구조와 사용 사례

---

## 사전 학습

- **JavaScript 연산자**: 비교 연산자와 논리 연산자에 대한 이해가 필요합니다.
- **JavaScript 변수**: 조건식에서 변수를 활용하는 방법에 대한 이해가 필요합니다.

---

## 조건문(Conditional Statement)이란?

**조건문**은 주어진 **조건식(conditional expression)**의 평가 결과가 `true`인지 `false`인지에 따라 코드의 실행 흐름을 제어하는 **제어문**입니다. 데이터, 변수, 비교 연산자, 논리 연산자 등을 조합하여 조건식을 작성할 수 있습니다.

### 조건문의 종류

- `if...else if...else` 문
- 삼항 연산자 (Ternary Operator)
- `switch` 문

### 조건식의 평가

조건식의 결과가 `true` 또는 `false`로 평가되는 과정을 의미합니다.

```javascript
let x = 5;

// 이 조건식은 true로 평가됩니다.
console.log(x >= 5); // true

// 이 조건식은 false로 평가됩니다.
console.log(x < 5); // false
```

---

## 1. `if...else if...else` 문

가장 일반적으로 사용되는 조건문으로, 특정 조건이 참일 때 주어진 코드 블록(`{ }`)을 실행합니다.

### 기본 구조

```javascript
if (조건식1) {
  // 조건식1이 참일 때 실행될 코드
} else if (조건식2) {
  // 조건식1은 거짓이고, 조건식2가 참일 때 실행될 코드
} else {
  // 위의 모든 조건식이 거짓일 때 실행될 코드
}
```

### `if`

단일 조건을 검사하여, 조건식이 `true`일 경우에만 코드를 실행합니다.

```javascript
let x = 10;

if (x >= 5) {
  // 조건식이 참이므로 아래 코드가 실행됩니다.
  console.log(`${x}는 5 이상입니다.`);
}

// if문과 상관없이 항상 실행됩니다.
console.log("검사가 종료되었습니다.");
```

### `else if`

여러 개의 조건을 순차적으로 검사할 때 사용합니다. `if`문 또는 이전 `else if`문의 조건식이 `false`일 때, 자신의 조건식을 평가합니다. 조건식을 위에서 아래로 평가하다가 `true`인 블록을 만나면 해당 코드를 실행하고, 나머지 `else if`나 `else` 블록은 건너뜁니다.

```javascript
let x = 4;

if (x >= 5) {
  console.log(`${x}는 5 이상입니다.`);
} else if (x >= 3) {
  // x >= 5는 거짓이고, x >= 3은 참이므로 아래 코드가 실행됩니다.
  console.log(`${x}는 3 이상 5 미만입니다.`);
  // 이후의 else if 블록은 평가되지 않습니다.
} else if (x >= 1) {
  console.log(`${x}는 1 이상 3 미만입니다.`);
}
```

### `else`

모든 `if`와 `else if` 조건식이 `false`로 평가되었을 때 실행될 코드를 지정합니다.

```javascript
let x = -5;

if (x > 0) {
  console.log(`${x}는 양수입니다.`);
} else {
  // x > 0 조건식이 거짓이므로 아래 코드가 실행됩니다.
  console.log(`${x}는 0 또는 음수입니다.`);
}
```

### 중첩 조건문

조건문 내부에 또 다른 조건문을 작성하여 더 복잡한 조건을 처리할 수 있습니다.

```javascript
let age = 25;
let isStudent = true;

if (age >= 20) {
  console.log("성인입니다.");
  if (isStudent === true) {
    console.log("그리고 학생입니다.");
  }
} else {
  console.log("미성년입니다.");
  if (isStudent === true) {
    console.log("그리고 학생입니다.");
  }
}
```

---

## 2. 삼항 연산자 (Ternary Operator)

`if...else` 문을 한 줄로 간단하게 표현할 수 있는 방법으로, 조건식의 평가 결과에 따라 두 개의 값 중 하나를 반환합니다.

### 기본 구조

```javascript
조건식 ? 참일_때_반환할_값 : 거짓일_때_반환할_값;
```

### 예시: 짝수/홀수 판별

```javascript
let x = 7;

let result = x % 2 === 0 ? "짝수" : "홀수";

console.log(`${x}는 ${result}입니다.`); // "7는 홀수입니다."
```

---

## 3. `switch` 문

하나의 표현식을 평가한 후, 그 결과 값을 여러 `case`의 값과 비교하여 일치하는 `case`의 코드 블록을 실행합니다.

- `break`: 현재 `case`의 코드 실행을 마치고 `switch` 문을 빠져나갑니다. `break`를 생략하면 일치하는 `case` 이후의 모든 `case` 코드가 순차적으로 실행되므로 주의해야 합니다.
- `default`: 일치하는 `case`가 없을 때 실행될 코드를 지정합니다.

> `if...else if` 문으로 대부분 대체 가능하여 활용도가 높지는 않지만, 특정 변수의 값에 따라 명확하게 분기해야 할 때 유용할 수 있습니다.

### 기본 구조

```javascript
switch (표현식) {
  case 값1:
    // 표현식의 결과가 값1과 일치할 때 실행될 코드
    break;
  case 값2:
    // 표현식의 결과가 값2와 일치할 때 실행될 코드
    break;
  default:
  // 일치하는 case가 없을 때 실행될 코드
}
```

### 예시

```javascript
let day = "월";
let dayName = "";

switch (day) {
  case "월":
    dayName = "월요일";
    break;
  case "화":
    dayName = "화요일";
    break;
  case "수":
    dayName = "수요일";
    break;
  default:
    dayName = "주말 또는 잘못된 요일";
}

console.log(dayName); // "월요일"
```
