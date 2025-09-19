# JavaScript 기본 개념과 특징

이 문서는 웹 개발의 핵심 언어인 JavaScript의 기본 개념과 특징을 설명합니다. 이 문서를 통해 다음 내용을 학습할 수 있습니다.

- JavaScript의 개념과 웹 개발에서의 역할
- Node.js의 개념과 JavaScript 실행 환경
- JavaScript의 주요 특징과 다양한 실행 방법

---

## 사전 학습

이 문서를 더 잘 이해하기 위해 다음 내용에 대한 기본적인 이해가 필요합니다.

- **Visual Studio Code 활용**: 코드 에디터 사용법에 익숙하면 좋습니다.
- **HTML 및 CSS**: 웹 페이지의 구조와 스타일에 대한 기본 지식이 있으면 JavaScript의 역할을 이해하는 데 도움이 됩니다.

---

## JavaScript란?

**JavaScript**는 원래 웹 페이지에 **동적 기능**을 구현하기 위해 개발된 객체 기반의 스크립트 프로그래밍 언어입니다. 하지만 이제는 웹 개발뿐만 아니라 서버 개발, 모바일 앱 개발, 데스크톱 앱 개발 등 다양한 분야에서 활용되고 있습니다.

### 웹 페이지의 동적 기능 예시

- **사용자 상호작용**: 버튼 클릭, 양식(form) 유효성 검사, 메뉴 토글 등
- **콘텐츠 업데이트**: 스크롤을 내릴 때 새로운 콘텐츠 로드(무한 스크롤), 실시간 검색 결과 표시
- **애니메이션**: 부드러운 화면 전환, 요소의 움직임 효과

---

## Node.js란?

**Node.js**는 Chrome V8 JavaScript 엔진을 기반으로 구축된 **JavaScript 런타임 환경**입니다. 기존에는 JavaScript가 브라우저 안에서만 실행될 수 있었지만, Node.js 덕분에 브라우저 밖(예: 로컬 컴퓨터, 서버)에서도 JavaScript 코드를 실행할 수 있게 되었습니다.

이를 통해 JavaScript로 서버를 구축하거나, 데스크톱 애플리케이션을 만드는 등 활용 범위가 크게 확장되었습니다.

---

## JavaScript 코드 작성 및 실행

JavaScript 코드를 작성하고 실행하는 방법은 다양합니다. 주요 방법은 다음과 같습니다.

### 1. 브라우저 개발자 도구 콘솔

웹 브라우저에서 제공하는 개발자 도구의 **콘솔(Console)** 창을 사용하면 JavaScript 코드를 즉시 실행하고 결과를 확인할 수 있습니다. 주로 간단한 코드를 테스트하거나 디버깅할 때 유용합니다.

#### `console.log()`

`console.log()` 함수는 콘솔 창에 메시지나 변수의 값을 출력하는 가장 기본적인 방법입니다.

```javascript
console.log("Hello, World!");
```

이 외에도 다음과 같은 다양한 `console` 메서드가 있습니다.

- `console.error()`: 오류 메시지를 출력합니다.
- `console.warn()`: 경고 메시지를 출력합니다.
- `console.info()`: 정보성 메시지를 출력합니다.
- `console.table()`: 배열이나 객체를 표 형태로 보기 좋게 출력합니다.

### 2. HTML 문서에 내장 (`<script>` 태그)

HTML 문서 내에 `<script>` 태그를 사용하여 JavaScript 코드를 직접 작성할 수 있습니다. 일반적으로 `<script>` 태그는 `<body>` 태그가 끝나기 직전에 위치시키는 것이 좋습니다. 이는 HTML 구조를 먼저 모두 불러온 뒤 스크립트를 실행하여 사용자 경험을 향상시키기 위함입니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>JavaScript in HTML</title>
  </head>
  <body>
    <h1>Hello, HTML!</h1>

    <script>
      console.log("Hello, JavaScript!");
      // 이 곳에 JavaScript 코드를 작성합니다.
    </script>
  </body>
</html>
```

### 3. 외부 JavaScript 파일 불러오기

JavaScript 코드를 별도의 `.js` 파일로 작성한 뒤, HTML 문서에서 `<script>` 태그의 `src` 속성을 사용하여 불러올 수 있습니다. 이 방법은 코드를 체계적으로 관리하고 여러 HTML 문서에서 재사용할 수 있다는 장점이 있습니다. 마치 `<link>` 태그로 CSS 파일을 불러오는 것과 유사합니다.

**index.html**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>External JavaScript</title>
  </head>
  <body>
    <h1>Hello, HTML!</h1>
    <script src="./main.js"></script>
  </body>
</html>
```

**main.js**
```javascript
// main.js 파일
console.log("Hello, JavaScript from an external file!");
```

### 4. Node.js 환경에서 실행

Node.js가 설치되어 있다면, 터미널(명령 프롬프트)에서 `node` 명령어를 사용하여 `.js` 파일을 직접 실행할 수 있습니다. 이 방법은 주로 서버 사이드 개발이나 로컬 환경에서 스크립트를 실행할 때 사용됩니다.

**실행 과정**

1.  **`.js` 파일 생성**: 원하는 이름으로 `.js` 파일을 만듭니다. (예: `app.js`)
2.  **코드 작성**: 파일에 JavaScript 코드를 작성합니다.
3.  **터미널에서 실행**: 터미널을 열고 해당 파일이 있는 디렉토리로 이동한 뒤, `node 파일명.js` 명령어를 실행합니다.

**app.js**
```javascript
console.log("Hello, Node.js!");
```

**터미널 실행**
```bash
$ node app.js
Hello, Node.js!
```
