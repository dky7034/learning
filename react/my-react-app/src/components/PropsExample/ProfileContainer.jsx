import React from "react";
import Profile from "./Profile";

export default function ProfileContainer() {
  return (
    <div>
      <Profile name="현우" age={22} isAdmin={true}></Profile>
      <Profile name="수진" age={21} isAdmin={false}></Profile>
      <Profile user={{ name: "길동", age: 24, isAdmin: true }}></Profile>
    </div>
  );
}
