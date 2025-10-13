# TMDB API 활용 가이드: React에서 영화 정보 가져오기

## 1. 개요

이 문서는 [TMDB (The Movie Database)](https://www.themoviedb.org/) API를 사용하여 React 애플리케이션에서 영화 정보를 가져오는 방법을 상세히 설명합니다. 이 가이드를 통해 다음 내용을 학습할 수 있습니다.

- API 키의 개념과 중요성
- TMDB API 키 발급 방법
- Vite 환경에서 안전하게 API 키를 관리하는 방법
- `axios`를 사용하여 API에 데이터를 요청하고 상태를 관리하는 방법
- 인기 영화 목록 조회 및 영화 검색 기능 구현 예제

### 사전 학습

이 문서를 이해하기 위해서는 다음 기술에 대한 기본적인 지식이 필요합니다.

- React 기본 문법 (컴포넌트, `useState`, `useEffect`)
- API의 개념 및 비동기 통신 (Promise, async/await)

---

## 2. TMDB API란?

TMDB는 영화, TV 프로그램, 배우, 사용자 리뷰 등 방대한 엔터테인먼트 데이터를 제공하는 글로벌 서비스입니다. 개발자들은 TMDB가 제공하는 API를 통해 이러한 데이터를 자신의 애플리케이션에서 활용할 수 있습니다.

API를 통해 정보를 요청하기 위해서는 **API 키(Key)**가 반드시 필요합니다. API 키는 서비스 제공자가 사용자를 식별하고, 요청량을 제어하며, 서비스 사용을 추적하는 데 사용되는 고유한 인증 코드입니다.

---

## 3. 프로젝트 설정

본격적인 개발에 앞서, 다음과 같은 디렉토리 구조로 프로젝트를 구성하는 것을 권장합니다.

```
📁 프로젝트명/
  ├── 📁 src/
  │   ├── 📁 assets/
  │   ├── 📁 components/
  │   │   └── 📁 TMDB/
  │   │       ├── ⚛️ MovieList.jsx
  │   │       └── ⚛️ MovieSearch.jsx
  │   ├── ⚛️ App.jsx
  │   ├── 🎨 App.css
  │   ├── ⚛️ main.jsx
  │   └── 🎨 index.css
  ├── 📝 .gitignore
  └── 📝 .env
```

---

## 4. API 키 발급 및 설정

### 4.1. TMDB API 키 발급받기

API 요청에 필요한 키를 발급받는 과정은 다음과 같습니다.

1.  **[TMDB 공식 홈페이지](https://www.themoviedb.org/)**에 접속하여 회원가입 및 로그인을 진행합니다.
2.  로그인 후, **[API 키 발급 페이지](https://www.themoviedb.org/settings/api)**로 이동합니다.
3.  `API Key` 섹션의 **click here** 링크를 클릭합니다.
4.  계정 유형으로 **Developer**를 선택합니다.
5.  이용 약관을 읽고 스크롤을 내려 동의(Accept)합니다.
6.  애플리케이션 정보를 양식에 맞게 작성합니다.
    - **Application Name**: `Test` (예시)
    - **Application URL**: `Test.com` (예시)
    - **Application Summary**: API 사용 목적을 구체적으로 작성합니다. (예: `API 호출 학습을 위해 API Key를 발급받습니다.`)
    - 기타 개인 정보(영문 이름 등)를 입력합니다.
7.  양식 제출 후, API 설정 페이지에서 **API Read Access Token (v4 auth)** 값을 확인하고 복사합니다. 이 값이 우리가 사용할 API 키입니다.

### 4.2. API 키 환경 변수 처리

API 키와 같은 민감한 정보는 소스 코드에 직접 하드코딩하지 않고, 환경 변수로 분리하여 관리하는 것이 안전합니다.

프로젝트의 루트 디렉토리에 `.env` 파일을 생성하고 다음과 같이 내용을 작성합니다. Vite 기반의 프로젝트에서는 환경 변수 이름 앞에 `VITE_` 접두사를 붙여야 합니다.

**`.env`**

```
VITE_TMDB_API_KEY=여기에_발급받은_API_키를_붙여넣으세요
```

### 4.3. `.gitignore` 설정

환경 변수 파일(`.env`)은 민감한 정보를 담고 있으므로 Git 버전 관리에서 제외해야 합니다. `.gitignore` 파일에 다음 한 줄을 추가합니다.

**`.gitignore`**

```
# ... 다른 내용
.env
```

### 4.4. Vite에서 환경 변수 사용하기

Vite 프로젝트에서는 `import.meta.env` 객체를 통해 `.env` 파일에 정의한 환경 변수에 접근할 수 있습니다.

```javascript
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
```

---

## 5. TMDB API 요청 보내기

### 5.1. 기본 요청 구조 (React 컴포넌트 기준)

`axios` 라이브러리를 사용하여 API를 요청하는 기본적인 컴포넌트 구조는 다음과 같습니다.

```jsx
import axios from "axios";
import { useEffect, useState } from "react";

// API 기본 URL
const BASE_URL = `https://api.themoviedb.org/3`;
// 환경 변수에서 API 키 가져오기
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Component() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // API 요청 설정 객체
      const config = {
        method: "GET",
        url: `${BASE_URL}/...`, // 상세 API 엔드포인트
        // 요청 헤더: 인증 정보 포함
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        // 요청 쿼리 파라미터
        params: {
          language: "ko-KR",
        },
      };

      try {
        const res = await axios(config); // API 요청 실행
        const data = res.data; // 응답 객체에서 실제 데이터 추출
        setMovies(data.results); // 상태 업데이트
      } catch (error) {
        console.error("API fetching error:", error);
      }
    }

    fetchData();
  }, []);

  return <div>{/* 영화 목록 렌더링 */}</div>;
}
```

- **`BASE_URL`**: 모든 TMDB API 요청에 공통으로 사용되는 기본 주소입니다.
- **`API_KEY`**: `.env` 파일에서 가져온 인증 키입니다.
- **`config`**: `axios` 요청에 필요한 모든 설정(메서드, URL, 헤더, 파라미터 등)을 담는 객체입니다.
  - **`headers.Authorization`**: `Bearer ${API_KEY}` 형태로 인증 토큰을 전달하는 것이 TMDB API v3의 표준 방식입니다.
- **`res`**: API 서버로부터 받은 전체 응답 객체입니다.
- **`res.data`**: 실제 필요한 데이터는 `data` 속성 안에 들어있습니다.

### 5.2. 데이터 패칭 예제

#### 예제 1: 인기 영화 목록 (`MovieList.jsx`)

[**인기 영화 목록 API 공식 문서**](https://developer.themoviedb.org/reference/movie-popular-list)

가장 인기 있는 영화 목록을 가져와 화면에 표시하는 컴포넌트입니다.

**`src/components/TMDB/MovieList.jsx`**

```jsx
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const config = {
        method: "GET",
        url: `${BASE_URL}/movie/popular`, // 인기 영화 목록 엔드포인트
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          language: "ko-KR",
          page: 1,
        },
      };

      try {
        const res = await axios(config);
        setMovies(res.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    }

    fetchData();
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  return (
    <div>
      <h1>인기 영화 목록</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### 예제 2: 영화 검색 (`MovieSearch.jsx`)

[**영화 검색 API 공식 문서**](https://developer.themoviedb.org/reference/search-movie)

사용자가 입력한 검색어(query)를 바탕으로 영화를 검색하고 결과를 표시하는 컴포넌트입니다.

**`src/components/TMDB/MovieSearch.jsx`**

```jsx
import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = `https://api.themoviedb.org/3`;

export default function MovieSearch() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  // 폼 제출 시 실행될 함수
  async function fetchData(event) {
    event.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지

    if (!query) {
      alert("검색어를 입력해주세요.");
      return;
    }

    const config = {
      method: "GET",
      url: `${BASE_URL}/search/movie`, // 영화 검색 엔드포인트
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        language: "ko-KR",
        query: query, // 사용자가 입력한 검색어
      },
    };

    try {
      const res = await axios(config);
      setMovies(res.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  }

  // input 값이 변경될 때마다 실행될 함수
  function handleChange(event) {
    setQuery(event.target.value);
  }

  return (
    <div>
      <h1>영화 검색</h1>
      <form onSubmit={fetchData}>
        <input
          type="text"
          placeholder="영화 제목 검색"
          value={query}
          onChange={handleChange}
        />
        <button type="submit">검색</button>{" "}
      </form>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
```
