import { Navigate, useNavigate } from "react-router-dom";
import React from "react";

export default function Profile() {
  const navigate = useNavigate();

  // 로그인 상태를 임시로 true로 설정합니다.
  const isLogin = true;

  if (!isLogin) {
    // 로그인 상태가 아닐 경우 홈으로 리다이렉트합니다.
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">프로필</h1>
      <p className="text-gray-600 mb-6">사용자 정보 페이지입니다.</p>
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => {
          // 실제 애플리케이션에서는 로그아웃 로직을 수행할 수 있습니다.
          navigate("/");
        }}
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
