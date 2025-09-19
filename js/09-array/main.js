// 배열의 생성
// 대괄호 [] 사용

// 문자열의 생성: ""

// "" -> 빈 문자열 데이터
// []; -> 빈 배열 데이터

// 빈 배열 데이터를 변수 emptyArray에 할당
let emptyArray = [];

// 1을 저장한 배열 데이터를 변수 oneArray에 할당
let oneArray = [1];

// 원소를 여러 개 저장하기 위해서는 쉼표(,)로 원소를 구분해서 작성
// 1, 2, 3, 4를 저장한 배열 데이터를 변수 manyArray에 할당
let manyArray = [1, 2, 3, 4];

for (let i = 0; i < manyArray.length; i++) {
  console.log(`배열의 ${i}번째 인덱스 값: ${manyArray[i]}`);
}

// 원소의 추가와 제거
// 배열데이터.push(데이터)
// .push() 함수
let array3 = [0];
array3.push(1);
console.log(array3);

// 배열데이터.pop()
// 배열의 마지막 원소를 제거하고 그 제거한 원소를 반환(=데이터 생성)
let pop = array3.pop();
console.log(array3);
console.log(pop);

// for...of 반복문
// 인덱스(위치번호) 활용 X
// 배열에서 직접적으로 원소를 꺼내옴
for (const element of array3) {
  console.log(element);
}
