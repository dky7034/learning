# React Props 고급: 함수와 children

이 문서는 React Props의 심화 사용법, 특히 함수(Function)와 `children` prop을 전달하는 방법을 상세히 설명합니다. 이 기술들을 통해 컴포넌트 간의 상호작용을 구현하고, 더 유연하고 재사용 가능한 컴포넌트 구조를 설계하는 방법을 학습합니다.

## 사전 학습

-   JSX 문법 및 활용
-   React 컴포넌트의 이해
-   [React Props 기본 활용법](./react-props-basics.md)
-   [React 이벤트 핸들링](./react-event-handling.md)

---

## 1. 함수를 Props로 전달하기 (자식 -> 부모 통신)

React의 데이터 흐름은 기본적으로 부모에서 자식으로 내려가는 단방향(one-way)입니다. 하지만 자식 컴포넌트에서 발생한 이벤트를 부모 컴포넌트가 처리해야 할 때가 있습니다. 예를 들어, 자식의 버튼 클릭에 따라 부모의 상태(state)를 변경해야 하는 경우입니다.

이때 **부모의 함수를 자식에게 Prop으로 전달**하여 이 문제를 해결할 수 있습니다. 자식은 그 함수를 호출함으로써 부모에게 특정 이벤트가 발생했음을 알릴 수 있습니다.

### 함수 전달 네이밍 컨벤션 (관례)

일관성 있고 가독성 높은 코드를 위해 다음과 같은 네이밍 컨벤션을 따르는 것이 좋습니다.

-   **부모 컴포넌트의 핸들러 함수 원본**: `handle` + `이벤트명` (예: `handleClick`, `handleChange`)
-   **자식에게 전달하는 함수 Prop 이름**: `on` + `이벤트명` (예: `onClick`, `onChange`)

이렇게 하면 자식 컴포넌트에서 Prop을 사용할 때 마치 네이티브 HTML 요소의 이벤트를 다루는 것처럼 자연스럽게 보입니다. (`<button onClick={props.onClick}>`)

### 예제 디렉토리 구조

```
📁 src/
└── 📁 components/
    └── 📁 Props/
        ├── ⚛️ CardContainer.jsx
        └── ⚛️ Card.jsx
```

### 매개변수가 없는 함수 전달하기

**부모 컴포넌트 (`CardContainer.jsx`)**
```jsx
import Card from "./Card";

export default function CardContainer() {
  // 1. 부모에 함수를 정의 (handle-)
  function handleClick() {
    alert("카드를 클릭했습니다.");
  }

  return (
    <div>
      {/* 2. 자식에게 함수를 prop으로 전달 (on-) */}
      {/* 주의: handleClick()이 아님! 함수 참조를 전달 */}
      <Card onClick={handleClick} />
    </div>
  );
}
```

**자식 컴포넌트 (`Card.jsx`)**
```jsx
// 3. 자식은 함수를 prop으로 수신
export default function Card({ onClick }) {
  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <p>이것은 카드입니다.</p>
      {/* 4. 특정 이벤트 발생 시 전달받은 함수를 호출 */}
      <button onClick={onClick}>카드 클릭하기</button>
    </div>
  );
}
```

### 매개변수가 있는 함수 전달하기

자식 컴포넌트의 데이터를 부모의 함수로 전달해야 할 경우, 화살표 함수를 사용하여 호출 시점에 인자를 넘겨줍니다.

**부모 컴포넌트 (`CardContainer.jsx`)**
```jsx
import Card from "./Card";

export default function CardContainer() {
  // 매개변수가 있는 함수 정의
  function handleCardClick(title) {
    alert(`${title} 카드 정보를 표시합니다.`);
  }

  return (
    <div>
      {/* 각 카드에 맞는 데이터를 자식에게 전달 */}
      <Card onClick={handleCardClick} title="상품 카드" />
      <Card onClick={handleCardClick} title="프로필 카드" />
    </div>
  );
}
```

**자식 컴포넌트 (`Card.jsx`)**
```jsx
export default function Card({ onClick, title }) {
  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <h3>{title}</h3>
      {/* 이벤트 발생 시, 부모 함수에 자신의 데이터(title)를 인자로 전달 */}
      <button onClick={() => onClick(title)}>정보 보기</button>
    </div>
  );
}
```

---

## 2. `children` Props: 컴포넌트의 유연성 높이기

`children`은 React 컴포넌트의 특별한 Prop입니다. 컴포넌트의 여는 태그와 닫는 태그 사이에 위치하는 모든 내용은 `children`이라는 이름의 Prop으로 자식 컴포넌트에 전달됩니다.

이를 통해 문자열이나 숫자 같은 단일 데이터로 표현하기 어려운 복잡한 HTML 구조나 다른 React 컴포넌트들을 통째로 전달할 수 있습니다.

### `children` Prop의 필요성

`children`을 사용하면 **재사용 가능한 "래퍼(Wrapper)" 또는 "컨테이너(Container)" 컴포넌트**를 만들 수 있습니다. 예를 들어, 동일한 스타일(테두리, 그림자, 패딩 등)을 가지지만 내부 콘텐츠는 완전히 다른 여러 종류의 카드를 만들고 싶을 때 유용합니다.

#### `children`을 사용하지 않는 경우

카드 내부의 구조가 `Card` 컴포넌트 자체에 고정되어 있어 유연성이 떨어집니다. 새로운 요소를 추가하거나 순서를 바꾸려면 `Card` 컴포넌트를 직접 수정해야 합니다.

```jsx
// Card.jsx - 구조가 고정됨
export default function Card({ title, description }) {
  return (
    <div className="card-style">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

#### `children`을 사용하는 경우

`Card` 컴포넌트는 내용이 무엇인지 신경 쓰지 않고, 단지 스타일을 입히는 "틀"의 역할만 합니다. 내부 콘텐츠는 부모 컴포넌트가 자유롭게 결정하여 전달합니다.

**부모 컴포넌트 (`CardContainer.jsx`)**
```jsx
import Card from "./Card";

export default function CardContainer() {
  return (
    <div>
      {/* Card 컴포넌트 사이에 자유로운 구조의 자식들을 전달 */}
      <Card>
        <h1>상품 정보</h1>
        <p>이 상품은 최고급 품질입니다.</p>
        <button>구매하기</button>
      </Card>

      <Card>
        <h2>배송 정보</h2>
        <ul>
          <li>무료 배송</li>
          <li>예상 배송일: 2-3일</li>
        </ul>
      </Card>
    </div>
  );
}
```

**자식 컴포넌트 (`Card.jsx`) - 수정 후**
```jsx
// 부모로부터 받은 내용을 그대로 렌더링
export default function Card({ children }) {
  return (
    <div style={{ border: '1px solid gray', borderRadius: '8px', padding: '16px', margin: '16px' }}>
      {children}
    </div>
  );
}
```

## 요약

-   **함수 Props**: 자식 컴포넌트의 이벤트를 부모에서 처리하고 싶을 때 (자식 -> 부모 통신) 사용합니다. `onEvent` 형태의 Prop 이름과 `handleEvent` 형태의 함수 이름을 사용하는 컨벤션을 따르는 것이 좋습니다.
-   **`children` Prop**: 컴포넌트의 재사용성을 극대화하는 강력한 기능입니다. 컴포넌트의 "틀"과 "내용"을 분리하여 유연하고 복잡한 구조를 쉽게 만들 수 있습니다.