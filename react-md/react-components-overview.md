# 컴포넌트(Component)

## 개요

이 문서는 리액트 구축의 핵심인 컴포넌트의 기본 개념과 구조화 방법을 설명한다. 문서를 통해 다음 내용을 학습할 수 있다.

- 리액트 컴포넌트 기본 개념
- 함수형 컴포넌트 생성하고 사용하기

## 사전 학습

- JavaScript 함수와 모듈 시스템
- React 기본 개념
- JSX 문법 활용

## 컴포넌트(Component)

재사용 가능한 사용자 인터페이스(UI) 블럭으로 하나의 페이지는 여러 개의 컴포넌트를 조합해서 만들어낸다.
컴포넌트는 독립적인 파일을 생성하고, 함수를 정의해서 요소(Element) 객체를 반환해야 한다.
`export default ...`로 컴포넌트를 내보내고, `import ... from ...`로 컴포넌트를 가져와서 사용한다.

### 컴포넌트 특징

- **재사용성**: 변수처럼 여러 위치에서 반복하여 사용한다.
- **독립성**: 독립적으로 동작하며, 컴포넌트마다 별도의 데이터(상태)를 보유한다.
- **계층 구조**: 다른 컴포넌트를 포함할 수 있다.

### 컴포넌트 작성 규칙

- 파일명과 컴포넌트명은 파스칼 케이스(PascalCase)로 작성한다.
- 하나의 파일에 하나의 컴포넌트만 정의한다.
- 변수처럼 역할과 기능을 표현하는 이름을 사용한다.
- 일관된 확장자(.jsx)를 사용한다.

### 컴포넌트 중첩(Nested Component)

컴포넌트 내부에 또 다른 컴포넌트를 포함해서 사용하는 방식.

### 컴포넌트 생성 및 내보내기

`src/components` 폴더에 `jsx` 확장자 파일을 생성한다.
파일명과 컴포넌트명은 파스칼 케이스(PascalCase)로 작성한다.
요소를 반환하는 함수를 작성하고 내보낸다.

**기본 구조**

```jsx
function ComponentName() {
  return <div>컴포넌트 내용</div>;
}
export default ComponentName;
```

### 컴포넌트 불러오기 및 사용하기

`import` 문법을 사용하여 컴포넌트를 불러온다.
`<컴포넌트명 />` 형태로 사용한다.

**기본 구조**

```jsx
import ComponentName from "./components/ComponentName";

function App() {
  return (
    <div>
      <ComponentName />
    </div>
  );
}
```

## 예시

### 디렉토리 구조

```
📁 src/
├── 🎨 index.css
├── ⚛️ main.jsx
├── ⚛️ App.jsx
└── 📁 components/
    └── 📁 Component/
      ├── ⚛️ MyButton.jsx
      └── ⚛️ MyList.jsx
```

### 컴포넌트 생성 및 내보내기

**components/Component/MyList.jsx**

```jsx
// MyList 컴포넌트 함수 정의와 내보내기
export default function MyList() {
  return (
    <ul>
      <li>1. 리액트 프로젝트 생성</li>
      <li>2. 터미널 경로 이동</li>
      <li>3. 의존성 설치</li>
      <li>4. 프로젝트 서버 실행</li>
    </ul>
  );
}
```

**components/Component/MyButton.jsx**

```jsx
// MyButton 컴포넌트 함수 정의와 내보내기
export default function MyButton() {
  return <button>버튼</button>;
}
```

### 컴포넌트 불러오기 및 사용하기

**App.jsx**

```jsx
// 컴포넌트 불러오기
import MyButton from "./components/Component/MyButton";
import MyList from "./components/Component/MyList";

function App() {
  return (
    <div>
      {/* 컴포넌트 사용 */}
      <MyList />
      <MyButton />
    </div>
  );
}

export default App;
```
