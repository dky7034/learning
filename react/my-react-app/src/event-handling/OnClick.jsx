import React from "react";

export default function OnClick() {
  // 이벤트 핸들러 함수
  function handleClick(e) {
    console.log(e.target);
    alert("버튼 클릭 이벤트 발생");
  }
  return (
    <div>
      <button
        className="border-2 caret-amber-400"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        버튼
      </button>
    </div>
  );
}
