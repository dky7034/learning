// 자료형 null
// 개발자가 의도한 빈 데이터

// 자료형 undefined
// 개발자가 의도하지 않은 빈 데이터

let value1; // undefined
let value2 = null; // null

console.log(value1);
console.log(value2);

let value3 = null ?? "기본값"; // 기본값
console.log(value3);
