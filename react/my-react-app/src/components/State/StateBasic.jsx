import { spread } from "axios";
import React from "react";
import { useState } from "react";

// 리액트 훅(Hook)
// JS 함수와 유사한 개념이지만 함수는 아님
// 함수: 특정 동작을 수행하는 코드 뭉치
// 훅: 리액트에서 특정 동작을 수행하는 도구
// useStae 훅: 리액트에서 상태 관리를 수행하는 도구
export default function StateBasic() {
  // const[one, two] = [상태를 저장할 변수, 상태를 변경할 함수(set)]

  // 문자열 데이터로 관리하는 상태(State)
  // string은 상태 데이터를 저장할 변수
  // setString은 상태 데이터를 변경할 함수
  const [string, setString] = useState("초기값");

  // 배열 데이터를 관리하는 상태
  const [array, setArray] = useState([1, 2, 3]);

  function handleClick() {
    // 상태 데이터 변경
    // 절대 상태를 직접 수정해서는 안 됨!!!

    // 새로운 배열 데이터를 생성해서 변수 newArray에 할당
    const newArray = [...array, array];

    // 변수 newArray를 새로운 상태로 변경
    setArray(newArray);
  }
  return (
    <div>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        원소 추가
      </button>
      {array.map((e) => {
        return <li>{e}</li>;
      })}
    </div>
  );
}
