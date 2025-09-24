
# DOM: 노드 선택 및 조작 가이드

이 문서는 JavaScript를 사용하여 DOM(Document Object Model)의 노드를 선택하고, 선택된 노드의 텍스트, 속성, 스타일, 클래스를 조작하는 방법에 대해 상세히 설명합니다.

---

### 사전 학습

이 문서를 이해하기 위해 다음 개념에 대한 기본적인 지식이 필요합니다.

- **CSS 선택자:** `id`, `class`, `tag` 등을 사용하여 HTML 요소를 지정하는 방법
- **JavaScript DOM:** DOM이 무엇이며, HTML 문서가 어떻게 트리 구조로 표현되는지에 대한 이해

---

## 1. 노드 선택 (Selecting Nodes)

DOM을 조작하기 위한 첫 단계는 원하는 요소 노드를 정확히 선택하는 것입니다. CSS 선택자를 활용하는 것이 가장 일반적이고 강력한 방법입니다.

### `querySelector(selector)`

제공된 CSS 선택자와 일치하는 **첫 번째** 요소 노드 하나를 반환합니다. 일치하는 요소가 없으면 `null`을 반환합니다.

- **기본 구조:**
  ```javascript
  document.querySelector("CSS선택자");
  ```

- **예시:**
  ```javascript
  // 태그 이름으로 선택
  const pElement = document.querySelector("p");

  // 클래스 이름으로 선택
  const contentElement = document.querySelector(".content");

  // 아이디로 선택
  const titleElement = document.querySelector("#title");
  ```

### `querySelectorAll(selector)`

제공된 CSS 선택자와 일치하는 **모든** 요소 노드를 `NodeList` 객체로 반환합니다. `NodeList`는 배열과 유사하여 `forEach()`와 같은 메서드를 사용할 수 있습니다.

- **기본 구조:**
  ```javascript
  document.querySelectorAll("CSS선택자");
  ```

- **예시:**
  ```javascript
  // 모든 <p> 태그 선택
  const allParagraphs = document.querySelectorAll("p");

  // NodeList를 순회하며 각 요소의 텍스트 출력
  allParagraphs.forEach((element, index) => {
    console.log(`문단 ${index + 1}: ${element.textContent}`);
  });
  ```

---

## 2. 노드 조작 (Manipulating Nodes)

일단 노드를 선택하면, 해당 노드의 다양한 측면을 변경할 수 있습니다.

### 텍스트 조작: `textContent`

노드와 그 자손 노드들의 텍스트 내용(콘텐츠)을 가져오거나 설정합니다. 이 속성은 HTML 태그를 해석하지 않고 순수한 텍스트로 처리합니다.

- **기본 구조:**
  ```javascript
  // 텍스트 읽기
  const currentText = element.textContent;

  // 텍스트 수정
  element.textContent = "새로운 텍스트 내용";
  ```

- **주의사항:** `textContent`에 새로운 값을 할당하면 해당 노드의 **모든 자식 노드가 제거되고** 새로운 텍스트 노드 하나로 대체됩니다. 신중하게 사용해야 합니다.

### 속성 조작 (Attribute Manipulation)

요소의 `href`, `src`, `id`와 같은 HTML 속성을 읽거나 변경합니다.

| 방법 | 설명 | 예시 |
| --- | --- | --- |
| **`getAttribute(name)`** | 지정된 속성의 값을 문자열로 반환합니다. | `link.getAttribute("href");` |
| **`setAttribute(name, value)`** | 지정된 속성의 값을 설정합니다. 속성이 이미 존재하면 값이 갱신되고, 없으면 새로 생성됩니다. | `link.setAttribute("target", "_blank");` |
| **직접 접근 (`element.property`)** | `id`, `href`, `src` 등 표준 속성은 JavaScript 객체의 프로퍼티처럼 직접 접근하고 수정할 수 있습니다. | `link.href = "https://example.com";` |

- **예시:**
  ```javascript
  const link = document.querySelector("a");

  // 속성 값 읽기 (두 가지 방법)
  console.log(link.getAttribute("href")); // /about
  console.log(link.href); // http://localhost:3000/about (절대 경로)

  // 속성 값 변경하기
  link.setAttribute("href", "https://naver.com");
  link.target = "_blank"; // 직접 프로퍼티 수정
  ```

### 스타일 조작: `style`

요소의 인라인 스타일(HTML의 `style` 속성)을 직접 조작합니다. CSS 속성 이름은 `kebab-case`(`background-color`)에서 `camelCase`(`backgroundColor`)로 변환하여 사용해야 합니다.

- **개별 스타일 설정:**
  ```javascript
  const element = document.querySelector("div");
  element.style.backgroundColor = "red";
  element.style.fontSize = "20px";
  ```

- **여러 스타일 한 번에 설정 (`Object.assign`):**
  ```javascript
  Object.assign(element.style, {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: "10px",
  });
  ```

### 클래스 조작 (Class Manipulation)

요소의 `class` 속성을 제어하여 CSS 스타일을 동적으로 적용하거나 제거합니다.

#### `classList` (권장 방식)

클래스를 개별적으로 제어할 수 있는 유용한 메서드들을 제공합니다.

- **`add('className')`**: 클래스를 추가합니다.
- **`remove('className')`**: 클래스를 제거합니다.
- **`toggle('className')`**: 클래스가 있으면 제거하고, 없으면 추가합니다.
- **`contains('className')`**: 클래스 포함 여부를 `true`/`false`로 반환합니다.

- **예시:**
  ```javascript
  const element = document.querySelector("div");
  element.classList.add("active");
  element.classList.remove("inactive");
  element.classList.toggle("hidden");

  if (element.classList.contains("active")) {
    console.log("활성화 상태입니다.");
  }
  ```

#### `className`

`class` 속성 전체를 하나의 문자열로 관리합니다. 기존 클래스를 모두 덮어쓰므로 주의가 필요하지만, 모든 클래스를 한 번에 교체할 때 유용합니다.

- **예시:**
  ```javascript
  const element = document.querySelector("div");

  // 기존 클래스는 모두 사라지고 "active hidden"으로 대체됨
  element.className = "active hidden";
  ```

---

## 3. 종합 예제

다음은 위에서 배운 개념들을 모두 활용한 예제입니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <title>DOM 조작 예제</title>
  <style>
    .active {
      border: 2px solid blue;
      padding: 10px;
    }
    .title-style {
      color: green;
      font-size: 24px;
    }
    .hidden {
      display: none;
    }
  </style>
</head>
<body>
  <div id="container">
    <h1 id="title">원래 제목</h1>
    <p class="content">원래 내용</p>
    <a href="#">링크</a>
  </div>
  <button id="toggleBtn">숨기기/보이기</button>

  <script>
    // 1. 노드 선택
    const container = document.querySelector("#container");
    const title = document.querySelector("#title");
    const content = document.querySelector(".content");
    const link = document.querySelector("a");
    const toggleBtn = document.querySelector("#toggleBtn");

    // 2. 텍스트 조작
    title.textContent = "새로운 제목으로 변경!";
    content.textContent = "이 내용도 JavaScript로 새로 작성되었습니다.";

    // 3. 속성 조작
    link.setAttribute("href", "https://www.google.com");
    link.textContent = "Google로 이동";

    // 4. 클래스 조작
    container.classList.add("active");
    title.classList.add("title-style");

    // 5. 스타일 직접 조작
    content.style.color = "purple";
    content.style.marginTop = "15px";

    // 6. 이벤트 리스너와 클래스 토글
    toggleBtn.addEventListener('click', () => {
      container.classList.toggle('hidden');
    });
  </script>
</body>
</html>
```
