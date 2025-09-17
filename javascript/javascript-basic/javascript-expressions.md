# JavaScript 표현식 (Expressions)

이 문서는 JavaScript의 핵심 개념 중 하나인 **표현식(Expression)**에 대해 설명합니다. 문서를 통해 다음 내용을 학습할 수 있습니다.

-   표현식의 정확한 정의와 문의 차이점
-   리터럴, 산술, 논리, 할당 등 다양한 종류의 표현식
-   코드에서 표현식이 어떻게 활용되는지에 대한 구체적인 예시

---

## 사전 학습

-   **JavaScript 원시 자료형**: `String`, `Number` 등 기본 데이터 타입에 대한 이해가 필요합니다.
-   **JavaScript 변수**: 변수 선언 및 할당에 대한 이해가 필요합니다.
-   **JavaScript 연산자**: 연산자가 표현식을 구성하는 핵심 요소임을 이해하는 데 도움이 됩니다.

---

## 표현식(Expression)이란?

**표현식**은 **하나의 값(value)으로 평가되는(만들어지는) 코드 조각**입니다. JavaScript 엔진은 코드를 읽다가 표현식을 만나면, 그 표현식을 계산하여 단일한 값을 생성합니다.

가장 간단한 예시는 리터럴(값 그 자체)입니다.

```javascript
42;       // 이 코드는 숫자 값 42로 평가됩니다.
"hello";  // 이 코드는 문자열 값 "hello"로 평가됩니다.
```

변수에 값을 할당하는 것도 표현식을 사용합니다.

```javascript
let x;
x = 10 + 5; // 10 + 5는 15라는 값으로 평가되는 표현식입니다.
            // 이 15라는 값이 x에 할당됩니다.
```

### 표현식(Expression)과 문(Statement)의 차이

-   **표현식 (Expression)**: 값을 만들어냅니다.
-   **문 (Statement)**: 어떤 동작을 수행하도록 지시합니다.

```javascript
// let x = 10; 은 변수를 선언하고 값을 할당하는 '문(Statement)'입니다.
// 이 문 안에서 = 오른쪽의 10은 '표현식(Expression)'입니다.
let x = 10;

// if (x > 5) { ... } 는 조건에 따라 코드 실행을 제어하는 '문(Statement)'입니다.
// 이 문 안에서 괄호 안의 x > 5는 true 또는 false로 평가되는 '표현식(Expression)'입니다.
if (x > 5) {
  console.log("x는 5보다 큽니다.");
}
```

**핵심**: 코드의 특정 부분이 어떤 값으로 대체될 수 있다면, 그것은 표현식입니다.

---

## 표현식의 종류

### 1. 기본 표현식 (Primary Expressions)

-   **리터럴(Literals)**: 코드에 직접 작성된 값 그 자체입니다.
    -   `123` (숫자 리터럴)
    -   `"Hello"` (문자열 리터럴)
    -   `true` (불리언 리터럴)
    -   `null`, `undefined`
-   **변수 참조**: 변수의 이름을 사용하여 그 안에 저장된 값을 불러옵니다.
    -   `let myAge = 30;`
    -   `myAge;` // `30`으로 평가되는 표현식

### 2. 산술 표현식 (Arithmetic Expressions)

산술 연산자를 사용하여 숫자 값을 만들어냅니다.

```javascript
10 + 5     // 15로 평가됨
20 - 10    // 10으로 평가됨
x * y      // x와 y의 곱으로 평가됨
```

### 3. 문자열 표현식 (String Expressions)

`+` 연산자를 사용하여 문자열을 연결하고 새로운 문자열 값을 만들어냅니다.

```javascript
"Hello" + " " + "World" // "Hello World"로 평가됨
```

### 4. 논리 표현식 (Logical Expressions)

논리 연산자(`&&`, `||`, `!`)나 비교 연산자(`>`, `<`, `===`)를 사용하여 `true` 또는 `false` 값을 만들어냅니다.

```javascript
x > 10             // x가 10보다 크면 true, 아니면 false로 평가됨
a && b             // a와 b가 모두 truthy하면 b의 값, 아니면 falsy한 값으로 평가됨
isLoggedIn || false  // isLoggedIn이 truthy하면 그 값, 아니면 false로 평가됨
```

### 5. 할당 표현식 (Assignment Expressions)

`=` 연산자를 사용하여 변수에 값을 할당합니다. 할당문 자체가 할당된 값으로 평가되는 특징이 있습니다.

```javascript
let x;
x = 100; // 이 표현식은 100으로 평가됩니다.

let y;
let z = (y = 5); // y = 5는 5로 평가되고, 그 값이 z에 할당됩니다.
console.log(z);  // 5
```

### 6. 함수 호출 표현식 (Function Call Expressions)

함수를 호출하면, 그 함수의 **반환(return) 값**으로 평가됩니다.

```javascript
function add(a, b) {
  return a + b;
}

let result = add(3, 4); // add(3, 4)는 함수가 실행된 후 반환 값인 7로 평가됩니다.
console.log(result);    // 7
```

---

## 표현식의 활용

표현식은 값을 만들어내기 때문에, 값이 위치할 수 있는 곳이라면 어디든 사용할 수 있습니다.

-   **변수 할당**
    ```javascript
    const score = 80 + 15; // 95라는 값이 score에 할당됨
    ```
-   **함수의 인자(Argument)**
    ```javascript
    console.log("안녕하세요, " + userName + "님"); // 문자열 연결 표현식의 결과가 인자로 전달됨
    ```
-   **조건문의 조건식**
    ```javascript
    if (userAge >= 20 && hasTicket === true) {
      // ...
    }
    ```
-   **함수의 반환 값**
    ```javascript
    function getArea(radius) {
      return Math.PI * radius * radius; // 계산 결과 값이 반환됨
    }
    ```
