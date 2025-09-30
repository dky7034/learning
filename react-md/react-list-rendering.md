# React 리스트 렌더링 (List Rendering)

## 📝 개요

이 문서는 React에서 배열 데이터를 화면에 반복적으로 렌더링하는 **리스트 렌더링(List Rendering)** 기법을 상세히 설명합니다. 이 가이드를 통해 다음 내용을 학습할 수 있습니다.

- 리스트 렌더링의 개념과 필요성
- JavaScript의 `map()` 함수를 JSX와 결합하는 방법
- 리스트 렌더링의 핵심, `key` 속성의 역할과 올바른 사용법

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [React JSX](./react-jsx.md)
- [React 컴포넌트](./react-components.md)
- JavaScript 배열과 고차 함수 (특히 `map`)

---

## 1. 리스트 렌더링이란?

**리스트 렌더링**은 `[... ]`와 같은 배열에 저장된 여러 개의 데이터를 화면에 목록 형태로 그려주는 기술입니다.

React에서는 배열의 내장 고차 함수인 **`map()`**을 사용하여, 데이터 배열의 각 원소를 JSX 요소(Element)로 변환하고, 이 요소들의 배열을 만들어 화면에 렌더링합니다.

## 2. 핵심 원리: JavaScript의 `map()` 메서드

`map()` 메서드는 배열의 모든 원소를 처음부터 끝까지 하나씩 순회하면서, 주어진 함수(콜백 함수)를 호출하고 그 결과를 모아 **새로운 배열**을 반환합니다.

#### 기본 구조
```javascript
const newArray = originalArray.map((element, index) => {
  return '새로운 값';
});
```

> **💡 쉽게 이해하기**
> `map()`은 "배열의 각 아이템을 다른 모습으로 변신시켜 새로운 목록을 만드는 마법"과 같습니다.
> React는 이 원리를 이용해 **데이터 배열**을 **JSX 요소 배열**로 변환합니다.

## 3. React에서 배열 데이터 렌더링하기

`map()` 메서드를 JSX 안에서 `{ }`로 감싸 사용하면 데이터 목록을 손쉽게 UI 요소로 변환할 수 있습니다.

### 1) 기본 배열 렌더링
```jsx
export default function NumberList() {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <ul>
      {numbers.map((num, index) => (
        <li key={index}>{num}</li>
      ))}
    </ul>
  );
}
```

### 2) 객체 배열 렌더링
```jsx
export default function UserList() {
  const users = [
    { id: 1, name: "철수" },
    { id: 2, name: "영희" },
    { id: 3, name: "동수" },
  ];

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <span>ID: {user.id} / </span>
          <span>Name: {user.name}</span>
        </div>
      ))}
    </div>
  );
}
```

## 4. 가장 중요한 `key` 속성

`key`는 리스트 렌더링에서 각 요소를 식별하기 위해 사용하는 **고유한 문자열 속성**입니다. `key`가 없으면 React는 어떤 항목이 변경, 추가, 또는 삭제되었는지 구분하기 어려워 **성능이 저하**되거나 **UI 상태에 예기치 않은 문제**가 발생할 수 있습니다.

#### `key` 사용 예시
```jsx
function TodoList() {
  const todos = [
    { id: 'todo-1', text: "공부하기" },
    { id: 'todo-2', text: "운동하기" },
    { id: 'todo-3', text: "휴식하기" },
  ];

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

> **💡 `key`는 왜 필요할까요?**
> React가 화면을 업데이트할 때, 이전 모습과 현재 모습을 비교하여 변경된 부분만 효율적으로 업데이트합니다. 이때 `key`는 각 항목을 구분하는 **이름표** 역할을 합니다. `key`가 없다면, React는 어떤 항목이 사라졌는지 명확히 알 수 없어 비효율적인 동작을 할 수 있습니다.

### ⚠️ 주의: 배열 인덱스를 `key`로 사용하면 안 됩니다!

`map` 함수의 두 번째 인자인 `index`를 `key`로 사용하는 것은 **매우 위험**하며, 안티 패턴으로 간주됩니다. 배열의 항목이 추가, 삭제, 또는 재정렬될 때 `index`는 언제든지 바뀔 수 있습니다. `index`가 바뀌면 React는 요소 자체가 바뀌었다고 착각하여 심각한 버그를 유발할 수 있습니다. **항상 데이터가 가진 고유하고 안정적인 ID를 `key`로 사용해야 합니다.**

## 5. 요약

- 리스트 렌더링은 JavaScript의 `map()` 함수를 사용하여 데이터 배열을 JSX 요소 배열로 변환하는 과정입니다.
- `map()`으로 생성된 모든 리스트 아이템에는 형제 요소들 사이에서 **고유하고 안정적인 `key` prop**을 반드시 제공해야 합니다.
- `key` 값으로는 데이터가 가진 고유 ID를 사용하는 것이 가장 좋으며, 배열의 `index`를 사용하는 것은 피해야 합니다.
