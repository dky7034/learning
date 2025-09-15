# CSS Position 속성 마스터 가이드

## 1. 개요

이 문서는 CSS의 `position` 속성에 대한 핵심 개념과 종류를 상세히 설명합니다. 이 가이드를 통해 웹 페이지에서 요소의 위치를 결정하는 다양한 방법을 배우고, 정적 및 동적 레이아웃을 효과적으로 구성하는 능력을 기를 수 있습니다.

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 내용에 대한 기본적인 지식이 필요합니다.

-   HTML 기본 구조
-   CSS 기본 문법 및 적용 방법
-   CSS 선택자

---

## 2. `position` 속성이란?

`position` 속성은 **HTML 요소가 웹 페이지에서 어디에 위치할지 결정**하는 규칙입니다. 기본적으로 요소는 문서의 흐름에 따라 순서대로 배치되지만, `position` 속성을 사용하면 이러한 흐름에서 벗어나 요소를 부모나 브라우저 창을 기준으로 자유롭게 배치할 수 있습니다.

`position` 속성은 주로 `top`, `right`, `bottom`, `left`와 같은 좌표 속성과 함께 사용되어 최종 위치를 결정합니다.

---

## 3. `position` 속성의 종류

### 1) `static` (기본값)

`static`은 모든 HTML 요소의 기본 `position` 값입니다. 요소를 특별히 배치하지 않고, 단순히 **문서의 일반적인 흐름(위에서 아래로, 왼쪽에서 오른쪽으로)**에 따라 순서대로 배치합니다.

-   **핵심 특징**:
    -   `top`, `right`, `bottom`, `left` 좌표 속성이 적용되지 않습니다.
    -   별도로 `position`을 지정하지 않은 모든 요소의 상태입니다.

#### 예제 코드

```html
<div class="parent-box">
  <div class="box box1">박스 1</div>
  <div class="box box2">박스 2</div>
</div>
```

```css
.parent-box {
  width: 300px;
  background-color: lightgray;
}
.box {
  width: 100px;
  height: 100px;
}
.box1 {
  background-color: lightcoral;
  /* position: static; 은 기본값이므로 명시할 필요가 없습니다. */
}
.box2 {
  background-color: lightgreen;
  /* 별도의 위치 지정이 없으므로 기본값인 static이 적용됩니다. */
}
```

### 2) `relative` (상대 위치)

`relative`는 요소를 **원래 자신의 위치(static일 때의 위치)**를 기준으로 상대적으로 배치합니다.

-   **핵심 특징**:
    -   `top`, `right`, `bottom`, `left` 속성을 사용하여 원래 위치에서 얼마나 이동할지 결정합니다.
    -   **요소가 이동하더라도 원래 있던 공간은 그대로 유지**됩니다. 따라서 다른 요소의 레이아웃에 영향을 주지 않습니다.
    -   `absolute` 속성을 가진 자식 요소의 **배치 기준점(containing block)**이 되는 중요한 역할을 합니다.

#### 예제 코드

```html
<div class="parent-box">
  <div class="box box1 position-relative">박스 1</div>
  <div class="box box2">박스 2</div>
</div>
```

```css
.parent-box {
  width: 300px;
  background-color: lightgray;
}
.box {
  width: 100px;
  height: 100px;
}
.position-relative {
  position: relative;
  top: 50px;  /* 원래 위치의 상단에서 50px 아래로 */
  left: 30px; /* 원래 위치의 왼쪽에서 30px 오른쪽으로 */
}
.box1 {
  background-color: lightcoral;
}
.box2 {
  background-color: lightgreen;
  /* '박스 1'이 이동했지만, '박스 2'는 '박스 1'의 원래 자리를 기준으로 배치됩니다. */
}
```

### 3) `absolute` (절대 위치)

`absolute`는 요소를 문서의 일반적인 흐름에서 완전히 분리하고, **가장 가까운 위치 지정 조상(positioned ancestor)을 기준**으로 배치합니다.

-   **핵심 특징**:
    -   위치 지정 조상이란 `position` 속성이 `static`이 아닌(`relative`, `absolute`, `fixed`, `sticky`) 요소를 의미합니다.
    -   만약 기준이 될 조상이 없다면, 문서의 최상위 요소인 `<body>` (초기 컨테이닝 블록)를 기준으로 삼습니다.
    -   **요소가 문서 흐름에서 벗어나므로 원래 차지하던 공간이 사라집니다.** 이로 인해 다른 요소들이 그 공간을 채우게 되어 요소가 겹쳐 보일 수 있습니다.

#### 예제 코드

```html
<div class="parent-box-absolute">
  <div class="box box1">박스 1</div>
  <div class="box box2">박스 2</div>
</div>
```

```css
.parent-box-absolute {
  position: relative; /* 자식 absolute 요소의 기준점이 됨 */
  width: 300px;
  height: 200px;
  margin: 50px;
  background-color: lightgray;
  border: 2px solid black;
}
.box1 {
  position: absolute;
  top: 50px;    /* 부모 박스 상단에서 50px 아래 */
  left: 30px;   /* 부모 박스 왼쪽에서 30px 오른쪽 */
  width: 100px;
  height: 100px;
  background-color: lightcoral;
}
.box2 {
  width: 100px;
  height: 100px;
  background-color: lightgreen;
  /* box1은 문서 흐름에서 벗어났으므로, box2는 parent-box의 좌측 상단부터 배치됩니다. */
}
```

### 4) `fixed` (고정 위치)

`fixed`는 요소를 **뷰포트(viewport, 브라우저 창)를 기준**으로 고정된 위치에 배치합니다.

-   **핵심 특징**:
    -   페이지를 스크롤하더라도 항상 같은 위치에 고정되어 있습니다.
    -   `absolute`와 마찬가지로 문서의 일반적인 흐름에서 벗어나므로, 원래 공간이 사라집니다.
    -   주로 상단 내비게이션 바, 하단 배너, 사이드 광고 등에 사용됩니다.

#### 예제 코드

```html
<div class="header-fixed">고정된 헤더</div>
<div class="content">
  <p>스크롤을 내려보세요.</p>
  <!-- 내용이 길다고 가정 -->
</div>
```

```css
.header-fixed {
  position: fixed;
  top: 5vh; /* 뷰포트 상단에서 5% 높이만큼 떨어진 위치에 고정 */
  left: 0;
  width: 100%;
  padding: 1rem;
  background-color: steelblue;
  color: white;
  text-align: center;
  z-index: 1000; /* 다른 요소들 위에 표시되도록 z-index 설정 */
}
.content {
  height: 1500px; /* 스크롤을 만들기 위한 높이 */
  background-color: lightgray;
  padding-top: 100px; /* 고정된 헤더에 내용이 가려지지 않도록 여백 추가 */
}
```

### 5) `sticky` (점착 위치)

`sticky`는 `relative`와 `fixed`의 특징을 혼합한 형태로, 스크롤 위치에 따라 요소의 배치가 동적으로 변경됩니다.

-   **핵심 특징**:
    -   평소에는 `relative`처럼 문서 흐름에 따라 배치됩니다.
    -   스크롤되어 `top`, `right`, `bottom`, `left`로 지정된 임계점에 도달하면 `fixed`처럼 해당 위치에 고정됩니다.
    -   **스크롤되는 부모 컨테이너 안에서만 고정 효과가 유지**됩니다.
    -   주로 스크롤에 따라 움직이는 헤더나 사이드바를 구현할 때 유용합니다.

#### 예제 코드

```html
<div class="head"></div>
<div class="header-sticky">스크롤하면 고정되는 헤더</div>
<div class="content">
  <p>스크롤을 내려보세요.</p>
  <!-- 내용이 길다고 가정 -->
</div>
```

```css
.head {
  height: 500px;
  width: 100%;
  background-color: green;
}
.header-sticky {
  position: sticky;
  top: 50px; /* 스크롤이 올라가 화면 상단 50px 위치에 닿으면 고정됨 */
  width: 100%;
  padding: 1rem;
  background-color: lightcoral;
  color: white;
  text-align: center;
}
.content {
  height: 1500px;
  background-color: lightgray;
}
```

---

## 4. `z-index`와 쌓임 순서 (Stacking Order)

`position`으로 요소의 위치를 지정하면 요소들이 겹칠 수 있습니다. 이때 어떤 요소가 위로 올라올지 결정하는 속성이 `z-index`입니다.

-   **`z-index`의 특징**:
    -   `position` 속성이 `static`이 아닌 요소에만 적용됩니다.
    -   숫자 값을 가지며, **숫자가 클수록 더 위에 쌓입니다.** 음수 값도 가능합니다.
    -   `z-index`가 없는 요소들은 HTML 코드에 선언된 순서대로 쌓입니다. (나중에 선언된 요소가 위로)

---

## 5. `position` 속성 요약

| 속성값 | 기준점 | 문서 흐름 | `top`, `left` 적용 | 주요 특징 |
| :--- | :--- | :--- | :--- | :--- |
| **`static`** | (없음) | 따름 | X | 기본값, 위치 지정 불가 |
| **`relative`** | 요소 자신의 원래 위치 | 따름 (공간 유지) | O | `absolute`의 기준점으로 사용됨 |
| **`absolute`** | `static`이 아닌 가장 가까운 조상 | 벗어남 (공간 사라짐) | O | 문서 흐름에서 완전히 분리됨 |
| **`fixed`** | 뷰포트 (브라우저 창) | 벗어남 (공간 사라짐) | O | 스크롤해도 위치가 고정됨 |
| **`sticky`** | 스크롤 위치에 따라 `relative` 또는 `fixed` | 따름 (공간 유지) | O | 특정 지점에서 고정되는 효과 |

---

## 6. 실용 팁: `absolute` 요소 중앙 정렬하기

`position: absolute`인 요소를 부모의 정중앙에 배치하는 것은 매우 흔한 레이아웃 패턴입니다.

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 1. top, left로 50%씩 이동하여 요소의 왼쪽 상단 모서리를 중앙에 맞춤 */
  /* 2. transform으로 요소 자신의 너비/높이의 50%만큼 다시 이동하여 완벽한 중앙 정렬 완성 */
}
```
