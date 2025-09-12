# CSS 디스플레이 속성

## 개요

이 문서는 CSS에서 디스플레이(Display) 속성의 개념과 종류를 설명합니다. 문서를 통해 다음을 학습할 수 있습니다.

- 디스플레이 속성의 개념과 종류

### 사전 학습

- HTML 기본 개념
- CSS 기본 개념

---

## 디스플레이(Display)

요소가 웹 페이지에서 어떻게 배치되고, 공간을 차지할지를 결정하는 속성입니다. 각 요소는 디스플레이 속성에 따라 인라인, 블록 또는 다른 레이아웃 방식을 따르게 됩니다.

---

## 디스플레이 속성 종류

### `inline`

- **배치**: 수평으로 배치되며, 줄을 바꾸지 않고 다른 인라인 요소와 한 줄에 나란히 위치합니다.
- **공간**: 요소는 콘텐츠의 크기만큼만 공간을 차지합니다.
- **크기**: `width`와 `height` 속성을 지정할 수 없습니다.
- **예시 태그**: `<span>`, `<a>`, `<img>`, `<input>`, `<label>`, `<button>`

### `block`

- **배치**: 수직으로 배치되며, 한 줄 전체를 차지합니다. 블록 요소 다음에는 항상 줄 바꿈이 일어납니다.
- **공간**: 부모 요소의 너비 전체를 차지합니다.
- **크기**: `width`와 `height` 속성을 지정할 수 있습니다.
- **예시 태그**: `<div>`, `<p>`, `<h1>`~`<h6>`, `<ul>`, `<ol>`, `<li>`, `<table>`, `<form>`

### `inline-block`

- **배치**: `inline` 요소처럼 한 줄에 나란히 수평으로 배치됩니다.
- **공간**: `block` 요소처럼 너비와 높이를 지정할 수 있습니다.
- **특징**: `inline`과 `block` 속성의 장점을 결합한 속성입니다.
- **예시 태그**: `<input>`, `<textarea>`, `<select>`, `<button>`

### `none`

- **배치**: 요소를 화면에서 완전히 숨깁니다.
- **공간**: 해당 요소는 웹 페이지에서 보이지 않으며 공간도 차지하지 않습니다.
- **예시 태그**: `<script>`, `<style>`, `<link>`, `<meta>` (기본적으로 보이지 않는 태그들)

---

## 예시 코드

```html
<div class="inline">inline 속성 div</div>
<div class="inline">inline 속성 div</div>

<div class="block">block 속성 div</div>
<div class="block">block 속성 div</div>

<div class="inline-block">inline-block 속성 div</div>
<div class="inline-block">inline-block 속성 div</div>
```

```css
/* div 태그 공통 스타일 속성 */
div {
  width: 200px;
  height: 200px;
}

.inline {
  display: inline;
  border: red 1px solid;
}

.block {
  display: block;
  border: blue 1px solid;
}

.inline-block {
  display: inline-block;
  border: green 1px solid;
}
```
