# Axios Instance와 API 요청 함수 분리 가이드

이 문서는 `axios` 인스턴스를 생성하여 API 요청을 효율적으로 관리하고, 관련 함수를 모듈로 분리하여 코드의 재사용성과 유지보수성을 높이는 방법을 상세히 설명합니다.

## 목차

1.  [Axios Instance란?](#1-axios-instance란)
2.  [Axios Instance 생성 및 설정](#2-axios-instance-생성-및-설정)
    - [기본 구조 및 디렉토리](#기본-구조-및-디렉토리)
    - [공통 설정: `baseURL`, `headers`, `timeout`](#공통-설정-baseurl-headers-timeout)
3.  [인터셉터(Interceptors) 활용](#3-인터셉터interceptors-활용)
    - [요청 인터셉터(Request Interceptor)](#요청-인터셉터request-interceptor)
    - [응답 인터셉터(Response Interceptor)](#응답-인터셉터response-interceptor)
4.  [API 요청 함수 분리](#4-api-요청-함수-분리)
    - [분리 전: 컴포넌트 내 직접 요청](#분리-전-컴포넌트-내-직접-요청)
    - [분리 후: API 모듈을 통한 요청](#분리-후-api-모듈을-통한-요청)
5.  [결론](#5-결론)

---

## 1. Axios Instance란?

Axios 인스턴스는 **공통 설정(기본 URL, 헤더, 타임아웃 등)을 미리 지정**해놓고 여러 곳에서 재사용할 수 있는 `axios` 객체입니다.

### 필요성

- **일관성**: 프로젝트 전반에 걸쳐 API 요청의 기본 설정을 동일하게 유지할 수 있습니다.
- **효율성**: 반복적인 URL, 헤더, 인증 토큰 설정을 매번 작성할 필요가 없습니다.
- **중앙 관리**: API 관련 설정 변경이 필요할 때, 인스턴스가 정의된 한 곳만 수정하면 되므로 유지보수가 용이합니다.
- **공통 처리**: 요청/응답에 대한 공통 로직(예: 인증 토큰 추가, 에러 처리)을 인터셉터를 통해 자동화할 수 있습니다.

## 2. Axios Instance 생성 및 설정

### 기본 구조 및 디렉토리

API 관련 로직을 별도의 디렉토리에서 관리하는 것이 일반적입니다.

```
📁 src/
├── ⚛️ App.jsx
└── 📁 api/
    └── 📝 index.js  // Axios 인스턴스 설정 파일
```

### 공통 설정: `baseURL`, `headers`, `timeout`

`axios.create()` 메서드를 사용하여 인스턴스를 생성합니다.

```javascript
// src/api/index.js
import axios from "axios";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  // 1. 기본 URL 설정
  // 요청 URL 앞에 자동으로 붙는 부분입니다.
  baseURL: "https://dummyjson.com",

  // 2. 공통 헤더 설정
  headers: {
    "Content-Type": "application/json", // 서버에 전송하는 데이터 형식
    Accept: "application/json", // 서버로부터 받고 싶은 데이터 형식
  },

  // 3. 요청 제한 시간 설정
  // 요청이 5000ms(5초) 이상 걸리면 에러가 발생합니다.
  timeout: 5000,
});

// 생성한 인스턴스를 다른 파일에서 사용할 수 있도록 내보냅니다.
export default axiosInstance;
```

## 3. 인터셉터(Interceptors) 활용

인터셉터는 모든 요청(`request`)과 응답(`response`)을 가로채 원하는 작업을 자동으로 수행하게 하는 강력한 기능입니다.

### 요청 인터셉터(Request Interceptor)

요청을 서버로 보내기 **직전**에 실행됩니다. 주로 인증 토큰 추가, API 키 삽입 등의 용도로 사용됩니다.

**예시: 모든 요청에 인증 토큰 추가하기**

```javascript
// src/api/index.js

// ... (axiosInstance 생성 코드)

axiosInstance.interceptors.request.use(
  // 요청 성공 직전 실행될 함수
  (config) => {
    // 로컬 스토리지 등에서 인증 토큰을 가져옵니다.
    const token = localStorage.getItem("accessToken"); // 예시

    // 토큰이 존재하면 Authorization 헤더에 추가합니다.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 수정된 config 객체를 반환해야 요청이 정상적으로 진행됩니다.
    return config;
  },
  // 요청 실패 시 실행될 함수
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

### 응답 인터셉터(Response Interceptor)

서버로부터 응답을 받은 **직후**에 실행됩니다. 응답 데이터를 가공하거나, 공통 에러 처리를 하는 데 유용합니다.

**예시: 응답 데이터 가공 및 공통 에러 처리**

```javascript
// src/api/index.js

// ... (axiosInstance 생성 및 요청 인터셉터 코드)

axiosInstance.interceptors.response.use(
  // 응답 성공 직후 실행될 함수
  (response) => {
    // 대부분의 경우 실제 데이터는 response.data 안에 있습니다.
    // 이 값을 바로 반환하여 컴포넌트에서 .data 접근을 생략할 수 있게 합니다.
    return response.data;
  },
  // 응답 실패 시 실행될 함수
  (error) => {
    // HTTP 상태 코드에 따른 공통 에러 처리
    if (error.response) {
      switch (error.response.status) {
        case 401: // Unauthorized: 인증되지 않은 사용자
          console.error("401 Unauthorized: 인증 오류");
          alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
          // window.location.href = "/login"; // 로그인 페이지로 리디렉션
          break;
        case 500: // Internal Server Error: 서버 내부 오류
          console.error("500 Internal Server Error: 서버 오류");
          alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
          break;
        default:
          console.error(`Error ${error.response.status}:`, error.response.data);
      }
    }
    // 처리된 에러를 반환하여 각 API 호출에서 추가적인 처리를 할 수 있게 합니다.
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

## 4. API 요청 함수 분리

컴포넌트 내부에 API 요청 로직이 흩어져 있으면 코드가 복잡해지고 재사용이 어렵습니다. 기능별로 API 요청 함수를 분리하여 관리하는 것이 좋습니다.

### 분리 전: 컴포넌트 내 직접 요청

`useEffect` 내에서 `axios`를 직접 사용하여 API를 호출하는 방식은 컴포넌트를 비대하게 만듭니다.

```javascript
// components/DummyJSON/ProductList.jsx (Before)
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      // API 요청 로직이 컴포넌트 내에 존재
      const res = await axios.get(`https://dummyjson.com/products`);
      setProducts(res.data.products);
    }
    getProducts();
  }, []);

  // ... (return 문)
}
```

### 분리 후: API 모듈을 통한 요청

기능(Domain)별로 API 요청 함수 파일을 만들고, `axiosInstance`를 사용하여 요청을 보냅니다.

**1. 디렉토리 구조**

```
📁 src/
├── ⚛️ App.jsx
├── 📁 api/
│   ├── 📝 index.js       // Axios 인스턴스
│   ├── 📝 products.js    // 상품 관련 API 함수
│   └── 📝 recipes.js      // 레시피 관련 API 함수
└── 📁 components/
    └── 📁 DummyJSON/
        ├── ⚛️ ProductList.jsx
        └── ⚛️ RecipeList.jsx
```

**2. API 요청 함수 모듈화 (`products.js`)**

```javascript
// src/api/products.js
import axiosInstance from "."; // 설정된 axios 인스턴스 가져오기

export const productAPI = {
  // 모든 상품 조회
  getProducts: async () => {
    // 응답 인터셉터에서 response.data를 반환하므로, 여기서는 바로 products를 받을 수 있습니다.
    const { products } = await axiosInstance.get("/products");
    return products;
  },
  // 특정 상품 조회
  getProduct: async (id) => {
    const product = await axiosInstance.get(`/products/${id}`);
    return product;
  },
  // 상품 검색
  searchProducts: async (query) => {
    const { products } = await axiosInstance.get(`/products/search?q=${query}`);
    return products;
  },
};
```

**3. 리팩토링된 컴포넌트 (`ProductList.jsx`)**

컴포넌트는 이제 어떤 API를 호출하는지에만 집중하며, 코드가 훨씬 간결해집니다.

```javascript
// components/DummyJSON/ProductList.jsx (After)
import { useEffect, useState } from "react";
// 분리된 API 요청 함수를 가져옵니다.
import { productAPI } from "../../api/products";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // API 모듈의 함수를 호출
        const fetchedProducts = await productAPI.getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 5. 결론

`axios` 인스턴스와 API 함수 분리 패턴을 적용하면 다음과 같은 장점을 얻을 수 있습니다.

- **코드 가독성 및 구조 개선**: 컴포넌트는 UI에만 집중하고, 데이터 통신 로직은 API 레이어에 위임됩니다.
- **재사용성 극대화**: 동일한 API 요청이 여러 컴포넌트에서 필요할 때, 함수 호출만으로 재사용할 수 있습니다.
- **손쉬운 유지보수**: API 서버 주소 변경, 인증 방식 수정 등 공통 로직 변경이 필요할 때 `api/index.js` 파일 하나만 수정하면 프로젝트 전체에 적용됩니다.

이러한 구조는 프로젝트의 규모가 커질수록 더욱 중요해지므로, 초기 단계부터 도입하는 것을 적극 권장합니다.
