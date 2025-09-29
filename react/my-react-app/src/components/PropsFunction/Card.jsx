import React from "react";

export default function Card({ user, onClick }) {
  return (
    <div>
      <p>
        이름: {user.name}, 나이: {user.age}
      </p>
      <button
        className="border-4 border-amber-500"
        onClick={() => {
          onClick(user);
        }}
      >
        버튼
      </button>
    </div>
  );
}
