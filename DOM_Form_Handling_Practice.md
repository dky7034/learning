# HTML 폼(Form) 유효성 검사: 비밀번호 확인 예제

이 문서는 HTML 폼(Form) 제출 시 JavaScript를 사용하여 입력 값의 유효성을 검사하는 방법을 설명합니다. 특히, 비밀번호와 비밀번호 확인 필드의 값이 일치하는지 확인하는 예제를 통해 DOM 이벤트 처리 및 폼 데이터 접근법을 자세히 알아봅니다.

## 1. HTML 구조

먼저, 기본적인 HTML 폼 구조를 살펴봅니다. 이 예제는 두 개의 `password` 타입 입력 필드와 제출(`submit`) 버튼으로 구성됩니다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Form Validation</title>
  </head>
  <body>
    <form action="#" id="form">
      <input type="password" name="password" placeholder="비밀번호" />
      <input
        type="password"
        name="password-confirm"
        placeholder="비밀번호 확인"
      />
      <input type="submit" value="확인" />
    </form>
    <script src="script.js"></script>
  </body>
</html>
```

### 주요 속성:

- `id="form"`: JavaScript에서 폼 요소를 쉽게 선택하기 위해 `id`를 부여했습니다.
- `name="password"` & `name="password-confirm"`: 각 입력 필드를 구분하는 고유한 `name`입니다. 이 `name` 속성은 폼 데이터를 서버로 전송하거나 JavaScript에서 각 입력 요소에 접근할 때 key로 사용됩니다.
- `type="password"`: 사용자가 입력하는 내용이 화면에 보이지 않도록 마스킹 처리합니다.
- `action="#"`: 폼 데이터가 전송될 URL을 지정합니다. `#`은 현재 페이지를 의미하며, 예제에서는 JavaScript로 데이터 전송을 제어하므로 중요하지 않습니다.

## 2. JavaScript를 이용한 폼 이벤트 처리 및 유효성 검사

사용자가 '확인' 버튼을 클릭하면 `form` 요소에서 `submit` 이벤트가 발생합니다. JavaScript를 사용하여 이 이벤트를 감지하고, 폼이 실제로 제출되기 전에 입력 값을 검증하는 로직을 실행합니다.

### 이벤트 리스너 등록

먼저 `id`를 이용해 폼 요소를 가져오고 `addEventListener`를 사용해 `submit` 이벤트가 발생했을 때 실행될 콜백 함수를 등록합니다.

```javascript
const formTag = document.querySelector("#form");

formTag.addEventListener("submit", (e) => {
  // 유효성 검사 로직
});
```

### 기본 동작 방지: `event.preventDefault()`

폼의 기본 동작은 `submit` 이벤트 발생 시 `action` 속성에 지정된 페이지로 이동하며 데이터를 전송하는 것입니다. 하지만 우리는 클라이언트 측에서 유효성 검사를 먼저 수행해야 합니다. `event.preventDefault()` 메서드는 이러한 폼의 기본 제출 동작을 막아줍니다.

```javascript
formTag.addEventListener("submit", (e) => {
  e.preventDefault(); // 폼의 기본 제출 동작을 중단
  console.log("폼 제출이 중단되었습니다.");

  // 이제 여기서 유효성 검사를 수행합니다.
});
```

### 폼 요소의 값 접근하기: `form.elements`

폼 내부의 각 입력 요소(`input`, `textarea`, `select` 등)에 접근하는 가장 효율적인 방법 중 하나는 `HTMLFormElement.elements` 속성을 사용하는 것입니다. 이 속성은 폼 안의 모든 입력 요소를 담고 있는 `HTMLFormControlsCollection`을 반환합니다. 각 요소는 `name` 속성 값을 key로 사용하여 쉽게 접근할 수 있습니다.

```javascript
// 'password'라는 name을 가진 요소의 '값(value)'을 가져옴
const passwordValue = formTag.elements["password"].value;

// 'password-confirm'이라는 name을 가진 요소의 '값(value)'을 가져옴
const passwordConfirmValue = formTag.elements["password-confirm"].value;
```

### 값 비교 및 결과 출력

이제 두 변수에 저장된 값을 비교하여 일치하는지 확인합니다.

```javascript
if (passwordValue === passwordConfirmValue) {
  console.log("비밀번호가 일치합니다.");
  // 여기서 실제 폼 제출 로직을 추가할 수 있습니다. (e.g., formTag.submit())
  // 또는 fetch/axios를 사용해 서버로 데이터를 비동기 전송할 수 있습니다.
} else {
  console.log("비밀번호가 일치하지 않습니다.");
  alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
}
```

## 3. 전체 코드 및 분석 (수정된 최종 코드)

아래는 위에서 설명한 개념을 모두 적용한 완성된 JavaScript 코드입니다.

```javascript
// /js/19-form/script.js

const formTag = document.querySelector("#form");

formTag.addEventListener("submit", (e) => {
  // 1. 폼의 기본 제출 동작을 막습니다.
  e.preventDefault();

  // 2. form.elements 속성을 사용해 각 입력 필드의 '값'을 가져옵니다.
  //    - formTag['password'] 와 같이 직접 접근도 가능합니다.
  const password = formTag.elements["password"].value;
  const passwordConfirm = formTag.elements["password-confirm"].value;

  // 3. 두 비밀번호 값이 비어있지 않고, 서로 일치하는지 확인합니다.
  if (!password || !passwordConfirm) {
    alert("비밀번호를 모두 입력해주세요.");
  } else if (password === passwordConfirm) {
    console.log("같습니다");
    alert("비밀번호가 일치합니다. (제출 성공)");
    // 실제 서비스에서는 여기서 form.submit()을 호출하거나,
    // fetch API를 사용해 서버로 데이터를 전송합니다.
  } else {
    console.log("다릅니다");
    alert("비밀번호가 일치하지 않습니다.");
  }
});
```

### 원본 코드의 오류 분석

사용자가 제시한 원본 코드에는 몇 가지 오류가 있었습니다.

```javascript
// 원본 코드의 문제 부분
const passwordInput = formTag["elements"]["password"]["value"];
const passwordInputConfirm = formTag["element"]["password-confirm"]["value"]; // 'element' 오타
if (passwordInput["value"] === passwordInputConfirm["value"]) {
  // 불필요한 .value 접근
  // ...
}
```

1.  **`elements` 오타**: `formTag["element"]`는 오타입니다. `formTag.elements` 또는 `formTag["elements"]`가 올바른 표현입니다.
2.  **불필요한 `.value` 접근**: `formTag["elements"]["password"]["value"]`를 통해 이미 `passwordInput` 변수에는 입력 필드의 **값(string)**이 저장되었습니다. 따라서 `passwordInput["value"]`와 같이 문자열에서 다시 `.value` 속성을 찾으려고 하면 `undefined`가 반환되어 비교가 올바르게 동작하지 않습니다.

## 4. 핵심 정리

- **폼 제출 제어**: `form` 요소의 `submit` 이벤트와 `event.preventDefault()`를 사용하면, 서버로 데이터를 보내기 전에 유효성 검사와 같은 원하는 작업을 수행할 수 있습니다.
- **폼 데이터 접근**: `form.elements` 컬렉션은 `name` 속성을 키로 사용하여 폼 내부의 모든 입력 요소에 안정적이고 쉽게 접근할 수 있는 방법을 제공합니다.
- **클라이언트 측 유효성 검사**: 사용자가 잘못된 데이터를 제출하는 것을 방지하고 즉각적인 피드백을 제공하여 사용자 경험(UX)을 향상시킬 수 있습니다. 하지만 보안을 위해 서버 측에서도 반드시 동일한 유효성 검사를 수행해야 합니다.
