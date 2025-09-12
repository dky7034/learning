# CSS 우선순위 (Specificity)

## 개요

이 문서는 CSS에서 우선순위(Specificity)의 개념과 규칙을 설명합니다. 이 문서를 통해 다음 내용을 학습할 수 있습니다.

-   우선순위의 개념과 규칙
-   우선순위를 활용하여 원하는 스타일이 올바르게 적용되도록 제어하는 방법

## 사전 학습

-   HTML 기본 개념
-   CSS 기본 개념
-   CSS 선택자

## CSS 우선순위란?

하나의 요소에 여러 스타일 규칙이 적용될 때, 어떤 스타일을 최종적으로 적용할지 결정하는 규칙입니다. 우선순위 점수가 높은 스타일이 낮은 스타일을 덮어쓰게 됩니다.

## 우선순위 규칙

번호가 낮을수록 우선순위가 높습니다.

### 1. `!important`

CSS 속성 값 뒤에 `!important` 키워드를 붙이면, 다른 모든 우선순위 규칙을 무시하고 해당 스타일을 강제로 적용합니다. 가장 높은 우선순위를 가집니다.

```css
/* p 태그의 색상을 다른 모든 규칙보다 우선하여 파란색으로 지정합니다. */
p {
  color: blue !important;
}
```

### 2. 인라인 스타일 (Inline Style)

HTML 요소의 `style` 속성을 사용하여 직접 스타일을 적용하는 방식입니다.

```html
<!-- p 태그의 색상을 빨간색으로 직접 지정합니다. -->
<p style="color: red;">p 태그 요소</p>
```

### 3. ID 선택자 (`#id`)

요소에 부여된 고유한 `id` 속성을 사용하여 스타일을 적용합니다.

```html
<p id="bold">bold 아이디 요소</p>
```

```css
#bold {
  color: red;
}
```

### 4. 클래스 (`.class`), 속성 (`[attribute]`), 가상 클래스 (`:pseudo-class`) 선택자

요소의 `class` 속성, 특정 속성, 또는 `:hover`와 같은 가상 클래스를 사용하여 스타일을 적용합니다.

```html
<p class="italic">italic 클래스 요소</p>
```

```css
.italic {
  color: blue;
}
```

### 5. 태그 선택자 (`tag`)

요소의 태그 이름(예: `p`, `span`, `div`)을 기반으로 스타일을 적용합니다.

```html
<p>p 태그 요소</p>
```

```css
p {
  color: blue;
}
```

### ※ 나중에 작성된 스타일 코드

우선순위 점수가 동일한 규칙이 여러 개일 경우, 가장 마지막에 작성된(선언된) 스타일이 최종적으로 적용됩니다.

```css
/* span 태그의 색상은 파란색으로 지정됩니다. */
span {
  color: blue;
}

/* 동일한 우선순위의 규칙이므로, 나중에 선언된 빨간색이 최종적으로 적용됩니다. */
span {
  color: red;
}
```

## 예시 코드

```html
<head>
  <style>
    /* 1. !important가 가장 높은 우선순위를 가집니다. */
    p {
      color: blue !important;
    }
    /* !important가 없다면 아래의 red가 적용됩니다. */
    p {
      color: red;
    }

    /* 2. 동일한 우선순위에서는 나중에 선언된 스타일이 적용됩니다. */
    span {
      color: blue;
    }
    span {
      color: red; /* 최종적으로 red 색상이 적용됩니다. */
    }

    /* 3. ID 선택자는 태그 선택자보다 우선순위가 높습니다. */
    #bold {
      font-weight: 700;
      color: black; /* 태그 선택자의 color: red를 덮어씁니다. */
    }

    /* 4. 클래스 선택자는 태그 선택자보다 우선순위가 높습니다. */
    .italic {
      font-style: italic;
      color: black; /* 태그 선택자의 color: red를 덮어씁니다. */
    }
  </style>
</head>
<body>
  <!-- 최종적으로 color: blue !important; 가 적용됩니다. -->
  <p>p 태그 요소</p>

  <!-- 
    아래 3개의 span 태그는 모두 태그 선택자(span)의 영향을 받습니다.
    따라서 기본적으로 color: red; 가 적용됩니다.
   -->
  <span>span 태그 요소</span>

  <!-- 
    id="bold" 요소는 태그 선택자보다 우선순위가 높은 ID 선택자의 영향을 받습니다.
    따라서 font-weight: 700; color: black; 이 적용됩니다.
   -->
  <span id="bold">bold 아이디 요소</span>

  <!--
    class="italic" 요소는 태그 선택자보다 우선순위가 높은 클래스 선택자의 영향을 받습니다.
    따라서 font-style: italic; color: black; 이 적용됩니다.
   -->
  <span class="italic">italic 클래스 요소</span>
</body>
```
