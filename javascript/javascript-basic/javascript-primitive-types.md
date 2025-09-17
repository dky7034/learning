# JavaScript 원시 자료형

이 문서는 JavaScript의 원시 자료형(Primitive Data Types)에 대해 설명합니다. 문서를 통해 다음 내용을 학습할 수 있습니다.

-   원시 자료형의 개념과 특징
-   기본 자료형(문자열, 숫자, 불리언)의 사용법
-   특별한 값인 `undefined`와 `null`의 차이점
-   `typeof` 연산자를 활용한 자료형 확인 방법

---

## 사전 학습

-   **JavaScript 기본 개념**: JavaScript 코드 실행 방법에 대한 이해가 필요합니다.

---

## 자료형(Data Types)이란?

**자료형**은 프로그래밍 언어에서 다룰 수 있는 데이터의 종류를 의미합니다. 예를 들어, '글자' 데이터와 '숫자' 데이터는 그 종류가 다르며, 데이터의 종류에 따라 수행할 수 있는 작업(연산)도 달라집니다.

### 원시 자료형 (Primitive Data Types)

**원시 자료형**은 JavaScript에서 가장 기본적인 데이터 타입들을 의미합니다. 이들은 **불변성(immutability)** 이라는 중요한 특징을 가집니다. 즉, 한 번 생성된 원시 자료형 값은 변경할 수 없습니다.

JavaScript의 원시 자료형에는 `String`, `Number`, `Boolean`, `undefined`, `null`, `Symbol`, `BigInt`가 있습니다. 이 문서에서는 가장 기본적인 5가지 원시 자료형을 다룹니다.

### 자료형 확인: `typeof` 연산자

`typeof` 연산자를 사용하면 특정 데이터가 어떤 자료형인지 확인할 수 있습니다.

```javascript
console.log(typeof "hello"); // "string"
console.log(typeof 42);      // "number"
console.log(typeof true);    // "boolean"
```

---

## 기본 자료형

### 1. 문자열 (String)

**문자열**은 글자들의 나열을 의미합니다. JavaScript에서는 세 가지 방법으로 문자열을 표현할 수 있습니다.

-   작은따옴표 (`' '`)
-   큰따옴표 (`" " `)
-   백틱 (`` ` `` `) - 템플릿 리터럴이라고도 하며, 변수나 표현식을 문자열 안에 쉽게 삽입할 수 있습니다.

```javascript
console.log("안녕하세요");      // 큰따옴표
console.log('반갑습니다');        // 작은따옴표
console.log(`좋은 하루 되세요`); // 백틱

const name = "철수";
console.log(`안녕하세요, ${name}님!`); // 백틱을 사용한 변수 삽입
```

### 2. 숫자형 (Number)

**숫자형**은 모든 종류의 숫자를 나타냅니다. 정수, 소수, 양수, 음수를 모두 포함합니다.

```javascript
console.log(25);     // 양의 정수
console.log(19.99);  // 소수
console.log(0);      // 0
console.log(-10);    // 음의 정수
```

### 3. 불리언 (Boolean)

**불리언**은 `true`(참) 또는 `false`(거짓) 두 가지 값만 가집니다. 주로 조건문이나 반복문에서 논리적인 "맞다" 또는 "틀리다"를 표현하는 데 사용됩니다.

```javascript
console.log(true);  // 참
console.log(false); // 거짓

console.log(10 > 5); // true (비교 결과)
```

---

## 특별한 자료형

### 1. `undefined`

`undefined`는 **"아직 값이 정해지지 않았음"** 을 의미합니다. 변수를 선언했지만 아직 값을 할당하지 않았을 때 JavaScript 엔진이 자동으로 `undefined` 값을 할당합니다.

```javascript
let data;
console.log(data); // undefined (값을 넣지 않았으므로)

console.log(typeof undefined); // "undefined"
```

### 2. `null`

`null`은 **"값이 없음" 또는 "빈 값"** 을 의도적으로 표현할 때 사용합니다. 개발자가 "여기에는 유효한 데이터가 없다"는 것을 명시적으로 나타내기 위해 사용합니다.

```javascript
let emptyValue = null;
console.log(emptyValue); // null

console.log(typeof null); // "object"
```

> **`typeof null`이 "object"인 이유**
> 이는 JavaScript 초기 버전의 버그(오류)이지만, 하위 호환성 문제로 인해 수정되지 않고 현재까지 이어져 오고 있습니다. `null`은 원시 자료형이지만 `typeof` 연산 결과는 "object"로 표시되므로 주의해야 합니다.

### `null`과 `undefined`의 차이점

| 구분        | `null`                               | `undefined`                                  |
| :---------- | :----------------------------------- | :------------------------------------------- |
| **의미**    | "값이 없음을 의도적으로 명시" (의도적) | "값이 아직 할당되지 않음" (자동 발생)        |
| **생성 주체** | 개발자가 코드에 직접 작성            | JavaScript 엔진이 자동으로 할당                |
| **`typeof` 결과** | `object`                             | `undefined`                                  |
| **사용 예시** | `let data = null;`                   | `let data;` (이후 `data`는 `undefined`가 됨) |

---

## 원시 자료형 정리표

### 기본 자료형

| 자료형 | 영문명 | 설명 | 예시 | `typeof` 결과 |
| :--- | :--- | :--- | :--- | :--- |
| **문자열** | `String` | 글자들의 나열 | `"안녕"`, `'Hello'`, `` `World` `` | `"string"` |
| **숫자형** | `Number` | 모든 종류의 숫자 | `25`, `19.99`, `0`, `-10` | `"number"` |
| **불리언** | `Boolean` | 참 또는 거짓 | `true`, `false` | `"boolean"` |

### 특별한 값들

| 자료형 | 영문명 | 설명 | 예시 | `typeof` 결과 |
| :--- | :--- | :--- | :--- | :--- |
| **undefined** | `undefined` | 값이 정해지지 않음 | `undefined` | `"undefined"` |
| **null** | `null` | 의도적으로 값을 비워둠 | `null` | `"object"` |
