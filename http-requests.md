# POST, PUT, DELETE 요청

## 개요

이 문서는 HTTP 프로토콜의 POST, PUT, DELETE 요청에 대해 설명합니다.

### 학습 목표

- HTTP 요청 메서드의 종류와 용도를 이해합니다.
- `axios` 라이브러리를 사용하여 POST, PUT, DELETE 요청을 보내는 방법을 학습합니다.

### 사전 학습

- JavaScript 기본 문법
- HTTP 프로토콜의 기본 개념

---

## HTTP 요청 메서드

클라이언트가 서버에 요청을 보낼 때 사용하는 방법으로 각 메서드는 특정한 목적과 용도를 가집니다.

- **GET**: 자원(데이터) 조회
- **POST**: 자원(데이터) 생성
- **PUT**: 자원(데이터) 전체 수정
- **PATCH**: 자원(데이터) 일부 수정
- **DELETE**: 자원(데이터) 삭제

---

## POST 요청

서버에 새로운 자원(데이터)을 생성할 때 사용합니다.

- **요청**: 요청 본문(Body)에 생성할 데이터를 객체로 지정합니다.
- **응답**: 서버는 요청을 처리한 후, 생성된 데이터를 응답에 담아서 반환합니다.

### `<form>` 태그로 POST 요청 보내기

- **요청 API**: [DummyJSON - Add a new product](https://dummyjson.com/docs/products#products-add)

```html
<!DOCTYPE html>
<html>
  <body>
    <form
      id="product-form"
      action="https://dummyjson.com/products/add"
      method="POST"
    >
      <input type="text" name="title" placeholder="Product Title" required />
      <input type="number" name="price" placeholder="Product Price" required />
      <!-- 그 밖의 상품의 정보: category, description, stock, brand, ... -->
      <button type="submit">상품 생성</button>
    </form>
  </body>
</html>
```

### `axios`로 POST 요청 보내기

```javascript
import axios from "axios";

async function postProduct(config) {
  const response = await axios(config);
  console.log("추가된 상품:", response["data"]);
}

const config = {
  method: "post", // HTTP 메서드
  url: `https://dummyjson.com/products/add`, // 요청 API 주소
  headers: { "Content-Type": "application/json" }, // 요청 헤더
  data: {
    title: "갤럭시 S99",
    price: 9999999,
    // 그 밖의 상품의 정보...
  }, // 요청 본문(Body)
};

postProduct(config);
```

---

## PUT 요청

서버의 기존 자원(데이터)을 **전체 수정**할 때 사용합니다.

- **요청**:
  - URL에 수정할 자원의 식별자(ID)를 지정합니다.
  - 요청 본문(Body)에 수정할 데이터를 객체로 지정합니다.
- **응답**: 서버는 요청을 처리한 후, 수정된 데이터를 응답에 담아서 반환합니다.
- **참고**: `<form>` 태그는 PUT 요청을 지원하지 않습니다.

### `axios`로 PUT 요청 보내기

- **요청 API**: [DummyJSON - Update a product](https://dummyjson.com/docs/products#products-update)

```javascript
import axios from "axios";

async function putProduct(config) {
  const response = await axios(config);
  console.log("수정된 상품:", response["data"]);
}

const productId = 1; // 수정할 상품의 id

const config = {
  method: "put", // HTTP 메서드
  url: `https://dummyjson.com/products/${productId}`, // 요청 API 주소
  headers: { "Content-Type": "application/json" }, // 요청 헤더
  data: {
    title: "아이폰 99",
    // 그 밖의 상품의 정보...
  }, // 요청 본문(Body)
};

putProduct(config);
```

---

## DELETE 요청

서버의 기존 자원(데이터)을 삭제할 때 사용합니다.

- **요청**: URL에 삭제할 자원의 식별자(ID)를 지정합니다.
- **응답**: 일반적으로 서버는 요청을 처리한 후, 삭제 성공 여부를 응답에 담아서 반환합니다.
- **참고**: `<form>` 태그는 DELETE 요청을 지원하지 않습니다.

### `axios`로 DELETE 요청 보내기

- **요청 API**: [DummyJSON - Delete a product](https://dummyjson.com/docs/products#products-delete)

```javascript
import axios from "axios";

async function deleteProduct(config) {
  const response = await axios(config);
  console.log("상태 코드:", response["status"]);
  console.log("삭제된 상품 정보:", response["data"]);
}

const productId = 1; // 삭제할 상품의 id

const config = {
  method: "delete", // HTTP 메서드
  url: `https://dummyjson.com/products/${productId}`, // 요청 API 주소
};

deleteProduct(config);
```
