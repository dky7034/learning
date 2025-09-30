import React from "react";

export default function LoginStatus({ isLogin, userName }) {
  return (
    <div>
      <p>로그인 상태: {isLogin ? "로그인" : "비로그인"} 상태</p>
      {isLogin && <p>환영합니다! {userName}님</p>}
    </div>
  );
}
