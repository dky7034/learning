# JavaScript 예외 처리 (Exception Handling)

## 개요

이 문서는 JavaScript의 예외 처리 메커니즘에 대해 상세히 설명합니다. 이 문서를 통해 개발자는 다음 내용을 학습할 수 있습니다.

- 예외 처리의 핵심 개념과 필요성
- `try...catch...finally`를 이용한 예외 처리 기본 구조
- `throw`를 이용한 예외 발생 및 사용자 정의 예외 처리 방법

### 사전 학습

이 문서를 이해하기 위해 JavaScript 함수 및 기본 문법에 대한 지식이 필요합니다.

## 예외 처리(Exception Handling)란 무엇인가?

예외 처리란 프로그램 실행 중 예기치 않게 발생하는 오류(Exception 또는 Error)에 대응하고, 프로그램이 비정상적으로 종료되는 것을 방지하며, 안정적인 실행 상태를 유지하도록 관리하는 프로그래밍 기술입니다.

### 예외 처리의 필요성

- **프로그램 안정성 확보**: 예외 발생 시 프로그램이 즉시 중단되는 것을 막고, 오류를 기록하거나 사용자에게 안내 메시지를 보여주는 등 적절한 후속 조치를 취할 수 있습니다.
- **코드 가독성 및 유지보수성 향상**: 비즈니스 로직과 오류 처리 로직을 분리하여 코드를 더 명확하고 구조적으로 만들 수 있습니다.
- **디버깅 용이성**: 예외 객체에 담긴 정보를 통해 오류의 원인과 발생 위치를 쉽게 파악할 수 있습니다.

## 예외 처리의 기본 구조

JavaScript는 `try...catch...finally` 블록을 사용하여 예외를 처리합니다.

- **`try`**: 예외가 발생할 가능성이 있는 코드를 이 블록 안에 작성합니다.
- **`catch`**: `try` 블록에서 예외가 발생했을 때 실행될 코드를 작성합니다. 발생한 예외 객체를 인자로 받습니다.
- **`finally`**: 예외 발생 여부와 관계없이 항상 실행되어야 하는 코드를 작성합니다. (예: 리소스 해제)

### `try...catch` 구문

가장 기본적인 예외 처리 구조입니다.

```javascript
try {
  // 오류가 발생할 가능성이 있는 코드
  console.log("try 블록: 코드 실행 시작");
  const result = myFunction(); // 존재하지 않는 함수 호출
  console.log("try 블록: 이 코드는 실행되지 않습니다.");
} catch (error) {
  // 오류가 발생했을 때 실행되는 코드
  console.error("catch 블록: 오류를 포착했습니다!");
  console.error(`오류 메시지: ${error.message}`);
}

console.log("프로그램이 정상적으로 계속 실행됩니다.");
```

### `try...catch...finally` 구문

오류 발생 여부와 상관없이 반드시 실행해야 할 코드가 있을 때 `finally` 블록을 사용합니다.

```javascript
let resource;

try {
  // 리소스를 할당하거나 파일을 여는 등의 작업
  resource = "데이터베이스 연결";
  console.log("리소스를 할당했습니다.");
  throw new Error("의도적으로 발생시킨 오류");
} catch (error) {
  console.error(`오류 처리: ${error.message}`);
} finally {
  // 오류 발생 여부와 관계없이 항상 실행
  console.log("finally 블록: 리소스를 해제합니다.");
  resource = null;
}
```

## 예외 발생시키기 (`throw`)

`throw` 키워드를 사용하면 개발자가 의도적으로 예외를 발생시킬 수 있습니다. 주로 함수의 인자 값이 유효하지 않거나, 특정 조건이 만족되지 않았을 때 사용합니다.

일반적으로 `Error` 객체 또는 그 하위 객체를 생성하여 `throw` 합니다.

### `Error` 객체

`Error` 객체는 예외에 대한 정보를 담고 있으며, 주로 다음과 같은 속성을 가집니다.

- **`name`**: 오류의 종류 (예: `ReferenceError`, `TypeError`, `SyntaxError`)
- **`message`**: 개발자가 전달한 오류 메시지 문자열
- **`stack`**: 오류 발생 시점의 스택 트레이스(호출 스택), 디버깅에 매우 유용합니다.

### 사용자 정의 예외 발생 예시

```javascript
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("모든 인자는 숫자여야 합니다.");
  }
  if (b === 0) {
    // Error 객체를 사용하여 구체적인 오류 정보 전달
    throw new Error("0으로 나눌 수 없습니다.");
  }
  return a / b;
}

try {
  // const result = divide(10, 0); // Error: 0으로 나눌 수 없습니다.
  const result = divide(10, "문자"); // TypeError: 모든 인자는 숫자여야 합니다.
  console.log(`결과: ${result}`);
} catch (error) {
  console.error(`[${error.name}] ${error.message}`);
  // console.error(error.stack); // 필요한 경우 전체 스택 출력
}
```

## JavaScript의 주요 내장 오류

- **`SyntaxError`**: JavaScript 문법에 맞지 않는 코드를 해석할 때 발생합니다.
- **`ReferenceError`**: 존재하지 않는 변수나 함수를 참조할 때 발생합니다.
- **`TypeError`**: 값이 예상된 타입이 아닐 때 발생합니다. (예: `null` 값의 속성에 접근)
- **`RangeError`**: 값이 허용된 범위를 벗어났을 때 발생합니다. (예: 배열의 크기를 음수로 지정)
- **`URIError`**: `encodeURI()`나 `decodeURI()` 함수에 잘못된 URI를 전달했을 때 발생합니다.

이러한 내장 오류들을 이해하면 `catch` 블록에서 오류 유형에 따라 다른 처리를 수행하는 데 도움이 됩니다.

```javascript
try {
  // ... 코드
} catch (error) {
  if (error instanceof TypeError) {
    console.error("타입 오류가 발생했습니다. 입력값을 확인하세요.");
  } else if (error instanceof ReferenceError) {
    console.error("정의되지 않은 변수를 참조했습니다.");
  } else {
    console.error(`예상치 못한 오류: ${error.message}`);
  }
}
```
