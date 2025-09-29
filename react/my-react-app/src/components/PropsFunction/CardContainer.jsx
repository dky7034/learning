import React from "react";
import Card from "./Card";

export default function CardContainer() {
  function handleClick(user) {
    console.log("유저 정보 출력:");
    console.log(`이름: ${user["name"]}, 나이: ${user["age"]}`);
  }
  const user = { name: "홍길동", age: 20 };
  return (
    <div>
      <Card user={user} onClick={handleClick}></Card>
    </div>
  );
}
