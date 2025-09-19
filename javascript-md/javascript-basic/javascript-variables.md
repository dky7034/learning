# JavaScript 변수 (Variables)

이 문서는 JavaScript의 변수(Variable)에 대해 설명합니다. 문서를 통해 다음 내용을 학습할 수 있습니다.

- 변수의 정의와 필요성
- `let`과 `const`를 사용한 변수 선언 방법
- 변수에 데이터를 저장하고 사용하는 방법
- 템플릿 리터럴을 활용한 문자열 처리 방법

---

## 사전 학습

- **JavaScript 원시 자료형**: `String`, `Number` 등 기본 데이터 타입에 대한 이해가 필요합니다.
- **JavaScript 연산자**: 기본적인 연산자 개념을 알고 있으면 좋습니다.

---

## 변수(Variable)란?

**변수**는 데이터를 저장하고, 나중에 다시 사용하기 위해 붙이는 **이름표**와 같습니다. 즉, 재사용 가능한 이름을 가진 데이터 저장 공간입니다.

### 할당 연산자 (`=`)

할당 연산자(`=`)는 특정 데이터에 이름을 부여(할당)할 때 사용하는 연산자입니다.

```javascript
// 변수명 = 데이터
let number = 10;
let message = "Hello, World!";

console.log(number); // 10
console.log(message); // "Hello, World!"
```

### 변수의 필요성

1.  **관리의 편리성**: 만약 여러 곳에서 동일한 데이터를 사용하고 있을 때, 변수를 사용하면 해당 변수에 할당된 값만 한 번 수정하여 모든 곳에 변경 사항을 적용할 수 있습니다.
2.  **가독성 향상**: 데이터에 의미 있는 이름을 붙여주면, 코드를 읽는 사람이 데이터의 역할을 쉽게 파악할 수 있습니다.

#### 변수 없이 작성한 코드

```javascript
console.log("안녕하세요 김철수님!");
console.log("김철수님의 나이는 25살입니다.");
console.log("김철수님은 학생입니다.");
// 만약 '김철수'를 '이영희'로 바꾸려면 세 줄을 모두 수정해야 합니다.
```

#### 변수를 사용한 코드

```javascript
let name = "김철수";
let age = 25;
let job = "학생";

console.log("안녕하세요 " + name + "님!");
console.log(name + "님의 나이는 " + age + "살입니다.");
console.log(name + "님은 " + job + "입니다.");
// 'name' 변수의 값만 바꾸면 모든 출력문이 변경됩니다.
```

---

## 변수 선언과 할당

- **선언(Declaration)**: `let` 또는 `const` 키워드를 사용하여 이름을 가진 변수를 생성하는 과정입니다.
- **할당(Assignment)**: 선언된 변수에 `=` 연산자를 사용하여 데이터를 저장하는 과정입니다.

선언과 할당은 따로 할 수도 있고, 동시에 할 수도 있습니다.

```javascript
// 1. 선언 후 할당
let name; // 'name'이라는 변수 선언
name = "김철수"; // 'name' 변수에 데이터 할당

// 2. 선언과 동시에 할당
let age = 25;
```

### `let` 변수 선언

`let`으로 선언된 변수는 **데이터를 변경(재할당)할 수 있습니다.**

```javascript
let score = 80;
console.log(score); // 80

score = 90; // 새로운 값으로 재할당
console.log(score); // 90
```

### `const` 변수 선언

`const`로 선언된 변수는 **데이터를 재할당할 수 없습니다.** 한 번 할당된 값이 바뀌지 않는 **상수(constant)**를 선언할 때 사용합니다. `const`는 선언과 동시에 반드시 값을 할당해야 합니다.

```javascript
const PI = 3.14;
console.log(PI); // 3.14

// 아래 코드는 오류를 발생시킵니다.
// PI = 3.15; // TypeError: Assignment to constant variable.
```

### `let` vs `const` 선택 기준

- **`let`**: 앞으로 값이 **변경될 가능성이 있는** 변수에 사용합니다. (예: 사용자의 나이, 점수, 장바구니 총액)
- **`const`**: 값이 **절대 변경되지 않아야 하는** 변수(상수)에 사용합니다. (예: 원주율, 생일, API 키)

**기본적으로는 `const`를 사용하고, 재할당이 필요한 경우에만 `let`으로 변경하는 것을 권장합니다.** 이는 코드의 안정성을 높여줍니다.

```javascript
let userAge = 20; // 나이는 시간이 지나면 변할 수 있음
const userName = "김철수"; // 이름은 보통 바뀌지 않음

let totalPrice = 1000; // 총 가격은 상품 추가/삭제에 따라 변할 수 있음
const TAX_RATE = 0.1; // 세율은 정책이 바뀌지 않는 한 고정값
```

---

## 변수 이름 짓기 (Naming Convention)

### 기본 규칙

- 영어, 숫자, `_`(언더스코어), `$`(달러 기호)만 사용할 수 있습니다.
- 숫자로 시작할 수 없습니다.
- 대소문자를 구분합니다. (`userName`과 `UserName`은 다른 변수입니다.)
- **예약어(Reserved Words)**는 사용할 수 없습니다. (예: `let`, `const`, `if`, `for` 등)

| 올바른 변수명      | 잘못된 변수명                       |
| :----------------- | :---------------------------------- |
| `let userName;`    | `let 2user;` (숫자로 시작)          |
| `let user_age;`    | `let user-name;` (하이픈 사용 불가) |
| `let $price;`      | `let let;` (예약어 사용)            |
| `let totalCount2;` | `let user name;` (공백 사용 불가)   |

### 권장 사항

1.  **카멜 케이스(Camel Case) 사용**

    - 첫 단어는 소문자로 시작하고, 이후 각 단어의 첫 글자는 대문자로 작성하는 방식입니다.
    - JavaScript 커뮤니티에서 널리 사용되는 관례입니다.
    - 예시: `userName`, `totalPrice`, `isLoggedIn`

2.  **의미 있는 이름 사용**
    - 변수의 역할을 명확하게 알 수 있는 이름을 짓는 것이 중요합니다.
    - 나쁜 예: `let x = 25;`, `let a = "김철수";`
    - 좋은 예: `let userAge = 25;`, `let userName = "김철수";`

---

## 템플릿 리터럴 (Template Literal)

백틱(`` ` ``)과 `${...}` 기호를 사용하여 문자열 안에 변수나 간단한 표현식(연산 등)을 쉽게 삽입하는 방법입니다.

```javascript
let name = "홍길동";
let age = 30;

// 이전 방식: + 연산자 사용
let message1 = "제 이름은 " + name + "이고, 나이는 " + age + "살입니다.";
console.log(message1);

// 템플릿 리터럴 사용
let message2 = `제 이름은 ${name}이고, 나이는 ${age}살입니다.`;
console.log(message2);

// 표현식 삽입
console.log(`내년에는 ${age + 1}살이 됩니다.`);
```

---

## 심화 개념: `var`

`var`는 `let`과 `const`가 등장하기 전, 초기 JavaScript 버전에서 변수를 선언하던 방식입니다. 하지만 다음과 같은 문제점들 때문에 **현재는 사용을 권장하지 않습니다.**

- **중복 선언 가능**: 같은 이름으로 변수를 여러 번 선언해도 오류가 발생하지 않아 혼란을 야기할 수 있습니다.
- **함수 레벨 스코프**: 코드 블록(`{ }`)을 무시하고 함수 단위로만 유효 범위를 가져서 예측과 다른 동작을 할 수 있습니다. (스코프 개념은 추후 학습)

```javascript
var name = "김철수";
console.log(name); // "김철수"

var name = "이영희"; // 같은 이름으로 다시 선언해도 오류가 없음
console.log(name); // "이영희"
```
