# CSS 상속

## 개요

이 문서는 CSS에서 상속(Inheritance)의 개념과 속성을 설명합니다. 문서를 통해 다음을 학습할 수 있습니다.

- 상속의 개념
- 상속되는 속성과 상속되지 않는 속성

### 사전 학습

- HTML 기본 개념
- CSS 기본 개념
- CSS 속성

---

## CSS 상속

부모 요소에 지정된 스타일 속성이 자식 요소에게 전달되는 작동 방식을 의미합니다. 속성은 상속되는 것과 상속되지 않는 것으로 구분할 수 있습니다.

### 상속 및 비상속 속성

#### 상속되는 속성 목록

- `color`: 글자 색상
- `font-family`: 글꼴 종류
- `font-size`: 글자 크기
- `line-height`: 줄 간격
- `text-align`: 텍스트 정렬
- `visibility`: 요소의 가시성

**예시:**
`div` 요소에 적용된 `color`와 `font-size`가 자식 요소인 `p`와 `span`에 그대로 전달됩니다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      div {
        color: green;
        font-size: 30px;
      }
    </style>
  </head>

  <body>
    <div>
      <p>p 태그 요소</p>
      <span>span 태그 요소</span>
    </div>
  </body>
</html>
```

#### 상속되지 않는 속성 목록

- `margin`: 외부 여백
- `padding`: 내부 여백
- `border`: 테두리
- `width`, `height`: 크기
- `background`: 배경
