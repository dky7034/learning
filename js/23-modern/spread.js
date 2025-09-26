// 리액트에서는 스프레드 연산자를 어떻게 사용하는가?

// 원소가 객체인 배열
// 객체를 저장한 배열
let objectArr = [{ name: "철수", age: 20 }];

// 새로운 객체를 추가한 새로운 배열을 생성
let newObjectArr = [...objectArr, { name: "영희", age: 20 }];

console.log(objectArr);
console.log(newObjectArr);
