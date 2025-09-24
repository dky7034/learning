# DOM: 노드 생성, 추가, 삭제 가이드

이 문서는 JavaScript를 사용하여 DOM(Document Object Model)의 요소 노드를 동적으로 생성하고, 문서 트리에 추가하거나 삭제하는 방법에 대해 상세히 설명합니다.

---

### 사전 학습

이 문서를 이해하기 위해 다음 개념에 대한 기본적인 지식이 필요합니다.

- **JavaScript DOM:** DOM 트리의 기본 구조에 대한 이해
- **CSS 선택자:** 조작할 노드를 선택하는 방법에 대한 이해
- **JavaScript DOM 조작:** `querySelector`, `textContent`, `classList` 등 기본 조작 방법에 대한 이해

---

## 1. 요소 노드 생성: `createElement()`

`document.createElement(tagName)` 메서드는 지정된 태그 이름의 새로운 요소 노드를 생성합니다. 이 메서드는 노드를 **생성만 할 뿐, 문서에 추가하지는 않습니다.** 생성된 노드는 메모리에만 존재하며, 별도의 추가 작업을 통해 문서에 표시할 수 있습니다.

- **기본 구조:**

  ```javascript
  const newElement = document.createElement("tagName");
  ```

- **예시:**

  ```javascript
  // 비어있는 <div>와 <p> 요소 노드 생성
  const newDiv = document.createElement("div");
  const newP = document.createElement("p");

  // 내용과 속성을 가진 <div> 요소 노드 생성
  const newDivWithContent = document.createElement("div");
  newDivWithContent.textContent = "Hello World!";
  newDivWithContent.setAttribute("id", "greeting");
  newDivWithContent.classList.add("container");
  ```

---

## 2. 생성된 노드 추가 (Appending Nodes)

생성된 노드를 문서 트리의 특정 위치에 추가하는 메서드들입니다. 최신 DOM 명세에서는 `append()`와 `prepend()` 사용이 권장됩니다.

### 마지막 자식으로 추가: `appendChild()` vs `append()`

| 메서드              | 주요 특징                                                                                                                            | 사용법                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| **`appendChild()`** | - **하나의 노드(Node)만** 추가할 수 있습니다.<br>- 텍스트(문자열)를 직접 추가할 수 없습니다.<br>- 반환 값이 없습니다.                | `parent.appendChild(childNode)`       |
| **`append()`**      | - **여러 개의 노드와 텍스트(문자열)를** 동시에 추가할 수 있습니다.<br>- 쉼표(`,`)로 여러 인자를 전달합니다.<br>- 반환 값이 없습니다. | `parent.append(node1, "text", node2)` |

- **예시:**

  ```javascript
  const parent = document.querySelector("#parent");
  const newDiv = document.createElement("div");
  newDiv.textContent = "자식 요소";

  // appendChild: 노드만 추가 가능
  parent.appendChild(newDiv);

  // append: 노드, 텍스트, 다른 노드를 한 번에 추가 가능
  const span = document.createElement("span");
  span.textContent = " (스팬)";
  parent.append("새로운 텍스트와 ", newDiv, span);
  ```

### 특정 위치에 노드 추가: `insertBefore()` vs `prepend()`

| 메서드               | 주요 특징                                                                                                                    | 사용법                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| **`insertBefore()`** | - 지정된 **참조 노드(reference)의 바로 앞에** 새로운 노드를 삽입합니다.<br>- **하나의 노드만** 삽입할 수 있습니다.           | `parent.insertBefore(newNode, referenceNode)` |
| **`prepend()`**      | - 부모 노드의 **첫 번째 자식으로** 노드나 텍스트를 추가합니다.<br>- **여러 개의 노드와 텍스트**를 동시에 추가할 수 있습니다. | `parent.prepend(node1, "text", node2)`        |

- **예시:**

  ```javascript
  const parent = document.querySelector("#parent");
  const newDiv = document.createElement("div");
  newDiv.textContent = "새로운 요소";
  const reference = document.querySelector("#reference"); // 기준점 요소

  // insertBefore: id가 'reference'인 요소 앞에 삽입
  parent.insertBefore(newDiv, reference);

  // prepend: 부모 요소의 가장 첫 번째 자식으로 삽입
  parent.prepend("가장 첫 번째 텍스트와 ", newDiv);
  ```

---

## 3. 노드 삭제 (Removing Nodes)

DOM 트리에서 특정 노드를 제거하는 메서드들입니다. `remove()`가 더 직관적이고 사용하기 편리하여 권장됩니다.

### `removeChild()` vs `remove()`

| 메서드              | 주요 특징                                                                                                                   | 사용법                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **`removeChild()`** | - **부모 노드에서** 특정 자식 노드를 찾아 제거합니다.<br>- 부모 노드에 대한 참조가 반드시 필요합니다.                       | `parent.removeChild(childNode)` |
| **`remove()`**      | - **자기 자신을** DOM 트리에서 직접 제거합니다.<br>- 부모 노드를 알 필요 없이, 제거하려는 요소에서 바로 호출할 수 있습니다. | `elementToRemove.remove()`      |

- **예시:**

  ```javascript
  const parent = document.querySelector("#parent");
  const child = document.querySelector("#child");

  // 방법 1: removeChild() - 부모를 통해 자식을 제거
  if (parent && child) {
    parent.removeChild(child);
  }

  // 방법 2: remove() - 요소가 자기 자신을 직접 제거 (더 간결함)
  if (child) {
    child.remove();
  }
  ```

---

## 4. 종합 예제

다음은 노드를 생성, 추가, 삭제하는 전체 과정을 보여주는 예제입니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>DOM 노드 생성 및 삭제 예제</title>
  </head>
  <body>
    <h1>Todo List</h1>
    <ul id="todo-list">
      <li id="item-1">장보기</li>
      <li id="item-2">운동하기</li>
    </ul>
    <button id="add-btn">항목 추가</button>
    <button id="remove-btn">첫 항목 삭제</button>

    <script>
      const todoList = document.querySelector("#todo-list");
      const addBtn = document.querySelector("#add-btn");
      const removeBtn = document.querySelector("#remove-btn");

      // '항목 추가' 버튼 클릭 이벤트
      addBtn.addEventListener("click", () => {
        // 1. 새로운 <li> 요소 노드 생성
        const newLi = document.createElement("li");

        // 2. 생성된 노드에 내용 추가
        newLi.textContent = "새로운 할 일";

        // 3. 생성된 노드를 <ul>의 마지막 자식으로 추가 (append)
        todoList.append(newLi);
      });

      // '첫 항목 삭제' 버튼 클릭 이벤트
      removeBtn.addEventListener("click", () => {
        const firstItem = todoList.querySelector("li");

        // 리스트에 항목이 있을 경우에만 실행
        if (firstItem) {
          // 4. 첫 번째 <li> 요소를 직접 제거 (remove)
          firstItem.remove();
        }
      });
    </script>
  </body>
</html>
```
