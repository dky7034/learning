# JavaScript 연산자 (Operators)

이 문서는 JavaScript의 다양한 연산자에 대해 설명합니다. 문서를 통해 다음 내용을 학습할 수 있습니다.

- 기본적인 산술 연산자 사용법
- `typeof` 연산자를 활용한 자료형 확인 방법
- `+` 연산자를 이용한 문자열 연결 방법
- 데이터를 비교하는 비교 연산자 사용법
- 여러 조건을 조합하는 논리 연산자 사용법

---

## 사전 학습

- **JavaScript 원시 자료형**: `String`, `Number`, `Boolean` 등 기본 데이터 타입에 대한 이해가 필요합니다.
- **JavaScript 변수**: 변수 선언 및 할당에 대한 이해가 필요합니다.

---

## 연산자(Operator)란?

**연산자**는 데이터나 변수에 특정 연산을 수행하도록 하는 기호입니다. 연산자를 통해 계산, 비교, 논리 조합 등 다양한 작업을 처리하여 데이터를 가공하고 조작할 수 있습니다.

### 연산자 종류

JavaScript에는 여러 종류의 연산자가 있습니다. 이 문서에서는 주요 연산자들을 다룹니다.

- **타입 연산자**: 데이터의 자료형을 확인합니다.
- **산술 연산자**: 사칙연산 등 수학적 계산을 수행합니다.
- **비교 연산자**: 두 데이터의 값을 비교합니다.
- **논리 연산자**: `true`와 `false` 값을 조합하여 논리적인 판단을 합니다.

---

## 1. 타입 연산자 (Type Operator)

### `typeof`

`typeof` 연산자는 주어진 데이터의 자료형이 무엇인지 알려주는 문자열을 반환합니다.

```javascript
const num = 123;
const str = "Hello";
const bool = true;
const undef = undefined;

console.log(typeof num); // "number"
console.log(typeof str); // "string"
console.log(typeof bool); // "boolean"
console.log(typeof undef); // "undefined"
```

---

## 2. 산술 연산자 (Arithmetic Operators)

### 기본 산술 연산자

수학에서 사용하는 기본적인 사칙연산자와 동일합니다.

- `+`: 더하기
- `-`: 빼기
- `*`: 곱하기
- `/`: 나누기

```javascript
const a = 7;
const b = 2;

console.log(a + b); // 9
console.log(a - b); // 5
console.log(a * b); // 14
console.log(a / b); // 3.5
```

### 나머지 및 거듭제곱 연산자

- `%` (나머지): 한 숫자를 다른 숫자로 나눈 후 남은 값을 구합니다.
- `**` (거듭제곱): 첫 번째 피연산자를 밑, 두 번째 피연산자를 지수로 하는 거듭제곱 값을 구합니다.

```javascript
// 나머지(%)
const num1 = 10;
const num2 = 3;
console.log(num1 % num2); // 1 (10을 3으로 나누면 몫은 3, 나머지는 1)

// 거듭제곱(**)
const base = 2;
const exponent = 3;
console.log(base ** exponent); // 8 (2의 3제곱)
```

### 문자열 연결

`+` 연산자는 숫자뿐만 아니라 문자열을 연결하는 데에도 사용됩니다. 만약 문자열과 다른 타입의 데이터를 `+` 연산자로 연결하면, 다른 타입의 데이터가 문자열로 변환된 후 연결됩니다.

```javascript
const str1 = "Hello";
const str2 = "World";
console.log(str1 + " " + str2); // "Hello World"

const prefix = "나이: ";
const age = 25;
console.log(prefix + age); // "나이: 25" (숫자 25가 문자열 "25"로 변환됨)
```

> **권장**: 문자열 연결 시에는 `+` 연산자보다 가독성이 좋은 **템플릿 리터럴** 사용을 권장합니다.
> `console.log(`${prefix}${age}`);`

---

## 3. 비교 연산자 (Comparison Operators)

### 크기 비교

두 값의 크기를 비교하여 `true` 또는 `false`를 반환합니다.

- `>`: 초과 (크다)
- `<`: 미만 (작다)
- `>=`: 이상 (크거나 같다)
- `<=`: 이하 (작거나 같다)

```javascript
const num1 = 10;
const num2 = 5;
console.log(num1 > num2); // true
console.log(num1 <= num2); // false
```

### 동등 비교

두 값이 같은지 다른지를 비교하여 `true` 또는 `false`를 반환합니다.

- `===`: 같음 (엄격한 동등 비교)
- `!==`: 다름 (엄격한 불일치 비교)

```javascript
const num1 = 5;
const num2 = 5;
console.log(num1 === num2); // true

const num3 = 5;
const str1 = "5";
console.log(num3 === str1); // false (값은 같지만 자료형이 다르므로)

const num4 = 3;
console.log(num1 !== num4); // true
```

---

## 4. 논리 연산자 (Logical Operators)

불리언(`true`, `false`) 값을 조합하여 논리적인 결과를 반환합니다.

- `&&` (AND): 두 피연산자가 **모두** `true`일 때만 `true`를 반환합니다.
- `||` (OR): 두 피연산자 중 **하나라도** `true`이면 `true`를 반환합니다.
- `!` (NOT): 피연산자의 불리언 값을 반전시킵니다. (`true` -> `false`, `false` -> `true`)

```javascript
const a = true;
const b = false;

console.log(a && true); // true
console.log(a && b); // false

console.log(a || b); // true
console.log(false || b); // false

console.log(!a); // false
console.log(!b); // true
```

> **우선순위**: 논리 연산에서는 `&&`가 `||`보다 우선순위가 높습니다. 헷갈릴 때는 괄호 `()`를 사용하여 연산 순서를 명확히 하는 것이 좋습니다.
> `(a && b) || c`

---

## 심화: `==` 와 `===` 의 차이

JavaScript에는 두 가지 동등 비교 연산자가 있습니다: `==` (동등)와 `===` (엄격한 동등).

- **`==` (동등 비교)**: 두 피연산자의 **값**만 비교합니다. 만약 자료형이 다르면, JavaScript가 **자료형을 강제로 변환**한 후 비교합니다. 이 과정에서 예측하지 못한 결과가 발생할 수 있어 **사용을 권장하지 않습니다.**

- **`===` (엄격한 동등 비교)**: 두 피연산자의 **값과 자료형을 모두** 비교합니다. 자료형이 다르면 즉시 `false`를 반환합니다. 코드의 정확성과 예측 가능성을 위해 **항상 `===`를 사용해야 합니다.**

```javascript
const num = 1;
const str = "1";

// == (동등 비교) - 사용 비권장
console.log(num == str); // true (문자열 "1"을 숫자 1로 변환하여 비교)
console.log(num == 1); // true

// === (엄격한 동등 비교) - 사용 권장
console.log(num === str); // false (자료형이 number와 string으로 다르므로)
console.log(num === 1); // true
```
