
# DOM API: 개념부터 실용 예제까지

이 문서는 웹 개발의 핵심인 DOM(Document Object Model) API에 대해 상세히 설명합니다. DOM이 무엇인지, 어떻게 동작하는지, 그리고 JavaScript를 사용하여 웹 페이지를 동적으로 제어하는 방법을 학습합니다.

---

## 1. DOM (Document Object Model) 이란?

**DOM(Document Object Model)**은 웹 브라우저가 HTML 문서를 이해하고 조작할 수 있도록 문서를 트리 구조의 객체 모델로 표현한 것입니다. 즉, HTML 코드의 각 요소와 텍스트, 속성 등을 객체로 취급하여 JavaScript와 같은 스크립팅 언어가 문서의 내용, 구조, 스타일을 동적으로 읽고 수정할 수 있게 해주는 인터페이스입니다.

- **문서(Document):** 전체 웹 페이지를 의미합니다.
- **객체(Object):** HTML 태그, 텍스트, 속성 등 모든 것을 객체로 취급합니다.
- **모델(Model):** 문서가 구조화된 방식으로 표현된 것을 의미합니다.

JavaScript는 이 DOM API를 통해 정적인 HTML 문서에 생명을 불어넣고, 사용자와의 상호작용에 반응하는 동적인 웹 페이지를 만들 수 있습니다.

---

## 2. HTML 문서와 DOM 트리 구조

브라우저는 HTML 문서를 읽어들일 때, 단순히 텍스트로 취급하는 것이 아니라 **DOM 트리**라는 계층적 구조로 변환하여 메모리에 저장합니다.

### HTML 문서 예시

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM 예제</title>
  </head>
  <body>
    <h1 id="title">Hello, World!</h1>
    <p class="content">이것은 문단입니다.</p>
  </body>
</html>
```

### DOM 트리 구조 시각화

위 HTML 문서는 다음과 같은 트리 구조로 변환됩니다. 각 항목은 **노드(Node)**라고 불립니다.

```
Document (문서 노드)
└── html (요소 노드)
    ├── head (요소 노드)
    │   ├── (공백 텍스트 노드)
    │   ├── title (요소 노드)
    │   │   └── "DOM 예제" (텍스트 노드)
    │   └── (공백 텍스트 노드)
    └── body (요소 노드)
        ├── (공백 텍스트 노드)
        ├── h1 (요소 노드) [id="title" 속성 보유]
        │   └── "Hello, World!" (텍스트 노드)
        ├── (공백 텍스트 노드)
        └── p (요소 노드) [class="content" 속성 보유]
            └── "이것은 문단입니다." (텍스트 노드)
```

---

## 3. 노드 (Node)

**노드(Node)**는 DOM 트리를 구성하는 기본 단위입니다. HTML 문서의 모든 것(요소, 텍스트, 주석, 속성 등)은 특정 유형의 노드로 표현됩니다.

### 주요 노드의 종류

| 노드 종류 | 설명 |
| --- | --- |
| **문서 노드 (Document Node)** | DOM 트리의 최상위 루트 노드로, 전체 문서를 나타냅니다. `document` 객체로 접근할 수 있습니다. |
| **요소 노드 (Element Node)** | `<html>`, `<body>`, `<h1>`, `<p>` 와 같은 HTML 태그를 나타냅니다. 요소는 다른 요소를 자식으로 가질 수 있습니다. |
| **텍스트 노드 (Text Node)** | 요소 내의 텍스트 내용을 나타냅니다. 요소 노드의 자식으로 존재하며, 다른 자식 노드를 가질 수 없습니다. |
| **속성 노드 (Attribute Node)** | `id="title"`, `class="content"` 와 같은 HTML 요소의 속성을 나타냅니다. 요소 노드에 속해 있지만, DOM 트리에서는 요소의 일부로 취급되어 별도의 자식 노드로 표시되지는 않습니다. |
| **주석 노드 (Comment Node)** | `<!-- 주석 -->` 과 같은 HTML 주석을 나타냅니다. |

---

## 4. DOM API를 이용한 HTML 조작

JavaScript는 `document` 객체를 통해 DOM API의 다양한 메서드와 속성을 사용하여 HTML 문서를 조작할 수 있습니다.

### 1) 요소 선택 (Accessing Elements)

DOM을 조작하려면 먼저 원하는 HTML 요소를 선택해야 합니다.

- **`document.getElementById('id')`**: 특정 `id` 속성 값을 가진 요소를 하나 선택합니다.
  ```javascript
  const titleElement = document.getElementById('title');
  ```
- **`document.getElementsByClassName('class')`**: 특정 `class` 값을 가진 모든 요소를 `HTMLCollection`으로 반환합니다.
  ```javascript
  const contentElements = document.getElementsByClassName('content');
  ```
- **`document.getElementsByTagName('tag')`**: 특정 태그 이름을 가진 모든 요소를 `HTMLCollection`으로 반환합니다.
  ```javascript
  const allParagraphs = document.getElementsByTagName('p');
  ```
- **`document.querySelector('selector')`**: CSS 선택자 문법으로 찾은 **첫 번째** 요소를 반환합니다. 가장 유연하고 많이 사용됩니다.
  ```javascript
  const container = document.querySelector('#container');
  const firstContent = document.querySelector('.content');
  ```
- **`document.querySelectorAll('selector')`**: CSS 선택자 문법으로 찾은 **모든** 요소를 `NodeList`로 반환합니다.
  ```javascript
  const allContents = document.querySelectorAll('.content');
  ```

### 2) 요소 생성 및 추가 (Creating and Appending Elements)

- **`document.createElement('tag')`**: 새로운 요소 노드를 생성합니다.
  ```javascript
  const newH1 = document.createElement('h1');
  ```
- **`parentNode.appendChild(childNode)`**: 선택한 부모 노드의 **마지막 자식**으로 새로운 자식 노드를 추가합니다.
  ```javascript
  const container = document.querySelector('#container');
  container.appendChild(newH1);
  ```

### 3) 내용 및 속성 변경 (Manipulating Content and Attributes)

- **`node.textContent`**: 요소의 텍스트 내용만 가져오거나 설정합니다. (HTML 태그는 무시됨)
  ```javascript
  newH1.textContent = "Hello, DOM!";
  ```
- **`node.innerHTML`**: 요소의 HTML 내용을 포함한 모든 내용을 가져오거나 설정합니다. (보안에 유의해야 함)
  ```javascript
  container.innerHTML = '<h2>새로운 제목</h2><p>내용도 바뀌었습니다.</p>';
  ```
- **`element.setAttribute('name', 'value')`**: 요소의 속성 값을 설정합니다.
  ```javascript
  const link = document.createElement('a');
  link.setAttribute('href', 'https://www.google.com');
  ```
- **`element.style.property = 'value'`**: 요소의 CSS 스타일을 직접 변경합니다. (property는 camelCase로 작성)
  ```javascript
  newH1.style.color = 'blue';
  newH1.style.fontSize = '24px';
  ```

---

## 5. 종합 실용 예제

아래 예제는 DOM API를 사용하여 요소를 선택, 생성, 수정하고 문서에 추가하는 전체 과정을 보여줍니다.

### HTML 파일

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <title>DOM API 종합 예제</title>
  <style>
    body { font-family: sans-serif; }
    #container { padding: 20px; border: 1px solid #ccc; }
    .highlight { background-color: yellow; }
  </style>
</head>
<body>
  <div id="container">
    <h1 id="main-title">Hello, World!</h1>
  </div>

  <script>
    // 1. 요소 선택
    const container = document.querySelector("#container");
    const mainTitle = document.getElementById("main-title");

    // 2. 요소 내용 및 스타일 변경
    mainTitle.textContent = "Welcome to DOM World!";
    mainTitle.style.color = "darkgreen";

    // 3. 새로운 요소 생성
    const newParagraph = document.createElement("p");

    // 4. 새 요소의 내용과 속성 설정
    newParagraph.textContent = "이 문단은 JavaScript로 동적으로 추가되었습니다.";
    newParagraph.setAttribute("class", "highlight"); // 클래스 속성 추가

    // 5. 생성된 요소를 문서에 추가
    container.appendChild(newParagraph);

    // 6. 새로운 버튼 요소 생성 및 이벤트 리스너 추가
    const newButton = document.createElement("button");
    newButton.textContent = "클릭하세요!";
    container.appendChild(newButton);

    // 7. 버튼 클릭 이벤트 처리
    newButton.addEventListener('click', function() {
      alert('버튼이 클릭되었습니다!');
    });
  </script>
</body>
</html>
```

위 코드를 브라우저에서 실행하면, JavaScript가 어떻게 기존 `<h1>` 태그의 내용을 바꾸고, 새로운 `<p>` 태그와 `<button>`을 생성하여 페이지에 동적으로 추가하는지 확인할 수 있습니다.
