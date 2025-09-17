// 변수에 데이터를 할당(assign)

// 변수명 = 할당할 데이터
// "Hello Wolrd" 데이터를 저장한 공간의 이름이 message
// 변수 message에 "Hello World"를 할당
let message = "Hello World";

// 변수 선언의 방식 2개 (원래는 3개)
// let, const, var

// let
// 데이터의 재할당 가능
// 변수 message3에 "Hello variable"을 할당
let message3 = "Hello variable";

// 변수 message3에 "Hello let variable"을 재할당
message3 = "Hello let variable";
// let은 안붙이나요? -> let을 붙이면 선언
// let 키워드는 재선언 불가능

// let 변수 message4를 선언
let message4;
message4;

// const
// 데이터의 재할당이 불가능(중요) -> 상수 라고 개발에서느 표현
// const 변수 message5를 선언하고, "Hello Const" 할당
const message5 = "Hello Const";
message5 = "재할당 불가.."; // 상수는 재할당이 불가합니다.

// let vs const
// let: 변하는 데이터를 저장하는 변수 선언 방식
// const: 변하면 안되는 데이터를 저장하는 변수 선언 방식
