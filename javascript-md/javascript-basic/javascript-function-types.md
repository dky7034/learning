# JavaScript 함수 정의 방식: 선언식, 표현식, 화살표 함수

이 문서는 JavaScript에서 함수를 정의하는 세 가지 주요 방식인 함수 선언식, 함수 표현식, 그리고 화살표 함수에 대해 상세히 설명합니다. 각 방식의 차이점과 특징을 이해하고 상황에 맞는 올바른 함수 정의 방법을 선택하는 데 도움을 주는 것을 목표로 합니다.

- **함수 선언식 (Function Declaration)**: 기본적인 명명된 함수 정의 방식
- **함수 표현식 (Function Expression)**: 함수를 값처럼 변수에 할당하는 방식
- **화살표 함수 (Arrow Function)**: 간결한 문법을 제공하는 최신 함수 정의 방식 (ES6)

---

## 1. 함수 선언식 (Function Declaration)

**함수 선언식**은 `function` 키워드와 함수 이름을 사용하여 함수를 정의하는 가장 전통적이고 기본적인 방법입니다.

### 기본 구조

```javascript
function 함수이름(매개변수1, 매개변수2) {
  // 함수가 실행할 코드
  return 반환값;
}
```

### 예시

```javascript
function add(a, b) {
  return a + b;
}

console.log(add(10, 5)); // 15
```

### 주요 특징: 호이스팅 (Hoisting)

함수 선언식의 가장 큰 특징은 **호이스팅(Hoisting)**이 발생한다는 점입니다. 호이스팅이란, 코드가 실행되기 전에 JavaScript 엔진이 모든 함수 선언을 해당 스코프(scope)의 최상단으로 끌어올리는 것처럼 처리하는 동작을 의미합니다.

따라서 함수가 선언된 위치보다 앞서서 함수를 호출하더라도 오류 없이 정상적으로 실행됩니다.

```javascript
// 함수 선언보다 먼저 호출했지만 정상적으로 동작함
const result = subtract(10, 3);
console.log(result); // 7

function subtract(a, b) {
  return a - b;
}
```

---

## 2. 함수 표현식 (Function Expression)

**함수 표현식**은 함수를 생성하여 변수에 값으로 할당하는 방식입니다. 주로 이름이 없는 **익명 함수(Anonymous Function)**를 사용하지만, 디버깅 편의를 위해 이름을 붙인 **기명 함수 표현식(Named Function Expression)**도 사용할 수 있습니다.

### 기본 구조

```javascript
const 변수이름 = function (매개변수1, 매개변수2) {
  // 함수가 실행할 코드
  return 반환값;
};
```

### 예시

```javascript
const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(4, 5)); // 20
```

### 주요 특징: 호이스팅 미발생

함수 표현식은 변수 할당의 규칙을 따릅니다. `var`로 선언된 변수는 호이스팅되지만 `undefined`로 초기화되고, `let`이나 `const`로 선언된 변수는 호이스팅되지만 **일시적 사각지대(Temporal Dead Zone, TDZ)**에 빠져 초기화되기 전까지 접근할 수 없습니다.

결론적으로, 함수 표현식은 변수에 함수가 할당되기 전에 호출하면 `TypeError` 또는 `ReferenceError`가 발생합니다.

```javascript
// divide(10, 2); // TypeError: divide is not a function (var로 선언 시)
// divide(10, 2); // ReferenceError: Cannot access 'divide' before initialization (let/const로 선언 시)

const divide = function (a, b) {
  return a / b;
};

console.log(divide(10, 2)); // 5
```

---

## 3. 화살표 함수 (Arrow Function)

**화살표 함수**는 ES6에서 도입된 방식으로, `function` 키워드 대신 화살표(`=>`)를 사용하여 함수를 더욱 간결하게 정의할 수 있습니다.

### 기본 구조

```javascript
const 변수이름 = (매개변수1, 매개변수2) => {
  // 함수가 실행할 코드
  return 반환값;
};
```

### 예시

```javascript
const power = (base, exponent) => {
  return base ** exponent;
};

console.log(power(2, 3)); // 8
```

### 주요 특징 및 간소화 규칙

화살표 함수는 함수 표현식을 기반으로 하므로, **호이스팅되지 않습니다.** 또한, 다음과 같은 간결한 문법적 특징을 가집니다.

1.  **`return` 및 중괄호(`{}`) 생략**: 함수 본문이 단일 표현식으로 구성된 경우, `return` 키워드와 중괄호를 생략할 수 있습니다. 이 경우 표현식의 결과가 자동으로 반환됩니다.

    ```javascript
    // 위 power 함수와 동일
    const power = (base, exponent) => base ** exponent;
    ```

2.  **매개변수 괄호(`()`) 생략**: 매개변수가 하나뿐인 경우, 매개변수를 감싸는 괄호를 생략할 수 있습니다.

    ```javascript
    const square = (x) => x * x;
    console.log(square(5)); // 25
    ```

3.  **매개변수가 없는 경우**: 매개변수가 없을 때는 괄호를 비워두어야 합니다.

    ```javascript
    const sayHello = () => "안녕하세요!";
    console.log(sayHello()); // "안녕하세요!"
    ```

### `this` 바인딩의 차이

화살표 함수는 자신만의 `this` 컨텍스트를 생성하지 않습니다. 대신, 자신을 감싸고 있는 **상위 스코프의 `this`를 그대로 물려받습니다(Lexical `this`).** 이는 기존 `function` 키워드 함수가 호출 방식에 따라 `this`가 동적으로 결정되는 것과 가장 큰 차이점이며, 콜백 함수 등에서 `this` 컨텍스트를 유지해야 할 때 매우 유용합니다.
