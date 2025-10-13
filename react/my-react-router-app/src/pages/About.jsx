import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1 className="font-bold text-4xl">소개페이지</h1>
      <Link to={"/"}>홈</Link>
      <br />
      <Link to="/about">소개</Link>
      <br />
      <Link to="/profile">프로필</Link>
    </div>
  );
}
