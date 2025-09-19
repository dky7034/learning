
# JavaScript `this` 바인딩 완벽 가이드

JavaScript에서 `this` 키워드는 함수가 호출될 때 결정되는 실행 컨텍스트(Execution Context)를 가리키는 참조입니다. 즉, 함수를 호출한 주체에 대한 정보를 담고 있습니다. 하지만 `this`가 무엇을 가리키는지는 함수를 어떻게 선언하고 호출하는지에 따라 달라지기 때문에 많은 개발자에게 혼란을 주기도 합니다.

이 문서는 일반 함수와 화살표 함수에서의 `this` 바인딩 규칙, 그리고 실제 사용 사례를 통해 `this`를 명확하게 이해하고 활용하는 방법을 안내합니다.

---

## 1. 일반 함수(Normal Function)와 동적 `this` 바인딩

일반 함수(function 키워드로 선언)의 `this`는 **함수가 호출되는 방식**에 따라 동적으로 결정됩니다. 이는 함수가 어디에 선언되었는지가 아니라, 누가, 어떻게 호출했는지가 중요하다는 의미입니다.

### 1.1. 전역 공간에서의 호출 (Global Context Binding)
함수가 독립적으로 호출될 때, `this`는 전역 객체(Global Object)를 가리킵니다.
- 브라우저 환경: `window` 객체
- Node.js 환경: `global` 객체
- 단, `'use strict'`(엄격 모드)에서는 `undefined`가 바인딩됩니다.

```javascript
function normalFunc() {
  console.log(this);
}

normalFunc(); // 브라우저에서는 window, Node.js에서는 global 객체를 출력

function strictFunc() {
  'use strict';
  console.log(this);
}

strictFunc(); // undefined
```

### 1.2. 객체의 메서드로서 호출 (Implicit Binding)
함수가 특정 객체의 프로퍼티(메서드)로서 호출될 때, `this`는 해당 객체를 가리킵니다.

```javascript
const myObj = {
  name: "객체",
  sayHello: function() {
    console.log(`Hello, ${this.name}!`);
  }
};

myObj.sayHello(); // "Hello, 객체!" (this는 myObj를 가리킴)
```

### 1.3. `new` 키워드를 사용한 생성자 호출 (Constructor Binding)
`new` 키워드와 함께 함수를 호출하여 새로운 인스턴스를 생성할 때, `this`는 새로 생성된 인스턴스 객체를 가리킵니다.

```javascript
function Person(name) {
  this.name = name;
  console.log(this); // 새로 생성된 Person 인스턴스
}

const person1 = new Person("철수"); // this는 person1을 가리킴
console.log(person1.name); // "철수"
```

### 1.4. `call`, `apply`, `bind`를 통한 명시적 바인딩 (Explicit Binding)
`call()`, `apply()`, `bind()` 메서드를 사용하면 `this`가 가리킬 객체를 코드상에서 명시적으로 지정할 수 있습니다.

```javascript
function greet() {
  console.log(`Welcome, ${this.user}!`);
}

const admin = { user: "Admin" };
const guest = { user: "Guest" };

greet.call(admin);  // "Welcome, Admin!" (this를 admin 객체로 지정하여 호출)
greet.apply(guest); // "Welcome, Guest!" (this를 guest 객체로 지정하여 호출)

const greetAsAdmin = greet.bind(admin); // this가 admin으로 고정된 새 함수를 반환
greetAsAdmin(); // "Welcome, Admin!"
```

---

## 2. 화살표 함수(Arrow Function)와 렉시컬 `this` (Lexical This)

화살표 함수(`=>`)는 ES6에서 도입되었으며, `this` 바인딩 방식에서 일반 함수와 결정적인 차이를 보입니다.

**화살표 함수는 자신만의 `this`를 생성하지 않습니다.** 대신, 함수가 **선언된 위치의 상위 스코프(Lexical Scope)에 있는 `this`**를 그대로 물려받아 사용합니다. 이를 "렉시컬 `this`"라고 부릅니다.

```javascript
const obj = {
  name: "철수",
  // say 메서드의 this는 obj를 가리킵니다.
  say: function () {
    console.log(`메서드에서의 this: ${this.name}`); // "철수"

    // 화살표 함수는 상위 스코프(say 메서드)의 this를 그대로 상속받습니다.
    const arrowFunc = () => {
      console.log(`화살표 함수에서의 this: ${this.name}`);
    };
    
    arrowFunc();
  }
};

obj.say(); // "화살표 함수에서의 this: 철수"
```
위 예제에서 `arrowFunc`는 `say` 메서드 내부에 선언되었습니다. 따라서 `arrowFunc`의 `this`는 `say` 메서드의 `this`인 `obj`를 그대로 가리키게 됩니다.

---

## 3. 콜백 함수와 비동기 처리에서의 `this`

`this` 바인딩의 차이는 콜백 함수나 `setTimeout` 같은 비동기 코드에서 두드러지게 나타납니다.

### 문제 상황: 일반 함수 콜백
일반 함수를 콜백으로 전달하면, 해당 함수는 콜백을 실행하는 주체(예: `setTimeout`의 전역 컨텍스트)에 의해 호출됩니다. 이로 인해 원래 의도했던 `this`를 잃어버리게 됩니다.

```javascript
function Person(name) {
  this.name = name;

  // 1초 후, setTimeout의 콜백 함수가 호출됩니다.
  // 이때 콜백 함수는 Person의 컨텍스트가 아닌 전역 컨텍스트에서 실행됩니다.
  setTimeout(function() {
    // this는 window 또는 global을 가리키므로, this.name은 undefined입니다.
    console.log(`일반 함수 콜백: ${this.name}`); 
  }, 1000);
}

new Person("민수"); // 출력: "일반 함수 콜백: undefined"
```

### 해결책: 화살표 함수 콜백
화살표 함수는 선언된 시점의 상위 스코프 `this`를 유지하므로, 콜백 함수로 사용해도 원래의 `this`를 잃지 않습니다.

```javascript
function Person(name) {
  this.name = name;

  // 화살표 함수는 Person 생성자 스코프의 this(새로 생성될 인스턴스)를 기억합니다.
  setTimeout(() => {
    // 따라서 1초 후에 호출되어도 this는 Person 인스턴스를 정확히 가리킵니다.
    console.log(`화살표 함수 콜백: ${this.name}`);
  }, 1000);
}

new Person("민수"); // 출력: "화살표 함수 콜백: 민수"
```

---

## 4. 클래스(Class)에서의 `this` 활용

클래스 내부에서 `this`는 기본적으로 클래스의 인스턴스를 가리킵니다. 하지만 메서드를 분리하여 다른 곳에 전달할 때 `this`가 분리되는 문제가 발생할 수 있습니다.

### 문제 상황: 메서드 분리
```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}

const user = new User("영희");
user.sayName(); // "영희"

const detachedSayName = user.sayName;
detachedSayName(); // TypeError: Cannot read properties of undefined (reading 'name')
// detachedSayName은 독립적으로 호출되었으므로 this는 undefined(엄격 모드)가 됩니다.
```

### 해결책: 클래스 필드 화살표 함수
클래스 필드(Class Field)에 화살표 함수를 할당하면, 해당 함수는 인스턴스의 고유한 속성이 되며 `this`는 항상 해당 인스턴스에 바인딩됩니다.

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  // sayName은 인스턴스가 생성될 때 this가 user 인스턴스로 바인딩된 함수가 됩니다.
  sayName = () => {
    console.log(this.name);
  }
}

const user = new User("영희");
const detachedSayName = user.sayName;

// 메서드를 분리해서 호출해도 this는 user 인스턴스를 유지합니다.
detachedSayName(); // "영희"
```
이 패턴은 React 컴포넌트에서 이벤트 핸들러를 정의할 때 `this`를 인스턴스에 바인딩하기 위해 널리 사용됩니다.

---

## 5. 핵심 요약 및 비교

| 구분 | 일반 함수 (Normal Function) | 화살표 함수 (Arrow Function) |
| :--- | :--- | :--- |
| **`this` 바인딩** | **동적 (Dynamic)** | **렉시컬 (Lexical)** |
| **`this` 결정 시점** | 함수가 **호출될 때** 결정됨 | 함수가 **선언될 때** 상위 스코프의 `this`로 고정됨 |
| **자체 `this`** | 가짐 | 갖지 않음 (상속받음) |
| **주요 특징** | 호출 방식(전역, 메서드, 생성자 등)에 따라 `this`가 계속 바뀜 | `this`가 한번 결정되면 바뀌지 않아 예측 가능함 |
| **추천 사용 사례** | 객체의 메서드, 생성자 함수 | **콜백 함수, 비동기 처리, 클래스 필드 메서드** 등 `this`를 현재 컨텍스트에 고정하고 싶을 때 |

결론적으로, `function`으로 선언된 일반 함수의 `this`는 유연하지만 예측이 어려운 반면, 화살표 함수의 `this`는 고정되어 있어 콜백 함수 등에서 `this` 컨텍스트를 유지하는 데 매우 유리합니다. 코드의 예측 가능성과 안정성을 높이기 위해 `this`의 동작 방식을 명확히 이해하고 상황에 맞는 함수를 사용하는 것이 중요합니다.
