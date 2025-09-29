import React, { useState, memo } from "react";
import _ from "lodash";

// 각 리스트 아이템에 대한 컴포넌트입니다.
// 내부에 input을 두어 자신만의 상태를 가집니다.
const StatefulItem = memo(({ item }) => {
  console.log(`Rendering Item: ${item.text}`);
  return (
    <li style={{ border: "1px solid #ccc", margin: "5px", padding: "5px" }}>
      <span>{item.text}</span>
      <input
        type="text"
        placeholder="여기에 입력하여 상태를 확인하세요"
        style={{ marginLeft: "10px", width: "250px" }}
      />
    </li>
  );
});

const initialItems = [
  { id: "a", text: "항목 A" },
  { id: "b", text: "항목 B" },
  { id: "c", text: "항목 C" },
  { id: "d", text: "항목 D" },
];

// key 없이 렌더링하는 컴포넌트
function WithoutKeys() {
  const [items, setItems] = useState(initialItems);

  const shuffle = () => {
    setItems(_.shuffle(items));
  };

  return (
    <div style={{ border: "2px solid red", padding: "10px", width: "45%" }}>
      <h2>Key가 없는 경우 (문제 발생)</h2>
      <button
        onClick={shuffle}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-2"
      >
        리스트 섞기
      </button>
      <p>각 항목의 input에 아무 값이나 입력한 후 '리스트 섞기'를 눌러보세요.</p>
      <ul>
        {items.map((item, index) => (
          // key로 index를 사용하면, key가 없는 것과 동일하게 동작하여 문제가 발생합니다.
          <StatefulItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
}

// key와 함께 렌더링하는 컴포넌트
function WithKeys() {
  const [items, setItems] = useState(initialItems);

  const shuffle = () => {
    setItems(_.shuffle(items));
  };

  return (
    <div style={{ border: "2px solid green", padding: "10px", width: "45%" }}>
      <h2>Key가 있는 경우 (정상 동작)</h2>
      <button
        onClick={shuffle}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-2"
      >
        리스트 섞기
      </button>
      <p>각 항목의 input에 아무 값이나 입력한 후 '리스트 섞기'를 눌러보세요.</p>
      <ul>
        {items.map((item) => (
          <StatefulItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default function KeyPerformanceTest() {
  return (
    <div>
      <h1>React Key 정확성 테스트</h1>
      <p>
        이 예제는 리스트의 순서가 변경될 때 `key` prop이 있고 없을 때 어떤
        차이가 발생하는지 보여줍니다.
      </p>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <WithoutKeys />
        <WithKeys />
      </div>
      <div style={{ marginTop: "20px", padding: "10px", background: "#eee" }}>
        <h3>테스트 방법</h3>
        <ol>
          <li>
            'Key가 없는 경우'와 'Key가 있는 경우' 각각의 리스트에 있는 input
            필드 몇 개에 고유한 텍스트를 입력합니다. (예: '항목 A'의 input에
            'AAA' 입력)
          </li>
          <li>각각의 '리스트 섞기' 버튼을 클릭합니다.</li>
        </ol>
        <h3>관찰 결과</h3>
        <ul>
          <li>
            <strong>Key가 없는 경우 (index as key):</strong> React는 `key`가
            없거나 `index`를 `key`로 사용하면 단순히 순서만 보고 컴포넌트를
            업데이트합니다. 따라서 컴포넌트의 위치는 그대로 있고 내용(text)만
            바뀝니다. 그 결과, 우리가 input에 입력했던 상태(AAA)는 그대로
            있는데, 그 앞의 텍스트 레이블만 바뀌는 문제가 발생합니다.
          </li>
          <li>
            <strong>Key가 있는 경우 (unique id as key):</strong> React는 고유한
            `key`('a', 'b', 'c', 'd')를 통해 어떤 항목이 어디로 이동했는지
            정확히 파악합니다. 따라서 컴포넌트 자체가 자신의 모든 상태(입력된
            텍스트 포함)를 가지고 올바른 위치로 이동합니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
