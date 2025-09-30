import React from "react";

export default function User({ id, name }) {
  return (
    <div>
      <ul>
        <li>
          {console.log(id, name)}
          {id} - {name}
        </li>
      </ul>
    </div>
  );
}
