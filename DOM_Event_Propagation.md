# JavaScript 이벤트 전파와 위임

이 문서는 JavaScript의 이벤트 전파(Event Propagation) 모델인 캡처링(Capturing)과 버블링(Bubbling)의 개념을 설명하고, `stopPropagation()`, `preventDefault()` 등 이벤트 흐름을 제어하는 방법과 이를 활용한 이벤트 위임(Event Delegation) 패턴을 다룹니다.

---

## 1. 이벤트 전파(Event Propagation)란?

DOM 트리 내의 한 요소에서 이벤트가 발생했을 때, 그 이벤트가 다른 DOM 노드들로 전파되는 절차를 의미합니다. 이 과정은 다음과 같은 3단계로 구성됩니다.

1.  **캡처링 단계 (Capturing Phase)**: 이벤트가 최상위 `window` 객체에서 시작하여 실제 이벤트가 발생한 타겟 요소(target)까지 하위로 전파됩니다.
2.  **타겟 단계 (Target Phase)**: 이벤트가 실제 타겟 요소에 도달하여 해당 요소에 바인딩된 이벤트 리스너가 동작합니다.
3.  **버블링 단계 (Bubbling Phase)**: 이벤트가 타겟 요소에서 시작하여 다시 최상위 `window` 객체까지 상위로 전파됩니다.

대부분의 이벤트 리스너는 기본적으로 버블링 단계에서 동작합니다.

### 1.1. 전파 과정 예시

아래 코드는 캡처링과 버블링 단계에서 각각 이벤트 리스너를 등록하여 전체 이벤트 흐름을 보여줍니다.

**HTML:**

```html
<div id="grandParent" style="padding:30px; background:lightblue;">
  할아버지 DIV
  <div id="parent" style="padding:20px; background:lightgreen;">
    부모 DIV
    <button id="child">자식 버튼</button>
  </div>
</div>
```

**JavaScript:**

```javascript
const grandParent = document.getElementById("grandParent");
const parent = document.getElementById("parent");
const child = document.getElementById("child");

// 캡처링 단계 리스너 (옵션: { capture: true })
window.addEventListener("click", () => console.log("Window - 캡처링"), {
  capture: true,
});
grandParent.addEventListener("click", () => console.log("할아버지 - 캡처링"), {
  capture: true,
});
parent.addEventListener("click", () => console.log("부모 - 캡처링"), {
  capture: true,
});
child.addEventListener("click", () => console.log("자식 - 캡처링"), {
  capture: true,
});

// 버블링 단계 리스너 (기본)
window.addEventListener("click", () => console.log("Window - 버블링"));
grandParent.addEventListener("click", () => console.log("할아버지 - 버블링"));
parent.addEventListener("click", () => console.log("부모 - 버블링"));
child.addEventListener("click", () => console.log("자식 - 버블링"));
```

**실행 결과 (`자식 버튼` 클릭 시):**

```
// 1. 캡처링 단계 (하향식 전파)
Window - 캡처링
할아버지 - 캡처링
부모 - 캡처링

// 2. 타겟 단계 (타겟 요소의 리스너 실행)
자식 - 캡처링
자식 - 버블링

// 3. 버블링 단계 (상향식 전파)
부모 - 버블링
할아버지 - 버블링
Window - 버블링
```

---

## 2. 이벤트 전파 제어

개발자는 `Event` 객체의 메서드를 사용하여 이벤트 전파 흐름을 제어하거나 브라우저의 기본 동작을 막을 수 있습니다.

### 2.1. `event.stopPropagation()`

현재 이벤트 이후의 **전파(캡처링 또는 버블링)를 중단**시킵니다. 예를 들어, 자식 요소의 클릭 이벤트가 부모 요소로 버블링되는 것을 막을 수 있습니다.

```html
<div
  id="parent"
  onclick="alert('부모 DIV 클릭됨')"
  style="padding:20px; background:#ddd;"
>
  <button id="child">자식 버튼 (전파 중단)</button>
</div>
<script>
  document.getElementById("child").addEventListener("click", (e) => {
    e.stopPropagation();
    alert("자식 버튼 클릭됨");
  });
</script>
```

> `자식 버튼` 클릭 시 `"자식 버튼 클릭됨"` 알림만 표시되고, 부모 DIV의 클릭 이벤트는 실행되지 않습니다.

### 2.2. `event.stopImmediatePropagation()`

`stopPropagation()`과 동일하게 이벤트 전파를 중단하며, 추가로 **현재 요소에 등록된 다른 이벤트 리스너들의 실행을 즉시 중단**시킵니다.

```html
<button id="btn">클릭</button>
<script>
  const btn = document.getElementById("btn");
  btn.addEventListener("click", (e) => {
    alert("첫 번째 핸들러");
    e.stopImmediatePropagation(); // 이후 모든 핸들러 실행 중단
  });
  btn.addEventListener("click", () => alert("두 번째 핸들러"));
</script>
```

> 버튼 클릭 시 `"첫 번째 핸들러"`만 실행되고, 두 번째 핸들러는 실행되지 않습니다.

### 2.3. `event.preventDefault()`

이벤트 전파를 막지 않지만, `<a>` 태그의 링크 이동, `form`의 제출 등 **브라우저의 기본 동작을 취소**합니다.

```html
<a href="https://www.google.com" id="link">구글로 이동 (기본 동작 취소)</a>
<script>
  document.getElementById("link").addEventListener("click", (e) => {
    e.preventDefault();
    alert("링크는 클릭되었지만 이동은 막았습니다.");
  });
</script>
```

> 링크를 클릭해도 페이지가 이동하지 않고 알림창만 표시됩니다.

---

## 3. 이벤트 전파 모델의 효용성: 이벤트 위임 (Event Delegation)

이벤트 전파, 특히 버블링은 **이벤트 위임**이라는 강력한 코딩 패턴을 가능하게 합니다. 이는 하위 요소 각각에 이벤트 리스너를 추가하는 대신, 상위 요소에 하나의 리스너만 추가하여 이벤트를 관리하는 기법입니다.

**장점:**

- **성능 최적화**: 수많은 하위 요소에 리스너를 등록할 필요가 없어 메모리 사용량이 줄고 초기 로딩 성능이 향상됩니다.
- **유지보수 용이성**: 동적으로 추가되거나 삭제되는 하위 요소들에 대해 별도로 이벤트를 추가/제거할 필요 없이 상위 리스너가 모두 처리하므로 코드가 간결해집니다.

**이벤트 위임 예시:**

```html
<ul id="itemList">
  <li>항목 1</li>
  <li>항목 2</li>
  <li>항목 3</li>
</ul>
<script>
  const itemList = document.getElementById("itemList");
  // 부모인 ul 요소에만 이벤트 리스너를 등록
  itemList.addEventListener("click", (e) => {
    // 클릭된 요소가 LI인 경우에만 처리
    if (e.target && e.target.nodeName === "LI") {
      console.log(e.target.textContent + " 클릭됨");
    }
  });
</script>
```

> 각 `<li>`가 아닌 부모 `<ul>`에 등록된 단 하나의 리스너가 모든 자식 `<li>`의 클릭 이벤트를 효율적으로 처리합니다.

---

## 4. 결론

이벤트 전파 모델은 단순히 이벤트가 전달되는 과정이 아니라, 개발자에게 이벤트 흐름을 제어할 수 있는 권한을 부여하는 장치입니다. `stopPropagation()`과 같은 제어 메서드를 통해 예기치 않은 동작을 방지할 수 있으며, 버블링을 활용한 이벤트 위임 패턴은 효율적이고 유지보수가 용이한 코드를 작성하는 데 필수적입니다.

따라서 이벤트 전파는 "필요에 따라 활용하고, 원치 않으면 차단할 수 있는" 유연한 기능으로 이해해야 합니다.
