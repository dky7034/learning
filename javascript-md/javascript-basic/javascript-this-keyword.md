# JavaScript `this` 키워드

## 📝 개요

이 문서는 JavaScript의 핵심 개념 중 하나인 `this` 키워드를 상세히 설명합니다. `this`는 함수가 호출되는 방식에 따라 가리키는 대상이 동적으로 결정되기 때문에 많은 개발자들이 혼란을 겪는 주제입니다. 이 문서를 통해 다음 내용을 학습할 수 있습니다.

- `this`의 기본 개념과 동적 바인딩의 의미
- 다양한 실행 컨텍스트(전역, 함수, 메서드)에서의 `this` 동작 방식
- 화살표 함수가 `this`를 다루는 특별한 방식
- `call`, `apply`, `bind`를 사용한 `this` 명시적 바인딩 방법

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [JavaScript 함수](./javascript-functions.md)
- [JavaScript 객체](./javascript-objects.md)
- [JavaScript 스코프](./javascript-scope.md)

---

## 1. `this`란 무엇인가?

`this`는 **현재 실행 컨텍스트(execution context)를 참조하는** 특별한 키워드입니다. 여기서 컨텍스트란 코드가 실행되는 환경을 의미하며, 간단히 말해 **함수를 호출한 주체(객체)**를 가리킵니다.

JavaScript에서 `this`는 함수가 **선언될 때가 아니라 호출될 때** 결정됩니다. 이를 **동적 바인딩(Dynamic Binding)**이라고 합니다.

### 전역 컨텍스트에서의 `this`

코드 블록 외부의 최상위 레벨, 즉 전역 컨텍스트에서 `this`는 **전역 객체(Global Object)**를 가리킵니다.

```javascript
console.log(this);

// 브라우저 환경: window 객체 출력
// Node.js 환경: global 객체 출력
```

---

## 2. 함수 호출 방식과 `this` 바인딩

### 일반 함수 내부의 `this`

일반 함수(`function` 키워드로 선언) 내부에서 `this`는 기본적으로 **전역 객체**를 가리킵니다.

```javascript
function showThis() {
  console.log(this);
}

showThis();
// 브라우저 환경: window 객체 출력
// Node.js 환경: global 객체 출력
```

> **💡 `strict mode`(엄격 모드)에서의 변화**
> 엄격 모드(`'use strict';`)에서 일반 함수 내부의 `this`는 전역 객체를 참조하지 않고 `undefined`가 됩니다. 이는 실수를 방지하는 데 도움을 줍니다.

### 메서드 내부의 `this`

객체의 속성 값으로 할당된 함수를 **메서드(Method)**라고 부릅니다. 메서드 내부의 `this`는 **메서드를 호출한 객체**를 가리킵니다.

```javascript
const person = {
  name: "철수",
  greet: function () {
    // greet 메서드를 호출한 주체는 person 객체
    console.log(`안녕하세요. 저의 이름은 ${this.name} 입니다.`);
  },
};

person.greet(); // 출력: 안녕하세요. 저의 이름은 철수 입니다.
```

`this`는 함수가 선언된 위치가 아닌, **실행되는 시점**에 따라 결정된다는 것을 다음 예시에서 명확히 확인할 수 있습니다.

```javascript
function greet() {
  console.log(`안녕하세요. 저의 이름은 ${this.name} 입니다.`);
}

const boy = {
  name: "철수",
  action: greet,
};

const girl = {
  name: "영희",
  action: greet,
};

// boy.action()을 실행하면 this는 boy 객체를 참조
boy.action(); // 출력: 안녕하세요. 저의 이름은 철수 입니다.

// girl.action()을 실행하면 this는 girl 객체를 참조
girl.action(); // 출력: 안녕하세요. 저의 이름은 영희 입니다.
```

### 화살표 함수 내부의 `this`

화살표 함수(`=>`)는 `this`를 다루는 방식이 일반 함수와 다릅니다. 화살표 함수는 **자신만의 `this`를 갖지 않으며, 대신 가장 가까운 상위 스코프(Lexical Scope)의 `this`를 그대로 참조**합니다.

```javascript
const person = {
  name: "철수",
  // 이 화살표 함수의 상위 스코프는 전역 스코프
  greet: () => {
    console.log(`안녕하세요. 저의 이름은 ${this.name} 입니다.`);
    // 따라서 this는 전역 객체(window)를 참조하며, window.name은 기본적으로 빈 문자열
  },
};

person.greet(); // 출력: 안녕하세요. 저의 이름은  입니다.
```

이러한 특징은 메서드 내부에 중첩된 함수를 사용할 때 유용합니다.

```javascript
const person = {
  name: "철수",
  greet() {
    // 메서드 (상위 스코프)
    // 이 스코프에서 this는 person 객체
    const sayHi = () => {
      // 화살표 함수 (하위 스코프)
      // 상위 스코프(greet 메서드)의 this를 그대로 참조
      console.log(`안녕하세요. 저의 이름은 ${this.name} 입니다.`);
    };

    sayHi();
  },
};

person.greet(); // 출력: 안녕하세요. 저의 이름은 철수 입니다.
```

### DOM 이벤트 핸들러 내부의 `this`

DOM 이벤트 핸들러로 사용된 일반 함수 내부의 `this`는 **이벤트가 발생한 DOM 요소**를 가리킵니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button>클릭</button>
    <script>
      const button = document.querySelector("button");

      button.addEventListener("click", function () {
        // this는 이벤트가 발생한 <button> 요소를 가리킴
        console.log(this);
        this.style.color = "red";
        this.textContent = "클릭됨";
      });
    </script>
  </body>
</html>
```

> **⚠️ 주의:** 이벤트 핸들러로 **화살표 함수**를 사용하면 `this`는 상위 스코프(예: `window`)를 가리키므로, 이벤트 발생 요소를 참조할 수 없습니다.

---

## 3. `this` 강제 바인딩

`call`, `apply`, `bind` 메서드를 사용하면 `this`가 가리킬 객체를 명시적으로 지정할 수 있습니다.

### `call(thisArg, arg1, arg2, ...)`

- 함수를 호출하면서 `this`로 사용할 객체와 인자들을 개별적으로 전달합니다.
- 즉시 함수를 실행합니다.

```javascript
function greet(age) {
  console.log(`안녕하세요. 저의 이름은 ${this.name}이고, 나이는 ${age}입니다.`);
}

const person = { name: "철수" };

// greet 함수를 호출하되, this를 person 객체로 바인딩하고 20을 인자로 전달
greet.call(person, 20); // 출력: 안녕하세요. 저의 이름은 철수이고, 나이는 20입니다.
```

### `apply(thisArg, [arg1, arg2, ...])`

- `call`과 유사하지만, 인자들을 **배열 형태**로 묶어서 전달합니다.
- 즉시 함수를 실행합니다.

```javascript
function greet(age, city) {
  console.log(
    `안녕하세요. 저는 ${this.name}이고, ${age}살이며 ${city}에 삽니다.`
  );
}

const person = { name: "영희" };

// this를 person 객체로 바인딩하고, 인자 배열 [25, "서울"]을 전달
greet.apply(person, [25, "서울"]); // 출력: 안녕하세요. 저는 영희이고, 25살이며 서울에 삽니다.
```

### `bind(thisArg, arg1, arg2, ...)`

- `this`가 영구적으로 바인딩된 **새로운 함수를 반환**합니다.
- 함수를 즉시 실행하지 않으며, 나중에 호출할 수 있습니다.

```javascript
function greet(age, city) {
  console.log(
    `안녕하세요. 저는 ${this.name}이고, ${age}살이며 ${city}에 삽니다.`
  );
}

const person = { name: "민준" };

// this를 person 객체로, age를 30으로, city를 "부산"으로 미리 설정한 새 함수를 생성
const greetMinjun = greet.bind(person, 30, "부산");

// 나중에 필요할 때 호출
greetMinjun(); // 출력: 안녕하세요. 저는 민준이고, 30살이며 부산에 삽니다.
```
