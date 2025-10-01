import React from "react";
import { useState } from "react";

export default function Form() {
  // 입력 요소를 객체로 관리할 상태
  const [form, setForm] = useState({
    username: "",
    age: 0,
    email: "",
  });

  // 상태가 변경되어야 리렌더링됨
  // event 객체: 발생한 이벤트의 정보를 속성으로 저장한 객체
  function handleChange(event) {
    const target = event.target;
    console.log(target);
    // target에서 name 속성과 value 속성 꺼내서 출력
    const { name, value } = target;

    // age는 숫자로 변환
    const finalValue = name === "age" ? Number(value) : value;

    setForm({ ...form, [name]: finalValue });
  }

  return (
    <div>
      <form>
        {/* 3개의 input 요소의 값을 상태로 관리 */}
        <input
          className="border-2"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="border-2"
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />
        <input
          className="border-2"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
