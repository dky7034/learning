# JavaScript Web Storage

## 개요

이 문서는 웹 브라우저의 **웹 스토리지(Web Storage)** 사용법을 상세히 설명합니다. 웹 스토리지는 웹 브라우저가 데이터를 `key-value` 쌍으로 저장할 수 있는 공간을 제공하며, 이를 통해 웹 애플리케이션의 상태를 유지하거나 사용자 데이터를 클라이언트에 저장할 수 있습니다.

### 학습 목표

- 로컬 스토리지와 세션 스토리지의 차이점을 이해합니다.
- 각 스토리지의 사용 사례를 학습합니다.
- JavaScript를 사용하여 스토리지를 조작(저장, 조회, 삭제)하는 방법을 익힙니다.

### 사전 학습

- JavaScript 함수
- JavaScript 객체

---

## 웹 스토리지란?

웹 스토리지는 **로컬 스토리지(Local Storage)**와 **세션 스토리지(Session Storage)**로 나뉩니다. 두 스토리지 모두 데이터를 브라우저에 저장하지만, 데이터의 생명 주기와 범위에서 차이가 있습니다.

### 1. 로컬 스토리지 (Local Storage)

- **영구성**: 사용자가 직접 삭제하지 않는 한 데이터가 **영구적으로** 보관됩니다.
- **범위**: 브라우저를 닫거나 컴퓨터를 재부팅해도 데이터가 유지됩니다.
- **활용 사례**:
  - 사용자의 테마 설정 (다크 모드/라이트 모드)
  - 장바구니에 담은 상품 목록
  - 자동 로그인 정보

### 2. 세션 스토리지 (Session Storage)

- **생명 주기**: 브라우저 **세션이 유지되는 동안**만 데이터가 보관됩니다.
- **범위**: 브라우저 탭이나 창을 닫으면 데이터가 **자동으로 삭제**됩니다.
- **특징**: 같은 도메인이라도 다른 탭 간에 데이터가 공유되지 않습니다.
- **활용 사례**:
  - 여러 페이지에 걸친 폼 데이터 임시 저장
  - 현재 세션에서만 유효한 사용자 상태 정보 (예: 일회성 알림 닫음 여부)
  - 페이지 간의 간단한 데이터 전달

---

## 웹 브라우저에서 스토리지 확인하기

1.  웹 페이지에서 **개발자 도구**를 엽니다. (단축키: `F12` 또는 `Ctrl+Shift+I` / `Cmd+Option+I`)
2.  **Application** (애플리케이션) 탭을 선택합니다.
3.  좌측 메뉴의 **Storage** 섹션에서 **Local Storage** 또는 **Session Storage**를 선택하여 저장된 데이터를 확인할 수 있습니다.

---

## 스토리지 사용법

로컬 스토리지와 세션 스토리지는 동일한 API 메서드를 사용합니다. 각각 `localStorage`와 `sessionStorage`라는 전역 객체를 통해 접근할 수 있습니다.

### 데이터 저장: `setItem()`

키(key)와 값(value)을 사용하여 데이터를 저장합니다. 값은 반드시 문자열 형태여야 합니다. 객체나 배열을 저장하려면 `JSON.stringify()`를 사용해 문자열로 변환해야 합니다.

```javascript
// 로컬 스토리지
localStorage.setItem("username", "JohnDoe");

// 세션 스토리지
const user = { id: 1, theme: "dark" };
sessionStorage.setItem("userSettings", JSON.stringify(user));
```

### 데이터 조회: `getItem()`

키(key)를 사용하여 저장된 값을 조회합니다. 키에 해당하는 값이 없으면 `null`을 반환합니다. `JSON.parse()`를 사용하여 문자열을 다시 객체나 배열로 변환할 수 있습니다.

```javascript
// 로컬 스토리지
const username = localStorage.getItem("username"); // "JohnDoe"

// 세션 스토리지
const userSettingsString = sessionStorage.getItem("userSettings");
const userSettings = JSON.parse(userSettingsString); // { id: 1, theme: 'dark' }
```

### 데이터 삭제: `removeItem()`

특정 키(key)를 지정하여 해당 데이터를 삭제합니다.

```javascript
// 로컬 스토리지에서 'username' 삭제
localStorage.removeItem("username");

// 세션 스토리지에서 'userSettings' 삭제
sessionStorage.removeItem("userSettings");
```

### 모든 데이터 삭제: `clear()`

해당 스토리지의 모든 데이터를 한 번에 삭제합니다.

```javascript
// 로컬 스토리지의 모든 데이터 삭제
localStorage.clear();

// 세션 스토리지의 모든 데이터 삭제
sessionStorage.clear();
```

---

## 로컬 스토리지와 세션 스토리지 비교 예제

다음은 로컬 스토리지와 세션 스토리지의 동작을 직접 테스트해볼 수 있는 예제 코드입니다.

### 예제 테스트 방법

이 예제를 통해 두 스토리지의 가장 큰 차이점인 **데이터의 영속성**을 확인할 수 있습니다.

1.  **데이터 저장**:
    -   '로컬 스토리지'와 '세션 스토리지' 양쪽에 각각 키와 값을 입력하고 '저장' 버튼을 누릅니다.
    -   개발자 도구의 Application 탭에서 두 스토리지에 데이터가 정상적으로 저장되었는지 확인합니다.

2.  **세션 스토리지 테스트 (탭 종료)**:
    -   현재 브라우저 **탭을 닫았다가 다시 엽니다.**
    -   이전에 입력했던 키를 사용하여 각 스토리지의 '조회' 버튼을 눌러봅니다.
    -   **결과**: 로컬 스토리지의 데이터는 남아있지만, **세션 스토리지의 데이터는 사라진 것**을 확인할 수 있습니다.

3.  **로컬 스토리지 테스트 (브라우저 종료)**:
    -   브라우저를 완전히 종료한 후 다시 실행하여 같은 페이지에 접속합니다.
    -   로컬 스토리지에 저장했던 키로 '조회' 버튼을 누릅니다.
    -   **결과**: **로컬 스토리지의 데이터는 여전히 남아있음**을 확인할 수 있습니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Local Storage vs Session Storage</title>
  </head>
  <body>
    <h2>로컬 스토리지 (Local Storage)</h2>
    <input type="text" id="localKey" placeholder="키 입력" />
    <input type="text" id="localValue" placeholder="값 입력" />
    <button onclick="setLocalStorage()">저장</button>
    <button onclick="getLocalStorage()">조회</button>

    <hr />

    <h2>세션 스토리지 (Session Storage)</h2>
    <input type="text" id="sessionKey" placeholder="키 입력" />
    <input type="text" id="sessionValue" placeholder="값 입력" />
    <button onclick="setSessionStorage()">저장</button>
    <button onclick="getSessionStorage()">조회</button>

    <script>
      // 로컬 스토리지 함수
      function setLocalStorage() {
        const key = document.getElementById("localKey").value;
        const value = document.getElementById("localValue").value;
        if (key && value) {
          localStorage.setItem(key, value);
          alert(`로컬 스토리지 저장: ${key} = ${value}`);
          document.getElementById("localKey").value = "";
          document.getElementById("localValue").value = "";
        } else {
          alert("키와 값을 모두 입력하세요.");
        }
      }

      function getLocalStorage() {
        const key = document.getElementById("localKey").value;
        if (key) {
          const value = localStorage.getItem(key);
          alert(
            value ? `조회된 값: ${value}` : `키 '${key}'를 찾을 수 없습니다.`
          );
        } else {
          alert("조회할 키를 입력하세요.");
        }
      }

      // 세션 스토리지 함수
      function setSessionStorage() {
        const key = document.getElementById("sessionKey").value;
        const value = document.getElementById("sessionValue").value;
        if (key && value) {
          sessionStorage.setItem(key, value);
          alert(`세션 스토리지 저장: ${key} = ${value}`);
          document.getElementById("sessionKey").value = "";
          document.getElementById("sessionValue").value = "";
        } else {
          alert("키와 값을 모두 입력하세요.");
        }
      }

      function getSessionStorage() {
        const key = document.getElementById("sessionKey").value;
        if (key) {
          const value = sessionStorage.getItem(key);
          alert(
            value ? `조회된 값: ${value}` : `키 '${key}'를 찾을 수 없습니다.`
          );
        } else {
          alert("조회할 키를 입력하세요.");
        }
      }
    </script>
  </body>
</html>
```
