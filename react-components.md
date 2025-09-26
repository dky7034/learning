# React 컴포넌트: 개념부터 모듈화까지

## 1. React 컴포넌트란?

React 컴포넌트는 **HTML 태그를 반환하는 함수**입니다. UI를 독립적이고 재사용 가능한 부분으로 나누어 관리할 수 있게 해주는 핵심 요소이며, 컴포넌트의 이름은 일반적으로 해당 함수나 클래스의 이름을 따서 만듭니다. (예: `App` 컴포넌트)

## 2. 함수형 컴포넌트 vs 클래스 컴포넌트

React 컴포넌트는 두 가지 방식으로 작성할 수 있습니다.

- **함수형 컴포넌트 (Functional Component)**: 현재 React에서 권장되는 방식입니다. 코드가 간결하고 직관적이며, Hooks의 등장으로 클래스 컴포넌트의 기능을 대부분 대체할 수 있게 되었습니다.
- **클래스 컴포넌트 (Class Component)**: 과거에 주로 사용되던 방식으로, 현재는 특별한 경우(예: 오래된 라이브러리와의 호환)를 제외하고는 잘 사용하지 않습니다.

**본 문서에서는 현대적인 React 개발 표준인 함수형 컴포넌트를 기준으로 설명합니다.**

## 3. 컴포넌트 생성 규칙

- **첫 글자는 반드시 대문자여야 합니다.** React는 소문자로 시작하는 컴포넌트를 일반적인 HTML 태그로 인식하기 때문에, 컴포넌트의 이름은 항상 대문자로 시작해야 합니다. (예: `Header`, `MyComponent`)

## 4. 컴포넌트의 계층 구조

React 애플리케이션은 컴포넌트들의 계층 구조로 이루어집니다.

- **부모-자식 관계**: 한 컴포넌트가 다른 컴포넌트를 포함할 때, 포함하는 쪽을 **부모 컴포넌트**, 포함되는 쪽을 **자식 컴포넌트**라고 합니다.
- **루트 컴포넌트 (Root Component)**: 모든 컴포넌트의 최상위 조상 역할을 하는 컴포넌트를 **루트 컴포넌트**라고 부릅니다. 일반적으로 `App` 컴포넌트가 이 역할을 수행하며, 모든 컴포넌트는 `App` 컴포넌트 아래에 계층적으로 구성됩니다.

## 5. 컴포넌트 모듈화

실제 프로젝트에서는 여러 컴포넌트를 한 파일에 작성하지 않고, 기능별로 파일을 분리하여 관리합니다. 이를 **모듈화**라고 합니다.

- **파일 분리**: 각 컴포넌트는 별도의 `.jsx` 또는 `.js` 파일로 작성됩니다. 일반적으로 `src/components` 폴더 안에 컴포넌트 파일들을 모아 관리합니다.
- **`export` (내보내기)**: 다른 파일에서 사용할 수 있도록 컴포넌트를 내보냅니다. `export default` 키워드를 사용하면 해당 모듈의 기본값으로 컴포넌트를 지정할 수 있습니다.
- **`import` (가져오기)**: 다른 파일에서 내보낸 컴포넌트를 가져와 사용합니다. Vite와 같은 최신 번들러는 파일 확장자(`.jsx`, `.js`)를 생략해도 자동으로 찾아줍니다.

## 6. 코드 예시

다음은 `Header`, `Main`, `Footer` 컴포넌트를 각각 별도의 파일로 분리하고, `App` 컴포넌트에서 이를 조합하여 전체 애플리케이션을 구성하는 예시입니다.

### `src/components/Header.jsx`

```jsx
const Header = () => {
  return (
    <header>
      <h1>Header</h1>
    </header>
  );
};

export default Header;
```

### `src/components/Main.jsx`

```jsx
const Main = () => {
  return (
    <main>
      <h1>Main Content</h1>
    </main>
  );
};

export default Main;
```

### `src/components/Footer.jsx`

```jsx
const Footer = () => {
  return (
    <footer>
      <h1>Footer</h1>
    </footer>
  );
};

export default Footer;
```

### `src/App.jsx`

```jsx
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
```

이처럼 각 컴포넌트를 독립적으로 개발하고 `App.jsx`에서 조립함으로써, 코드의 재사용성과 유지보수성을 크게 향상시킬 수 있습니다.
