// Navigate 컴포넌트 불러오기
import { Navigate } from "react-router-dom";

// useNavigate 훅 불러오기
import { useNavigate } from "react-router-dom";

import React from "react";

export default function Profile() {
  const navigate = useNavigate();

  // 로그인 상태 표시
  const isLogin = true;

  // 로그인 상태가 아니라면
  // "/" 주소로 리다이렉트
  if (isLogin === false) {
    // Navigate는 컴포넌트라서 return 내부에 있어야 함
    // replace 속성: history(사용자가 페이지를 이동한 내역)에 쌓이지 않음
    return <Navigate to="/" replace></Navigate>;
  }

  return (
    <div>
      사용자 정보
      {/* onClick 속성에서 navigate 함수로 "/" 이동시키기 */}
      <button
        className="border p-2 cursor-pointer"
        onClick={() => {
          // 페이지 이동전 특정 로직을 수행할 때 사용
          navigate("/");
        }}
      >
        홈페이지로 이동
      </button>
    </div>
  );
}
