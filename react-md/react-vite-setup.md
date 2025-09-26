# React 프로젝트 생성 (Vite)

## 📝 개요

이 문서는 최신 프론트엔드 빌드 도구인 **Vite**를 사용하여 React 프로젝트를 생성하고 설정하는 방법을 상세히 안내합니다. 문서를 통해 다음 내용을 학습할 수 있습니다.

- Vite의 핵심 개념과 장점
- Vite 기반 React 프로젝트 생성 및 실행 방법
- 생성된 프로젝트의 기본 폴더 및 파일 구조

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [React 기본 개념](./react-introduction.md)
- 터미널(CLI) 기본 사용법

---

## 1. Vite란?

**Vite**(프랑스어로 "빠르다"를 의미)는 기존의 React 개발 환경(예: Create React App)이 가진 느린 개발 서버 구동 및 빌드 속도 문제를 해결하기 위해 등장한 차세대 프론트엔드 개발 도구입니다. React뿐만 아니라 Vue, Svelte 등 다양한 프레임워크를 지원합니다.

### Vite의 핵심 특징

#### 1. 네이티브 ES 모듈(ESM) 기반 개발 서버

- 기존의 번들링(Bundling) 기반 도구와 달리, Vite는 개발 서버에서 **네이티브 ES 모듈**을 사용합니다. 브라우저가 필요한 모듈을 직접 요청하고 처리하게 하므로, 전체 애플리케이션을 번들링할 필요가 없어 매우 빠른 개발 서버 시작 속도를 자랑합니다.
- **HMR(Hot Module Replacement)**: 파일 수정 시, 전체 페이지를 새로고침하지 않고 변경된 모듈만 즉시 교체하여 개발 생산성을 극대화합니다.

#### 2. Rollup 기반 프로덕션 빌드

- 프로덕션(배포) 환경을 위한 파일을 생성할 때는 내부적으로 **Rollup**이라는 번들러를 사용합니다.
- Rollup은 코드를 효율적으로 묶고, 불필요한 코드를 제거하는 트리 쉐이킹(Tree-shaking) 등 다양한 최적화 작업을 수행하여 작고 빠른 정적 파일(HTML, CSS, JavaScript)을 생성합니다.

---

## 2. Vite로 React 프로젝트 시작하기

### 1단계: 프로젝트 생성

터미널을 열고 다음 명령어를 실행하여 `my-react-app`이라는 이름의 새 React 프로젝트를 생성합니다.

```bash
# npm create vite@latest {프로젝트 이름} -- --template react
npm create vite@latest my-react-app -- --template react
```

설치 과정에서 `Need to install the following packages: create-vite@... Ok to proceed? (y)` 메시지가 나타나면 `y`를 입력하고 Enter를 누릅니다.

### 2단계: 패키지 설치

생성된 프로젝트 디렉토리로 이동한 후, `npm install` 명령어를 실행하여 `package.json`에 명시된 의존성 패키지들을 설치합니다.

```bash
# 프로젝트 경로로 이동
cd my-react-app

# 패키지 설치
npm install
```

### 3단계: 개발 서버 실행

다음 명령어를 실행하여 개발 서버를 시작합니다.

```bash
npm run dev
```

서버가 성공적으로 실행되면 터미널에 다음과 같은 메시지가 출력됩니다. 브라우저에서 `http://localhost:5173/` 주소로 접속하여 React 앱을 확인할 수 있습니다.

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 4단계: 프로덕션 파일 빌드

개발이 완료된 후, 실제 서버에 배포하기 위한 정적 파일들을 생성하려면 다음 명령어를 실행합니다. 빌드된 파일들은 `dist` 폴더 안에 생성됩니다.

```bash
npm run build
```

---

## 3. React 프로젝트 기본 구조

Vite로 생성된 React 프로젝트의 기본 구조와 각 파일/폴더의 역할은 다음과 같습니다.

```
📁 my-react-app/
  ├── 📁 public/             # 빌드 시 그대로 복사되는 정적 파일 폴더
  │   └── vite.svg
  ├── 📁 src/                # 애플리케이션의 핵심 소스 코드 폴더
  │   ├── 📁 assets/         # 컴포넌트에서 사용하는 이미지, 폰트 등
  │   ├── App.css           # App 컴포넌트 전용 CSS
  │   ├── App.jsx           # 최상위 메인 컴포넌트
  │   ├── index.css         # 전역 CSS
  │   └── main.jsx          # React 앱의 진입점(Entry Point)
  ├── .eslintrc.cjs         # ESLint 설정 파일
  ├── .gitignore            # Git이 추적하지 않을 파일/폴더 목록
  ├── index.html            # 앱의 유일한 HTML 페이지 (SPA의 기반)
  ├── package.json          # 프로젝트 정보 및 의존성 관리
  ├── package-lock.json     # 의존성의 정확한 버전 관리
  ├── README.md             # 프로젝트 설명서
  └── vite.config.js        # Vite 설정 파일
```

### 주요 파일 및 폴더 설명

- **`public/`**: 빌드 과정에서 특별한 처리 없이 그대로 `dist` 폴더로 복사되는 파일들을 저장합니다. (예: `favicon.ico`, `robots.txt`)
- **`src/`**: 대부분의 개발 작업이 이루어지는 핵심 폴더입니다.
  - **`main.jsx`**: React 애플리케이션의 진입점(Entry Point)입니다. `ReactDOM.createRoot()`를 사용해 React의 루트를 설정하고, 최상위 컴포넌트인 `<App />`을 렌더링합니다.
  - **`App.jsx`**: 애플리케이션의 최상위 컴포넌트입니다. 다른 모든 컴포넌트들을 감싸는 역할을 합니다.
  - **`assets/`**: 컴포넌트 내에서 `import`하여 사용하는 정적 파일(이미지, 폰트 등)을 저장합니다. 빌드 시 Vite에 의해 처리되고 최적화됩니다.
- **`index.html`**: SPA의 기반이 되는 유일한 HTML 파일입니다. `src/main.jsx`가 이 파일의 `<div id="root"></div>` 요소에 React 앱을 마운트합니다.
- **`vite.config.js`**: Vite의 동작을 설정하는 파일입니다. 플러그인 추가, 개발 서버 포트 변경, 프록시 설정 등 다양한 커스터마이징이 가능합니다.
- **`package.json`**: 프로젝트 이름, 버전, 의존하는 패키지 목록(`dependencies`, `devDependencies`), 실행 가능한 스크립트(`scripts`) 등을 정의합니다.
- **`.eslintrc.cjs`**: 코드의 문법 오류를 잡고 일관된 스타일을 유지하도록 도와주는 ESLint의 설정 파일입니다.
