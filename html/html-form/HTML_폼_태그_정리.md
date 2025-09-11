# HTML 폼(Form) 태그

## 개요

이 문서는 사용자로부터 정보를 입력받고 웹 서버로 전송하는 HTML 폼(Form) 태그의 구조와 사용법을 설명합니다. 이 문서를 통해 다음을 학습할 수 있습니다.

- 폼 태그의 역할과 기본 구조
- 다양한 입력 창들의 특징과 사용법
- 실제 웹사이트에서 활용할 수 있는 폼 만드는 방법

### 사전 학습

- HTML 기본 개념

---

## 폼(Form) 태그

사용자로부터 정보를 입력받고 웹 서버로 전송하는 데 사용되는 핵심 태그입니다.

### 폼 태그 역할

- **사용자 정보 입력**: 회원가입, 로그인, 검색, 글 작성, 결제 등 사용자가 웹사이트에 데이터를 입력할 수 있는 모든 인터페이스를 만듭니다.
- **데이터 전송**: 입력된 정보를 지정된 웹 서버 주소로 전송합니다.
- **요소 그룹화**: 여러 개의 입력(`input`) 요소들을 하나의 단위로 묶어 관리합니다.

### 기본 구조

```html
<form action="정보를 보낼 주소" method="보내는 방식">
  <!-- 다양한 입력 요소들 -->
</form>
```

- `action`: 입력된 정보(데이터)가 전송될 서버의 주소(URL)를 명시합니다.
- `method`: 데이터를 보내는 방식을 지정합니다. (예: `GET`, `POST`)

---

## 입력(input) 태그

사용자가 정보를 입력할 수 있는 다양한 종류의 필드를 만드는 태그입니다. `type` 속성에 따라 모양과 기능이 달라집니다.

### 기본 구조 및 주요 속성

```html
<input type="입력_종류" name="입력_이름" value="기본값" />
```

- `type`: 입력 필드의 종류를 결정합니다. (예: `text`, `password`, `checkbox`)
- `name`: 입력된 데이터에 이름을 부여하는 역할을 합니다. 서버로 데이터를 전송할 때, `name`을 키(key)로, 입력된 내용을 값(value)으로 하여 전송합니다.
- `value`: 입력 필드에 미리 표시할 기본 값입니다.
- `placeholder`: 사용자가 어떤 내용을 입력해야 하는지 알려주는 안내 문구를 표시합니다.
- `required`: 해당 필드를 필수 입력 항목으로 지정합니다.

### 입력 태그 종류

#### 1. 글자 입력 태그

| Type       | 설명                                      | 예시                                                             |
| :--------- | :---------------------------------------- | :--------------------------------------------------------------- |
| `text`     | 일반적인 한 줄 글자 입력                  | `<input type="text" name="username" placeholder="사용자명">`     |
| `password` | 비밀번호 입력 (입력 내용이 마스킹 처리됨) | `<input type="password" name="password" placeholder="비밀번호">` |
| `email`    | 이메일 형식 입력 (형식 유효성 검사)       | `<input type="email" name="email" placeholder="이메일">`         |
| `number`   | 숫자만 입력                               | `<input type="number" name="age" min="1" max="100">`             |
| `tel`      | 전화번호 입력                             | `<input type="tel" name="phone" placeholder="전화번호">`         |
| `url`      | 웹 주소(URL) 입력                         | `<input type="url" name="website" placeholder="웹사이트 주소">`  |

#### 2. 선택 입력 태그

- **`checkbox`**: 여러 항목 중에서 원하는 모든 항목을 선택할 수 있습니다.

  ```html
  <input type="checkbox" id="hobby1" name="hobbies" value="reading" />
  <label for="hobby1">독서</label>
  <input type="checkbox" id="hobby2" name="hobbies" value="music" />
  <label for="hobby2">음악 감상</label>
  ```

- **`radio`**: 여러 항목 중에서 단 하나만 선택할 수 있습니다. `name` 속성을 동일하게 지정해야 하나의 그룹으로 묶입니다.
  ```html
  <input type="radio" id="male" name="gender" value="male" />
  <label for="male">남성</label>
  <input type="radio" id="female" name="gender" value="female" />
  <label for="female">여성</label>
  ```

#### 3. 기타 입력 태그

| Type     | 설명                                                      | 예시                                                        |
| :------- | :-------------------------------------------------------- | :---------------------------------------------------------- |
| `file`   | 로컬 컴퓨터의 파일을 선택                                 | `<input type="file" name="profile_image" accept="image/*">` |
| `hidden` | 화면에 보이지 않지만, 서버로 데이터를 전송해야 할 때 사용 | `<input type="hidden" name="user_id" value="12345">`        |
| `date`   | 날짜 선택 (년, 월, 일)                                    | `<input type="date" name="birth_date">`                     |
| `time`   | 시간 선택 (시, 분)                                        | `<input type="time" name="meeting_time">`                   |

---

## `<input>` 외 관련 태그

### 긴 글 입력(textarea) 태그

여러 줄의 긴 텍스트를 입력받을 때 사용합니다.

```html
<label for="message">메시지:</label>
<textarea
  id="message"
  name="message"
  rows="5"
  cols="50"
  placeholder="메시지를 입력하세요"
></textarea>
```

- `rows`: 한 번에 보여줄 줄의 개수
- `cols`: 한 번에 보여줄 글자의 개수 (한 줄 기준)

### 선택 목록(select) 태그

여러 선택지 중에서 하나 또는 그 이상을 선택할 수 있는 드롭다운 목록을 만듭니다.

```html
<label for="country">국가 선택:</label>
<select id="country" name="country">
  <option value="">국가를 선택하세요</option>
  <option value="kr">대한민국</option>
  <option value="us">미국</option>
  <option value="jp">일본</option>
  <option value="cn">중국</option>
</select>
```

- `multiple` 속성을 추가하면 `Ctrl` 또는 `Cmd` 키를 눌러 여러 항목을 선택할 수 있습니다.

### 버튼(button) 태그

폼과 관련된 동작을 수행하는 버튼을 만듭니다.

```html
<!-- 폼에 입력된 데이터를 'action' 속성에 지정된 주소로 제출 -->
<button type="submit">제출</button>

<!-- 폼에 입력된 모든 내용을 초기화 -->
<button type="reset">초기화</button>
```

---

## 라벨(label) 태그

입력 필드가 어떤 역할을 하는지 설명하는 텍스트입니다. `for` 속성을 사용하여 어떤 입력 필드와 연결되어 있는지 명시하는 것이 중요합니다.

### 기본 구조

```html
<label for="username">사용자명:</label>
<input type="text" id="username" name="username" />
```

- `for` 속성의 값은 연결할 입력 요소의 `id` 속성 값과 동일해야 합니다.
- 라벨을 사용하면 사용자가 라벨 텍스트를 클릭해도 해당 입력 필드가 활성화되므로 사용자 경험과 웹 접근성이 향상됩니다.
