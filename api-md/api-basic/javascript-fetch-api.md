# JavaScript fetch API: 서버와 통신하는 현대적인 방법

이 문서는 JavaScript를 사용하여 서버와 통신하는 표준 방식인 `fetch` API에 대해 설명합니다. 전통적인 `<form>` 태그 방식과 비교하여 `fetch`의 역할과 장점을 이해하고, Promise 및 `async/await`를 활용한 기본 사용법을 학습합니다.

---

## 1. 사전 학습

이 문서를 더 깊이 이해하기 위해 다음 개념에 대한 사전 지식이 있으면 좋습니다.

-   JavaScript 함수 및 비동기 처리 (Promise, async/await)
-   API, 클라이언트, 서버, HTTP에 대한 기본 개념

---

## 2. 전통적인 서버 요청 방식: `<form>` 태그

`fetch`를 배우기 앞서, 웹 초창기부터 사용된 HTML `<form>` 태그를 이용한 서버 요청 방식을 먼저 이해하면 좋습니다. 이 방식은 JavaScript 없이 순수 HTML만으로 서버에 데이터를 전송할 수 있습니다.

-   `action` 속성: 폼 데이터(form data)를 전송할 서버의 URL을 지정합니다.
-   `method` 속성: 데이터를 어떻게 전송할지 HTTP 요청 메서드를 지정합니다. (`GET`, `POST` 등)
-   `<input>`의 `name` 속성: 서버로 전송될 데이터의 키(key) 역할을 합니다.

**단점**: `<form>` 태그를 사용한 제출(submit)은 항상 **페이지가 새로고침되거나 다른 페이지로 이동**합니다. 동적으로 데이터를 받아와 현재 페이지의 일부만 갱신하는 데에는 한계가 있습니다.

### `<form>` 예제

#### 1. 게시글 목록 가져오기 (GET)

```html
<h1>게시물 목록 가져오기</h1>
<!-- action: 데이터가 전송될 서버 URL -->
<!-- method: 데이터 전송 방식 (GET) -->
<form action="https://jsonplaceholder.typicode.com/posts" method="GET">
  <button type="submit">게시글 목록 가져오기</button>
</form>
```

#### 2. N번 사용자의 게시글 목록 가져오기 (GET)

`GET` 방식에서 `<input>` 태그의 `name`과 `value`는 URL의 쿼리 파라미터(`?key=value`)로 변환되어 전송됩니다.

```html
<h1>N번 사용자의 게시글 목록 가져오기</h1>
<form action="https://jsonplaceholder.typicode.com/posts" method="GET">
  <!-- 
    input의 name 속성: 서버로 전송될 데이터의 이름(key)
    input에 입력된 값: 서버로 전송될 데이터의 값(value)
    만약 5를 입력하고 제출하면, 완성되는 URL은 아래와 같습니다:
    https://jsonplaceholder.typicode.com/posts?userId=5
  -->
  <input type="number" name="userId" />
  <button type="submit">N번 사용자의 게시글 목록 가져오기</button>
</form>
```

---

## 3. `fetch` API: 페이지 새로고침 없는 비동기 요청

`fetch` API는 위와 같은 `<form>`의 한계를 극복하고, JavaScript를 통해 페이지 이동 없이 서버와 비동기적으로 통신하기 위해 등장한 현대적인 인터페이스입니다.

### `fetch`의 핵심 특징

1.  **HTTP 요청/응답 비동기 처리**
    -   서버와 통신하는 동안 웹 페이지가 멈추는 것을 방지하고, 백그라운드에서 데이터를 주고받습니다. 이를 통해 사용자 경험을 크게 향상시킬 수 있습니다.

2.  **Promise 기반**
    -   `fetch` 함수는 호출 즉시 **Promise 객체**를 반환합니다. 이를 통해 비동기 요청의 성공(이행)과 실패(거절) 상태를 체계적으로 관리할 수 있으며, `.then()`, `.catch()` 및 `async/await` 문법을 자연스럽게 사용할 수 있습니다.

3.  **웹 브라우저 내장 Web API**
    -   별도의 라이브러리 설치 없이, 모든 최신 웹 브라우저에서 기본적으로 제공하는 강력한 기능입니다.

---

## 4. `fetch` 기본 사용법 (GET 요청)

`fetch`는 기본적으로 두 단계의 Promise 처리 과정으로 동작합니다.

1.  `fetch(url)`: URL에 네트워크 요청을 보내고, 응답의 메타데이터(헤더 등)가 담긴 **`Response` 객체**로 이행되는 Promise를 반환합니다.
2.  `response.json()`: `Response` 객체의 바디(body)를 읽어, 순수한 JavaScript 객체로 파싱(변환)하는 Promise를 반환합니다.

### 4.1. Promise (`.then`) 방식

```javascript
function getPostById(postId) {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  fetch(url)
    .then((response) => {
      // 1. fetch의 첫 번째 응답(Response 객체)을 받음
      if (!response.ok) {
        // 응답 상태가 200-299 범위가 아닐 경우 에러 처리
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // 2. Response 객체의 body를 JSON으로 파싱하여 다음 then으로 넘김
      return response.json();
    })
    .then((data) => {
      // 3. 최종적으로 파싱된 데이터(JavaScript 객체)를 사용
      console.log(data);
    })
    .catch((error) => {
      // 네트워크 오류나 위의 throw new Error()에서 발생한 에러를 처리
      console.error(`에러 발생: ${error}`);
    });
}

getPostById(1);
```

### 4.2. `async/await` 방식

`async/await`를 사용하면 Promise 체이닝을 동기 코드처럼 더 간결하고 읽기 쉽게 작성할 수 있습니다.

```javascript
async function getPostById(postId) {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  try {
    // 1. fetch 요청 후 Response 객체를 기다림
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 2. JSON 파싱이 완료될 때까지 기다림
    const data = await response.json();

    // 3. 최종 데이터를 사용
    console.log(data);
  } catch (error) {
    // 네트워크 오류나 try 블록 내에서 발생한 에러를 처리
    console.error(`에러 발생: ${error}`);
  }
}

getPostById(1);
```

---

## 5. 결론

-   `fetch`는 페이지 이동 없이 서버와 동적으로 데이터를 주고받을 수 있는 강력한 Web API입니다.
-   Promise를 기반으로 동작하므로, `.then()` 체이닝 또는 `async/await`를 사용하여 비동기 코드를 체계적으로 관리할 수 있습니다.
-   전통적인 `<form>` 방식과 달리, `fetch`를 사용하면 SPA(Single Page Application)와 같이 사용자 경험이 뛰어난 동적 웹 페이지를 구현할 수 있습니다.
