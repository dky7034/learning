# CSS 속성 (CSS Properties)

## 개요

이 문서는 CSS에서 다양한 속성을 사용하여 HTML 요소를 꾸미는 방법을 설명합니다. 문서를 통해 다음을 학습할 수 있습니다.

-   주요 CSS 속성 사용법
-   속성 적용 시 주의사항

## 사전 학습

-   HTML 기본 개념 및 요소 유형 (블록, 인라인)
-   CSS 기본 개념
-   CSS 선택자

## 주요 주의사항 (Key Considerations)

CSS 속성을 적용할 때 자주 발생하는 혼란을 방지하기 위해 아래의 핵심 사항들을 먼저 이해하는 것이 중요합니다.

### 1. 인라인(inline) 요소의 크기 제한

`<span>`, `<a>`, `<strong>`과 같은 인라인 요소에는 `width`와 `height` 속성을 직접 지정할 수 없습니다. 인라인 요소의 크기는 내부 콘텐츠(텍스트, 이미지 등)에 의해 자동으로 결정됩니다.

-   **해결책**: 요소에 너비와 높이를 지정하고 싶다면, `display` 속성을 `block` 또는 `inline-block`으로 변경해야 합니다.

### 2. `text-align`의 적용 대상

`text-align` 속성은 텍스트 자체에 적용되는 것이 아니라, 텍스트를 포함하고 있는 **블록(block) 요소**에 적용됩니다. 해당 블록 요소 내부의 인라인 콘텐츠(텍스트 포함)를 정렬합니다.

### 3. `height` 속성의 `%` 단위 사용 시 주의점

요소의 `height`를 `%` 단위로 지정할 경우, 해당 요소의 **부모(parent) 요소에 명시적인 높이 값이 지정되어 있어야** 정상적으로 동작합니다. 부모의 높이가 콘텐츠에 따라 유동적으로 변하는 `auto`(기본값) 상태라면, 자식의 `height: 50%;`와 같은 스타일은 의도대로 적용되지 않을 수 있습니다.

### 4. `visibility: hidden` vs `display: none`

두 속성 모두 요소를 화면에서 보이지 않게 만들지만, 동작 방식에 중요한 차이가 있습니다.

-   `visibility: hidden`: 요소를 **숨기기만 할 뿐, 원래 차지하던 공간은 그대로 유지**합니다. 레이아웃에 영향을 주지 않습니다.
-   `display: none`: 요소를 **완전히 제거하여, 차지하던 공간까지 사라지게** 만듭니다. 레이아웃이 재배치됩니다.

---

## 텍스트 관련 속성

### `color`

텍스트의 색상을 지정합니다.

```css
p {
  color: blue;
}

h1 {
  color: #ff5733;
}

span {
  color: rgb(255, 99, 71);
}
```

### `font-size`

텍스트의 크기를 지정합니다.

```css
p {
  font-size: 16px;
}

h1 {
  font-size: 2em;
}

span {
  font-size: 150%;
}
```

### `font-weight`

텍스트의 두께(굵기)를 지정합니다. 단어 값으로는 `normal`, `bold`, `bolder`, `lighter`가 있으며, 100부터 900까지의 숫자 값도 사용 가능합니다.

```css
p {
  font-weight: normal;
}

h1 {
  font-weight: bold;
}

span {
  font-weight: 700; /* bold와 동일 */
}
```

### `text-align`

텍스트의 정렬 방식을 지정합니다. 이 속성은 `block` 요소에만 적용됩니다. 값으로는 `left`, `center`, `right`, `justify`가 있습니다.

```css
p {
  text-align: left;
}

h1 {
  text-align: center;
}

div {
  text-align: right;
}
```

## 너비와 높이

### `width`

요소의 너비를 지정합니다. 값으로는 `auto`, `px`, `%`, `em`, `rem`, `vw`, `vh` 등이 있습니다.

```css
div {
  width: 100px; /* 요소의 너비를 100픽셀로 설정 */
}
```

### `height`

요소의 높이를 지정합니다. 값으로는 `auto`, `px`, `%`, `em`, `rem`, `vw`, `vh` 등이 있습니다.

```css
div {
  height: 200px; /* 요소의 높이를 200픽셀로 설정 */
}
```

### `min-width` 와 `max-width`

요소의 최소 너비와 최대 너비를 지정하여 유동적인 레이아웃을 만듭니다.

```css
div {
  min-width: 300px; /* 요소의 최소 너비를 300픽셀로 설정 */
  max-width: 500px; /* 요소의 최대 너비를 500픽셀로 설정 */
}
```

### `min-height` 와 `max-height`

요소의 최소 높이와 최대 높이를 지정합니다.

```css
div {
  min-height: 100px; /* 요소의 최소 높이를 100픽셀로 설정 */
  max-height: 400px; /* 요소의 최대 높이를 400픽셀로 제한 */
}
```

### 상대 크기

뷰포트(화면)나 부모 요소에 비례하여 너비와 높이를 상대적 크기로 지정할 수 있습니다.

```css
div.viewport-width {
  width: 50vw; /* 뷰포트 너비의 50% */
}

div.viewport-height {
  height: 100vh; /* 뷰포트 높이의 100%, 즉 화면 전체 높이 */
}

div.parent-relative {
  width: 80%; /* 부모 요소 너비의 80% */
  height: 60%; /* 부모 요소 높이의 60% */
}
```

## 배경 관련 속성

### `background-color`

요소의 배경 색상을 지정합니다.

```css
div {
  background-color: lightblue;
}

p {
  background-color: #ffebcd;
}

h1 {
  background-color: rgba(255, 99, 71, 0.5); /* 50% 투명도 적용 */
}
```

### `background-image`

요소의 배경에 이미지를 설정합니다. 그라데이션도 이미지의 일종으로 취급될 수 있습니다.

```css
div {
  background-image: url("background.jpg");
}

p {
  background-image: url("https://example.com/image.png");
}

h1 {
  background-image: linear-gradient(to right, red, yellow);
}
```

### `background-repeat`

배경 이미지의 반복 방식을 지정합니다. 값으로는 `repeat`(기본값), `no-repeat`, `repeat-x`(가로 반복), `repeat-y`(세로 반복)가 있습니다.

```css
div {
  background-repeat: no-repeat; /* 배경 이미지를 반복하지 않음 */
}

p {
  background-repeat: repeat-x; /* 배경 이미지를 가로로 반복 */
}

h1 {
  background-repeat: repeat-y; /* 배경 이미지를 세로로 반복 */
}
```

## 기타 속성

### `opacity`

요소의 투명도를 설정합니다. 값은 `0`(완전 투명)에서 `1`(완전 불투명)까지 설정할 수 있습니다.

```css
div {
  opacity: 0.5; /* 요소의 투명도를 50%로 설정 */
}
```

### `cursor`

요소 위에 마우스를 올렸을 때 표시될 커서 모양을 지정합니다. 값으로는 `pointer`, `default`, `text`, `move`, `not-allowed` 등이 있습니다.

```css
a {
  cursor: pointer; /* 마우스를 올렸을 때 손가락 모양으로 변경 */
}

p {
  cursor: text; /* 마우스를 올렸을 때 텍스트 선택 모양으로 변경 */
}

div {
  cursor: move; /* 마우스를 올렸을 때 이동 모양으로 변경 */
}
```

### `visibility`

요소의 가시성을 설정합니다. `hidden`으로 설정하면 요소는 보이지 않지만, 웹 페이지 내에서 차지하는 공간은 그대로 유지됩니다. 값으로는 `visible`, `hidden`, `collapse`가 있습니다.

```css
div {
  visibility: hidden; /* 요소를 숨김 (공간은 차지) */
}

p {
  visibility: visible; /* 요소를 보임 (기본값) */
}
```

## CSS 속성 정리

### 텍스트 속성

| 속성명      | 설명                               |
| :---------- | :--------------------------------- |
| color       | 글자 색상 지정                     |
| font-size   | 글자 크기 지정                     |
| font-weight | 글자 두께(굵기) 지정               |
| text-align  | 텍스트 정렬(왼쪽, 가운데, 오른쪽 등) |

#### 텍스트 속성 예시

```css
/* 글자 색상 */
.text-red {
  color: red;
  color: #ff0000;
  color: rgb(255, 0, 0);
}

/* 글자 크기 */
.text-large {
  font-size: 24px;
  font-size: 1.5rem;
  font-size: 150%;
}

/* 글자 굵기 */
.text-bold {
  font-weight: bold;
  font-weight: 700;
}

/* 텍스트 정렬 */
.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}
```

### 배경 속성

| 속성명              | 설명                     |
| :------------------ | :----------------------- |
| background          | 배경 관련 속성 일괄 지정 |
| background-color    | 배경 색상 지정           |
| background-image    | 배경 이미지 지정         |
| background-size     | 배경 이미지 크기 지정    |
| background-repeat   | 배경 이미지 반복 여부 지정 |
| background-position | 배경 이미지 위치 지정    |

#### 배경 속성 예시

```css
/* 배경 색상 */
.bg-color {
  background-color: #f0f0f0;
  background-color: rgba(255, 0, 0, 0.5); /* 투명도 포함 */
}

/* 배경 이미지 */
.bg-image {
  background-image: url("이미지 경로");
  background-size: cover; /* 요소 전체를 덮도록 */
  background-size: contain; /* 이미지 전체가 보이도록 */
  background-repeat: no-repeat;
  background-position: center;
}
```

### 시각 효과 속성

| 속성명         | 설명                   |
| :------------- | :--------------------- |
| opacity        | 투명도 지정            |
| cursor         | 마우스 커서 모양 지정  |
| box-shadow     | 박스 그림자 지정       |
| text-shadow    | 텍스트 그림자 지정     |
| border-radius  | 테두리 둥글게 지정     |
| visibility     | 요소의 보임/숨김 지정  |

#### 시각 효과 속성 예시

```css
/* 투명도 */
.transparent {
  opacity: 0.5; /* 0(완전 투명) ~ 1(완전 불투명) */
}

/* 마우스 커서 */
.pointer {
  cursor: pointer;
}

.not-allowed {
  cursor: not-allowed;
}

/* 그림자 효과 */
.shadow {
  /* box-shadow: x축, y축, 흐림정도, 확산정도, 색상 */
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.2);
}

/* 둥근 테두리 */
.rounded {
  border-radius: 8px;
  border-radius: 50%; /* 원형 */
}

/* 요소 숨김/보임 */
.hidden {
  visibility: hidden; /* 공간은 차지하되 보이지 않음 */
  display: none; /* 완전히 제거 */
}
```

### 그림자 효과 예시

```css
/* 기본 구문 */
box-shadow: offset-x offset-y blur-radius spread-radius color;

/* 예시 */
box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.3);
/*          ↑   ↑   ↑    ↑    ↑
            X   Y  흐림  확산  색상
*/
```

