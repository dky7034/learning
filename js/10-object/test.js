let person2 = {
  name: "홍길동",
  score: 99,
  pass: true,
};

for (const key in person2) {
  if (!Object.hasOwn(person2, key)) continue;
  const element = person2[key];
  console.log(element);
}

// 객체 함수
// 모든 key를 배열로 반환
let keyArray = Object.keys(person2);
console.log(keyArray);
// 모든 value를 배열로 반환
let valueArray = Object.values(person2);
console.log(valueArray);
// 모든 key, value를 배열로 반환
let keyAndValueArray = Object.entries(person2);
console.log(keyAndValueArray);

// 배열 순회
const arr = [10, 20, 30];
arr.forEach((value, index) => {
  console.log(`value: ${value}, index: ${index}`);
});

// set 순회
const numberSet = new Set([10, 20, 30]);
for (const value of numberSet) {
  console.log(`value: ${value}`);
}
numberSet.forEach((value, set) => {
  console.log(`value: ${value}`);
});
