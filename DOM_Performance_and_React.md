# DOM 조작 성능 최적화와 Virtual DOM

이 문서는 JavaScript를 사용한 DOM(Document Object Model) 조작 시 발생하는 성능 문제를 분석하고, 순수 JavaScript(Vanilla JS) 기반의 최적화 방법과 React의 Virtual DOM을 통한 해결 방안을 기술합니다.

---

## 1. 비효율적인 DOM 조작과 성능 저하

### 1.1. 문제 코드 예시

반복문 내에서 `innerHTML` 프로퍼티를 연속적으로 수정하는 것은 대표적인 성능 저하 패턴입니다.

```html
<ul id="list"></ul>
<button onclick="addItem()">리스트 추가</button>

<script>
  function addItem() {
    const $list = document.getElementById("list");
    for (let i = 0; i < 3000; i++) {
      $list.innerHTML += `<li>아이템 ${i}</li>`;
    }
  }
</script>
```

상기 코드는 버튼 클릭 시 메인 스레드를 장시간 점유하여 UI 렌더링을 차단(Blocking)하고, INP(Interaction to Next Paint)와 같은 성능 지표를 악화시킵니다.

### 1.2. 성능 저하 원인

`innerHTML +=` 연산은 내부적으로 다음과 같은 고비용 작업을 매 반복마다 수행합니다.

1.  **HTML 직렬화**: 현재 요소의 DOM 상태를 문자열로 변환합니다.
2.  **문자열 접합**: 기존 문자열에 새로운 HTML 문자열을 추가합니다.
3.  **HTML 파싱**: 병합된 문자열 전체를 파싱하여 새로운 DOM 트리를 생성합니다. 이 과정에서 기존 DOM 노드는 파기됩니다.
4.  **렌더링**: 변경된 DOM 트리를 기반으로 **리플로우(Reflow)**와 **리페인트(Repaint)**를 실행하여 화면을 다시 그립니다.

이러한 작업이 3,000회 반복될 경우, DOM 요소의 처리 횟수는 기하급수적으로 증가하여(1+2+...+3000), 과도한 연산으로 인해 성능이 저하됩니다.

---

## 2. Vanilla JavaScript 기반 해결책

DOM 직접 접근 횟수를 최소화하는 것이 핵심입니다. 변경분을 메모리상에서 일괄 처리한 후, 최종 결과물만 실제 DOM에 한 번 적용합니다.

### 2.1. `DocumentFragment` 활용

`DocumentFragment`는 DOM 트리의 일부를 메모리에 저장하는 경량 컨테이너입니다. `DocumentFragment`에 대한 조작은 리플로우를 유발하지 않습니다.

```javascript
function addItem() {
  const $list = document.getElementById("list");
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 3000; i++) {
    const li = document.createElement("li");
    li.textContent = `아이템 ${i}`;
    fragment.appendChild(li);
  }

  $list.appendChild(fragment); // DOM 수정이 이 시점에 한 번만 발생
}
```

### 2.2. 문자열 배치(Batch) 처리

HTML 문자열을 배열에 저장한 후, `join()` 메서드를 사용하여 하나의 문자열로 합치고 `innerHTML`에 한 번만 할당합니다.

```javascript
function addItem() {
  const $list = document.getElementById("list");
  const items = [];

  for (let i = 0; i < 3000; i++) {
    items.push(`<li>아이템 ${i}</li>`);
  }

  $list.innerHTML = items.join(""); // DOM 수정이 이 시점에 한 번만 발생
}
```

두 방식 모두 DOM 수정 횟수를 1회로 줄여 렌더링 성능을 크게 향상시킵니다.

---

## 3. React의 Virtual DOM을 통한 해결

React는 DOM 조작을 추상화하고, Virtual DOM을 통해 성능 최적화를 자동화합니다.

### 3.1. Virtual DOM (가상돔)

Virtual DOM은 실제 DOM의 구조를 표현하는 JavaScript 객체입니다. 실제 DOM API를 직접 호출하는 대신, 메모리상에서 이 객체를 조작하므로 연산 비용이 저렴합니다.

### 3.2. 재조정 (Reconciliation)

React의 상태(state)가 변경되면 **재조정(Reconciliation)** 이라는 프로세스가 시작됩니다.

1.  **상태 변경**: `setState` 호출 등으로 컴포넌트의 상태가 업데이트됩니다.
2.  **신규 Virtual DOM 생성**: 변경된 상태를 기반으로 새로운 Virtual DOM 트리가 생성됩니다.
3.  **차이 비교 (Diffing)**: 이전 Virtual DOM 트리와 신규 Virtual DOM 트리를 비교하여 변경 사항을 식별합니다. (Diffing Algorithm)
4.  **최소 DOM 업데이트**: 식별된 변경 사항만 실제 DOM에 일괄적으로(batch) 적용합니다.

```jsx
function ItemList() {
  const [items, setItems] = React.useState([]);

  const handleClick = () => {
    const newItems = Array.from({ length: 3000 }, (_, i) => `아이템 ${i}`);
    setItems(newItems); // 상태 변경 발생
  };

  return (
    <div>
      <button onClick={handleClick}>리스트 추가하기</button>
      <ul>
        {/* React가 재조정 과정을 통해 DOM을 효율적으로 업데이트 */}
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 3.3. 배치(Batching) 업데이트

React는 여러 상태 변경 요청을 단일 리렌더링 작업으로 묶어서 처리(Batching)하여 불필요한 렌더링을 방지하고 성능을 최적화합니다.

---

## 4. React 성능 최적화 전략

### 4.1. `key` 속성의 올바른 사용

리스트 렌더링 시, 각 요소에 **고유하고 안정적인 `key`**를 지정해야 합니다. `key`는 재조정 과정에서 요소의 동일성을 식별하는 데 사용됩니다.

- 배열의 `index`를 `key`로 사용하는 것은 리스트의 순서 변경, 추가, 삭제 시 예기치 않은 동작 및 성능 저하를 유발할 수 있으므로 지양해야 합니다.
- 데이터가 가진 고유 ID를 `key`로 사용하는 것이 가장 이상적입니다.

```jsx
// 권장
items.map((item) => <li key={item.id}>{item.text}</li>);

// 비권장
items.map((item, index) => <li key={index}>{item.text}</li>);
```

### 4.2. 리스트 가상화 (List Virtualization)

매우 큰 데이터셋을 렌더링할 경우, 화면에 보이는 부분만 렌더링하는 **리스트 가상화(Windowing)** 기법을 적용할 수 있습니다. `react-window`나 `react-virtualized`와 같은 라이브러리를 사용하여 구현합니다.

### 4.3. 메모이제이션 (Memoization)

`React.memo`, `useMemo`, `useCallback` 등의 API를 사용하여 불필요한 컴포넌트 리렌더링과 함수 생성을 방지하여 성능을 최적화할 수 있습니다.

---

## 5. 요약 및 비교

| 구분              | `innerHTML +=` 반복 | Vanilla JS 최적화   | React (Virtual DOM) |
| ----------------- | ------------------- | ------------------- | ------------------- |
| **DOM 수정 횟수** | N회 (반복마다)      | 1회                 | 1회 (배치 처리)     |
| **성능**          | 저하                | 우수                | 우수                |
| **개발 방식**     | 명령형, 수동 최적화 | 명령형, 수동 최적화 | 선언형, 자동 최적화 |

Vanilla JS를 통한 수동 최적화는 효과적이지만, 애플리케이션이 복잡해질수록 개발자가 직접 관리해야 하는 부담이 증가합니다. React는 Virtual DOM과 재조정 메커니즘을 통해 이러한 최적화를 자동화하고 개발자가 선언적으로 UI를 구성할 수 있도록 지원하여, 복잡한 애플리케이션에서도 높은 수준의 성능과 유지보수성을 제공합니다.
