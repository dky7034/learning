// 배열 고차 메서드: forEach()
// 배열을 단순 반복
const todos = ["숙제하기", "운동하기", "독서하기"];

todos.forEach((todo, index) => {
  console.log(`${index + 1}.${todo}`);
});

const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map((num) => num * num);
console.log(squaredNumbers);
console.log(numbers);

const todos2 = [
  {
    task: "숙제하기",
    completed: false,
  },
  { task: "운동하기", completed: true },
  { task: "독서하기", completed: false },
];
const incompleteTodos2 = todos2.filter((todo) => todo.completed === false);
console.log(incompleteTodos2);

const todos3 = [
  { id: 1, task: "숙제하기" },
  { id: 2, task: "운동하기" },
  { id: 3, task: "독서하기" },
];
const targetTodo = todos3.find((todo) => todo.id === 2);
console.log(targetTodo);
console.log(typeof targetTodo);

numbers.sort((a, b) => b - a);
console.log("정렬 후: " + numbers);

// const newArray1 = numbers.map((element) => {
//   return element * 2;
// });
// console.log("newArray1 = " + newArray1);
// console.log(typeof newArray1);
