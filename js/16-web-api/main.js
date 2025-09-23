// axios 불러오기
import axios from "axios";

// async/await
async function connectTest() {
  // axios: 데이터 요청에 대한 응답을 반환
  const response = await axios("https://jsonplaceholder.typicode.com/posts/1");
  console.log(response);
  console.table(Object.entries(response));
}
connectTest();
