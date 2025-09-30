import React from "react";

export default function Form(props) {
  const { onSubmit, onChange } = props;
  return (
    <>
      <h1 className="text-2xl font-bold">FormInput</h1>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <input
          type="text"
          className="border-2 border-gray-300 rounded-md p-2"
          name="name"
          placeholder="이름"
          onChange={(e) => {
            onchange(e);
          }}
        />
        <input
          type="email"
          className="border-2 border-gray-300 rounded-md p-2"
          name="email"
          placeholder="이메일"
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          className="border-2 border-gray-300 rounded-md p-2"
          name="password"
          placeholder="비밀번호"
          onChange={(e) => onChange(e)}
        />
        <button className="bg-blue-500 text-white rounded-md p-2" type="submit">
          제출
        </button>
      </form>
    </>
  );
}
