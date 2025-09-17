# JavaScript 함수 (Functions)

이 문서는 JavaScript의 함수(Function)에 대해 설명합니다. 문서를 통해 다음 내용을 학습할 수 있습니다.

-   함수의 기본 개념과 필요성
-   함수를 정의하고 호출하는 방법
-   함수 선언식, 함수 표현식, 화살표 함수의 차이점과 특징

---

## 사전 학습

-   **JavaScript 원시 자료형, 변수, 연산자**: 함수 내부 로직을 작성하는 데 필요합니다.

---

## 함수(Function)란?

**함수**는 특정 작업을 수행하기 위해 미리 정의해 둔 **재사용 가능한 코드 블록**입니다. 함수를 사용하면 코드의 중복을 줄이고, 프로그램을 모듈화하여 유지보수를 쉽게 만들 수 있습니다.

함수는 **입력(input)**을 받아 특정 작업을 수행하고, 그 결과를 **출력(output)**할 수 있습니다.

-   **입력**: **매개변수(Parameter)**를 통해 함수에 전달되는 값입니다.
-   **출력**: `return` 키워드를 통해 함수 외부로 반환되는 **결과값(Return Value)**입니다. (결과값이 없을 수도 있습니다.)

---

## 함수 정의(Define)와 호출(Call)

### 함수 정의

함수를 사용하기 위해서는 먼저 어떤 작업을 수행할지 정의해야 합니다.

#### 기본 구조

```javascript
function 함수이름(매개변수1, 매개변수2, ...) {
  // 함수 몸체 (Body): 함수가 수행할 작업을 정의하는 코드 블록
  // ...
  return 반환값;
}
```

-   **함수 이름**: 함수를 식별하고 나중에 호출할 때 사용됩니다.
-   **매개변수 (Parameter)**: 함수가 호출될 때 전달되는 입력값을 담기 위해 선언하는 변수입니다.
-   **함수 몸체 (Body)**: 함수가 수행할 실제 코드를 포함하는 `{ }` 블록입니다.
-   **`return`**: 함수 실행 결과를 호출한 곳으로 돌려주는 키워드입니다. `return` 문이 없거나 `return` 뒤에 값이 없으면, 함수는 `undefined`를 반환합니다.

### 함수 호출

정의된 함수를 실행하는 것을 '호출한다'고 말합니다. 함수 이름과 괄호`()`를 사용하여 호출하며, 괄호 안에 함수에 전달할 **인자(Argument)**를 넣습니다.

```javascript
// 함수 정의
function greet(name) {
  return `안녕하세요, ${name}님!`;
}

// 함수 호출
// "철수"라는 '인자(Argument)'를 'name'이라는 '매개변수(Parameter)'에 전달
let message = greet("철수");

console.log(message); // "안녕하세요, 철수님!"
```

---

## 함수의 종류

JavaScript에서는 함수를 정의하는 여러 가지 방법이 있습니다.

### 1. 함수 선언식 (Function Declaration)

`function` 키워드를 사용하여 함수를 정의하는 가장 기본적인 방법입니다.

```javascript
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
```

**특징: 호이스팅(Hoisting)**
함수 선언식은 **호이스팅**의 영향을 받습니다. 즉, 코드가 실행되기 전에 JavaScript 엔진이 함수 선언을 코드의 최상단으로 끌어올리는 것처럼 동작합니다. 따라서 함수가 선언된 위치보다 앞에서 호출해도 정상적으로 작동합니다.

```javascript
// 선언보다 먼저 호출해도 동작함
console.log(subtract(10, 5)); // 5

function subtract(a, b) {
  return a - b;
}
```

### 2. 함수 표현식 (Function Expression)

이름이 없는 함수(익명 함수, Anonymous Function)를 만들어 변수에 할당하는 방식입니다.

```javascript
const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(2, 3)); // 6
```

**특징: 호이스팅 미발생**
함수 표현식은 변수 할당의 규칙을 따르므로 호이스팅이 발생하지 않습니다. 따라서 변수가 선언되고 함수가 할당되기 전에는 호출할 수 없습니다.

```javascript
// multiply(4, 5); // TypeError: multiply is not a function

const multiply = function (a, b) {
  return a * b;
};
```

### 3. 화살표 함수 (Arrow Function)

`function` 키워드 대신 화살표(`=>`)를 사용하여 함수를 더 간결하게 정의하는 방법입니다. (ES6에서 도입)

```javascript
const add = (a, b) => {
  return a + b;
};

console.log(add(5, 7)); // 12
```

**특징: 간결한 문법**

-   함수 몸체(Body)가 한 줄의 표현식으로 끝나는 경우, 중괄호 `{ }`와 `return` 키워드를 생략할 수 있습니다. 생략된 표현식의 결과가 자동으로 반환됩니다.

    ```javascript
    // 위 add 함수와 동일하게 동작
    const add = (a, b) => a + b;
    ```

-   매개변수가 하나일 경우, 매개변수를 감싸는 괄호 `()`도 생략할 수 있습니다.

    ```javascript
    const square = x => x * x;
    console.log(square(4)); // 16
    ```
