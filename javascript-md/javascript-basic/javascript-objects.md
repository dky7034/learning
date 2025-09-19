# JavaScript 객체 (Object)

이 문서는 JavaScript의 핵심 자료형 중 하나인 **객체(Object)**에 대해 상세히 설명합니다. 객체는 관련된 데이터와 기능(메서드)을 하나의 단위로 묶어 관리할 수 있게 해주는 매우 중요한 개념입니다.

-   객체의 기본 개념과 구조
-   객체 생성, 조회, 수정, 삭제 방법
-   객체 순회 및 내장 유틸리티 함수 활용법
-   객체의 속성이 될 수 있는 함수, 즉 메서드(Method)와 `this` 키워드
-   데이터 교환 형식인 JSON과의 관계

---

## 사전 학습

-   **JavaScript 자료형 및 변수**: 객체의 속성 값으로 다양한 자료형이 사용될 수 있습니다.
-   **JavaScript 반복문**: 객체의 속성을 순회하는 방법을 이해하는 데 필요합니다.

---

## 1. 객체(Object)란?

**객체**는 여러 데이터를 **이름(key)과 값(value)이 한 쌍으로 묶인 집합** 형태로 저장하는 참조 자료형입니다. 이렇게 묶인 하나의 쌍을 **속성(Property)**이라고 부릅니다.

-   **Key(키)**: 속성을 식별하기 위한 이름으로, 주로 문자열이나 심볼(Symbol)이 사용됩니다. (문자열이 아닌 다른 타입이 키로 사용될 경우, 내부적으로 문자열로 변환됩니다.)
-   **Value(값)**: 속성에 할당된 데이터입니다. 원시 자료형(숫자, 문자열 등), 다른 객체, 또는 함수 등 모든 자료형이 값이 될 수 있습니다.

현실 세계의 대상을 표현하는 데 유용합니다. 예를 들어, '사람'이라는 객체는 '이름', '나이', '직업' 등의 속성을 가질 수 있습니다.

```javascript
// 'person'이라는 객체는 3개의 속성(property)을 가집니다.
let person = {
  name: "홍길동", // 'name'은 key, "홍길동"은 value
  age: 30,         // 'age'는 key, 30은 value
  job: "개발자",   // 'job'은 key, "개발자"는 value
};

console.log(person); // { name: '홍길동', age: 30, job: '개발자' }
```

---

## 2. 객체 기본 조작

### 객체 생성

중괄호 `{}`를 사용하여 객체를 생성하며, 내부에는 0개 이상의 속성을 정의할 수 있습니다.

### 속성 조회(Accessing Properties)

객체의 속성 값에 접근하는 데는 두 가지 방법이 있습니다.

1.  **점 표기법 (Dot Notation)**: `객체이름.키`
2.  **대괄호 표기법 (Bracket Notation)**: `객체이름['키']`

```javascript
console.log(person.name); // "홍길동"
console.log(person['age']); // 30
```

**대괄호 표기법은 다음과 같은 경우에 유용합니다.**

-   **키 이름에 공백이나 특수문자가 포함된 경우**

    ```javascript
    let user = {
      'user-name': '김철수',
      'favorite language': 'JavaScript'
    };
    // console.log(user.user-name); // 오류 발생
    console.log(user['user-name']); // "김철수"
    ```

-   **키 이름을 변수로 동적으로 지정해야 할 경우**

    ```javascript
    let keyName = 'job';
    console.log(person[keyName]); // "개발자" (person['job']과 동일)
    ```

### 속성 추가 및 수정 (Adding & Updating Properties)

존재하지 않는 키에 값을 할당하면 새로운 속성이 추가되고, 이미 존재하는 키에 값을 할당하면 기존 속성의 값이 수정됩니다.

```javascript
let person = { name: "홍길동", age: 30 };

// 속성 수정
person.age = 31;

// 속성 추가
person.job = "프로그래머";
person['address'] = "서울";

console.log(person); // { name: '홍길동', age: 31, job: '프로그래머', address: '서울' }
```

### 속성 삭제 (Deleting Properties)

`delete` 연산자를 사용하여 객체의 속성을 삭제할 수 있습니다.

```javascript
let person = { name: "홍길동", age: 30, job: "개발자" };

delete person.job;

console.log(person); // { name: '홍길동', age: 30 }
```

---

## 3. 객체 순회 및 내장 함수

### `for...in` 반복문

`for...in` 반복문은 객체에 포함된 모든 속성 키를 순회합니다.

```javascript
const person = { name: "홍길동", age: 30, city: "서울" };

for (let key in person) {
  // key 변수에는 'name', 'age', 'city'가 차례로 할당됩니다.
  console.log(`${key}: ${person[key]}`);
}
// 출력:
// name: 홍길동
// age: 30
// city: 서울
```

> **⚠️ 주의: `for...in`과 프로토타입**
> `for...in`은 객체가 직접 소유한 속성뿐만 아니라, 프로토타입 체인(prototype chain)을 통해 상속받은 속성까지 모두 순회합니다. 의도치 않은 동작을 방지하려면 `hasOwnProperty()` 메서드를 사용하여 해당 객체가 직접 소유한 속성인지 확인하는 것이 안전합니다.
> 
> ```javascript
> for (let key in person) {
>   if (person.hasOwnProperty(key)) {
>     console.log(`${key}: ${person[key]}`);
>   }
> }
> ```

### `Object` 내장 유틸리티 함수

`Object` 생성자는 객체 작업을 돕는 여러 유용한 함수(정적 메서드)를 제공합니다.

-   **`Object.keys(obj)`**: 객체 `obj`가 직접 소유한 속성들의 **키(key)**만 모아 배열로 반환합니다.
-   **`Object.values(obj)`**: 객체 `obj`가 직접 소유한 속성들의 **값(value)**만 모아 배열로 반환합니다.
-   **`Object.entries(obj)`**: 객체 `obj`가 직접 소유한 속성들의 `[키, 값]` 쌍을 모아 2차원 배열로 반환합니다.

이 함수들은 `for...in`과 달리 프로토타입 체인을 순회하지 않으며, 객체의 데이터를 배열로 변환하여 `map`, `filter` 등 배열 메서드와 함께 사용하기에 매우 유용합니다.

```javascript
const person = { name: "홍길동", age: 30, job: "개발자" };

const keys = Object.keys(person);       // ["name", "age", "job"]
const values = Object.values(person);   // ["홍길동", 30, "개발자"]
const entries = Object.entries(person); // [["name", "홍길동"], ["age", 30], ["job", "개발자"]]

console.log(keys);
console.log(values);
console.log(entries);
```

---

## 4. 메서드 (Method)와 `this`

### 메서드(Method)란?

**메서드**는 객체의 속성 값으로 할당된 **함수**입니다. 메서드는 해당 객체와 관련된 동작이나 기능을 정의하며, 객체의 다른 속성 값에 접근하여 작업을 수행할 수 있습니다.

```javascript
const person = {
  name: "철수",
  // greet는 person 객체의 메서드입니다.
  greet: function () {
    console.log("안녕하세요. 반갑습니다.");
  },
};

person.greet(); // "안녕하세요. 반갑습니다."
```

ES6부터는 `function` 키워드를 생략한 축약형 메서드 정의가 가능합니다.

```javascript
const person = {
  name: "철수",
  // 축약형 메서드
  greet() {
    console.log("안녕하세요. 반갑습니다.");
  },
};
```

### `this` 키워드

메서드 내부에서 `this` 키워드를 사용하면 **해당 메서드를 호출한 객체**를 가리킬 수 있습니다. 이를 통해 메서드는 자신이 속한 객체의 다른 속성에 접근할 수 있습니다.

```javascript
const person = {
  name: "영희",
  age: 25,
  introduce() {
    // 여기서 'this'는 introduce() 메서드를 호출한 'person' 객체를 가리킵니다.
    console.log(`안녕하세요, 저는 ${this.name}이고, ${this.age}살입니다.`);
  }
};

person.introduce(); // "안녕하세요, 저는 영희이고, 25살입니다."
```

> **⚠️ 화살표 함수와 `this`**
> 화살표 함수는 자신만의 `this`를 갖지 않고, 자신을 감싼 상위 스코프의 `this`를 그대로 물려받습니다. 따라서 객체의 메서드를 정의할 때는 `this`가 의도치 않게 동작할 수 있으므로, `function` 키워드를 사용하거나 축약형 메서드 정의를 사용하는 것이 일반적입니다.

---

## 5. JSON (JavaScript Object Notation)

**JSON**은 데이터를 교환하기 위해 만들어진 **경량의 텍스트 형식**입니다. 이름에서 알 수 있듯이 JavaScript 객체 표기법에서 파생되었지만, 특정 언어에 종속되지 않아 오늘날 웹 애플리케이션에서 서버와 클라이언트 간에 데이터를 주고받는 표준 형식으로 널리 사용됩니다.

-   **`JSON.stringify()`**: JavaScript 객체(또는 다른 값)를 JSON 형식의 **문자열**로 변환합니다.
-   **`JSON.parse()`**: JSON 형식의 **문자열**을 JavaScript 객체로 변환합니다.

```javascript
// 1. JavaScript 객체를 JSON 문자열로 변환 (서버로 데이터 전송 시)
const person = { name: "홍길동", age: 30, job: "개발자" };
const jsonString = JSON.stringify(person);

console.log(jsonString); // "{\"name\":\"홍길동\",\"age\":30,\"job\":\"개발자\"}"
console.log(typeof jsonString); // "string"

// 2. JSON 문자열을 JavaScript 객체로 변환 (서버로부터 데이터 수신 시)
const receivedJsonString = '{"name":"김철수","age":28,"city":"부산"}';
const parsedObject = JSON.parse(receivedJsonString);

console.log(parsedObject); // { name: '김철수', age: 28, city: '부산' }
console.log(typeof parsedObject); // "object"
```