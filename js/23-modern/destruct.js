const object = {
  name: "홍길동",
  age: 20,
};

// 구조 분해 할당을 활용하지 않은 경우
// 속성을 개별 변수에 할당
// let name = object["name"];
// let age = object["age"];

// 구조 분해 할당을 활용하는 경우
// 객체의 구조 분해 할당에서는 변수명과 객체의 속성명이 동일해야 함
let { name, age } = object;

console.log(name);
console.log(age);

const object2 = {
  id: 1,
  title: "갤럭시 99",
  description: "삼성 스마트폰",
  price: 9000,
};

const { title: TITLE, price: PRICE } = object2;
console.log(TITLE);
console.log(PRICE);

// 객체를 인자로 전달받는 함수
function func(object) {
  // 구조분해할당으로 변수에 속성 값을 저장
  const { name, age } = object;
  console.log(`Hello ${name}, I'm ${age}`);
}

// 매개변수에 구조분해 할당을 활용
function func2({ name, age }) {
  console.log(`Hello ${name}, I'm ${age}`);
}

const user = {
  name: "홍길동",
  age: 20,
};
func(user);
