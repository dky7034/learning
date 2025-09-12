# CSS 박스 모델

## 개요

이 문서는 CSS에서 박스 모델(Box Model)의 개념과 구성 요소를 설명합니다. 문서를 통해 다음을 학습할 수 있습니다.

- 박스 모델의 개념과 구성 요소
- 콘텐츠, 패딩, 테두리, 마진의 영향
- `box-sizing` 속성을 활용하여 박스 모델의 크기를 제어하는 방법

### 사전 학습

- HTML 기본 개념
- CSS 기본 개념
- CSS 선택자

---

## 박스 모델(Box Model)

브라우저가 요소의 너비와 높이를 계산할 때 사용하는 기준입니다.

### 박스 모델 구성요소

- **콘텐츠(Content)**: 텍스트나 이미지가 들어가는 실제 내용 영역입니다.
- **패딩(Padding)**: 콘텐츠와 테두리 사이의 공간으로, 요소 내부의 여백입니다.
- **테두리(Border)**: 요소의 가장자리를 둘러싸는 테두리로, 두께, 스타일, 색상을 설정할 수 있습니다.
- **마진(Margin)**: 요소 바깥의 공간으로, 다른 요소들과의 간격입니다.

---

## 박스 모델 요소

### 콘텐츠(Content)

- 요소의 실제 내용을 담는 영역입니다.
- `width` 와 `height` 속성으로 크기가 제어됩니다.

### 패딩(Padding)

- 콘텐츠와 테두리 사이의 내부 여백입니다.
- `padding` 속성을 사용해 상/하/좌/우 내부 여백을 설정할 수 있습니다.

```html
<div class="padding-box">패딩 박스</div>
```
```css
.padding-box {
  width: 200px;
  height: 100px;
  color: white;
  background-color: lightgreen;
  padding: 100px 20px 30px 40px; /* 상, 우, 하, 좌 패딩 */
}
```

### 테두리(Border)

- 요소의 가장자리를 둘러싸는 선으로, 두께, 스타일, 색상을 설정할 수 있습니다.
- `border` 속성을 사용해 테두리의 크기와 스타일을 제어할 수 있습니다.

```html
<div class="border-box"></div>
```
```css
.border-box {
  width: 200px;
  height: 100px;
  background-color: lightyellow;
  border: 5px dotted darkblue; /* 테두리 두께, 스타일, 색상 */
}
```

### 마진(Margin)

- 요소의 바깥쪽 공간으로, 다른 요소와의 간격을 설정합니다.
- `margin` 속성을 사용해 요소 간의 상/하/좌/우 간격을 설정할 수 있습니다.

```html
<div class="margin-box"></div>
<div class="margin-box"></div>
<div class="margin-box"></div>
<div class="margin-box"></div>
```
```css
.margin-box {
  width: 200px;
  height: 100px;
  background-color: lightpink;
  margin: 10px 5px 50px 50px; /* 상, 우, 하, 좌 각각의 마진 */
}
```

### Margin 중첩(Margin Collapse)

- 두 요소의 마진이 겹쳐질 때 더 큰 값이 적용되는 현상입니다.

```html
<div>
  <div class="box box-d"></div>
  <div class="box box-e"></div>
  <div class="box box-f"></div>
</div>
```
```css
.box {
  height: 80px;
}

.box-d {
  background-color: lightgreen;
  margin: 20px 0; /* 상하 20px 마진 */
}

.box-e {
  background-color: lightblue;
  margin: 40px 0; /* 상하 40px 마진 */
}

.box-f {
  background-color: lightpink;
  margin: 60px 0; /* 상하 60px 마진 */
}
```

### Margin과 Padding 비교

- **Margin**은 다른 요소와의 여백(바깥쪽 여백)을 설정합니다.
- **Padding**은 요소 내부의 여백(안쪽 여백)을 설정합니다.

```html
<div>
  <div class="box margin"></div>
  <div class="box padding"></div>
</div>
```
```css
.box {
  background-color: white;
  border: 3px solid lightcoral;
  border-radius: 8px;
  height: 120px;
}

.margin {
  margin: 100px; /* 경계선 바깥쪽에 100px 여백 */
}

.padding {
  padding: 100px; /* 경계선 안쪽에 100px 여백 */
}
```

---

## box-sizing

요소의 크기를 계산할 때, 패딩과 테두리를 포함할지 여부를 결정하는 속성입니다.

- **`content-box` (기본값)**
  - `width`와 `height`를 콘텐츠 영역만의 크기로 계산합니다.
  - **최종 크기 = `width` + `padding` + `border`**
  - 예: `width: 200px; padding: 20px;` 일 때, 실제 너비는 240px가 되어 예측이 어렵습니다.

- **`border-box` (선호)**
  - `width`와 `height`를 패딩과 테두리가 포함된 최종 크기로 계산합니다.
  - `content-box` 보다 크기를 예측하기 직관적이어서 대부분의 개발에서 선호됩니다.
  - 예: `width: 200px; padding: 20px;` 일 때, 실제 너비는 그대로 200px이 유지됩니다.

```html
<div class="content-box">box-sizing: content-box</div>
<div class="border-box">box-sizing: border-box</div>
```
```css
.content-box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
  background-color: lightblue;
  box-sizing: content-box; /* 기본값: 패딩과 테두리 제외한 크기 */
  margin-bottom: 20px;
}

.border-box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
  background-color: lightgreen;
  box-sizing: border-box; /* 패딩과 테두리 포함한 크기 */
}
```

---

## CSS 초기화 (Reset)

웹 브라우저들은 각자 기본적인 스타일(예: `<h1>`의 `margin`, `<body>`의 `padding` 등)을 가지고 있습니다. 이 기본값은 브라우저마다 조금씩 다를 수 있어, 개발자가 의도한 디자인과 다르게 보일 수 있습니다.

따라서, 많은 개발자들은 프로젝트 시작 시점에 모든 요소의 `margin`, `padding`을 0으로 만들고 `box-sizing`을 `border-box`로 설정하여 브라우저 간의 차이를 없애고 일관된 환경에서 스타일링을 시작합니다. 이를 "CSS Reset"이라고 합니다.

### 일반적인 CSS Reset 예시

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

이 코드를 CSS 파일의 가장 위에 추가하면, 모든 요소의 기본 마진과 패딩이 제거되고, 모든 요소가 `border-box` 계산법을 따르게 되어 개발이 훨씬 수월해집니다.