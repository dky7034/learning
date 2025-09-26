# 모던 JavaScript 문법

## 📝 개요

이 문서는 ECMAScript 2015(ES6)를 기점으로 도입된 JavaScript의 주요 최신 문법을 설명합니다. 이 문법들을 활용하면 더 간결하고 효율적이며 안전한 코드를 작성할 수 있습니다. 문서를 통해 다음을 학습할 수 있습니다.

- **객체 리터럴 확장**: 단축 프로퍼티, 계산된 속성명
- **데이터 복사와 재구성**: 펼침 연산자, 구조 분해 할당
- **안전한 데이터 접근**: 옵셔널 체이닝, Nullish 병합 연산자

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [JavaScript 기본 문법](./javascript-basic.md)
- [JavaScript 객체](./javascript-objects.md)
- [JavaScript 배열](./javascript-array.md)

---

## 1. ECMAScript와 모던 JavaScript

**ECMAScript(ES)**는 JavaScript의 공식 표준 규격입니다. 2015년에 발표된 **ECMAScript 2015 (ES6)** 부터 매년 새로운 기능이 추가되고 있으며, `let`, `const`, 화살표 함수 등 오늘날 널리 쓰이는 문법들이 대거 도입되었습니다. 이 ES6를 모던 JavaScript의 시작점으로 봅니다.

---

## 2. 객체 리터럴 확장

### 단축 프로퍼티 (Property Value Shorthand)

객체를 생성할 때 변수명과 객체의 속성명이 같다면 `{ key: value }` 형태를 `{ 변수명 }`으로 축약할 수 있습니다. 코드의 가독성을 크게 향상시킵니다.

```javascript
// 변수 선언
const name = "jun";
const age = 25;

// ES6 이전
const person1 = {
  name: name,
  age: age,
};

// 단축 프로퍼티 사용
const person2 = {
  name, // name: name 과 동일
  age,  // age: age 와 동일
};

console.log(person1); // { name: 'jun', age: 25 }
console.log(person2); // { name: 'jun', age: 25 }
```

### 계산된 속성명 (Computed Property Names)

대괄호(`[]`)를 사용해 변수나 표현식의 결과값을 객체의 속성명(Key)으로 동적으로 지정할 수 있습니다.

```javascript
const keyName = "name";
const keyAge = "age";

const person = {
  [keyName]: "홍길동",
  [keyAge]: 30,
  ["job" + "Title"]: "개발자",
};

console.log(person); // { name: '홍길동', age: 30, jobTitle: '개발자' }
```

---

## 3. 펼침 연산자 (Spread Operator)

펼침 연산자(`...`)는 배열이나 객체의 모든 원소 또는 속성을 개별 요소로 "펼쳐서" 새로운 배열이나 객체를 만들 때 사용합니다. **얕은 복사(Shallow Copy)**에 활용됩니다.

### 배열에서의 사용

배열의 원소를 복사하거나 다른 배열과 쉽게 결합할 수 있습니다.

```javascript
const arr1 = [1, 2, 3];

// 배열 복사
const arr2 = [...arr1];
console.log(arr2); // [1, 2, 3]

// 다른 배열과 결합
const arr3 = [...arr1, 4, 5];
console.log(arr3); // [1, 2, 3, 4, 5]
```

### 객체에서의 사용

객체의 속성을 복사하거나 다른 객체와 병합할 수 있습니다. 동일한 속성이 있으면 가장 마지막에 선언된 값으로 덮어씌워집니다.

```javascript
const obj1 = { name: "홍길동", age: 25 };

// 객체 복사
const obj2 = { ...obj1 };
console.log(obj2); // { name: '홍길동', age: 25 }

// 다른 객체와 결합 (age 속성 덮어쓰기)
const obj3 = { ...obj1, age: 30, job: "개발자" };
console.log(obj3); // { name: '홍길동', age: 30, job: '개발자' }
```

> #### ⚠️ 할당(=) vs. 펼침 연산자(...)
> - **할당(`=`)**: 객체나 배열의 메모리 주소를 복사합니다. 따라서 원본을 수정하면 복사본도 함께 변경됩니다. (참조 복사)
> - **펼침 연산자(`...`)**: 값 자체를 복사하여 새로운 객체나 배열을 생성합니다. 원본과 복사본은 서로 영향을 주지 않습니다. (얕은 복사)

---

## 4. 구조 분해 할당 (Destructuring Assignment)

배열이나 객체의 속성을 분해하여 그 값을 개별 변수에 간편하게 할당하는 문법입니다.

### 배열 구조 분해

배열의 원소를 순서에 따라 변수에 할당합니다.

```javascript
const fruits = ["사과", "바나나", "딸기"];

// 기본 할당
const [first, second, third] = fruits;
console.log(first, second, third); // 사과 바나나 딸기

// 일부 원소 무시
const [, , last] = fruits;
console.log(last); // 딸기

// 나머지 원소를 배열로 할당 (Rest 연산자)
const [apple, ...rest] = fruits;
console.log(apple); // 사과
console.log(rest);  // ['바나나', '딸기']
```

### 객체 구조 분해

객체의 속성명과 동일한 이름의 변수에 값을 할당합니다. 순서는 중요하지 않습니다.

```javascript
const person = {
  name: "홍길동",
  age: 30,
  job: "개발자",
};

// 기본 할당
const { name, age, job } = person;
console.log(name, age, job); // 홍길동 30 개발자

// 새로운 변수 이름으로 할당
const { name: fullName, age: years } = person;
console.log(fullName, years); // 홍길동 30

// 기본값 지정
const { country = "한국" } = person;
console.log(country); // 한국
```

---

## 5. 안전한 데이터 접근

### 옵셔널 체이닝 (Optional Chaining)

옵셔널 체이닝(`?.`) 연산자는 `null` 또는 `undefined`일 가능성이 있는 객체의 속성이나 메서드에 안전하게 접근할 수 있도록 합니다. 중간 경로의 값이 존재하지 않으면 오류를 발생시키는 대신 `undefined`를 반환합니다.

```javascript
const user = {
  name: "철수",
  address: {
    city: "서울",
  },
  greet() {
    return "안녕하세요!";
  },
};

// 객체 속성 접근
console.log(user?.address?.city); // 서울

// 존재하지 않는 속성 접근
console.log(user?.phone?.number); // undefined (오류 발생 X)

// 메서드 호출
console.log(user.greet?.()); // 안녕하세요!

// 존재하지 않는 메서드 호출
console.log(user.sayHello?.()); // undefined
```

### Nullish 병합 연산자 (Nullish Coalescing Operator)

Nullish 병합 연산자(`??`)는 왼쪽 피연산자가 `null` 또는 `undefined`일 때 오른쪽 피연산자(기본값)를 반환합니다. 그 외의 "falsy" 값(예: `0`, `false`, `''`)은 그대로 반환합니다.

```javascript
let username = null;
let defaultName = "익명";
let name = username ?? defaultName; // username이 null이므로 기본값 적용
console.log(name); // 익명

let userAge;
let defaultAge = 20;
let age = userAge ?? defaultAge; // userAge가 undefined이므로 기본값 적용
console.log(age); // 20
```

> #### `??` vs. `||` (논리 OR)
> - **`??` (Nullish 병합)**: 오직 `null`과 `undefined`만 확인합니다.
> - **`||` (논리 OR)**: `false`, `0`, 빈 문자열(`''`), `NaN` 등 모든 "falsy" 값을 확인하여 기본값을 적용합니다.
>
> ```javascript
> let count = 0;
> 
> // || 연산자는 0을 falsy로 취급하여 10을 할당
> let resultOr = count || 10;
> console.log(resultOr); // 10
> 
> // ?? 연산자는 0이 null이나 undefined가 아니므로 0을 그대로 할당
> let resultNullish = count ?? 10;
> console.log(resultNullish); // 0
> ```
