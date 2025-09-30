// ❌ index를 key로 사용
function TodoList() {
  const [todos, setTodos] = useState([
    { text: "운동하기" },
    { text: "책 읽기" },
    { text: "코딩하기" },
  ]);

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <input type="checkbox" />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
