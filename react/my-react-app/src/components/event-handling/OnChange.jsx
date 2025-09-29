import React, { useState } from "react";

export default function OnChange() {
  const [text, setText] = useState("");
  const [num, setNum] = useState("");

  function handleTextChange(e) {
    const v = e.target.value;
    setText(v);
    console.log("텍스트 입력:", v);
  }

  function handleNumberChange(e) {
    // 숫자 전용: input 타입을 number로 바꾸고 valueAsNumber 사용 권장
    const v = e.target.value; // text로 받고 Number() 변환
    const n = Number(v.trim());
    if (!Number.isNaN(n) && n < 10) {
      console.log("10보다 작은 수");
    } else if (!Number.isNaN(n) && n >= 10) {
      console.log("10 이상인 수");
    }
    setNum(v);
  }

  return (
    <div className="space-y-4 p-4">
      <div>
        <label className="block mb-1 font-medium">
          숫자 입력 (10 미만 감지)
        </label>
        <input
          type="number" // ★ 숫자 입력에 맞춤
          value={num}
          onChange={handleNumberChange}
          className="w-80 border-2 border-cyan-400 rounded px-3 py-2"
          placeholder="숫자를 입력하세요"
        />
      </div>

      <hr />

      <div>
        <label className="block mb-1 font-medium">
          텍스트 입력 (변화 로그)
        </label>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          className="w-80 border-2 border-amber-400 rounded px-3 py-2"
          placeholder="텍스트를 입력하세요"
        />
      </div>
    </div>
  );
}
