import React from "react";
import Child from "./Child";

export default function Parent() {
  return (
    <div>
      <Child>
        <div>
          <h1>홍길동</h1>
          <h2>20살</h2>
          <h2>장안동 거주</h2>
        </div>
      </Child>
      <Child>
        <div>
          <h1>김길동</h1>
          <h2>23살</h2>
          <h2>면목동 거주</h2>
        </div>
      </Child>
      <Child>
        <div>
          <h1>최길동</h1>
          <h2>30살</h2>
          <h2>용답동 거주</h2>
        </div>
      </Child>
    </div>
  );
}
