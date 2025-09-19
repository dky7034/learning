// 반복문이 없는 코드
// 변수 number를 선언하고, 0을 할당
// 변수 number를 3번 출력 === 변수 number가 3 미만 일 때 까지
// 1씩 증가하면서
let number = 0; // 초기화

if (number < 3) {
  console.log(number); // 반복 실행할 코드
  number = number + 1; // 증감식
}

if (number < 3) {
  console.log(number); // 반복 실행할 코드
  number = number + 1; // 증감식
}

if (number < 3) {
  console.log(number); // 반복 실행할 코드
  number = number + 1; // 증감식
}

console.log("---");

// for(초기화문; 조건식; 증감문)
for (let number2 = 0; number2 < 3; number2 = number2 + 1) {
  console.log(number2); // 반복 실행할 코드
}

// 내가 어떤 코드를 5번 반복
// i++ => i = i + 1
for (let i = 0; i < 5; i++) {
  console.log(`${i + 1} 번 실행`);
}

let N = 10;
for (let i = 0; i < N; i++) {
  console.log(`${i + 1} 번 실행`);
}

// 숫자를 0 부터 3까지 출력
for (let i = 0; i < 4; i++) {
  console.log(i);
  // 0
  // 1
  // 2
  // 3
}

let i = 0; // i => 0

if (i < 3) {
  console.log(i); // i => 0
  i = i + 1; // i => 1
}
if (i < 3) {
  console.log(i); // i => 1
  i = i + 1; // i => 2
}
if (i < 3) {
  console.log(i); // i => 2
  i = i + 1; // i => 3
}

// 아래 코드들은 실행되지 않는다
// 반복문이 끝났다
/*
if (i < 3) {
  // 조건식 결과 3 < 3 => false
  console.log(i);
  i = i + 1;
}
if (i < 3) {
  console.log(i);
  i = i + 1;
}
if (i < 3) {
  console.log(i);
  i = i + 1;
}
if (i < 3) {
  console.log(i);
  i = i + 1;
}
*/

// for 반복문
// 0 부터 10까지 출력하는 반복문
// for(초기화문; 조건식; 증감문)
for (let i = 0; i <= 10; i++) {
  console.log(i);
}

// while 반복문
let j = 0; // 외부 초기화문
while (j <= 10) {
  j = j + 1; // 내부 증감문
}

// 의도적인 무한반복 가장 흔한 형태
// while (true) {}


let k = 0;
while (k > 1) {
  console.log(k);
}

// do...while : 코드를 무조건 한 번은 실행한다
do {
  console.log(k);
} while (k > 1);
