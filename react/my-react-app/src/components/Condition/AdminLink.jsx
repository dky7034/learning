import React from "react";

export default function AdminLink({ isAdmin }) {
  return (
    <div>
      <p>현재 권한: {isAdmin === true ? "관리자" : "일반 사용자"}</p>
      {isAdmin && (
        <a href="#" className="text-violet-500">
          관리자 페이지 이동
        </a>
      )}
    </div>
  );
}
