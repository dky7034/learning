import React from "react";
import LoginStatus from "./LoginStatus";
import AdminLink from "./AdminLink";

export default function Container() {
  return (
    <div>
      <LoginStatus isLogin={true} userName="홍길동"></LoginStatus>
      <LoginStatus isLogin={false} userName="김철수"></LoginStatus>
      <AdminLink isAdmin={true}></AdminLink>
      <AdminLink isAdmin={false}></AdminLink>
    </div>
  );
}
