// React 라이브러리에서 React 객체를 가져옴
import React from "react";
// React의 useEffect와 useState 훅을 가져옴
import { useEffect, useState } from "react";

// Basic이라는 함수형 컴포넌트를 정의하고 내보냄
export default function Basic() {
  // number라는 상태 변수와 setNumber라는 상태 업데이트 함수를 생성, 초기값은 0
  const [number, setNumber] = useState(0);
  // number2라는 상태 변수와 setNumber2라는 상태 업데이트 함수를 생성, 초기값은 0
  const [number2, setNumber2] = useState(0);

  // useEffect 훅은 데이터를 생성하는 훅 X
  // 의존성 배열이 없는 useEffect: 컴포넌트가 렌더링될 때마다 매번 실행됨
  useEffect(() => {
    // 콜백 함수
    // 화면 렌더링과 관련 없는 일을 함
    // API 요청하기, 타이머 시작하기 등등
    console.log("의존성 배열이 없는 useEffect");
  });

  // 최초 마운트 시 단 한 번만 실행
  // 의존성 배열이 빈 배열인 useEffect: 컴포넌트가 처음 마운트될 때만 실행됨
  useEffect(() => {
    console.log("의존성 배열이 있는데 빈 배열인 useEffect");
  }, []);

  // 의존성 배열에 number가 있는 useEffect: 컴포넌트 마운트 시 + number 상태가 변경될 때마다 실행됨
  useEffect(() => {
    console.log("의존성 배열에 number 상태가 저장");
  }, [number]);

  // 의존성 배열에 number2가 있는 useEffect: 컴포넌트 마운트 시 + number2 상태가 변경될 때마다 실행됨
  useEffect(() => {
    console.log("의존성 배열에 number2 상태가 저장");
  }, [number2]);

  useEffect(() => {
    const timerId = setInterval(() => {
      console.log("1");
    }, 1000);
    return () => {
      // 정리 함수
      // 컴포넌트가 언마운트될 때 실행되는 함수
      clearInterval(timerId);
    };
  });

  // JSX를 반환하여 화면에 렌더링
  return (
    <>
      {/* onClick 속성의 화살표 함수에서 setNumber(number + 1) 실행 */}
      {/* 버튼을 클릭하면 number 상태를 1 증가시킴 */}
      <button
        onClick={() => {
          // number 상태를 현재 값에서 1 증가시킴
          setNumber(number + 1);
        }}
      >
        {/* 버튼 텍스트로 현재 number 값을 표시 */}
        {number}
      </button>
      {/* 수평선을 그림 */}
      <hr />
      {/* 줄바꿈 */}
      <br />
      {/* 수평선을 그림 */}
      <hr />
      {/* onClick 속성의 화살표 함수에서 setNumber2(number2 + 1) 실행 */}
      {/* 버튼을 클릭하면 number2 상태를 1 증가시킴 */}
      <button
        onClick={() => {
          // number2 상태를 현재 값에서 1 증가시킴
          setNumber2(number2 + 1);
        }}
      >
        {/* 버튼 텍스트로 현재 number2 값을 표시 */}
        {number2}
      </button>
    </>
  );
}
