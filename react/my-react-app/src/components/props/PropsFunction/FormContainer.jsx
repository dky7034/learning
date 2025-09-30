import React from "react";
import Form from "./Form";

export default function FormContainer() {
  // 폼 제출 이벤트 처리 함수
  function handleSubmit(event) {
    // form 태그 내부 입력 요소들을 구조 분해 할당으로 각 요소를 변수에 할당
    const { name, email, password } = event["target"]["elements"];

    // 각 입력 요소의 입력 값 출력
    alert(
      `이름: ${name["value"]}, 이메일: ${email["value"]}, 비밀번호: ${password["value"]}`
    );
    event.preventDefault();
  }

  // 입력 요소의 값 변경 이벤트 처리 함수
  function handleChange(event) {
    console.log(event["target"]["value"]);
  }
  return (
    <>
      <h1 className="text-2xl font-bold">FormContainer</h1>
      <Form onSubmit={handleSubmit} onChange={handleChange}></Form>
    </>
  );
}
