import axios from "axios";

// 도메인 주소
const BASE_URL = "https://dummyjson.com";

// async 화살표 함수
const testRoute = async () => {
  const data = await axios.get(`${BASE_URL}/test`);
  console.log(data["data"]);
};
// testRoute();

// 모든 상품 목록 조회
async function getAllProducts() {
  const response = await axios.get(`${BASE_URL}/products`);
  const data = response["data"];
  const products = data["products"];
  console.log(products);
}
// getAllProducts();

// 단일 상품 조회
async function getProductById(productId) {
  const response = await axios.get(`${BASE_URL}/products/${productId}`);
  console.log(response.data);
}
// getProductById(1);

// 상품 검색
async function searchProducts(keyword) {
  const queryParams = new URLSearchParams({ q: keyword });
  const response = await axios.get(
    `${BASE_URL}/products/search?${queryParams}`
  );
  console.log(response.data.products);
}
// searchProducts("phone");

// 상품 목록의 객체 키 추출
async function getAllProductsExtractObjectKeys() {
  const res = await axios.get(`${BASE_URL}/products`);
  const data = res["data"];
  console.log(Object.keys(data));
}
// getAllProductsExtractObjectKeys();

// 상품 목록의 객체 키-값 쌍 추출
async function getAllProductsExtractObjKeyAndValue() {
  const res = await axios.get(`${BASE_URL}/products`);
  const data = res["data"];
  console.log(Object.entries(data));
  return res;
}
// getAllProductsExtractObjKeyAndValue();

// 상품 정보 추출
async function getProductsData() {
  const res = await axios.get(`${BASE_URL}/products`);

  const products = res["data"]["products"];
  console.log(products);
}
// getProductsData();

// 상품 개수 추출
async function getProductTotalCount() {
  const res = await axios.get(`${BASE_URL}/products`);
  const data = res["data"];
  console.log(data["total"]);
}
// getProductTotalCount();

// 특정 속성 추출
async function getProductProperty(propertyName) {
  const res = await axios.get(`${BASE_URL}/products`);
  const data = res["data"];
  const values = data["products"].map((product) => product[propertyName]);
  console.log(values);
}
// getProductProperty("title");

// 여러 속성 추출
async function getProductProperties(propertyNames) {
  const res = await axios.get(`${BASE_URL}/products`);
  const data = res["data"];
  const extractedData = data["products"].map((product) => {
    const result = {};
    propertyNames.forEach((prop) => {
      result[prop] = product[prop];
    });
    return result;
  });
  console.log(extractedData);
}
// getProductProperties(["title", "price", "description"]);

// 특정 속성이 특정 값 미만인 상품 추출
async function getFilterdproducts(propertyName, value) {
  const res = await axios.get(`${BASE_URL}/products`);
  const data = res["data"];
  const filterdProducts = data["products"].filter(
    (product) => product[propertyName] < value
  );
  console.log(filterdProducts);
}
getFilterdproducts("price", 10);
