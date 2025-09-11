# HTML 태그 분류

## 개요

이 문서는 HTML 태그를 다양한 기준으로 분류하고 각각의 특징을 설명한다. 문서를 통해 다음을 학습할 수 있다.

- HTML 태그를 기능, display 속성, 의미론적 특성에 따라 분류하는 방법
- 각 태그 분류의 특징과 사용 목적
- 실제 웹 개발에서 적절한 태그를 선택하는 기준

### 사전 학습

- HTML 기본 개념의 이해

---

## 기능에 따른 분류

HTML 태그는 웹 페이지에서 수행하는 역할에 따라 5가지로 분류할 수 있다.

### 1. 구조 정의 태그

문서의 전체 구조와 메타데이터를 정의하는 태그

- `<html>` : HTML 문서의 루트 요소
- `<head>` : 문서의 메타데이터 영역
- `<body>` : 문서의 본문 내용 영역

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>웹 페이지 제목</title>
  </head>
  <body>
    <!-- 본문 내용 -->
  </body>
</html>
```

### 2. 콘텐츠 표시 태그

텍스트 콘텐츠를 화면에 표시하는 태그

- `<h1>` ~ `<h6>` : 제목 태그
- `<p>` : 단락 태그
- `<span>` : 단순 인라인 레벨 컨테이너

```html
<h1>메인 제목</h1>
<h2>부제목</h2>
<p>이것은 단락입니다. <span>강조된 텍스트</span>가 포함되어 있습니다.</p>
```

### 3. 레이아웃 태그

문서의 레이아웃과 구조를 정의하는 태그

- `<div>` : 단순 블록 레벨 컨테이너
- `<header>` : 머리말 영역
- `<main>` : 주요 콘텐츠 영역
- `<section>` : 문서내 그룹화된 콘텐츠
- `<article>` : 독립적인 콘텐츠 영역
- `<footer>` : 바닥글 영역

```html
<div>
  <header>
    <h1>사이트 제목</h1>
  </header>
  <main>
  <section>
    <article>
      <h2>기사 제목</h2>
      <p>기사 내용...</p>
    </article>
  </section>
  </main>
  <footer>
    <p>저작권 정보</p>
  </footer>
</div>
```

### 4. 멀티미디어 콘텐츠 태그

이미지, 오디오, 비디오 등 멀티미디어 콘텐츠를 삽입하는 태그

- `<img>` : 이미지 삽입
- `<audio>` : 오디오 파일 삽입
- `<video>` : 비디오 파일 삽입

```html
<img src="image.jpg" alt="대체 텍스트" />
<audio src="music.mp3" controls></audio>
<video src="video.mp4" controls></video>
```

### 5. 상호작용 태그

사용자와 웹 페이지 간의 상호작용을 가능하게 하는 태그

- `<form>` : 폼 컨테이너
- `<input>` : 입력 필드
- `<select>` : 드롭다운 목록
- `<button>` : 버튼

```html
<form>
  <input type="text" placeholder="이름을 입력하세요" />
  <select>
    <option value="option1">옵션 1</option>
    <option value="option2">옵션 2</option>
  </select>
  <button type="submit">제출</button>
</form>
```

---

## display 속성에 따른 분류

### block 태그

- 문서의 구조를 구성하는 태그
- 부모 요소의 전체 너비를 차지한다
- 너비와 높이를 지정할 수 있다
- 예: `<div>`, `<p>`, `<h1>` ~ `<h6>`, `<ul>`, `<ol>`, `<li>`

```html
<div style="background-color: lightblue;">첫 번째 div</div>
<div style="background-color: lightgreen;">두 번째 div</div>
<p>단락 태그도 block 태그입니다.</p>
```

### inline 태그

- 문서의 콘텐츠를 감싸는 태그
- 콘텐츠 크기만큼의 너비를 차지한다
- 너비와 높이를 지정할 수 없다
- 텍스트나 다른 inline 요소를 감싸는 데 사용된다. 예를 들어 `<span>` 태그는 텍스트를 감싸는 용도
- 예: `<span>`, `<a>`, `<strong>`

```html
<p>
  이 문장에는 <span style="color: red;">빨간 텍스트</span>와
  <a href="#">링크</a>가 포함되어 있습니다.
</p>
```

---

## 의미론적 태그와 비의미론적 태그

### 의미론적 태그(Semantic Tags)

태그 이름을 통해 콘텐츠의 의미와 역할을 명확하게 전달하는 태그

**장점:**
- 문서의 구조와 내용을 명확히 정의
- 웹 접근성 향상
- 검색 엔진 최적화(SEO)

**주요 의미론적 태그:**
- `<p>`, `<h1>`~`<h6>`
- `<header>` : 문서나 섹션의 머리말
- `<nav>` : 내비게이션 링크 그룹
- `<main>` : 문서의 주요 콘텐츠
- `<article>` : 독립적이고 완전한 콘텐츠 블록
- `<section>` : 문서의 논리적 구역
- `<aside>` : 본문과 간접적으로 관련된 콘텐츠
- `<footer>` : 문서나 섹션의 바닥글

```html
<article>
  <header>
    <h1>블로그 포스트 제목</h1>
    <p>작성일: 2024년 1월 1일</p>
  </header>
  <section>
    <p>블로그 포스트 내용...</p>
  </section>
  <footer>
    <p>작성자: 홍길동</p>
  </footer>
</article>
```

### 비의미론적 태그(Non-semantic Tags)

태그 이름이 콘텐츠의 의미를 전달하지 않는 태그. 웹 페이지를 구조화하는 데 사용된다.

**주요 비의미론적 태그:**
- `<div>`, `<span>`

```html
<div>
이 영역은 <span>강조된 텍스트</span>를 포함합니다.
</div>
```
