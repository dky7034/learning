
# [React] 브라우저는 어떻게 React 앱을 렌더링하나요?

React 개발 환경을 설정하고 `npm run dev` 명령어를 실행하면, 터미널에 `localhost:5173`과 같은 주소가 나타납니다. 이 주소에 접속하면 우리가 만든 React 애플리케이션이 마법처럼 화면에 그려집니다. 이 과정은 결코 마법이 아니며, 명확한 단계를 거쳐 이루어집니다.

이번 글에서는 브라우저가 어떻게 React 코드를 해석하고 화면에 렌더링하는지, 그 내부 동작 원리를 `index.html`, `main.jsx`, `App.jsx` 세 가지 핵심 파일을 통해 단계별로 자세히 알아보겠습니다.

## 1. 모든 것의 시작: `index.html`

브라우저가 가장 먼저 받는 파일은 바로 `public` 폴더의 `index.html`입니다. 이 파일은 React 애플리케이션의 유일한 HTML 페이지이며, 앱 전체의 뼈대 역할을 합니다.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react-study</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 이 파일의 역할

- **HTML 문서의 기본 구조 제공**: 웹 페이지의 기본적인 `<html>`, `<head>`, `<body>` 구조를 정의합니다.
- **React 애플리케이션의 "진입점(Entry Point)"**: `<body>` 내부에 있는 `<div id="root"></div>`는 React가 동적으로 생성할 모든 UI 요소들이 삽입될 "마운트 지점"입니다.
- **JavaScript 파일 로드**: `<script type="module" src="/src/main.jsx"></script>` 태그를 통해 React 애플리케이션의 심장부인 `main.jsx` 파일을 불러와 실행시킵니다.

### 코드 상세 설명

- **`<div id="root"></div>`**: 이 `div` 요소가 바로 React가 제어권을 갖게 될 DOM 노드입니다. 지금은 비어있지만, 잠시 후 `main.jsx` 파일에 의해 이 내부에 React 컴포넌트들이 동적으로 채워지게 됩니다. React는 이 `root` div를 시작으로 가상 DOM(Virtual DOM)을 그리고, 실제 DOM과 동기화합니다.
- **`<script type="module" src="/src/main.jsx"></script>`**: 브라우저는 이 라인을 만나면 `/src/main.jsx` 파일을 다운로드하고 실행합니다. 여기서 `type="module"` 속성은 해당 스크립트가 ES 모듈 시스템을 사용함을 의미합니다. 따라서 `main.jsx` 파일 내에서 `import`, `export` 같은 모듈 문법을 사용할 수 있습니다.

## 2. React와 DOM을 연결하는 다리: `main.jsx`

`index.html`에 의해 실행된 `main.jsx` 파일은 실제 React 애플리케이션을 초기화하고, `index.html`의 `<div id="root">`와 연결하는 핵심적인 역할을 수행합니다.

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 1. 'root' ID를 가진 DOM 요소를 찾아서 React 루트를 생성합니다.
const root = createRoot(document.getElementById('root'));

// 2. 생성된 루트에 App 컴포넌트를 렌더링합니다.
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 이 파일의 역할

- **React 애플리케이션 초기화**: `react-dom/client` 라이브러리를 사용하여 React 애플리케이션의 루트(Root)를 생성합니다.
- **최상위 컴포넌트 렌더링**: 애플리케이션의 가장 상위 컴포넌트인 `<App />`을 `index.html`의 `root` div 내부에 렌더링하도록 지시합니다.

### 코드 상세 설명

- **`import { createRoot } from 'react-dom/client'`**: `react-dom`은 React를 웹 브라우저의 DOM과 연결해주는 라이브러리입니다. `createRoot`는 React 18부터 도입된 새로운 Concurrent Mode API로, 애플리케이션을 렌더링할 최상위 컨테이너를 생성하는 함수입니다.
- **`import App from './App.jsx'`**: 애플리케이션의 메인 UI 구조를 정의하는 `App` 컴포넌트를 불러옵니다.
- **`createRoot(document.getElementById('root'))`**: `index.html`에 있던 바로 그 `<div id="root">` 요소를 DOM에서 선택하고, 이 요소를 React 애플리케이션의 루트 컨테이너로 지정합니다.
- **`.render(<StrictMode><App /></StrictMode>)`**: `render` 메서드는 `createRoot`로 생성된 루트에 React 엘리먼트를 렌더링하는 역할을 합니다.
    - **`<App />`**: `App.jsx` 파일에서 정의한 `App` 함수 컴포넌트를 JSX 문법으로 사용한 것입니다. React는 이 컴포넌트를 실행하여 반환되는 UI 구조를 그리게 됩니다.
    - **`<StrictMode>`**: "엄격 모드"를 의미하며, 개발 중에 잠재적인 문제를 식별하고 경고를 표시해주는 개발용 도구입니다. 프로덕션 빌드에서는 자동으로 제외됩니다.

## 3. 애플리케이션의 심장: `App.jsx`

`App.jsx`는 애플리케이션의 실제 내용, 즉 UI와 상호작용 로직을 담고 있는 핵심 컴포넌트입니다. `main.jsx`에 의해 호출되면, 이 파일은 HTML처럼 보이는 JSX 코드를 반환하여 화면에 표시될 내용을 정의합니다.

```jsx
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
export default App
```

### 이 파일의 역할

- **애플리케이션의 UI 구조 정의**: 사용자가 보게 될 화면의 레이아웃, 텍스트, 이미지, 버튼 등을 JSX 문법으로 작성합니다.
- **상태(State) 및 로직 관리**: `useState`와 같은 React Hook을 사용하여 컴포넌트의 동적인 데이터(상태)를 관리하고, 버튼 클릭과 같은 사용자 상호작용을 처리합니다.

### 코드 상세 설명

- **`import { useState } from 'react'`**: `useState`는 React의 "Hook" 중 하나로, 함수 컴포넌트 내에서 상태를 관리할 수 있게 해줍니다. 상태가 변경되면 React는 컴포넌트를 자동으로 다시 렌더링하여 화면을 업데이트합니다.
- **`function App() { ... }`**: `App`이라는 이름의 함수 컴포넌트를 정의합니다. React에서 컴포넌트는 UI를 독립적인 부분으로 나누어 재사용할 수 있게 해주는 핵심 개념입니다.
- **`return ( ... )`**: 이 `return` 문 안에 있는 코드가 바로 **JSX(JavaScript XML)**입니다.
    - **JSX란?**: JavaScript를 확장한 문법으로, JavaScript 코드 안에서 HTML과 유사한 형태로 UI를 작성할 수 있게 해줍니다. 브라우저는 JSX를 직접 이해하지 못하므로, Vite에 내장된 Babel과 같은 트랜스파일러가 이 JSX 코드를 `React.createElement()`와 같은 순수 JavaScript 코드로 변환해줍니다.
    - **`{count}`**: 중괄호 `{}`를 사용하여 JSX 내부에 JavaScript 변수나 표현식을 삽입할 수 있습니다. 여기서는 `useState`로 관리되는 `count` 상태 변수의 현재 값을 화면에 표시합니다.
    - **`onClick={...}`**: 버튼의 클릭 이벤트를 처리하는 부분입니다. 버튼이 클릭되면 `setCount` 함수가 호출되어 `count` 상태를 1 증가시키고, React는 변경된 `count` 값을 반영하여 UI를 자동으로 업데이트(리렌더링)합니다.

## 최종 정리: 렌더링 과정 요약

지금까지의 내용을 종합하여 React 애플리케이션의 초기 렌더링 과정을 시간 순서대로 정리하면 다음과 같습니다.

1.  **사용자 접속**: 사용자가 브라우저에 `localhost:5173`을 입력합니다.
2.  **`index.html` 전송**: Vite 개발 서버가 브라우저에게 `index.html` 파일을 보냅니다.
3.  **HTML 파싱**: 브라우저는 `index.html`을 파싱하여 DOM 트리를 구축합니다. 이 과정에서 `<div id="root"></div>`와 `<script src="/src/main.jsx"></script>`를 발견합니다.
4.  **`main.jsx` 요청 및 실행**: 브라우저는 `main.jsx` 파일을 서버에 요청하고, 다운로드가 완료되면 JavaScript 엔진이 코드를 실행합니다.
5.  **React 루트 생성**: `main.jsx` 내부의 `createRoot(document.getElementById('root'))` 코드가 실행되어, `index.html`의 `root` div를 React 애플리케이션의 컨테이너로 지정합니다.
6.  **컴포넌트 렌더링**: `root.render(<App />)`가 호출됩니다. React는 `App` 컴포넌트 함수를 실행합니다.
7.  **JSX 변환 및 가상 DOM 생성**: `App` 컴포넌트가 반환한 JSX는 Babel에 의해 `React.createElement()` 호출로 변환되고, React는 이를 바탕으로 화면에 그려질 UI 구조에 대한 정보를 담은 **가상 DOM(Virtual DOM)** 트리를 메모리에 생성합니다.
8.  **실제 DOM 업데이트**: React-DOM은 이 가상 DOM 트리를 실제 DOM으로 변환하여, 비어있던 `<div id="root">` 내부에 자식 노드로 삽입합니다.
9.  **화면 표시**: 마침내, 사용자는 브라우저 화면에서 렌더링된 React 애플리케이션의 UI를 볼 수 있게 됩니다.

이처럼 React는 정적인 HTML 파일의 특정 지점을 동적으로 제어하여, 컴포넌트 기반의 풍부하고 인터랙티브한 사용자 인터페이스를 구축하는 강력하고 체계적인 방식을 제공합니다.

---

## 초보자가 자주 겪는 궁금증 및 주의사항

**1. `react`와 `react-dom`은 무엇이 다른가요?**
   - `react` 라이브러리는 컴포넌트, Hook(`useState` 등)처럼 React의 핵심 기능을 정의합니다. 즉, UI를 어떻게 만들고 동작할지에 대한 '설계도'를 그리는 역할을 합니다.
   - `react-dom` 라이브러리는 `react`로 만들어진 '설계도(가상 DOM)'를 실제 브라우저의 DOM에 그리고 업데이트하는 '렌더러' 역할을 합니다. 이처럼 역할이 분리되어 있기 때문에, React는 `react-native`와 같은 다른 렌더러를 통해 웹이 아닌 모바일 앱 환경에서도 동작할 수 있습니다.

**2. 왜 `index.html`의 `<div id="root">`는 비어있나요?**
   - 이것이 바로 React의 동작 방식의 핵심입니다. 전통적인 웹사이트처럼 서버에서 완성된 HTML을 보내주는 것이 아니라, 최소한의 뼈대(HTML)와 로직(JavaScript)을 보낸 후 클라이언트(브라우저)에서 동적으로 UI를 그려주기 때문입니다. 모든 UI 코드는 `.jsx` 파일에 존재하며, React가 이들을 조합하여 `root` div를 채워 넣습니다.

**3. JSX는 HTML과 똑같은 건가요?**
   - 비슷해 보이지만 다릅니다. JSX는 JavaScript의 확장 문법입니다. 예를 들어, HTML의 `class` 속성은 JSX에서 `className`으로 작성해야 하며, 인라인 스타일은 문자열이 아닌 객체 형태로 전달(`style={{ color: 'blue' }}`)해야 하는 등 몇 가지 차이점이 있습니다. 이는 JSX가 결국 JavaScript로 변환되기 때문입니다.

**4. `export default App`은 왜 필요한가요?**
   - ES 모듈 시스템의 문법입니다. `App.jsx` 파일에서 `App` 컴포넌트를 `export default`로 내보내야, `main.jsx` 파일에서 `import App from './App.jsx'` 구문을 통해 해당 컴포넌트를 불러와 사용할 수 있습니다. 모듈 시스템은 코드를 기능별로 파일 단위로 분리하여 관리할 수 있게 해주므로 코드의 재사용성과 유지보수성을 크게 향상시킵니다.
