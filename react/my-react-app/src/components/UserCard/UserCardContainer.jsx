import React from "react";
import UserCard from "./UserCard";

export default function Main() {
  function handleClick(name, age, email) {
    alert(`${name}님의 나이는 ${age}세이고, 이메일은 ${email}입니다.`);
  }

  const userData = {
    name: "김철수",
    age: 28,
    email: "kimcs@example.com",
    profileImage: `https://picsum.photos/id/237/200/300`,
  };

  const userData2 = {
    name: "이영희",
    age: 25,
    email: "leeyh@example.com",
    profileImage: `https://picsum.photos/id/238/200/300`,
  };

  const userData3 = {
    name: "홍길동",
    age: 30,
    email: "parkcs@example.com",
    profileImage: `https://picsum.photos/id/239/200/300`,
  };

  return (
    <>
      <UserCard userData={userData} onClick={handleClick} />
      <UserCard userData={userData2} onClick={handleClick} />
      <UserCard userData={userData3} onClick={handleClick} />
    </>
  );
}
