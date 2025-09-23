# axios 라이브러리 가이드: 더 쉽고 강력한 API 요청

이 문서는 `fetch` API보다 더 많은 편의 기능과 강력한 성능을 제공하는 HTTP 클라이언트 라이브러리, `axios`에 대해 설명합니다. 설치부터 기본 사용법, 그리고 실제 API를 호출하여 응답 데이터를 가공하는 실전 예제까지 단계별로 학습합니다.

---

## 1. 사전 학습

-   JavaScript 함수 및 비동기 처리 (Promise, async/await)
-   API, `fetch` API에 대한 기본 이해

---

## 2. axios란?

`axios`는 브라우저와 Node.js 환경 모두에서 사용할 수 있는, **Promise 기반의 HTTP 클라이언트 라이브러리**입니다. `fetch` API와 유사한 역할을 하지만, 다음과 같은 여러 가지 장점을 통해 더 편리한 개발 경험을 제공합니다.

-   **자동 JSON 데이터 변환**: `fetch`와 달리 응답 데이터를 자동으로 JSON 객체로 변환해주므로, `.json()` 메서드를 추가로 호출할 필요가 없습니다.
-   **더 나은 에러 처리**: 네트워크 오류뿐만 아니라, `404`나 `500` 같은 HTTP 상태 코드 에러에 대해서도 `catch` 블록에서 처리할 수 있습니다.
-   **요청/응답 인터셉터(Interceptor)**: 요청을 보내기 전이나 응답을 받은 후에 공통 로직(예: 헤더 추가, 로딩 스피너 표시)을 삽입할 수 있습니다.
-   **요청 취소 및 타임아웃 설정** 등 다양한 부가 기능을 지원합니다.

---

## 3. 설치 및 초기 설정

### 3.1. npm으로 설치하기

Node.js 환경에서 `axios`를 사용하려면 먼저 npm(또는 yarn)을 통해 패키지를 설치해야 합니다.

```bash
npm install axios
```

### 3.2. ES 모듈 설정

`import axios from 'axios';`와 같은 ES 모듈 구문을 사용하려면, 프로젝트의 `package.json` 파일에 다음 설정을 추가해야 합니다.

```json
{
  "type": "module"
}
```

---

## 4. `axios` 기본 사용법

`axios`는 HTTP 메서드에 해당하는 다양한 함수(`axios.get()`, `axios.post()` 등)를 제공합니다.

> **`axios` vs `fetch`**: `axios`는 응답 본문(body)이 `response.data`에 자동으로 파싱되어 들어있습니다. `fetch`처럼 `response.json()` 과정을 거칠 필요가 없습니다.

### 4.1. Promise (`.then`) 방식

```javascript
import axios from 'axios';

function getPostById(postId) {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  axios.get(url)
    .then((response) => {
      // 응답 데이터는 response.data에 들어있습니다.
      console.log(response.data);
    })
    .catch((error) => {
      console.error(`에러 발생: ${error}`);
    });
}

getPostById(1);
```

### 4.2. `async/await` 방식

```javascript
import axios from 'axios';

async function getPostById(postId) {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  try {
    const response = await axios.get(url);
    // 응답 데이터는 response.data에 들어있습니다.
    console.log(response.data);
  } catch (error) {
    console.error(`에러 발생: ${error}`);
  }
}

getPostById(1);
```

---

## 5. 실전 예제: DummyJSON API 활용하기

[**DummyJSON**](https://dummyjson.com/)은 개발 연습을 위한 다양한 더미 데이터를 제공하는 무료 API 서비스입니다.

### 5.1. API 통신 테스트

먼저 API 서버와 정상적으로 통신이 되는지 테스트합니다.

```javascript
import axios from "axios";

const BASE_URL = `https://dummyjson.com`;

async function testConnection() {
  try {
    const response = await axios.get(`${BASE_URL}/test`);
    console.log("API 연결 상태:", response.data);
  } catch (error) {
    console.error("연결 실패:", error);
  }
}

testConnection();
```

### 5.2. 상품 데이터 가져오기

#### 모든 상품 목록 조회

```javascript
async function getAllProducts() {
  const response = await axios.get(`${BASE_URL}/products`);
  console.log(response.data);
}

getAllProducts();
```

#### 단일 상품 조회 (Path Parameter)

URL 경로에 상품 ID를 포함하여 특정 상품의 정보만 가져옵니다.

```javascript
async function getProductById(productId) {
  const response = await axios.get(`${BASE_URL}/products/${productId}`);
  console.log(response.data);
}

getProductById(1);
```

#### 상품 검색 (Query Parameter)

`URLSearchParams` 객체를 사용하여 쿼리 파라미터를 안전하고 쉽게 구성할 수 있습니다.

```javascript
async function searchProducts(keyword) {
  const queryParams = new URLSearchParams({ q: keyword });
  const response = await axios.get(`${BASE_URL}/products/search?${queryParams}`);
  console.log(response.data.products);
}

searchProducts("phone");
```

---

## 6. 응답 데이터 다루기 및 가공하기

API로부터 받은 데이터는 대부분 객체나 배열 형태입니다. JavaScript의 내장 메서드를 활용하여 원하는 정보만 추출하거나 가공할 수 있습니다.

### 6.1. 특정 데이터 추출하기

DummyJSON의 `/products` 응답은 `{ products: [...], total: 100, skip: 0, limit: 30 }` 형태의 객체입니다.

#### 상품 목록(`products` 배열)만 추출

```javascript
async function getProductsArray() {
  const response = await axios.get(`${BASE_URL}/products`);
  const products = response.data.products;
  console.log(products);
}

getProductsArray();
```

#### 총 상품 개수(`total`)만 추출

```javascript
async function getTotalCount() {
  const response = await axios.get(`${BASE_URL}/products`);
  const total = response.data.total;
  console.log(`총 상품 개수: ${total}`);
}

getTotalCount();
```

### 6.2. 배열 고차 메서드로 데이터 가공하기

`map()`, `filter()` 등의 배열 고차 메서드를 사용하면 데이터를 매우 효율적으로 가공할 수 있습니다.

#### 모든 상품의 `title`만 추출하여 새로운 배열 만들기

```javascript
async function getProductTitles() {
  const response = await axios.get(`${BASE_URL}/products`);
  const titles = response.data.products.map((product) => product.title);
  console.log(titles);
}

getProductTitles();
```

#### 여러 속성(`title`, `price`)만 추출하여 객체 배열 만들기

```javascript
async function getProductSummaries() {
  const response = await axios.get(`${BASE_URL}/products`);
  const summaries = response.data.products.map((product) => ({
    title: product.title,
    price: product.price,
  }));
  console.log(summaries);
}

getProductSummaries();
```

#### 가격이 $50 미만인 상품만 필터링하기

```javascript
async function getCheapProducts() {
  const response = await axios.get(`${BASE_URL}/products`);
  const cheapProducts = response.data.products.filter(
    (product) => product.price < 50
  );
  console.log(cheapProducts);
}

getCheapProducts();
```
