# DOM: 이벤트 처리 완벽 가이드

이 문서는 JavaScript를 사용하여 웹 페이지의 상호작용을 구현하는 핵심인 DOM 이벤트(Event) 처리에 대해 상세히 설명합니다. 이벤트의 기본 개념부터 고급 패턴까지 학습하여 동적인 웹 애플리케이션을 만드는 방법을 익힙니다.

---

### 사전 학습

- **JavaScript DOM의 이해:** DOM 트리의 구조와 기본 조작 방법
- **CSS 선택자:** 이벤트를 연결할 요소를 선택하는 방법
- **JavaScript 함수:** 특히 콜백 함수에 대한 이해

---

## 1. 이벤트(Event)란?

**이벤트**는 웹 페이지에서 발생하는 특정 "사건"에 대한 신호입니다. 예를 들어, 사용자가 버튼을 클릭하거나, 키보드를 누르거나, 마우스를 움직이는 모든 행위가 이벤트가 될 수 있습니다. JavaScript는 이러한 이벤트를 감지하고, 그에 맞는 특정 동작(함수)을 실행할 수 있게 해줍니다.

### 주요 이벤트 종류

| 카테고리       | 이벤트 종류                                                                       | 설명                                                                          |
| -------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **마우스**     | `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseover`, `mouseout` | 마우스 버튼 클릭, 이동, 요소 진입/이탈 등 마우스와 관련된 동작                |
| **키보드**     | `keydown`, `keyup`, `keypress`                                                    | 키보드의 키를 누르거나, 뗄 때 발생하는 동작                                   |
| **입력(Form)** | `input`, `change`, `focus`, `blur`                                                | 입력 필드(`<input>`, `<textarea>`)의 값이 변경되거나, 포커스를 얻거나 잃을 때 |
| **폼(Form)**   | `submit`, `reset`                                                                 | `<form>` 요소가 제출되거나 리셋될 때                                          |
| **문서/창**    | `DOMContentLoaded`, `load`, `scroll`, `resize`                                    | 문서 로딩 완료, 스크롤, 창 크기 변경 등                                       |

---

## 2. 이벤트 핸들러(리스너) 등록

**이벤트 핸들러(Event Handler)** 또는 **이벤트 리스너(Event Listener)**는 특정 이벤트가 발생했을 때 실행되는 함수입니다. 이 함수를 요소에 등록하는 세 가지 주요 방법이 있습니다.

### 1) HTML 인라인 속성 (권장하지 않음)

HTML 태그에 `onclick`과 같은 속성을 직접 작성하는 방식입니다.

- **단점:** HTML(구조)과 JavaScript(동작)가 분리되지 않아 유지보수가 어렵습니다.
- **예시:**
  ```html
  <button onclick="alert('버튼 클릭됨')">클릭하세요</button>
  ```

### 2) JavaScript 이벤트 속성

JavaScript 코드에서 DOM 요소 객체의 이벤트 관련 프로퍼티에 함수를 할당하는 방식입니다.

- **단점:** 하나의 이벤트에 **하나의 핸들러만** 등록할 수 있습니다. (새로운 함수를 할당하면 기존 함수는 덮어쓰여 사라짐)
- **예시:**
  ```javascript
  const button = document.querySelector("#my-button");
  button.onclick = function () {
    alert("버튼 클릭됨");
  };
  ```

### 3) `addEventListener()` (가장 권장되는 방법)

`addEventListener` 메서드는 표준 DOM 이벤트 모델의 핵심으로, 가장 유연하고 강력한 방법입니다.

- **장점:**

  - 하나의 이벤트에 **여러 개의 핸들러**를 등록할 수 있습니다.
  - 이벤트 전파(버블링/캡처링) 단계 제어 등 더 많은 옵션을 제공합니다.
  - 코드의 가독성과 유지보수성이 향상됩니다.

- **기본 구조:**

  ```javascript
  element.addEventListener(type, handler, options);
  ```

  - `type`: 이벤트 종류 (예: `'click'`, `'keydown'`)
  - `handler`: 이벤트 발생 시 실행될 콜백 함수
  - `options` (선택): 이벤트 전파 방식 등을 제어하는 객체 (예: `{ capture: true, once: true }`)

- **예시:**

  ```javascript
  const button = document.querySelector("#my-button");

  button.addEventListener("click", function (event) {
    console.log("버튼이 클릭되었습니다!");
  });
  ```

### 이벤트 핸들러 제거: `removeEventListener()`

등록했던 이벤트 핸들러를 제거합니다. 핸들러를 제거하려면, `addEventListener`에 전달했던 **동일한 함수에 대한 참조**가 필요합니다. 따라서 익명 함수는 제거할 수 없으므로, 보통 기명 함수(named function)를 사용합니다.

- **예시 (올바른 제거):**

  ```javascript
  const button = document.querySelector("#my-button");

  // 기명 함수로 핸들러 정의
  function handleClick() {
    console.log("버튼 클릭!");
    // 한 번 실행 후 핸들러 제거
    button.removeEventListener("click", handleClick);
  }

  button.addEventListener("click", handleClick);
  ```

---

## 3. 이벤트 객체 (Event Object)

이벤트가 발생하면, 브라우저는 발생한 이벤트에 대한 상세 정보를 담은 **이벤트 객체**를 생성하여 이벤트 핸들러의 첫 번째 인자로 전달합니다. 관례적으로 `event` 또는 `e`라는 이름의 매개변수로 받습니다.

### 주요 프로퍼티 및 메서드

| 종류         | 이름                             | 설명                                                                                   |
| ------------ | -------------------------------- | -------------------------------------------------------------------------------------- |
| **프로퍼티** | `event.target`                   | 이벤트가 **실제로 발생한** 가장 안쪽의 요소. (예: 리스트의 `<li>` 클릭 시 해당 `<li>`) |
|              | `event.currentTarget`            | 이벤트 리스너가 **연결된** 요소. (예: `<ul>`에 리스너를 달았다면 `<ul>`)               |
|              | `event.type`                     | 발생한 이벤트의 종류 (예: `'click'`)                                                   |
|              | `event.key`                      | (키보드 이벤트) 눌린 키의 값 (예: `'Enter'`, `'a'`)                                    |
|              | `event.clientX`, `event.clientY` | (마우스 이벤트) 뷰포트 기준 마우스 포인터의 X, Y 좌표                                  |
| **메서드**   | `event.preventDefault()`         | 이벤트의 기본 동작을 취소합니다. (예: `<a>` 태그의 링크 이동, `<form>`의 제출)         |
|              | `event.stopPropagation()`        | 이벤트가 상위 요소로 전파(버블링)되는 것을 막습니다.                                   |

---

## 4. 이벤트 전파: 버블링과 캡처링

DOM 트리에서 이벤트가 발생하면, 하나의 요소에서만 끝나지 않고 트리를 따라 전파됩니다.

- **이벤트 버블링 (Event Bubbling, 기본값):** 이벤트가 발생한 `target` 요소에서 시작하여 DOM 트리를 따라 부모 요소로, 최상위 `window` 객체까지 올라가며 전파됩니다. (안쪽 -> 바깥쪽)
- **이벤트 캡처링 (Event Capturing):** 버블링과 반대로, 최상위 `window` 객체에서 시작하여 `target` 요소까지 내려가며 전파됩니다. (바깥쪽 -> 안쪽). `addEventListener`의 `options` 객체에서 `{ capture: true }`를 설정해야 활성화됩니다.

### 이벤트 위임 (Event Delegation)

이벤트 버블링을 활용한 강력한 패턴입니다. 하위 요소 각각에 이벤트 리스너를 다는 대신, **상위 요소(부모)에 리스너를 하나만 등록**하여 하위 요소들의 이벤트를 모두 처리하는 방식입니다.

- **장점:**

  - 동적으로 추가되거나 삭제되는 요소들의 이벤트를 별도 처리 없이 관리할 수 있습니다.
  - 메모리 사용량이 줄고 성능이 향상됩니다.

- **예시 (Todo 리스트):**
  ```html
  <ul id="todo-list">
    <li>항목 1</li>
    <li>항목 2</li>
  </ul>
  <script>
    const list = document.querySelector("#todo-list");
    list.addEventListener("click", function (event) {
      // 클릭된 요소가 LI 태그일 경우에만 실행
      if (event.target.tagName === "LI") {
        event.target.style.textDecoration = "line-through";
      }
    });
  </script>
  ```

---

## 5. 종합 실용 예제

### 클릭 및 포커스 이벤트

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .clicked {
        background-color: lightblue;
      }
      .highlight {
        border: 2px solid orange;
      }
    </style>
  </head>
  <body>
    <button id="click-btn">클릭하세요</button>
    <input type="text" id="text-input" placeholder="포커스를 주세요" />

    <script>
      const clickBtn = document.querySelector("#click-btn");
      const textInput = document.querySelector("#text-input");

      // 클릭 이벤트
      clickBtn.addEventListener("click", () => {
        clickBtn.classList.toggle("clicked");
      });

      // 포커스 이벤트
      textInput.addEventListener("focus", () => {
        textInput.classList.add("highlight");
      });

      // 포커스 아웃(blur) 이벤트
      textInput.addEventListener("blur", () => {
        textInput.classList.remove("highlight");
      });
    </script>
  </body>
</html>
```

### 키보드 이벤트 및 기본 동작 방지

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>폼 제출 예제</h1>
    <form id="my-form">
      <input
        type="text"
        id="form-input"
        placeholder="'Enter'를 누르면 제출됩니다"
      />
    </form>
    <div id="log"></div>

    <script>
      const form = document.querySelector("#my-form");
      const input = document.querySelector("#form-input");
      const log = document.querySelector("#log");

      form.addEventListener("submit", (event) => {
        // form의 기본 제출 동작(페이지 새로고침)을 막음
        event.preventDefault();
        log.textContent = `제출된 내용: ${input.value}`;
        input.value = "";
      });
    </script>
  </body>
</html>
```
