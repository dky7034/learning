# JavaScript 배열 고차 메서드

## 개요

이 문서는 JavaScript 배열의 강력한 기능인 고차 메서드(Higher-Order Methods)에 대해 상세히 설명합니다. 이 문서를 통해 개발자는 다음 내용을 학습할 수 있습니다.

- 배열 고차 메서드의 개념과 선언적 프로그래밍의 이점
- `forEach`, `map`, `filter`, `reduce`, `sort` 등 주요 메서드의 사용법
- 각 메서드의 특징(반환값, 원본 배열 변경 여부) 및 적절한 사용 사례

### 사전 학습

이 문서를 효과적으로 이해하기 위해 아래 주제에 대한 사전 지식이 필요합니다.

- JavaScript 함수 및 화살표 함수
- JavaScript 기본 반복문
- JavaScript 배열의 기본 개념
- JavaScript 콜백 함수

## 배열 고차 메서드란?

배열 고차 메서드는 배열의 각 요소에 대해 주어진 콜백 함수를 실행하는 내장 함수입니다. 전통적인 `for` 반복문과 비교했을 때, 코드가 더 간결하고 가독성이 높으며, 무엇을(What) 할 것인지에 집중하는 **선언적 프로그래밍**을 가능하게 합니다.

### 기본 콜백 함수 구조

대부분의 배열 고차 메서드는 아래와 같은 형태의 콜백 함수를 인자로 받습니다.

```javascript
array.method((element, index, array) => {
  // element: 처리할 현재 요소
  // index: (선택 사항) 현재 요소의 인덱스
  // array: (선택 사항) 메서드가 호출된 원본 배열
});
```

---

## 주요 배열 고차 메서드

### `forEach()`

- **목적**: 배열의 각 요소를 순회하며 주어진 콜백 함수를 실행합니다.
- **반환값**: `undefined`. 반환값이 없으므로 새로운 배열을 생성하지 않습니다.
- **원본 배열 변경**: ❌
- **특징**: 가장 기본적인 반복 메서드입니다. 각 요소에 대해 특정 작업을 수행하고 싶을 때 사용합니다.

```javascript
const todos = ["숙제하기", "운동하기", "독서하기"];

todos.forEach((todo, index) => {
  console.log(`${index + 1}. ${todo}`);
});
// 1. 숙제하기
// 2. 운동하기
// 3. 독서하기
```

### `map()`

- **목적**: 배열의 모든 요소를 순회하며, 콜백 함수의 반환값으로 구성된 **새로운 배열**을 생성합니다.
- **반환값**: 콜백 함수의 반환값들로 이루어진 새로운 배열.
- **원본 배열 변경**: ❌
- **특징**: 기존 데이터를 새로운 형태의 데이터로 변환할 때 매우 유용합니다. React와 같은 UI 라이브러리에서 목록을 렌더링할 때 핵심적으로 사용됩니다.

```javascript
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map((num) => num * num);

console.log(squaredNumbers); // [1, 4, 9, 16, 25]
console.log(numbers); // [1, 2, 3, 4, 5] (원본 배열은 그대로 유지)
```

### `filter()`

- **목적**: 배열의 모든 요소를 순회하며, 콜백 함수의 반환값이 `true`인 요소만으로 구성된 **새로운 배열**을 생성합니다.
- **반환값**: 조건을 만족하는 요소들로 이루어진 새로운 배열.
- **원본 배열 변경**: ❌
- **특징**: 특정 조건에 맞는 데이터만 필터링하여 새로운 결과 집합을 만들 때 사용합니다.

```javascript
const todos = [
  { task: "숙제하기", completed: false },
  { task: "운동하기", completed: true },
  { task: "독서하기", completed: false },
];

const incompleteTodos = todos.filter((todo) => todo.completed === false);

console.log(incompleteTodos);
// [ { task: "숙제하기", completed: false }, { task: "독서하기", completed: false } ]
```

### `find()`

- **목적**: 콜백 함수의 반환값이 `true`인 **첫 번째 요소 하나**를 찾습니다.
- **반환값**: 조건을 만족하는 첫 번째 요소. 만족하는 요소가 없으면 `undefined`를 반환합니다.
- **원본 배열 변경**: ❌
- **특징**: 고유한 ID 등으로 특정 항목을 찾을 때 유용합니다.

```javascript
const todos = [
  { id: 1, task: "숙제하기" },
  { id: 2, task: "운동하기" },
  { id: 3, task: "독서하기" },
];

const targetTodo = todos.find((todo) => todo.id === 2);
console.log(targetTodo); // { id: 2, task: "운동하기" }
```

### `reduce()`

- **목적**: 배열의 각 요소를 순회하며, 단일 결과값으로 축약(reduce)합니다.
- **반환값**: 콜백 함수에서 최종적으로 반환된 단일 값.
- **원본 배열 변경**: ❌
- **구조**: `array.reduce((accumulator, currentValue, index, array) => { ... }, initialValue)`
  - `accumulator` (누산기): 콜백의 반환값을 누적합니다.
  - `currentValue` (현재 값): 처리할 현재 요소입니다.
  - `initialValue` (초기값, 선택 사항): `accumulator`의 초기값입니다. 제공하지 않으면 배열의 첫 번째 요소가 사용됩니다.

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, current) => acc + current, 0); // 초기값 0

console.log(sum); // 15 (1+2+3+4+5)
```

### `sort()`

- **목적**: 배열의 요소를 정렬합니다.
- **반환값**: 정렬된 배열.
- **원본 배열 변경**: ✅ **주의! 원본 배열 자체를 변경합니다.**
- **특징**: 정렬 기준을 정의하는 비교 함수(compare function)를 인자로 받습니다.
  - `compare(a, b)`가 음수를 반환하면 `a`가 `b`보다 앞에 옵니다.
  - `compare(a, b)`가 양수를 반환하면 `b`가 `a`보다 앞에 옵니다.
  - 비교 함수가 없으면, 모든 요소를 문자열로 변환하여 유니코드 순서로 정렬하므로 숫자 정렬 시 예기치 않은 결과를 낳을 수 있습니다. (예: `[1, 10, 2]` -> `[1, 10, 2]`)

```javascript
const numbers = [10, 2, 5, 1, 8];

// 오름차순 정렬
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 5, 8, 10]

// 내림차순 정렬
numbers.sort((a, b) => b - a);
console.log(numbers); // [10, 8, 5, 2, 1]
```

### `some()` / `every()`

- **`some()`**: 배열의 요소 중 **하나라도** 콜백 함수의 조건을 만족하면 `true`를 반환합니다.
- **`every()`**: 배열의 **모든** 요소가 콜백 함수의 조건을 만족해야 `true`를 반환합니다.
- **반환값**: `true` 또는 `false`.
- **원본 배열 변경**: ❌

```javascript
const numbers = [1, 3, 5, 7, 8];

const hasEvenNumber = numbers.some((num) => num % 2 === 0); // 8이 짝수이므로 true
const allOddNumbers = numbers.every((num) => num % 2 !== 0); // 8 때문에 false

console.log(hasEvenNumber); // true
console.log(allOddNumbers); // false
```

### `findIndex()`

- **목적**: 콜백 함수의 반환값이 `true`인 **첫 번째 요소의 인덱스**를 찾습니다.
- **반환값**: 조건을 만족하는 첫 번째 요소의 인덱스. 만족하는 요소가 없으면 **-1**을 반환합니다.
- **원본 배열 변경**: ❌

```javascript
const todos = [
  { id: 1, task: "숙제하기" },
  { id: 2, task: "운동하기" },
  { id: 3, task: "독서하기" },
];

const targetIndex = todos.findIndex((todo) => todo.id === 2);
console.log(targetIndex); // 1
```

---

## 메서드 체이닝 (Method Chaining)

`map`, `filter`와 같이 새로운 배열을 반환하는 메서드들은 연결하여(chaining) 사용할 수 있습니다. 이를 통해 여러 단계를 거치는 데이터 가공을 간결하고 우아하게 표현할 수 있습니다.

```javascript
const users = [
  { name: "Alice", age: 25, isActive: true },
  { name: "Bob", age: 17, isActive: true },
  { name: "Charlie", age: 30, isActive: false },
  { name: "David", age: 22, isActive: true },
];

// 활성 사용자 중, 20세 이상인 사람의 이름만 추출하여 대문자로 변경
const result = users
  .filter((user) => user.isActive && user.age >= 20) // 1. 활성 및 20세 이상 필터링
  .map((user) => user.name.toUpperCase()); // 2. 이름만 추출하여 대문자로 변환

console.log(result); // ["ALICE", "DAVID"]
```

## 메서드 요약표

| 메서드        | 주요 기능                                      | 반환값                | 원본 배열 변경 | 활용도 |
| :------------ | :--------------------------------------------- | :-------------------- | :------------- | :----- |
| `forEach()`   | 각 원소에 콜백 함수 적용                       | `undefined`           | ❌             | 높음   |
| `map()`       | 각 원소를 변환하여 **새 배열** 생성            | 새로운 배열           | ❌             | 높음   |
| `filter()`    | 조건에 맞는 원소만 필터링하여 **새 배열** 생성 | 새로운 배열           | ❌             | 높음   |
| `find()`      | 조건에 맞는 **첫 번째 원소** 찾기              | 원소 또는 `undefined` | ❌             | 높음   |
| `reduce()`    | 모든 원소를 순회하며 **하나의 값**으로 축약    | 단일 값               | ❌             | 중간   |
| `sort()`      | 원소를 정렬                                    | 정렬된 배열           | ✅             | 중간   |
| `some()`      | **하나라도** 조건에 맞는지 확인                | `true` 또는 `false`   | ❌             | 낮음   |
| `every()`     | **모든 원소**가 조건에 맞는지 확인             | `true` 또는 `false`   | ❌             | 낮음   |
| `findIndex()` | 조건에 맞는 **첫 번째 원소의 인덱스** 찾기     | 인덱스 또는 `-1`      | ❌             | 낮음   |
