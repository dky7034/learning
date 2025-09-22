# JavaScript 모듈 시스템

## 개요

이 문서는 JavaScript의 모듈 시스템에 대해 상세히 설명합니다. 이 문서를 통해 개발자는 다음 내용을 학습할 수 있습니다.

- 모듈의 핵심 개념과 모듈 시스템의 필요성
- ES 모듈과 CommonJS 모듈 시스템의 주요 차이점 및 각각의 사용법

### 사전 학습

이 문서를 이해하기 위해 JavaScript 함수에 대한 기본적인 지식이 필요합니다.

## 모듈(Module)이란 무엇인가?

모듈은 특정 기능을 수행하는 코드의 독립적인 단위를 의미합니다. 대규모 애플리케이션을 개발할 때, 연관성 높은 코드(함수, 클래스, 변수 등)를 개별 파일로 분리하여 관리하는 시스템이 필수적입니다.

### 모듈 시스템의 필요성

모듈 시스템은 현대 JavaScript 개발에서 다음과 같은 중요한 이점을 제공합니다.

- **코드 재사용성**: 한 번 작성된 모듈은 프로젝트 내 여러 곳에서 재사용될 수 있어 개발 효율성을 높입니다.
- **유지보수 용이성**: 기능별로 코드가 분리되어 있어, 특정 기능에 문제가 발생했을 때 해당 모듈만 수정하면 되므로 유지보수가 간편해집니다.
- **네임스페이스 관리**: 각 모듈은 독립적인 스코프(Scope)를 가지므로, 전역 변수 충돌과 같은 문제를 방지합니다.
- **협업 효율성 증대**: 여러 개발자가 각자 다른 모듈을 담당하여 개발을 진행할 수 있어 팀 단위의 협업이 원활해집니다.

### 관련 용어 정리

- **모듈(Module)**: 특정 기능을 담당하는 하나의 파일입니다.
- **라이브러리(Library)**: 비슷한 기능을 수행하는 여러 모듈의 집합입니다.
- **패키지(Package)**: 하나 이상의 모듈이나 라이브러리를 포함하는 소프트웨어 배포 단위입니다. JavaScript 생태계에서는 `package.json` 파일을 통해 관리됩니다.
- **프레임워크(Framework)**: 애플리케이션의 전체적인 구조와 흐름을 제공하는 소프트웨어 환경입니다. 일반적으로 여러 패키지와 라이브러리를 포함하고 있습니다.

## JavaScript 모듈 시스템의 역사

### 초기 JavaScript: 모듈 시스템의 부재

초기 JavaScript에는 공식적인 모듈 시스템이 없었습니다. 모든 코드를 하나의 거대한 파일에 작성하거나, 여러 `<script>` 태그를 사용하여 파일을 분리해야 했습니다.

```javascript
// 모든 코드가 하나의 파일에 존재하던 시절의 예시
var userName = "홍길동";
var userAge = 25;

function greetUser() {
  console.log("안녕하세요, " + userName + "님!");
}

function calculateAge(birthYear) {
  return new Date().getFullYear() - birthYear;
}
```

이 방식은 변수 스코프 충돌, 의존성 관리의 어려움 등 여러 문제를 야기했습니다.

### CommonJS: Node.js를 위한 모듈 시스템

2009년, Node.js가 등장하면서 서버 사이드 JavaScript를 위한 모듈 시스템인 CommonJS가 도입되었습니다. `require()` 함수로 모듈을 불러오고, `module.exports` 객체로 모듈을 내보내는 방식을 사용합니다. 동기적으로 작동하며, 주로 서버 환경에서 사용됩니다.

**CommonJS 모듈 정의**

```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

**CommonJS 모듈 사용**

```javascript
// main.js
const { add } = require("./math.js");

console.log(add(1, 2)); // 3
```

### ES 모듈(ECMAScript Modules): JavaScript 표준 모듈 시스템

2015년 ES6(ECMAScript 2015)에서 JavaScript의 공식 표준 모듈 시스템인 ES 모듈이 도입되었습니다. `import`와 `export` 구문을 사용하며, 현대적인 브라우저와 Node.js 환경 모두에서 지원됩니다. **현재 가장 권장되는 방식입니다.**

Node.js에서 ES 모듈을 사용하려면, `package.json` 파일에 다음 설정을 추가해야 합니다.

```json
{
  "type": "module"
}
```

이 설정은 해당 프로젝트의 `.js` 파일들을 ES 모듈로 해석하도록 Node.js에 지시합니다.

**ES 모듈 정의**

```javascript
// math.js
function add(a, b) {
  return a + b;
}

export { add };
```

**ES 모듈 사용**

```javascript
// main.js
import { add } from "./math.js";

console.log(add(1, 2)); // 3
```

## ES 모듈: `import`와 `export`

### Named Export (이름 있는 내보내기)

하나의 모듈에서 여러 개의 변수, 함수, 클래스를 내보낼 때 사용합니다. 내보낸 이름과 동일한 이름으로 불러와야 합니다.

**모듈 내보내기**

```javascript
// math.js
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

**모듈 불러오기**

`import` 시 중괄호 `{}`를 사용하며, 필요한 항목만 선택적으로 불러올 수 있습니다. 이는 **트리 셰이킹(Tree Shaking)**을 가능하게 하여, 최종 번들 파일의 크기를 최적화하는 데 도움을 줍니다.

```javascript
// main.js
import { PI, add } from "./math.js";

console.log("원주율:", PI);
console.log(`1 + 2 = ${add(1, 2)}`);
```

**별칭(Alias) 사용하기: `as`**

`as` 키워드를 사용하여 불러온 항목의 이름을 변경할 수 있습니다. 이름 충돌을 피하거나 가독성을 높일 때 유용합니다.

```javascript
// main.js
import { add as 더하기, PI as 원주율 } from "./math.js";

console.log("2 + 3 =", 더하기(2, 3)); // 5
console.log("원주율:", 원주율); // 3.14159
```

**모든 항목 한 번에 불러오기**

`*` 와일드카드를 사용하여 모듈에서 내보낸 모든 항목을 하나의 객체로 묶어 가져올 수 있습니다.

```javascript
// main.js
import * as math from "./math.js";

console.log("원주율:", math.PI);
console.log(`1 + 2 = ${math.add(1, 2)}`);
```

### Default Export (기본 내보내기)

모듈을 대표하는 단 하나의 값(변수, 함수, 클래스 등)을 내보낼 때 사용합니다. `export default` 구문을 사용하며, 모듈 당 한 번만 사용할 수 있습니다.

**모듈 내보내기**

```javascript
// calculator.js
const Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

export default Calculator;
```

**모듈 불러오기**

`default`로 내보낸 항목은 `import` 시 중괄호 없이 원하는 이름으로 자유롭게 지정하여 불러올 수 있습니다.

```javascript
// main.js
import MyCalculator from "./calculator.js";

console.log(MyCalculator.add(1, 2)); // 3
```

## NPM (Node Package Manager)

NPM은 JavaScript 생태계의 패키지 관리 도구입니다. Node.js 설치 시 함께 설치되며, 전 세계 개발자들이 만든 수많은 패키지(라이브러리)를 손쉽게 설치하고 관리할 수 있게 해줍니다.

### 주요 명령어

- **`npm init -y`**: `package.json` 파일을 기본값으로 생성하여 프로젝트를 시작합니다.
- **`npm install <package-name>`**: 프로젝트 실행에 필요한 패키지를 설치하고 `dependencies`에 추가합니다. (예: `npm install lodash`)
- **`npm install <package-name> --save-dev`**: 개발 과정에서만 필요한 패키지(테스트 도구, 번들러 등)를 설치하고 `devDependencies`에 추가합니다. (예: `npm install jest --save-dev`)
- **`npm uninstall <package-name>`**: 설치된 패키지를 제거합니다.
- **`npm list`**: 설치된 패키지 목록을 확인합니다.

### `package.json` 파일의 구조

`package.json`은 프로젝트의 정보와 의존성(dependencies)을 관리하는 중요한 파일입니다.

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "프로젝트 설명",
  "main": "main.js",
  "type": "module",
  "scripts": {
    "start": "node main.js"
  },
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

- **`dependencies`**: 애플리케이션이 실제 운영 환경에서 동작하기 위해 필요한 패키지들입니다.
- **`devDependencies`**: 개발 및 테스트 과정에서만 사용되는 패키지들입니다.

## 유용한 NPM 패키지 소개

### `validator.js`

문자열이 이메일, URL, 전화번호 등 특정 형식을 따르는지 검증하는 기능을 제공합니다.

```bash
npm install validator
```

```javascript
import validator from "validator";

console.log(validator.isEmail("test@example.com")); // true
console.log(validator.isURL("https://example.com")); // true
```

### `day.js`

경량화된 날짜/시간 처리 라이브러리로, 복잡한 날짜 조작, 포맷팅, 비교 등을 손쉽게 처리할 수 있습니다.

```bash
npm install dayjs
```

```javascript
import dayjs from "dayjs";

const now = dayjs();
console.log(now.format("YYYY-MM-DD HH:mm:ss"));
console.log(now.add(7, "day").format("YYYY-MM-DD")); // 7일 후
```
