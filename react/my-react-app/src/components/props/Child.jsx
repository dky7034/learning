import React from "react";

export default function Child(props) {
  const { name, age } = props;
  return (
    <div>
      <h1>이름: {name}</h1>
      <h1>나이: {age}</h1>
    </div>
  );
}
