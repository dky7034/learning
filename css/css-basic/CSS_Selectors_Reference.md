# CSS 선택자 (Selector) 마스터 가이드

## 1. 개요

이 문서는 웹 페이지의 특정 요소에 스타일을 적용하기 위해 사용하는 **CSS 선택자(Selector)**의 종류와 사용법을 상세하게 설명합니다. CSS 선택자는 HTML 문서의 구조를 이해하고, 원하는 요소를 정확하게 선택하여 디자인을 적용하는 핵심적인 개념입니다.

### 학습 목표

- CSS 선택자의 기본 개념과 중요성을 이해합니다.
- 다양한 유형의 선택자를 학습하고 상황에 맞게 활용할 수 있습니다.
- 선택자 우선순위(Specificity)의 개념을 이해하고 스타일 충돌을 해결할 수 있습니다.

### 사전 학습

- [HTML 기본 개념](https://developer.mozilla.org/ko/docs/Web/HTML)
- [CSS 기본 개념](https://developer.mozilla.org/ko/docs/Web/CSS)

---

## 2. 기본 선택자 (Basic Selectors)

가장 기본적이면서 자주 사용되는 선택자 유형입니다.

### 1) 전체 선택자 (Universal Selector)

- **설명**: 문서 내의 **모든 요소**를 선택합니다.
- **사용법**: `*` 기호를 사용합니다.
- **주요 용도**: 브라우저의 기본 스타일을 초기화하거나, 모든 요소에 공통적으로 적용할 스타일을 정의할 때 사용됩니다. (예: `box-sizing`, `margin`, `padding` 초기화)

```css
/* 모든 요소의 margin과 padding을 0으로 만들고,
   box-sizing을 border-box로 설정하여
   레이아웃 계산을 쉽게 만듭니다. */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### 2) 태그 선택자 (Type Selector)

- **설명**: 지정된 **HTML 태그명**을 가진 모든 요소를 선택합니다.
- **사용법**: `태그명`을 그대로 사용합니다.

```css
/* 모든 h2 요소의 글자 색을 네이비로 설정 */
h2 {
  color: navy;
}

/* 모든 p 요소의 줄 간격을 1.6으로 설정 */
p {
  line-height: 1.6;
}
```

### 3) 클래스 선택자 (Class Selector)

- **설명**: 특정 `class` 속성 값을 가진 모든 요소를 선택합니다.
- **특징**:
    - 여러 요소에 동일한 클래스를 적용하여 그룹화할 수 있습니다.
    - 하나의 요소에 여러 클래스를 공백으로 구분하여 적용할 수 있습니다.
    - 재사용성이 매우 높아 CSS 설계의 핵심적인 역할을 합니다.
- **사용법**: `.클래스명` 형태로 작성합니다.

**HTML 예시**
```html
<p class="text-primary">중요한 텍스트입니다.</p>
<div class="card warning">
  <p>주의: 이 작업은 되돌릴 수 없습니다.</p>
</div>
<button class="btn btn-primary">확인</button>
```

**CSS 예시**
```css
/* 'text-primary' 클래스를 가진 모든 요소의 글자색을 파란색으로 설정 */
.text-primary {
  color: blue;
}

/* 'card'와 'warning' 클래스를 모두 가진 요소에 스타일 적용 */
.card.warning {
  border: 1px solid red;
  background-color: #ffeeee;
}

/* 'btn' 클래스와 'btn-primary' 클래스를 가진 버튼 스타일링 */
.btn {
  padding: 10px 15px;
  border-radius: 5px;
}
.btn-primary {
  background-color: blue;
  color: white;
}
```

### 4) 아이디 선택자 (ID Selector)

- **설명**: 특정 `id` 속성 값을 가진 **유일한** 요소를 선택합니다.
- **특징**:
    - `id`는 문서 내에서 고유해야 합니다.
    - 주로 페이지의 특정 영역(헤더, 푸터 등)이나 중요한 단일 요소를 선택할 때 사용됩니다.
- **사용법**: `#아이디명` 형태로 작성합니다.

**HTML 예시**
```html
<header id="main-header">
  <h1>My Website</h1>
</header>
```

**CSS 예시**
```css
/* 'main-header' 아이디를 가진 요소에 배경색과 패딩 적용 */
#main-header {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
}
```

### 5) 속성 선택자 (Attribute Selector)

- **설명**: 특정 속성이나 속성 값을 가진 요소를 선택합니다.
- **주요 용도**: `form` 요소나 특정 속성을 기준으로 스타일을 적용할 때 유용합니다.
- **사용법**: `[속성명]`, `[속성명="값"]` 등 다양한 형태로 사용됩니다.

**HTML 예시**
```html
<a href="https://example.com">일반 링크</a>
<a href="https://example.com" target="_blank">새 창 링크</a>
<input type="text" placeholder="이름">
<input type="email" disabled>
```

**CSS 예시**
```css
/* 'target' 속성을 가진 모든 a 요소를 선택 */
a[target] {
  color: green;
}

/* 'target="_blank"' 속성을 가진 a 요소에 아이콘 추가 */
a[target="_blank"]::after {
  content: ' ↗';
}

/* 'placeholder' 속성을 가진 모든 input 요소를 선택 */
input[placeholder] {
  border: 1px solid #ccc;
}

/* 'disabled' 속성을 가진 모든 input 요소를 선택 */
input[disabled] {
  background-color: #eee;
  cursor: not-allowed;
}
```

---

## 3. 조합 선택자 (Combinators)

두 개 이상의 선택자를 결합하여 요소 간의 관계를 기반으로 선택합니다.

### 1) 자손 선택자 (Descendant Selector)

- **설명**: 특정 요소의 **모든 하위** 요소(자식, 손자 등)를 선택합니다.
- **사용법**: `부모선택자 자손선택자` (공백으로 구분)

**HTML 예시**
```html
<div class="content">
  <p>이것은 div의 자식 p입니다.</p>
  <span>
    <p>이것은 div의 손자 p입니다.</p>
  </span>
</div>
```

**CSS 예시**
```css
/* 'content' 클래스 내의 모든 p 요소 선택 */
.content p {
  color: #555;
}
```

### 2) 자식 선택자 (Child Selector)

- **설명**: 특정 요소의 **직계 자식** 요소만 선택합니다.
- **사용법**: `부모선택자 > 자식선택자` (`>` 기호 사용)

**HTML 예시**
```html
<ul class="main-menu">
  <li>메뉴 1</li>
  <li>메뉴 2
    <ul class="sub-menu">
      <li>서브 메뉴 2-1</li>
    </ul>
  </li>
</ul>
```

**CSS 예시**
```css
/* 'main-menu'의 직계 자식인 li 요소만 선택 (서브 메뉴의 li는 선택되지 않음) */
.main-menu > li {
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}
```

### 3) 인접 형제 선택자 (Adjacent Sibling Selector)

- **설명**: 특정 요소의 **바로 다음에 오는 형제** 요소 하나를 선택합니다.
- **사용법**: `선택자1 + 선택자2` (`+` 기호 사용)

**HTML 예시**
```html
<h2>제목</h2>
<p>첫 번째 문단입니다.</p>
<p>두 번째 문단입니다.</p>
```

**CSS 예시**
```css
/* h2 요소 바로 뒤에 오는 p 요소만 선택 */
h2 + p {
  color: #007bff;
  font-style: italic;
}
```

### 4) 일반 형제 선택자 (General Sibling Selector)

- **설명**: 특정 요소 **다음에 오는 모든 형제** 요소를 선택합니다.
- **사용법**: `선택자1 ~ 선택자2` (`~` 기호 사용)

**HTML 예시**
```html
<h2>알림</h2>
<p>첫 번째 알림 메시지.</p>
<div class="divider"></div>
<p>두 번째 알림 메시지.</p>
<p>세 번째 알림 메시지.</p>
```

**CSS 예시**
```css
/* h2 요소 뒤에 오는 모든 p 형제 요소들을 선택 */
h2 ~ p {
  background-color: #f0f0f0;
  padding: 10px;
}
```

---

## 4. 그룹 선택자 (Group Selector)

- **설명**: 여러 선택자에 **동일한 스타일**을 적용할 때 사용합니다.
- **특징**: 코드를 간결하게 만들고 유지보수성을 높입니다.
- **사용법**: `선택자1, 선택자2, ...` (쉼표로 구분)

```css
/* h1, h2, h3 태그에 공통 스타일 적용 */
h1, h2, h3 {
  font-family: 'Georgia', serif;
  color: #333;
  border-bottom: 2px solid #eee;
}

.btn, .link, .tag {
  cursor: pointer;
}
```

---

## 5. 가상 클래스 선택자 (Pseudo-class Selectors)

- **설명**: 요소의 **특별한 상태**를 기반으로 선택합니다. (예: 마우스 오버, 클릭 등)
- **사용법**: `선택자:가상클래스` (`:` 기호 사용)

### 자주 사용되는 가상 클래스

- `:hover`: 마우스 포인터가 요소 위에 올라갔을 때
- `:focus`: 요소가 포커스(예: `input` 클릭)를 받았을 때
- `:active`: 요소가 활성화(예: 마우스 클릭)되었을 때
- `:first-child`: 형제 요소 중 첫 번째 요소
- `:last-child`: 형제 요소 중 마지막 요소
- `:nth-child(n)`: 형제 요소 중 n번째 요소 (예: `2n`, `odd`, `even`)
- `:not(선택자)`: 특정 선택자를 제외한 요소

**HTML 예시**
```html
<a href="#">링크</a>
<input type="text" placeholder="포커스해 보세요">
<ul>
  <li>항목 1</li>
  <li>항목 2</li>
  <li>항목 3</li>
</ul>
```

**CSS 예시**
```css
/* a 태그에 마우스를 올리면 밑줄이 생김 */
a:hover {
  text-decoration: underline;
}

/* input 요소가 포커스를 받으면 테두리 색 변경 */
input:focus {
  border-color: #007bff;
  outline: none;
}

/* ul의 첫 번째 li 요소의 글자를 굵게 */
ul li:first-child {
  font-weight: bold;
}

/* ul의 홀수 번째 li 요소의 배경색 변경 */
ul li:nth-child(odd) {
  background-color: #f9f9f9;
}
```

---

## 6. 가상 요소 선택자 (Pseudo-element Selectors)

- **설명**: 요소의 **특정 부분**에 스타일을 적용하기 위해 사용됩니다. (예: 첫 글자, 내용 앞/뒤)
- **사용법**: `선택자::가상요소` (`::` 기호 사용, 이전 버전과의 호환성을 위해 `:`도 허용)

### 자주 사용되는 가상 요소

- `::before`: 요소의 내용 **앞**에 가상 요소를 생성하여 스타일 적용
- `::after`: 요소의 내용 **뒤**에 가상 요소를 생성하여 스타일 적용
- `::first-letter`: 블록 레벨 요소의 첫 번째 글자
- `::first-line`: 블록 레벨 요소의 첫 번째 줄
- `::placeholder`: `input` 요소의 `placeholder` 텍스트

**CSS 예시**
```css
/* 'important' 클래스를 가진 요소 앞에 "중요: " 텍스트 추가 */
.important::before {
  content: "중요: ";
  color: red;
  font-weight: bold;
}

/* 문단의 첫 글자를 크게 강조 */
p::first-letter {
  font-size: 2em;
  color: navy;
  float: left;
  margin-right: 5px;
}

/* input의 placeholder 텍스트 스타일 변경 */
input::placeholder {
  color: #aaa;
  font-style: italic;
}
```

---

## 7. 선택자 우선순위 (Specificity)

- **설명**: 여러 스타일 규칙이 동일한 요소에 적용될 때, 어떤 규칙을 우선 적용할지 결정하는 규칙입니다.
- **우선순위 순서 (높은 순)**:
  1. `!important` 키워드
  2. 인라인 스타일 (`<p style="...">`)
  3. 아이디 선택자 (`#id`)
  4. 클래스(`.class`), 속성(`[attr]`), 가상 클래스(`:hover`) 선택자
  5. 태그(`p`), 가상 요소(`::before`) 선택자
  6. 전체 선택자 (`*`)

- **계산법**: (아이디 개수, 클래스/속성/가상클래스 개수, 태그/가상요소 개수) 형태로 점수를 매겨 비교합니다.
  - `#main-nav .list li a:hover` -> (1, 3, 2)
  - `header #logo` -> (1, 0, 1)

> **Tip**: 가급적 `!important` 사용은 피하고, 선택자 우선순위를 명확히 하여 스타일을 관리하는 것이 좋습니다. 우선순위가 낮은 선택자(예: 태그 선택자)부터 스타일을 정의하고, 필요한 경우 더 구체적인 선택자(예: 클래스 선택자)로 덮어쓰는 방식이 유지보수에 유리합니다.

---

## 8. 전체 예제

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>CSS 선택자 종합 예제</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header id="main-header">
    <h1>CSS 선택자 학습하기</h1>
  </header>

  <main class="container">
    <section class="content">
      <h2>기본 선택자</h2>
      <p>이것은 일반 문단입니다.</p>
      <p class="highlight">이것은 강조된 문단입니다.</p>
      <p>이 문단에는 <a href="#">기울임 글씨 링크</a>가 포함되어 있습니다.</p>
    </section>

    <aside class="sidebar">
      <h3>주의사항</h3>
      <div class="warning">
        <p>이것은 경고 메시지입니다.</p>
      </div>
      <a href="https://example.com" target="_blank">외부 링크</a>
    </aside>
  </main>
</body>
</html>
```

```css
/* 1. 전체 선택자: 기본 스타일 초기화 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 2. 태그 선택자: 기본 폰트 및 줄 간격 설정 */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* 3. 그룹 선택자: 제목 태그 공통 스타일 */
h1, h2, h3 {
  color: #444;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

/* 4. 아이디 선택자: 메인 헤더 스타일 */
#main-header {
  background-color: #f4f4f4;
  padding: 20px;
  text-align: center;
}

/* 5. 클래스 선택자: 강조 및 경고 스타일 */
.highlight {
  background-color: yellow;
  padding: 5px;
  font-weight: bold;
}

.warning {
  color: red;
  border: 2px solid red;
  padding: 10px;
  margin: 10px 0;
}

/* 6. 자손 선택자: content 섹션 안의 링크 */
.content a {
  font-style: italic;
  color: green;
}

/* 7. 자식 선택자: container의 직계 자식인 section과 aside */
.container > section,
.container > aside {
  padding: 20px;
}

/* 8. 가상 클래스 선택자: 링크 호버 효과 */
a:hover {
  color: #0056b3;
  text-decoration: none;
}

/* 9. 가상 요소 선택자: 외부 링크 아이콘 추가 */
a[target="_blank"]::after {
  content: ' 🔗';
  font-size: 0.8em;
}
```
