import React, { useState } from "react";

// submit 이벤트는 form 태그만 발생
export default function OnSubmit() {
  const [email, setEmail] = useState("");

  // submit 이벤트 핸들러 함수
  function handleSubmit(e) {
    e.preventDefault(); // 브라우저의 기본 submit 동작 막기
    console.log("제출된 이메일: ", email);
    alert("제출!");
  }
  return (
    <div>
      <form
        onSubmit={() => {
          handleSubmit();
        }}
      >
        <input
          type="text"
          name="email"
          placeholder="이메일 입력"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="border-2"
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="비밀번호 입력"
          className="border-2"
        />
        <br />
        <input type="submit" value="제출" className="border-2" />
      </form>
    </div>
  );
}
