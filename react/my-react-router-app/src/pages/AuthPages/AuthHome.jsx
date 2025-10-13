import React from "react";
import { Link } from "react-router-dom";

export default function AuthHome() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">인증 센터</h1>
      <p className="text-gray-600 mb-8">
        로그인 또는 회원가입을 진행해주세요.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/auth/login"
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
        >
          로그인 페이지
        </Link>
        <Link
          to="/auth/signup"
          className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
        >
          회원가입 페이지
        </Link>
      </div>
    </div>
  );
}
