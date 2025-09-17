// 템플릿 리터럴에는 변수뿐만 아니라 표현식을 삽입 가능
// 표현식: 데이터를 생성하는 코드
let trueData = true;
let falseData = false;
console.log(`true && true -> ${trueData && trueData}`);

// false && true 출력
console.log(`fase && true -> ${falseData && trueData}`);

// || 연산
console.log(`true || false -> ${trueData || falseData}`);
console.log(`false || false -> ${falseData || falseData}`);
