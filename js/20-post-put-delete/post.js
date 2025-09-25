import axios from "axios";

async function addProduct() {
  // 요청 주소
  const URL = "https://dummyjson.com/products/add";

  // 요청 방법(목적)
  const METHOD = "POST";

  // 요청 본문(body)
  const body = {
    title: "갤럭시 s999",
    category: "스마트폰",
  };

  // 요청 헤더(header)
  const headers = {
    "Content-Type": "application/json",
  };

  // axios 요청 설정 파일
  const config = {
    url: URL,
    method: METHOD,
    headers: headers,
    data: body, // axios에서는 body 대신 data 사용
  };

  try {
    // axios로 API 요청
    const response = await axios(config);
    const { data } = response;
    console.log("응답 데이터:", data);
  } catch (error) {
    console.error("API 요청 실패:", error.message);
  }
}

addProduct();
