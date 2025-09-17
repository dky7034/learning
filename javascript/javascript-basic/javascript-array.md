# JavaScript 배열(Array)

## 📝 개요

이 문서는 JavaScript의 참조 자료형 중 하나인 **배열(Array)**에 대해 상세히 설명합니다. 이 문서를 통해 다음 내용을 학습할 수 있습니다.

- 배열의 핵심 개념과 주요 특징
- 배열을 생성하고 원소에 접근하며 수정하는 방법
- `push`, `pop`, `slice` 등 필수적인 내장 메서드 활용법
- 다양한 방법을 사용한 배열 순회(iteration)

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [JavaScript 변수](./javascript-variables.md)
- [JavaScript 반복문](./javascript-loops.md)

---

## 1. 배열(Array)이란?

배열은 **0개 이상의 데이터를 순서에 따라 저장하는** 컨테이너 형태의 자료형입니다.

- 배열에 저장된 각 데이터를 **원소(Element)**라고 부릅니다.
- 필요에 따라 원소를 동적으로 추가하거나 제거하는 것이 자유롭습니다.
- 숫자, 문자열, 객체, 또 다른 배열 등 **자료형에 관계없이** 모든 종류의 데이터를 원소로 가질 수 있습니다.

## 2. 배열 기본 조작

### 배열 생성

배열은 대괄호(`[]`)를 사용하여 간단하게 생성할 수 있습니다. 각 원소는 쉼표(`,`)로 구분합니다.

#### 빈 배열 생성

```javascript
let emptyArray = [];
console.log(emptyArray); // 출력: []
```

#### 원소가 있는 배열 생성

```javascript
let fruits = ["사과", "바나나", "딸기"];
let mixedArray = [1, "Hello", true, null, { name: "John" }];

console.log(fruits); // 출력: ['사과', '바나나', '딸기']
console.log(mixedArray); // 출력: [1, 'Hello', true, null, { name: 'John' }]
```

### 인덱스(Index)

인덱스는 배열 내부에서 각 원소의 **위치를 나타내는 0부터 시작하는 숫자**입니다.

- 인덱스의 범위는 `0`부터 `배열의 길이 - 1`까지입니다.

```javascript
let colors = ["빨강", "초록", "파랑"];

/*
인덱스: 원소
  0   : "빨강"
  1   : "초록"
  2   : "파랑"
*/
```

### 배열 원소 접근

대괄호(`[]`)와 인덱스를 사용하여 특정 위치의 원소에 접근할 수 있습니다.

```javascript
let array = [10, 20, 30];

console.log(array[0]); // 출력: 10
console.log(array[1]); // 출력: 20
console.log(array[2]); // 출력: 30

// 인덱스 범위를 벗어나면 `undefined`가 반환됩니다.
console.log(array[3]); // 출력: undefined
```

### 배열 원소 수정

인덱스를 통해 원소에 접근한 후, 대입 연산자(`=`)를 사용하여 새로운 값을 할당할 수 있습니다.

```javascript
let array = [1, 2, 3];
console.log("수정 전:", array); // 출력: 수정 전: [1, 2, 3]

array[0] = 100; // 0번 인덱스의 원소를 100으로 변경
console.log("수정 후:", array); // 출력: 수정 후: [100, 2, 3]
```

---

## 3. 배열의 속성과 메서드

배열은 데이터를 관리하는 데 유용한 내장 속성(Property)과 메서드(Method)를 제공합니다.

### `.length`

배열의 **원소 개수(길이)**를 반환하는 속성입니다.

```javascript
let array = [1, 2, 3, 4, 5];
const length = array.length;

console.log(length); // 출력: 5
```

### `push(element)`

배열의 **끝에** 새로운 원소를 추가합니다.

```javascript
let numbers = [1, 2, 3];
numbers.push(4);
numbers.push(5);

console.log(numbers); // 출력: [1, 2, 3, 4, 5]
```

### `pop()`

배열의 **마지막 원소를 제거**하고, 그 **제거된 원소를 반환(return)**합니다.

> **반환(return)이란?**
> 메서드가 작업을 수행한 후 결과로 생성하는 값을 의미합니다. 이 값을 변수에 저장하거나 다른 로직에 활용할 수 있습니다.

```javascript
let numbers = [10, 20, 30];
console.log("원본 배열:", numbers); // 출력: 원본 배열: [10, 20, 30]

let lastNumber = numbers.pop();

console.log("pop 실행 후 배열:", numbers); // 출력: pop 실행 후 배열: [10, 20]
console.log("제거된 원소:", lastNumber); // 출력: 제거된 원소: 30
```

### `slice(startIndex, endIndex)`

배열의 일부를 잘라내어 **새로운 배열을 생성**합니다. 원본 배열은 변경되지 않습니다.

- `startIndex`: 추출을 시작할 인덱스 (포함)
- `endIndex`: 추출을 종료할 인덱스 (미포함)

```javascript
let numbers = [0, 1, 2, 3, 4, 5];
let slicedNumbers = numbers.slice(1, 4); // 1번 인덱스부터 4번 인덱스 전까지

console.log("원본 배열:", numbers); // 출력: 원본 배열: [0, 1, 2, 3, 4, 5]
console.log("새로운 배열:", slicedNumbers); // 출력: 새로운 배열: [1, 2, 3]
```

---

## 4. 배열 반복

배열의 모든 원소를 순차적으로 접근하여 작업을 수행할 때 반복문을 사용합니다.

### `for` 반복문

가장 기본적인 배열 순회 방법으로, 인덱스를 직접 제어할 수 있습니다.

#### 기본 구조

```javascript
for (let i = 0; i < 배열.length; i++) {
  // 배열[i]를 사용하여 각 원소에 접근
}
```

#### 예시

```javascript
let array = [10, 20, 30, 40, 50];

for (let i = 0; i < array.length; i++) {
  console.log(`${i}번 인덱스 값: ${array[i]}`);
}
/*
출력:
0번 인덱스 값: 10
1번 인덱스 값: 20
2번 인덱스 값: 30
3번 인덱스 값: 40
4번 인덱스 값: 50
*/
```

### `for...of` 반복문

`for...of` 문은 **반복 가능한(Iterable)** 객체(배열, 문자열 등)의 값을 더 간결하게 순회할 수 있는 현대적인 방법입니다.

#### 기본 구조

```javascript
for (let 변수 of 반복_가능한_자료형) {
  // 각 순회에서 '변수'는 자료형의 개별 값을 가짐
}
```

#### 배열 반복 예시

```javascript
const fruits = ["사과", "바나나", "딸기"];

for (let fruit of fruits) {
  console.log(`맛있는 ${fruit}!`);
}
/*
출력:
맛있는 사과!
맛있는 바나나!
맛있는 딸기!
*/
```

#### 문자열 반복 예시

문자열도 반복 가능한 자료형이므로 `for...of`를 사용할 수 있습니다.

```javascript
const message = "Hello";

for (let char of message) {
  console.log(char);
}
/*
출력:
H
e
l
l
o
*/
```
