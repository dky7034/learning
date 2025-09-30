# React에서 배열 다루기: 동적 컴포넌트 렌더링

웹 애플리케이션을 개발할 때, 리스트나 테이블처럼 반복되는 UI 요소를 동적으로 렌더링해야 하는 상황은 매우 흔합니다. 이 문서에서는 React에서 배열 데이터를 효율적으로 시각화하고 관리하는 방법을 자바스크립트의 `map` 함수와 React의 `key` prop을 중심으로 알아봅니다.

## 1. 자바스크립트 배열의 `map` 함수

React에서 배열을 렌더링하는 가장 일반적인 방법은 자바스크립트 배열의 내장 함수인 `map()`을 사용하는 것입니다. `map()` 함수는 배열의 각 요소를 순회하며, 주어진 함수를 실행한 결과로 새로운 배열을 생성합니다.

### 기본 문법

```javascript
arr.map(callback(currentValue[, index[, array]])[, thisArg])
```

- `callback`: 새로운 배열 요소를 생성하는 함수입니다.
  - `currentValue`: 현재 처리 중인 요소.
  - `index` (선택): 현재 요소의 인덱스.
  - `array` (선택): `map`을 호출한 원본 배열.
- `thisArg` (선택): `callback` 실행 시 `this`로 사용될 값.

React에서는 이 `map` 함수를 사용해 데이터 배열을 React 엘리먼트(JSX) 배열로 변환할 수 있습니다.

```jsx
const IterationSample = () => {
  const names = ["눈사람", "얼음", "눈", "바람"];
  const nameList = names.map(name => <li>{name}</li>);
  
  return <ul>{nameList}</ul>;
};

export default IterationSample;
```
위 코드에서 `names` 배열은 `map` 함수를 통해 `<li>` 태그로 감싸진 React 엘리먼트 배열 `nameList`로 변환되고, `<ul>` 내부에 렌더링됩니다.

## 2. `key`: 효율적인 업데이트를 위한 열쇠

`key`는 React가 배열을 렌더링할 때 각 요소에 안정적인 고유성을 부여하기 위해 사용하는 특별한 `prop`입니다. `key`를 통해 React는 어떤 항목이 변경, 추가, 또는 제거되었는지 효율적으로 식별할 수 있습니다.

### `key`의 필요성

만약 `key`가 없다면, React는 배열의 순서가 변경되었을 때 어떤 항목이 어디로 이동했는지 파악하기 어렵습니다. 그 결과, 리스트 전체를 다시 렌더링하거나 부정확하게 DOM을 업데이트하여 성능 저하 및 상태 관련 문제를 일으킬 수 있습니다.

`key`가 있으면 React는 `key`를 통해 기존 DOM 엘리먼트와 새로운 엘리먼트를 비교하여 최소한의 변경만으로 UI를 업데이트할 수 있습니다.

### `key` 설정 방법

`key`는 `map()` 함수 내부에서 반환되는 엘리먼트에 `prop`으로 전달해야 합니다. `key` 값은 형제 엘리먼트 사이에서만 고유하면 됩니다.

```jsx
const nameList = names.map((name, index) => <li key={index}>{name}</li>);
```

**중요**: `key` 값으로 배열의 `index`를 사용하는 것은 권장되지 않습니다. 배열의 순서가 변경되거나 항목이 추가/삭제될 때 `index`는 불안정하게 변할 수 있으며, 이는 성능 저하와 예기치 않은 동작의 원인이 될 수 있습니다. 데이터에 각 항목을 고유하게 식별할 수 있는 `id`와 같은 안정적인 값을 사용하는 것이 가장 좋습니다.

```jsx
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const userList = users.map(user => <li key={user.id}>{user.name}</li>);
```

## 3. 응용: 동적인 배열 렌더링

이제 사용자와의 상호작용을 통해 동적으로 데이터가 변하는 리스트를 구현해 보겠습니다. 새로운 항목을 추가하고 기존 항목을 제거하는 기능을 만들어 봅니다.

### 완성된 `IterationSample` 컴포넌트 코드

```jsx
import React, { useState } from "react";

export default function IterationSample() {
  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "바람" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id

  const onChange = (e) => setInputText(e.target.value);

  const onClick = () => {
    // 새로운 항목을 기존 배열에 추가(concat)하고, names 상태를 업데이트
    const nextNames = names.concat({
      id: nextId,
      text: inputText,
    });
    setNextId(nextId + 1); // 다음 항목을 위한 id 준비
    setNames(nextNames);   // 상태 업데이트
    setInputText("");      // input 필드 비우기
  };

  const onRemove = (id) => {
    // 제거할 id를 제외한 새로운 배열(filter)을 만들어 상태를 업데이트
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  };

  const nameList = names.map((name) => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {name.text}
    </li>
  ));

  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </>
  );
}
```

### 데이터 추가 기능 (`concat`)

React에서 상태를 업데이트할 때는 **불변성(Immutability)**을 지키는 것이 매우 중요합니다. 즉, 원본 상태 객체나 배열을 직접 수정해서는 안 됩니다. 원본을 수정하는 `push()`, `splice()` 같은 메서드 대신, 새로운 배열을 반환하는 `concat()`, `slice()`, `filter()`나 전개 연산자(`...`)를 사용해야 합니다.

`onClick` 함수에서는 `concat` 메서드를 사용해 새로운 항목이 추가된 새 배열(`nextNames`)을 생성했습니다.
```javascript
const nextNames = names.concat({
  id: nextId,
  text: inputText,
});
```
이렇게 하면 React는 이전 상태와 다음 상태의 참조가 다르다는 것을 감지하고 UI를 효율적으로 리렌더링합니다.

### 데이터 제거 기능 (`filter`)

항목을 제거할 때는 `filter` 메서드를 사용합니다. `filter`는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 **새로운 배열**을 반환합니다.

`onRemove` 함수에서는 제거하려는 항목의 `id`와 일치하지 않는 요소들만 필터링하여 새로운 배열을 생성하고, 이 배열로 상태를 업데이트합니다.
```javascript
const onRemove = (id) => {
  const nextNames = names.filter((name) => name.id !== id);
  setNames(nextNames);
};
```
위 예제에서는 리스트의 각 항목을 더블 클릭하면 해당 항목이 제거되도록 `onDoubleClick` 이벤트를 설정했습니다.

이처럼 `map`, `key`, 그리고 불변성을 유지하는 배열 메서드들을 활용하면 React에서 동적인 리스트를 선언적이고 효율적으로 관리할 수 있습니다.
