# CSS 기본

## 개요

이 문서는 웹 페이지의 디자인과 레이아웃을 담당하는 CSS의 기본 개념과 사용법을 설명합니다. 이 문서를 통해 다음 내용을 학습할 수 있습니다.

- CSS 기본 개념
- CSS 기본 구조와 작성 방법
- HTML에 CSS를 적용하는 다양한 방법
- 브라우저 개발자 도구를 활용하여 CSS를 확인하고 수정하는 방법

### 사전 학습

- HTML 기본 개념

## CSS(Cascading Style Sheets)란?

웹 페이지의 스타일을 정의하는 스타일 시트 언어입니다. 워드, 파워포인트, 한글의 '서식'과 비슷한 개념으로 생각할 수 있습니다.

### HTML과 CSS의 역할 구분

- **HTML**: 웹 페이지의 **구조**와 **내용**을 정의합니다. (예: 제목, 문단, 이미지, 링크)
- **CSS**: 웹 페이지의 **디자인**과 **스타일**을 정의합니다. (예: 글자 색상, 배경, 레이아웃)

**예시:**

```html
<!-- HTML만 사용한 경우 -->
<!-- 웹 페이지의 구조와 내용을 정의 -->
<h1>웹사이트 제목</h1>
<p>이것은 기본 텍스트입니다.</p>

<!-- CSS를 적용한 경우 -->
<!-- 웹 페이지의 디자인과 스타일을 정의 -->
<h1 style="color: blue; font-size: 32px;">웹사이트 제목</h1>
<p style="color: gray; font-size: 16px;">
  이것은 스타일이 적용된 텍스트입니다.
</p>
```

## CSS 기본 구조

CSS는 **선택자(Selector)**, **속성(Property)**, **값(Value)**으로 구성됩니다.

```css
선택자 {
  속성: 값;
}
```

### 1. 선택자(Selector)

스타일을 적용할 HTML 요소를 선택합니다.

```css
/* h1 태그를 선택 */
h1 {
  /* 여기에 스타일을 적용합니다. */
}

/* class가 "title"인 모든 요소를 선택 */
.title {
  /* 여기에 스타일을 적용합니다. */
}

/* id가 "header"인 요소를 선택 */
#header {
  /* 여기에 스타일을 적용합니다. */
}
```

### 2. 속성(Property)과 값(Value)

- **속성**: 적용할 스타일의 종류를 나타냅니다. (예: `color`, `font-size`, `background-color`)
- **값**: 속성에 적용할 구체적인 값을 나타냅니다.

```css
p {
  color: red; /* 글자 색을 빨간색으로 설정 */
  font-size: 16px; /* 글자 크기를 16픽셀로 설정 */
  background-color: yellow; /* 배경색을 노란색으로 설정 */
}
```

### CSS 작성 규칙

- 속성과 값은 콜론(`:`)으로 구분합니다.
- 각 스타일 선언은 세미콜론(`;`)으로 끝냅니다.
- 모든 선언은 중괄호(`{}`)로 감쌉니다.

## HTML에 CSS를 적용하는 3가지 방법

### 1. 인라인 스타일(Inline Style)

HTML 요소의 `style` 속성에 직접 CSS 코드를 작성하는 방법입니다. **해당 요소에만** 스타일이 적용됩니다.

```html
<p style="color: blue; font-size: 20px;">
  이 텍스트는 파란색이며, 크기는 20px입니다.
</p>
```

### 2. 내부 스타일 시트(Internal Style Sheet)

HTML 문서의 `<head>` 태그 내부에 `<style>` 태그를 사용하여 CSS 코드를 작성합니다. 해당 **HTML 문서 전체**에 스타일이 적용됩니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>내부 스타일 시트 예제</title>
    <style>
      h1 {
        color: blue;
        text-align: center;
      }
      p {
        color: gray;
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <h1>웹사이트 제목</h1>
    <p>이것은 스타일이 적용된 문단입니다.</p>
  </body>
</html>
```

### 3. 외부 스타일 시트(External Style Sheet)

별도의 `.css` 파일을 만들어 HTML 문서에 연결하는 방법입니다. 가장 권장되는 방법으로, 여러 HTML 페이지에서 동일한 스타일을 재사용하고 유지보수하기 용이합니다.

**디렉토리 구조 예시:**

```
📁 css-example/
├── 🌐 index.html
└── 🎨 styles.css
```

**CSS 파일 작성 (`styles.css`):**

```css
/* styles.css 파일 */
h1 {
  color: blue;
  text-align: center;
}

p {
  color: gray;
  font-size: 16px;
  line-height: 1.5; /* 줄 간격 */
}

.highlight {
  background-color: yellow;
  padding: 5px;
}
```

**HTML 문서에서 외부 CSS 파일 불러오기 (`index.html`):**

`<link>` 태그를 사용하여 외부 CSS 파일을 연결합니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>외부 스타일 시트 예제</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>웹사이트 제목</h1>
    <p>이것은 외부 CSS가 적용된 문단입니다.</p>
    <p class="highlight">이것은 강조된 문단입니다.</p>
  </body>
</html>
```

## 브라우저 개발자 도구 활용하기

웹 브라우저의 개발자 도구는 CSS를 확인하고 실시간으로 수정하며 디버깅할 수 있는 강력한 기능입니다.

### 개발자 도구 열기

- **Windows/Linux**: `F12` 또는 `Ctrl` + `Shift` + `I`
- **Mac**: `Cmd` + `Option` + `I`
- **마우스**: 웹 페이지에서 마우스 오른쪽 클릭 → "검사" 또는 "요소 검사"

### 주요 기능

- **Elements (요소) 패널**:

  - 현재 페이지의 HTML 구조를 트리 형태로 보여줍니다.
  - 특정 HTML 요소를 선택하면 해당 요소에 적용된 CSS를 `Styles` 패널에서 확인할 수 있습니다.

- **Styles (스타일) 패널**:

  - 선택된 요소에 적용된 모든 CSS 규칙을 보여줍니다.
  - CSS 값을 실시간으로 수정하여 화면에 어떻게 반영되는지 즉시 확인할 수 있습니다.
  - 속성 앞의 체크박스를 해제하여 특정 스타일을 임시로 비활성화할 수 있습니다.

- **Computed (계산된 스타일) 패널**:
  - 상속, 우선순위 등 모든 CSS 규칙이 계산된 후, 요소에 최종적으로 적용된 스타일 값을 보여줍니다.
  - 특정 속성이 어떤 규칙에 의해 설정되었는지 추적하는 데 유용합니다.
