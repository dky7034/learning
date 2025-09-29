import React from "react";
import Child from "./Child";

export default function Parent() {
  return (
    <div>
      <Child name="홍길동" age={20}></Child>
      <Child name="김철수" age={25}></Child>
      <Child name="영희" age={30}></Child>
    </div>
  );
}
