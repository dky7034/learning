import React from "react";

export default function Interpolation() {
  const number = 10;
  const numbers = [1, 2, 3, 4, 5];

  function greet(name) {
    return <p className="text-red-400 font-bold">저는 {name} 입니다.</p>;
  }
  return (
    <div>
      <p>{1 + 1}</p>
      <p>{2 * 2}</p>
      {/* boolean 값은 렌더링하지 않음 */}
      <p>{1 === 1}</p>
      <p>{1 > 2}</p>
      <p>{number}</p>
      <h1>{"=============="}</h1>
      <p>
        {numbers.map((user) => (
          <li>{user}</li>
        ))}
      </p>
      <h1>{"=============="}</h1>
      <p>
        {numbers.map((user) => {
          return <li>{user}</li>;
        })}
      </p>
      <h1>{"=============="}</h1>
      <p>{greet("홍길동")}</p>
    </div>
  );
}
