# JavaScript 내장 함수와 메서드

## 📝 개요

이 문서는 JavaScript에 내장된 주요 함수(Built-in Function)와 메서드(Method)를 설명합니다. 이 문서를 통해 다음 내용을 학습할 수 있습니다.

- 함수와 메서드의 개념적 차이
- 주요 문자열(String) 메서드 사용법
- 주요 숫자(Number) 관련 함수 및 메서드 사용법
- `Math` 객체의 활용

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [JavaScript 함수](./javascript-functions.md)
- [JavaScript 원시 자료형](./javascript-primitive-types.md)

---

## 1. 내장 함수와 메서드의 차이

- **내장 함수 (Built-in Function)**: 특정 객체에 속하지 않고 독립적으로 호출할 수 있는 함수입니다.
  - 예: `parseInt()`, `isNaN()`
- **메서드 (Method)**: 특정 객체(예: 문자열, 숫자, 배열)에 속해 있어, 해당 객체를 통해서만 호출할 수 있는 함수입니다.
  - 예: `string.toUpperCase()`, `array.push()`

```javascript
// 내장 함수의 예
const numString = "123.45";
const integer = parseInt(numString); // 특정 객체 없이 바로 호출
console.log(integer); // 123

// 메서드의 예
const message = "hello";
const upperMessage = message.toUpperCase(); // 'message'라는 문자열 객체를 통해 호출
console.log(upperMessage); // "HELLO"
```

---

## 2. 주요 문자열 메서드 (String Methods)

문자열(String) 객체는 텍스트 데이터를 조작하는 데 유용한 다양한 내장 메서드를 제공합니다.

### `string.charAt(index)`

지정된 인덱스(위치)에 있는 문자를 반환합니다.

```javascript
let str = "JavaScript";
console.log(str.charAt(0)); // "J"
console.log(str.charAt(4)); // "S"
```

### `string.includes(searchValue)`

문자열이 특정 문자열(`searchValue`)을 포함하고 있는지 확인하여 `true` 또는 `false`를 반환합니다. (대소문자 구분)

```javascript
let message = "Hello World";
console.log(message.includes("World")); // true
console.log(message.includes("world")); // false
```

### `string.split(separator)`

문자열을 지정된 구분자(`separator`)를 기준으로 나누어 **배열**로 반환합니다.

```javascript
let text = "apple,banana,orange";
let fruits = text.split(",");
console.log(fruits); // ["apple", "banana", "orange"]
```

> **💡 `array.join(separator)`**
> `split()`과 반대 역할을 하는 `join()`은 배열(Array)의 메서드입니다. 배열의 모든 원소를 연결해 하나의 문자열로 만듭니다.
> ```javascript
> let fruits = ["apple", "banana", "orange"];
> let text = fruits.join(", ");
> console.log(text); // "apple, banana, orange"
> ```

### `string.slice(startIndex, endIndex)`

문자열의 일부를 추출하여 새로운 문자열을 반환합니다. 원본 문자열은 변경되지 않습니다.

- `endIndex`는 포함되지 않습니다.
- `endIndex`를 생략하면 문자열 끝까지 추출합니다.

```javascript
let str = "JavaScript";
console.log(str.slice(0, 4)); // "Java"
console.log(str.slice(4));    // "Script"
```

### `string.replace(searchValue, newValue)`

문자열에서 특정 부분(`searchValue`)을 찾아 다른 문자열(`newValue`)로 교체합니다. 기본적으로 첫 번째로 발견된 부분만 교체합니다.

```javascript
let message = "Hello World, World!";
let newMessage = message.replace("World", "JavaScript");
console.log(newMessage); // "Hello JavaScript, World!"
```

### `string.toLowerCase()` 와 `string.toUpperCase()`

문자열의 모든 문자를 각각 소문자 또는 대문자로 변환하여 새로운 문자열을 반환합니다.

```javascript
let text = "Hello World";
console.log(text.toLowerCase()); // "hello world"
console.log(text.toUpperCase()); // "HELLO WORLD"
```

### `string.trim()`

문자열의 양쪽 끝에 있는 공백(whitespace)을 제거합니다.

```javascript
let text = "  Hello World  ";
console.log(text.trim()); // "Hello World"
```

---

## 3. 주요 숫자 관련 기능

### `parseInt(string)` (함수)

문자열을 **정수(integer)**로 변환합니다. 숫자가 아닌 문자를 만나면 그 이전까지의 숫자만 변환하며, 숫자로 시작하지 않으면 `NaN`(Not-a-Number)을 반환합니다.

```javascript
console.log(parseInt("123.45")); // 123
console.log(parseInt("123abc")); // 123
console.log(parseInt("abc123")); // NaN
```

### `number.toFixed(n)` (메서드)

숫자를 지정된 소수점 `n`자리까지 반올림하여 **문자열**로 반환합니다.

```javascript
let num = 3.14159;
console.log(num.toFixed(2)); // "3.14"
console.log(num.toFixed(4)); // "3.1416"
```

---

## 4. Math 객체

`Math` 객체는 수학적인 상수와 함수를 위한 속성과 메서드를 가진 내장 객체입니다.

### `Math.random()`

0 이상 1 미만의 난수(랜덤 소수)를 반환합니다. 이를 활용하여 특정 범위의 정수를 만들 수 있습니다.

```javascript
// 0 이상 1 미만의 난수
console.log(Math.random());

// 1부터 10까지의 정수 중 랜덤한 수
let randomInt = Math.floor(Math.random() * 10) + 1;
console.log(randomInt);
```

- `Math.floor()`: 주어진 숫자보다 작거나 같은 가장 큰 정수를 반환합니다. (내림)

---

## 5. 주요 내장 객체 (Key Built-in Objects)

JavaScript에는 위에서 다룬 기능 외에도 다양한 내장 객체들이 있으며, 각각 고유한 속성과 메서드를 가집니다.

- **`Array`**: 배열을 다루기 위한 객체. (`push`, `pop`, `slice`, `forEach` 등)
- **`Date`**: 날짜와 시간을 다루기 위한 객체.
- **`Math`**: 수학적 연산을 위한 객체.
- **`Object`**: 객체를 다루기 위한 일반적인 기능을 제공. (`keys`, `values`, `entries` 등)
- **`String`**: 문자열을 다루기 위한 객체.
