# React 스타일링: CSS Modules와 Tailwind CSS

## 📝 개요

이 문서는 현대적인 React 애플리케이션에서 널리 사용되는 두 가지 스타일링 방법론, **CSS Modules**와 **Tailwind CSS**에 대해 설명합니다. 이 문서를 통해 각 기술의 적용 방법과 장단점을 학습할 수 있습니다.

- CSS Modules를 사용한 컴포넌트 단위의 스타일링 방법
- Tailwind CSS의 유틸리티-우선 접근 방식과 프로젝트 설정 방법

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [React JSX](./react-jsx.md)
- [React 컴포넌트](./react-components.md)
- 기본적인 CSS 지식

---

## 1. CSS Modules

**CSS Modules**는 CSS 클래스 이름이 컴포넌트 내에서만 유효하도록 만들어, 전역적인 클래스 이름 충돌(Name Collision) 문제를 원천적으로 방지하는 기술입니다. 별도의 라이브러리 설치 없이, 파일 이름 규칙만으로 사용할 수 있습니다.

### CSS Modules 적용 방법

#### 1. `.module.css` 파일 생성

스타일을 적용할 컴포넌트와 동일한 위치에 `[컴포넌트명].module.css` 형식으로 CSS 파일을 생성합니다.

**`src/App.module.css`**

```css
/* App.module.css */
.container {
  text-align: center;
  margin-top: 4rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: blue;
}
```

#### 2. 컴포넌트에서 CSS 모듈 불러오기

`import` 구문을 사용하여 CSS 모듈을 JavaScript 객체처럼 불러옵니다. 이 객체는 작성한 클래스 이름을 속성으로 가집니다.

**`src/App.jsx`**

```jsx
import React from "react";
// CSS 모듈을 styles 객체로 불러옵니다.
import styles from "./App.module.css";

function App() {
  // className에 `styles.클래스명` 형태로 동적으로 클래스 이름을 할당합니다.
  // 실제 렌더링 시 `App_container__랜덤문자열`과 같은 고유한 이름으로 변환됩니다.
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello, CSS Modules!</h1>
    </div>
  );
}

export default App;
```

### 장점

- **스코프 격리**: 모든 클래스 이름이 로컬 스코프로 한정되어 충돌 걱정이 없습니다.
- **CSS 작성 방식 유지**: 기존에 알던 표준 CSS 문법을 그대로 사용합니다.
- **자동 코드 스플리팅**: 웹팩(Webpack)과 같은 번들러와 함께 사용 시, 각 컴포넌트에 필요한 CSS만 불러오므로 최적화에 유리합니다.

---

## 2. Tailwind CSS

**Tailwind CSS**는 미리 정의된 수많은 **유틸리티 클래스(Utility Classes)**를 조합하여 UI를 구축하는 "유틸리티-우선" 프레임워크입니다.

- **유틸리티 클래스**: `flex`, `pt-4`, `text-center`와 같이 단 하나의 CSS 속성만 담당하는 작은 단위의 클래스입니다.

```html
<!-- 순수 CSS에서 .w-40은 width: 10rem; 을 의미합니다. -->
<div class="w-40 ..."></div>
```

### Tailwind CSS 설치 및 설정 (Vite 기준)

#### 1. 필요 패키지 설치

프로젝트에 `tailwindcss`와 Vite 플러그인을 설치합니다.

```bash
npm install -D tailwindcss @tailwindcss/vite
```

#### 2. `vite.config.js` 설정

Vite 설정 파일에 Tailwind CSS 플러그인을 추가합니다.

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // 1. tailwindcss 플러그인 불러오기

export default defineConfig({
  plugins: [react(), tailwindcss()], // 2. 플러그인 목록에 추가
});
```

#### 3. `src/index.css` 설정

전역 CSS 파일(`src/index.css`)의 기존 내용을 모두 삭제하고, Tailwind CSS의 기본 지시문을 추가하여 유틸리티 클래스를 불러옵니다.

```css
/* src/index.css */
@import "tailwindcss";
```

#### 4. 컴포넌트에 적용하기

이제 JSX의 `className` 속성에 원하는 유틸리티 클래스를 조합하여 스타일을 적용할 수 있습니다.

**`src/App.jsx`**

```jsx
import React from "react";

export default function App() {
  return (
    <div className="text-center mt-16">
      {/*
        text-3xl: font-size: 1.875rem
        font-bold: font-weight: 700
        text-red-500: color: rgb(239 68 68)
      */}
      <h1 className="text-3xl font-bold text-red-500">Hello, Tailwind CSS!</h1>
    </div>
  );
}
```

### 장점

- **빠른 개발 속도**: CSS 파일을 열지 않고 HTML(JSX) 내에서 바로 스타일링이 가능합니다.
- **일관된 디자인 시스템**: 미리 정의된 값을 사용하므로 디자인 일관성을 유지하기 쉽습니다.
- **최적화**: 빌드 시 사용되지 않는 유틸리티 클래스는 자동으로 제거되어 최종 CSS 파일 크기가 매우 작습니다.

---

## 3. CSS Modules vs. Tailwind CSS

| 특징              | CSS Modules                                     | Tailwind CSS                                                      |
| :---------------- | :---------------------------------------------- | :---------------------------------------------------------------- |
| **스타일링 방식** | 별도 CSS 파일에 작성                            | JSX `className`에 유틸리티 조합                                   |
| **스코프**        | 컴포넌트 단위 로컬 스코프                       | 전역 유틸리티 클래스                                              |
| **장점**          | 클래스명 충돌 방지, CSS 문법 유지               | 빠른 개발, 디자인 일관성, 작은 빌드 크기                          |
| **단점**          | JS와 CSS 파일 간의 잦은 전환                    | `className`이 길고 복잡해질 수 있음                               |
| **추천 상황**     | 컴포넌트별로 복잡하고 고유한 스타일이 필요할 때 | 프로토타이핑 및 일관된 디자인 시스템 기반의 빠른 개발이 중요할 때 |
