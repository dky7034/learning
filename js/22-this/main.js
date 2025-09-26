function func() {
  console.log("함수");
  console.log(this);
}
// func();

// 중괄호로 표현되는 자료형
// 객체의 특징: key - value 속성으로 구성
// 함수도 value가 될 수 있음. 이러한 함수를 메서드라고 함
// 즉, 객체에 포함된 함수는 메서드라고 함
const obj = {
  name: "홍길동",
  age: 20,
  // 함수명이 없다 -> 함수 표현식
  // 속성의 key가 func 이고 value는 함수
  func: function () {
    console.log(this);
  },
};

// obj 객체의 func 메서드를 실행(호출)
// obj.func();

// 화살표 함수로 표현한 메서드는 함수 선언식(표현식, function 키워드를 사용한 함수) 작동 방식이 다르다.
const user2 = {
  name: "홍길동",
  age: 20,
  // 화살표 함수로 메서드를 표현
  greet: () => {
    console.log(this);
  },
};
// user2.greet();

const user3 = {
  name: "홍길동",
  age: 20,
  // function 키워드의 메서드 this는 객체를 가리킴
  greet: function () {
    // function 키워드 메서드 내부의 화살표 함수의 this
    const arrowFunc = () => {
      console.log(this);
    };
    arrowFunc();
  },
};
user3.greet();
