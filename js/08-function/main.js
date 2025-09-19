// 1) 순수 계산 함수: 더해서 반환만
function add(num1, num2) {
  return num1 + num2;
}

// 2) 고계함수: 계산 함수와 콜백을 받아서 실행
function add2(temp1, temp2, adder, callback) {
  console.log("입력:", temp1, temp2);

  // 방어 코드: adder와 callback 타입 확인
  if (typeof adder !== "function") {
    throw new TypeError("adder는 함수여야 합니다.");
  }
  if (callback && typeof callback !== "function") {
    throw new TypeError("callback이 있다면 함수여야 합니다.");
  }

  const result = adder(temp1, temp2);
  console.log("합계:", result);

  // 콜백이 주어졌다면 호출
  if (callback) {
    callback(result);
  }

  return result; // 필요하면 add2의 반환값도 활용 가능
}

// 사용 예시
add2(1, 2, add, (sum) => {
  console.log(
    "함수가 변수에 담길 수 있다는 것은 함수가 다른 함수의 매개변수로 전달될 수 있다는 뜻! sum =",
    sum
  );
});

console.log(
  "-----------------------------------------------------------------------------"
);

// 함수 표현식 정의
// 두 숫자를 매개변수로 받아서 뺀 값을 반환하는 함수
const sub = function (number1, number2) {
  return number1 - number2;
};

// 매개변수 x, 반환값 x => 활용도가 매우 낮음
function sayHello() {
  console.log("Hello World");
}

const sayHelloArros = () => {
  console.log("Hello World");
};

// 매개변수 x, 반환값 o => 활용도가 낮음
function createOne() {
  return 1;
}

const createOneArrow = () => {
  return 1;
};

// 매개변수 o, 반환값 x => 활용도가 높음
function determine(number) {
  if (number > 0) {
    console.log("양수");
  } else if (number < 0) {
    console.log("음수");
  } else {
    console.log("0");
  }
}

const determineArrow = (number) => {
  if (number > 0) {
    console.log("양수");
  } else if (number < 0) {
    console.log("음수");
  } else {
    console.log("0");
  }
};
console.log(
  "-----------------------------------------------------------------------------"
);
// 매개변수 o, 반환값 o => 활용도가 매우 높음
// 매개변수가 짝수면 true 반환
// 매개변수가 홀수면 false 반환
const isEvenOrOdd = (num) => {
  if (typeof num !== "number") {
    console.log("입력 오류: 숫자를 넣어주세요");
    return;
  }

  if (num % 2 === 0) {
    console.log("짝수");
    return true;
  } else {
    console.log("홀수");
    return false;
  }
};

isEvenOrOdd("b"); // → "입력 오류: 숫자를 넣어주세요"
isEvenOrOdd(2); // → "짝수", true
isEvenOrOdd(3); // → "홀수", false
