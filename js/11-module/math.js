// 외부 파일(모듈)로 분리할 코드
function add(n1, n2) {
  return n1 + n2;
}

function sub(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function devide(n1, n2) {
  return n1 / n2;
}

// 함수 add 내보내기
export { add, sub, multiply, devide };

