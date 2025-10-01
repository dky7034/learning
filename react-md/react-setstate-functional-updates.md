# React useState: 상태 업데이트의 두 가지 방식 (직접 값 전달 vs. 함수형 업데이트)

React의 `useState` 훅을 사용하여 상태를 업데이트할 때는 두 가지 주요 방법을 사용할 수 있습니다. 첫 번째는 새로운 상태 값을 직접 전달하는 것이고, 두 번째는 상태 값을 계산하는 함수를 전달하는 것입니다. 이 두 방식의 차이점과 각각 언제 사용해야 하는지 자세히 알아보겠습니다.

## 1. 직접 값 전달 방식 (Direct Value Update)

가장 기본적인 상태 업데이트 방식입니다. `set` 함수에 새로운 상태 값을 직접 인자로 전달합니다.

```jsx
const [count, setCount] = useState(0);

// count를 5로 설정
setCount(5);

// 현재 count 변수를 읽어서 1을 더한 값으로 설정
setCount(count + 1);
```

### 직접 값 전달 방식의 잠재적 문제

이 방식은 간단하지만, React의 상태 업데이트가 비동기적으로 처리될 때 예기치 않은 문제를 일으킬 수 있습니다. 컴포넌트는 렌더링 시점의 `count` 값을 "기억"하고 있습니다. 만약 짧은 시간 안에 여러 번의 상태 업데이트가 발생하면, 이전 렌더링 시점의 `count` 값을 참조하여 업데이트가 누락될 수 있습니다.

**예시: 빠른 연속 클릭 시 문제 발생 가능**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    // 이 시점의 count는 렌더링된 시점의 값으로 고정되어 있습니다.
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  // 버튼을 한 번 클릭하면, count는 1이 됩니다.
  // setCount(0 + 1)가 세 번 호출되는 것과 같기 때문입니다.
  return <button onClick={increment}>Count: {count}</button>;
}
```

위 예제에서 버튼을 한 번 클릭하면 `increment` 함수가 호출됩니다. 함수가 호출될 당시 `count`의 값은 `0`입니다. 따라서 세 번의 `setCount` 호출은 모두 `setCount(0 + 1)`을 실행하는 것과 같으며, 결과적으로 `count`는 `1`이 됩니다. 우리가 기대한 `3`이 아닙니다.

## 2. 함수형 업데이트 방식 (Functional Update)

이러한 문제를 해결하기 위해 `set` 함수에 값을 직접 전달하는 대신, **업데이터 함수(updater function)**를 전달할 수 있습니다.

```jsx
// prev는 React가 자동으로 전달하는 "현재 상태 값"입니다.
setCount(prev => prev + 1);
```

### `prev`는 무엇인가?

- `prev`는 단순히 함수의 **매개변수 이름**일 뿐, 특별한 키워드가 아닙니다. `current`, `c`, `previousState` 등 원하는 어떤 이름으로든 지을 수 있습니다.
- 중요한 것은 React가 이 **업데이터 함수의 첫 번째 인자로 항상 최신 상태 값(pending state)을 전달해 준다는 약속**입니다.
- React는 여러 상태 업데이트 요청을 큐에 넣고 순차적으로 처리합니다. 함수형 업데이트를 사용하면, 각 업데이트가 실행되는 시점의 가장 최신 상태 값을 기준으로 다음 상태를 계산하므로 업데이트 누락 없이 안전하게 상태를 변경할 수 있습니다.

**예시: 함수형 업데이트로 안전하게 처리**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    // 함수형 업데이트 사용
    setCount(prev => prev + 1); // 큐: [0 => 1]
    setCount(prev => prev + 1); // 큐: [0 => 1, 1 => 2]
    setCount(prev => prev + 1); // 큐: [0 => 1, 1 => 2, 2 => 3]
  }

  // 버튼을 한 번 클릭하면, React는 큐의 함수들을 순서대로 실행합니다.
  // 0 -> 1 -> 2 -> 3 으로 정확하게 업데이트됩니다.
  return <button onClick={increment}>Count: {count}</button>;
}
```

## 3. 객체 상태 업데이트

객체나 배열 같은 참조 타입의 상태를 업데이트할 때도 함수형 업데이트는 매우 유용합니다. 특히, 이전 상태를 기반으로 새로운 객체를 만들어야 할 때 불변성을 지키면서 안전하게 업데이트할 수 있습니다.

```jsx
const [state, setState] = useState({ x: 0, y: 0, result: 0 });

// 직접 참조 방식
// 이전 state를 참조하지만, 여러 업데이트가 동시에 발생하면 문제가 될 수 있습니다.
setState({ ...state, result: 10 });

// 함수형 업데이트 방식 (권장)
// prev를 통해 가장 최신 상태를 보장받고, 이를 기반으로 새로운 객체를 반환합니다.
setState(prev => ({ ...prev, result: 10 }));
```

## 결론 및 핵심 요약

- **`prev`는 React가 제공하는 최신 상태 값**을 가리키는 매개변수 이름일 뿐입니다.
- **새로운 상태가 이전 상태에 의존하는 경우**, 즉 `setCount(count + 1)`과 같이 현재 값을 기반으로 다음 값을 계산해야 할 때는 **반드시 함수형 업데이트(`setCount(prev => prev + 1)`)를 사용**하는 것이 좋습니다. 이는 상태 업데이트 누락을 방지하고 예측 가능한 코드를 작성하는 데 도움을 줍니다.
- 새로운 상태가 이전 상태와 전혀 관련이 없다면(`setCount(0)` 등) 직접 값을 전달해도 무방합니다.
- 이 원칙을 따르는 것은 React 애플리케이션의 안정성과 데이터 정합성을 높이는 중요한 습관입니다.
