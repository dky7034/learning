# React Props (속성) 이해하기

이 문서는 React 컴포넌트 간에 데이터를 전달하는 데 사용되는 속성(Props)에 대해 상세히 설명합니다. 이 문서를 통해 컴포넌트 재사용성을 높이고 데이터를 효과적으로 관리하는 방법을 학습할 수 있습니다.

## 사전 학습

이 문서를 이해하기 위해 다음의 사전 지식이 필요합니다.

-   JSX 문법 및 활용
-   React 컴포넌트의 기본 구조와 역할

## Props란 무엇인가?

**Props** (properties의 줄임말)는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하기 위한 **읽기 전용(read-only)** 객체입니다.

-   **부모 컴포넌트**: 자식 컴포넌트에게 전달할 데이터를 Props로 지정합니다.
-   **자식 컴포넌트**: 부모로부터 전달받은 데이터를 Props 객체를 통해 사용합니다.

Props는 컴포넌트의 재사용성을 극대화하는 핵심적인 문법입니다. 동일한 구조의 컴포넌트라도 다른 데이터를 전달하여 다양한 결과물을 만들어낼 수 있습니다.

---

## Props의 필요성: 컴포넌트 재사용

Props를 사용하지 않으면, 비슷한 구조를 가졌지만 내용이 다른 컴포넌트를 필요할 때마다 새로 만들어야 합니다. 이는 코드의 중복을 유발하고 유지보수를 어렵게 만듭니다.

### Props를 사용하지 않는 경우

이름만 다른 프로필 컴포넌트를 여러 개 만들어야 합니다.

```jsx
// App.jsx

// 예시를 위해 하나의 파일에 여러 컴포넌트를 생성
function UserProfile철수() {
  return <div>Hello! 철수</div>;
}

function UserProfile영희() {
  return <div>Hello! 영희</div>;
}

function UserProfile길동() {
  return <div>Hello! 길동</div>;
}

function App() {
  return (
    <div>
      <UserProfile철수 /> {/* Hello! 철수 */}
      <UserProfile영희 /> {/* Hello! 영희 */}
      <UserProfile길동 /> {/* Hello! 길동 */}
    </div>
  );
}

export default App;
```

### Props를 사용하는 경우

하나의 `UserProfile` 컴포넌트를 만들고, `name`이라는 Prop을 전달하여 각기 다른 결과를 렌더링할 수 있습니다. 이를 통해 코드의 재사용성이 획기적으로 향상됩니다.

```jsx
// App.jsx

// 재사용 가능한 UserProfile 컴포넌트
function UserProfile(props) {
  return <div>Hello! {props.name}</div>;
}

function App() {
  return (
    <div>
      {/* <Component PropsKey="Value" /> 형식으로 데이터 전달 */}
      <UserProfile name="철수" />
      <UserProfile name="영희" />
      <UserProfile name="길동" />
    </div>
  );
}

export default App;
```

---

## Props 전달하고 받기

### 1. 부모: Props 전달하기

부모 컴포넌트에서 자식 컴포넌트를 호출할 때, HTML의 속성(attribute)처럼 `key={value}` 형태로 Props를 전달합니다.

-   `key`: Prop의 이름 (카멜 케이스 권장)
-   `value`: 전달할 데이터. 문자열은 따옴표(`""`)로, 그 외 JavaScript 표현식(변수, 숫자, 배열, 객체 등)은 중괄호(`{}`)로 감싸서 전달합니다.

```jsx
// ParentComponent.jsx
import ChildComponent from "./components/ChildComponent";

export default function ParentComponent() {
  const user = {
    name: "철수",
    age: 20,
  };

  return (
    <div>
      <ChildComponent 
        name="영희"      // 문자열 전달
        age={25}          // 숫자 전달
        user={user}       // 객체 전달
      />
    </div>
  );
}
```

### 2. 자식: Props 받기

자식 컴포넌트는 함수의 **첫 번째 매개변수**로 `props` 객체를 통째로 전달받습니다. 이 객체에는 부모가 전달한 모든 속성들이 담겨 있습니다.

#### 방법 A: `props` 객체 직접 사용

`props.속성명` 형태로 데이터에 접근할 수 있습니다.

```jsx
// ChildComponent.jsx
export default function ChildComponent(props) {
  console.log(props); // { name: "영희", age: 25, user: { name: "철수", age: 20 } }

  return (
    <div>
      <p>이름: {props.name}</p>
      <p>나이: {props.age}</p>
      <p>다른 사용자: {props.user.name}</p>
    </div>
  );
}
```

#### 방법 B: 구조 분해 할당 (Destructuring) - 권장

매개변수 위치에서 객체 구조 분해 할당 문법을 사용하면 코드가 훨씬 간결해집니다. 필요한 `props` 키를 `{}` 안에 직접 명시하여 변수처럼 바로 사용할 수 있습니다.

```jsx
// ChildComponent.jsx
export default function ChildComponent({ name, age, user }) {
  return (
    <div>
      <p>이름: {name}</p>
      <p>나이: {age}</p>
      <p>다른 사용자: {user.name}</p>
    </div>
  );
}
```

---

## 가장 중요한 규칙: Props는 읽기 전용이다

**자식 컴포넌트는 부모로부터 받은 Props를 절대로 직접 수정해서는 안 됩니다.**

이는 React의 핵심 원칙 중 하나인 **단방향 데이터 흐름(One-way data flow)**을 보장하기 위함입니다. 데이터는 항상 부모에서 자식으로, 위에서 아래로 흐릅니다. 만약 자식 컴포넌트가 Props를 수정할 수 있다면 데이터 흐름을 예측하기 어려워지고, 애플리케이션의 복잡도가 증가하여 버그 발생 가능성이 높아집니다.

```jsx
function MyComponent(props) {
  // ❌ 잘못된 코드! Props를 직접 수정하려고 하면 에러가 발생합니다.
  props.name = "다른 이름"; 

  return <div>{props.name}</div>;
}
```

만약 전달받은 데이터를 변경해야 한다면, 부모 컴포넌트의 `state`를 변경하고, 그 `state`를 자식에게 새로운 Prop으로 전달하는 방식을 사용해야 합니다. (이는 `state`와 `이벤트 핸들러` 학습에서 더 자세히 다룹니다.)

## 요약

-   **Props**는 부모가 자식에게 데이터를 전달하는 **객체**입니다.
-   Props를 통해 **컴포넌트의 재사용성**을 높일 수 있습니다.
-   부모는 자식 컴포넌트에 `<Child propName={value} />` 형태로 Props를 전달합니다.
-   자식은 `function Child({ propName })` 과 같이 **구조 분해 할당**으로 Props를 받는 것을 권장합니다.
-   **Props는 절대 직접 수정할 수 없는 읽기 전용(read-only) 데이터입니다.**