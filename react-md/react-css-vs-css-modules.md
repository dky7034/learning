# React 스타일링: 일반 CSS vs. CSS Modules

## 📝 개요

React 프로젝트에서 스타일을 적용하는 두 가지 기본적인 접근 방식, **일반 CSS**와 **CSS Modules**를 비교하고 각각의 특징과 적합한 사용 사례를 알아봅니다. 이 문서를 통해 스타일 충돌 문제의 원인과 해결책을 이해할 수 있습니다.

- 전역 스코프를 갖는 일반 CSS의 동작 방식과 한계
- 로컬 스코프를 제공하는 CSS Modules의 장점과 사용법
- 프로젝트 규모와 특성에 맞는 스타일링 방식 선택 가이드

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [React 스타일링: CSS Modules와 Tailwind CSS](./react-styling.md)
- [React 컴포넌트](../react-components.md)

---

## 1. 일반 CSS

가장 전통적이고 간단한 스타일링 방식입니다. `.css` 확장자를 가진 파일을 생성하고, 컴포넌트에서 직접 `import`하여 사용합니다.

- **적용 범위**: **전역 (Global)**
- **특징**: `import`된 CSS 파일은 프로젝트 전체에 영향을 미칩니다. 따라서 서로 다른 컴포넌트에서 동일한 클래스 이름을 사용하면 스타일이 겹치거나 덮어쓰여 예기치 않은 결과를 초래할 수 있습니다.

### 사용 예시

**`Button.css`**
```css
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}
```

**`Button.jsx`**
```jsx
import React from 'react';
import './Button.css'; // CSS 파일 import

function Button({ children }) {
  return <button className="button">{children}</button>;
}

export default Button;
```

### 문제점

만약 다른 컴포넌트(예: `Card.jsx`)에서 다른 스타일을 의도하고 `.button`이라는 동일한 클래스 이름을 사용하면, 두 스타일이 충돌하여 개발자가 의도하지 않은 스타일이 적용될 수 있습니다. 프로젝트가 커질수록 이러한 충돌 가능성은 기하급수적으로 증가합니다.

---

## 2. CSS Modules

CSS Modules는 CSS 클래스 이름이 **컴포넌트 내에서만 유효**하도록(Locally Scoped) 만들어주는 기술입니다. 파일 이름을 `[컴포넌트명].module.css`로 작성하면, 빌드 과정에서 각 클래스 이름이 고유한 문자열로 자동 변환되어 스타일 충돌을 원천적으로 방지합니다.

- **적용 범위**: **컴포넌트 한정 (Local)**
- **특징**: 클래스 이름이 자동으로 고유화되므로, 여러 컴포넌트에서 동일한 클래스 이름을 자유롭게 사용해도 서로 영향을 주지 않습니다.

### 사용 예시

**`Button.module.css`**
```css
.button {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}
```

**`Button.jsx`**
```jsx
import React from 'react';
// CSS 모듈을 `styles` 객체로 불러옴
import styles from './Button.module.css';

function Button({ children }) {
  // className에 `styles.클래스명` 형태로 적용
  return <button className={styles.button}>{children}</button>;
}

export default Button;
```

### 빌드 후 결과

위 코드는 빌드 시 다음과 같이 고유한 클래스 이름을 가진 HTML로 변환됩니다.

```html
<button class="Button_button__a1B2c">버튼</button>
```

`Button_button__a1B2c`처럼 파일명과 클래스명, 해시값이 조합된 고유한 이름이 생성되므로 다른 컴포넌트의 스타일과 절대 충돌하지 않습니다.

---

## 3. 직접 비교 상황

`App` 컴포넌트와 `Header` 컴포넌트에서 각각 `.title`이라는 클래스를 정의했다고 가정해봅시다.

**`App.module.css`**
```css
.title { color: red; }
```

**`Header.module.css`**
```css
.title { color: green; }
```

**`App.jsx`**
```jsx
import styles from './App.module.css';
import Header from './Header';

function App() {
  return (
    <>
      <h1 className={styles.title}>App Title (빨간색)</h1>
      <Header />
    </>
  );
}
```

**`Header.jsx`**
```jsx
import styles from './Header.module.css';

function Header() {
  return <h1 className={styles.title}>Header Title (초록색)</h1>;
}
```

#### 결과

- `App` 컴포넌트의 `<h1>` 태그는 **빨간색**으로 렌더링됩니다.
- `Header` 컴포넌트의 `<h1>` 태그는 **초록색**으로 렌더링됩니다.

일반 CSS였다면 CSS 로드 순서에 따라 하나의 스타일이 다른 스타일을 덮어썼겠지만, CSS Modules 덕분에 각 컴포넌트가 의도한 스타일을 안전하게 유지할 수 있습니다.

---

## 4. 최종 정리

| 구분 | 일반 CSS | CSS Modules |
| :--- | :--- | :--- |
| **적용 범위** | **전역 (Global)** | **로컬 (Local / Scoped)** |
| **충돌 가능성** | **높음** (스타일 덮어쓰기 발생) | **없음** (클래스명 자동 고유화) |
| **클래스명** | `className="title"` | `className={styles.title}` |
| **적합한 경우** | - 전역 스타일 (Reset.css 등)<br>- 간단한 단일 페이지<br>- 소규모 프로젝트 | - 컴포넌트 단위 스타일링<br>- 중/대규모 프로젝트<br>- 재사용 가능한 컴포넌트 개발 |

## ✅ 결론

- **소규모 프로젝트**나 전역적으로 적용해야 하는 스타일(폰트, 레이아웃 등)은 **일반 CSS**로도 충분히 관리할 수 있습니다.
- 하지만 **컴포넌트 기반으로 개발하는 React의 특성을 최대한 활용**하고, 프로젝트 규모가 커져도 **스타일 충돌 없이 안정적으로 유지보수**하고 싶다면 **CSS Modules**를 사용하는 것이 강력하게 권장됩니다.
