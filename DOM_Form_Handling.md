# DOM 폼(Form) 처리

이 문서는 JavaScript의 DOM API를 활용하여 HTML 폼(Form)을 처리하는 방법을 설명합니다. `submit` 이벤트 핸들링, 입력 값 접근, 데이터 유효성 검사, 그리고 실시간 입력 처리 기법을 학습합니다.

---

## 1. `submit` 이벤트 처리

`submit` 이벤트는 사용자가 폼을 제출할 때 `<form>` 요소에서 발생하는 이벤트입니다. 폼은 `<button type="submit">` 클릭 또는 입력 필드에서 Enter 키를 누를 때 제출됩니다.

### 1.1. `submit` 이벤트 리스너

`addEventListener`를 사용하여 `submit` 이벤트를 감지하고 원하는 로직을 실행할 수 있습니다.

```html
<form id="my-form">
  <button type="submit">제출</button>
</form>

<script>
  const form = document.querySelector("#my-form");

  form.addEventListener("submit", function (event) {
    // 폼 제출 시 기본적으로 페이지가 새로고침됩니다.
    alert("폼 제출 이벤트가 실행되었습니다.");
  });
</script>
```

### 1.2. `event.preventDefault()`를 이용한 제출 동작 중지

폼이 제출될 때 발생하는 페이지 새로고침(기본 동작)을 막기 위해 `event.preventDefault()`를 사용합니다. 이를 통해 JavaScript로 데이터 유효성 검사나 AJAX 전송 등을 수행할 수 있습니다.

```javascript
form.addEventListener("submit", function (event) {
  // 폼의 기본 제출 동작(페이지 새로고침)을 중지시킵니다.
  event.preventDefault(); 

  alert("폼 제출이 중지되었습니다.");
  // 여기에 유효성 검사 또는 데이터 전송 로직을 추가합니다.
});
```

---

## 2. 폼 입력 값 접근

`<form>` 요소의 `elements` 속성을 사용하면 폼 내의 모든 입력 요소(`<input>`, `<textarea>`, `<select>` 등)에 쉽게 접근할 수 있습니다.

`elements` 속성은 `name` 속성 값을 키로 가지는 `HTMLFormControlsCollection` 객체를 반환합니다.

```html
<form id="my-form">
  <label>이름: <input type="text" name="name" required /></label>
  <label>이메일: <input type="email" name="email" required /></label>
  <button type="submit">제출</button>
</form>

<script>
  const form = document.querySelector("#my-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // elements 속성으로 폼 요소에 접근
    const nameInput = form.elements["name"];
    const emailInput = form.elements["email"];

    // .value 프로퍼티로 입력 값을 조회
    console.log("이름:", nameInput.value);
    console.log("이메일:", emailInput.value);
  });
</script>
```

---

## 3. 데이터 유효성 검사 (Validation)

사용자가 입력한 데이터가 특정 규칙(예: 이메일 형식, 비밀번호 길이)에 부합하는지 확인하는 과정입니다.

### 3.1. HTML 기본 유효성 검사

HTML5는 입력 요소에 다양한 속성을 추가하여 기본적인 유효성 검사를 브라우저가 자동으로 처리하도록 할 수 있습니다.

-   `type`: `email`, `number`, `url` 등 입력 데이터의 타입을 지정합니다.
-   `required`: 필수 입력 필드로 지정합니다.
-   `minlength`, `maxlength`: 텍스트의 최소/최대 길이를 지정합니다.
-   `min`, `max`: 숫자의 최소/최대 값을 지정합니다.
-   `pattern`: 정규표현식을 사용하여 복잡한 패턴을 검사합니다.

```html
<form>
  <label>
    이름:
    <input type="text" name="name" minlength="2" maxlength="10" required />
  </label>
  <button type="submit">제출</button>
</form>
```
> 위 폼은 이름이 2자 미만이거나 10자를 초과하면 제출되지 않습니다.

### 3.2. JavaScript를 이용한 유효성 검사

두 입력 값 비교 등 복잡한 규칙이나, 커스텀 에러 메시지를 표시해야 할 경우 JavaScript를 사용합니다.

아래는 비밀번호와 비밀번호 확인 값이 일치하는지 검사하는 예시입니다.

```html
<form id="password-form">
  <label>비밀번호: <input type="password" name="password" required /></label>
  <label>비밀번호 확인: <input type="password" name="password-confirm" required /></label>
  <button type="submit">제출</button>
</form>

<script>
  const form = document.querySelector("#password-form");

  form.addEventListener("submit", function (event) {
    const password = form.elements["password"].value;
    const passwordConfirm = form.elements["password-confirm"].value;

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      event.preventDefault(); // 유효성 검사 실패 시 제출 중지
    }
  });
</script>
```

---

## 4. 실시간 입력 처리

사용자 입력에 실시간으로 반응하여 피드백을 주거나 값을 처리해야 할 때 `input`과 `change` 이벤트를 사용합니다.

-   **`input` 이벤트**: 사용자가 값을 변경할 때마다 **즉시** 발생합니다. (타이핑, 붙여넣기 등)
-   **`change` 이벤트**: 입력 요소의 값 변경이 완료되고 **포커스가 다른 곳으로 이동**했을 때 발생합니다.

### `input`과 `change` 이벤트 비교

```html
<label for="text-input">텍스트 입력:</label>
<input type="text" id="text-input" />
<p>input 이벤트 출력: <span id="input-output"></span></p>
<p>change 이벤트 출력: <span id="change-output"></span></p>

<script>
  const textInput = document.querySelector("#text-input");
  const inputOutput = document.querySelector("#input-output");
  const changeOutput = document.querySelector("#change-output");

  // input 이벤트: 입력할 때마다 즉시 발생
  textInput.addEventListener("input", () => {
    inputOutput.textContent = textInput.value;
  });

  // change 이벤트: 포커스가 벗어날 때 발생
  textInput.addEventListener("change", () => {
    changeOutput.textContent = textInput.value;
  });
</script>
```
> `input` 이벤트는 실시간 검색어 제안이나 글자 수 세기 등에 유용하며, `change` 이벤트는 입력이 완료된 후 최종 값을 검증하는 데 적합합니다.
