# JavaScript 유효 범위(Scope)

## 📝 개요

이 문서는 JavaScript의 **유효 범위(Scope)**에 대해 설명합니다. 문서를 통해 다음 내용을 학습할 수 있습니다.

- 유효 범위의 개념 및 필요성
- 전역 스코프와 지역 스코프의 차이점
- 블록 스코프와 함수 스코프의 특징
- 스코프 체인의 동작 원리

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [JavaScript 조건문](./javascript-conditional-statements.md)
- [JavaScript 반복문](./javascript-loops.md)
- [JavaScript 함수](./javascript-functions.md)

---

## 1. 유효 범위(Scope)란?

**유효 범위(Scope)**는 변수나 함수에 접근할 수 있는 **범위**를 의미합니다. 스코프는 다음과 같은 중요한 역할을 합니다.

- **생명 주기 결정**: 변수가 언제 생성되고 언제 사라지는지를 결정합니다.
- **코드 명확성**: 코드의 구조를 명확하게 만들어 이해하기 쉽게 돕습니다.
- **이름 충돌 방지**: 서로 다른 스코프에서 같은 이름의 변수를 사용할 수 있게 하여 충돌을 방지합니다.
- **메모리 효율성**: 스코프를 벗어난 변수는 메모리에서 자동으로 제거되어 효율적인 관리가 가능합니다.

---

## 2. 유효 범위의 종류

JavaScript의 스코프는 크게 **전역 스코프**와 **지역 스코프**로 나뉩니다.

### 전역 스코프 (Global Scope)

코드의 가장 바깥 영역에 정의된 스코프입니다. 전역 스코프에서 선언된 변수를 **전역 변수**라고 하며, 코드 어디에서나 접근할 수 있습니다.

- 함수나 블록(`{}`) 밖에서 선언된 변수는 전역 스코프를 가집니다.
- 전역 변수는 프로그램이 종료될 때까지 메모리에 유지됩니다.

```javascript
let globalVar = "전역 변수";

function showGlobal() {
  console.log(globalVar); // 함수 내부에서도 전역 변수에 접근 가능
}

showGlobal(); // "전역 변수"
console.log(globalVar); // "전역 변수"
```

#### ⚠️ 주의사항: 전역 변수의 남용

전역 변수를 무분별하게 사용하면 다음과 같은 문제가 발생할 수 있습니다.

- **이름 충돌**: 다른 개발자나 라이브러리가 정의한 전역 변수와 이름이 겹칠 수 있습니다.
- **의도치 않은 변경**: 코드의 어느 곳에서든 값을 바꿀 수 있어, 프로그램의 동작을 예측하기 어렵게 만듭니다.

```javascript
let count = 0; // 전역 변수

function increaseCount() {
  count++; // 의도치 않게 전역 변수의 상태를 변경
}

function resetCount() {
  count = 0; // 다른 함수에서도 전역 변수를 변경
}

increaseCount();
console.log(count); // 1

resetCount();
console.log(count); // 0
```

### 지역 스코프 (Local Scope)

특정 영역 내에서만 접근할 수 있는 스코프입니다. 지역 스코프에서 선언된 변수를 **지역 변수**라고 합니다.

- `let`과 `const`로 선언된 변수는 기본적으로 지역 스코프를 따릅니다.
- 코드 블록이나 함수 호출이 끝나면 지역 변수는 메모리에서 제거되어 효율적입니다.
- 지역 스코프는 **함수 스코프**와 **블록 스코프**로 나뉩니다.

---

## 3. 함수 스코프와 블록 스코프

### 함수 스코프 (Function Scope)

**함수 내부**에서 선언된 변수는 함수 안에서만 유효합니다. (과거 `var` 키워드의 스코프 단위)

```javascript
function myFunction() {
  let functionVar = "함수 변수";
  const functionConst = "함수 상수";

  console.log(functionVar);   // "함수 변수"
  console.log(functionConst); // "함수 상수"
}

myFunction();

// 함수 밖에서는 접근 불가능
// console.log(functionVar);   // ReferenceError: functionVar is not defined
// console.log(functionConst); // ReferenceError: functionConst is not defined
```

### 블록 스코프 (Block Scope)

**중괄호 `{}`**로 감싸진 영역(if, for, while 등) 내에서만 유효한 스코프입니다. `let`과 `const`는 블록 스코프를 따릅니다.

#### 조건문 블록 스코프 예시

```javascript
if (true) {
  let blockVar = "블록 변수";
  console.log(blockVar); // "블록 변수"
}

// 블록 밖에서는 접근 불가능
// console.log(blockVar); // ReferenceError: blockVar is not defined
```

#### 반복문 블록 스코프 예시

```javascript
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}

// 반복문이 끝난 후 i는 사라져 접근 불가능
// console.log(i); // ReferenceError: i is not defined
```

---

## 4. 스코프 체인 (Scope Chain)

**스코프 체인**은 변수를 찾을 때 따르는 연쇄적인 검색 과정을 의미합니다.

JavaScript 엔진은 변수를 찾기 위해 현재 스코프에서 시작하여, 변수를 찾지 못하면 바로 바깥쪽(상위) 스코프로 이동하여 검색을 계속합니다. 이 과정은 전역 스코프에 도달할 때까지 반복됩니다.

### 스코프 체인 동작 순서

1.  **현재 스코프**에서 변수를 검색합니다.
2.  변수가 없으면, **바로 바깥쪽(상위) 스코프**에서 검색합니다.
3.  계속해서 상위 스코프로 이동하며 검색을 반복합니다.
4.  **전역 스코프**에서도 변수를 찾지 못하면 `ReferenceError`가 발생합니다.

### 스코프 체인 예시

```javascript
let globalVar = "전역 변수"; // 전역 스코프

function outerFunction() {
  let outerVar = "외부 함수 변수"; // outerFunction 스코프

  function innerFunction() {
    let innerVar = "내부 함수 변수"; // innerFunction 스코프

    // 1. 현재 스코프에서 innerVar 검색 -> 찾음
    console.log(innerVar); // "내부 함수 변수"

    // 2. 현재 스코프에 outerVar 없음 -> 상위(outerFunction) 스코프에서 검색 -> 찾음
    console.log(outerVar); // "외부 함수 변수"

    // 3. 현재, 상위 스코프에 globalVar 없음 -> 최상위(전역) 스코프에서 검색 -> 찾음
    console.log(globalVar); // "전역 변수"
  }

  innerFunction();
}

outerFunction();
```
