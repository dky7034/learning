import React from "react";

export default function Profile(props) {
  // 1) user가 있으면 그걸 쓰고, 없으면 개별 props로 객체를 만들어 통일
  const user = props.user ?? {
    name: props.name,
    age: props.age,
    isAdmin: props.isAdmin,
  };

  // 2) 기본값으로 안전 장치
  const { name = "이름없음", age = 0, isAdmin = false } = user;

  return (
    <div>
      {/* 개별 정보 섹션: 개별 props가 넘어온 경우에도 정상 동작 */}
      <p>
        저는 {props.name ?? "이름없음"}이고, {props.age ?? 0}세입니다. 관리자
        여부는{" "}
        {typeof props.isAdmin === "boolean"
          ? props.isAdmin
            ? "예"
            : "아니오"
          : "아니오"}
        입니다.
      </p>

      <br />

      {/* user 기반 섹션: user가 없을 땐 user 섹션을 건너뜀 */}
      {props.user && (
        <p>
          저는 {name}이고, {age}세입니다. 관리자 여부는{" "}
          {isAdmin ? "예" : "아니오"}입니다.
        </p>
      )}
    </div>
  );
}
