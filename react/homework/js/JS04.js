// 각 문제에서 요구하는 답변을 작성한다
// try ~ catch 문 코드는 수정하지 않는다

// 문제
// 숫자 배열을 인자로 받아 모든 원소를 곱한 값을 반환하는 함수를 작성한다
// 함수명: multiplyArray
// 반환값: 배열의 모든 원소의 곱

try {
  console.log(multiplyArray([1, 2, 3, 4])); // 24
  console.log(multiplyArray([10, 2, 3])); // 60
} catch (error) {}

// 문제
// 문자열을 인자로 받아 뒤집어진 문자열을 반환하는 함수를 작성한다
// 함수명: reverseString
// 반환값: 뒤집어진 문자열
// ex) "hello" -> "olleh"

try {
  console.log(reverseString("hello")); // "olleh"
  console.log(reverseString("world")); // "dlrow"
} catch (error) {}

// 문제
// 사용자 정보 객체 배열과 도시 이름을 인자로 받아, 해당 도시에 사는 사용자만 필터링하여 새로운 배열로 반환하는 함수를 작성한다
// 함수명: getUsersByCity
// 반환값: 특정 도시에 사는 사용자 객체 배열

try {
  const users = [
    { name: "홍길동", age: 30, city: "서울" },
    { name: "김철수", age: 25, city: "부산" },
    { name: "이영희", age: 28, city: "서울" },
  ];
  console.log(getUsersByCity(users, "서울"));
  /*
  [
    { name: '홍길동', age: 30, city: '서울' },
    { name: '이영희', age: 28, city: '서울' }
  ]
  */
} catch (error) {}

// 문제
// 학생 점수 객체를 인자로 받아, 점수가 70점 이상이면 "Pass", 미만이면 "Fail"을 반환하는 함수를 작성한다
// 함수명: getPassOrFail
// 반환값: "Pass" 또는 "Fail"

try {
  const student1 = { name: "김영희", score: 85 };
  const student2 = { name: "홍길동", score: 65 };
  console.log(getPassOrFail(student1)); // "Pass"
  console.log(getPassOrFail(student2)); // "Fail"
} catch (error) {}

// 문제
// 책 정보 객체 배열을 인자로 받아, 각 책의 제목(title)만으로 구성된 새로운 배열을 반환하는 함수를 작성한다
// 함수명: getBookTitles
// 반환값: 책 제목 배열

try {
  const books = [
    { title: "자바스크립트 완벽 가이드", author: "존 레식" },
    { title: "클린 코드", author: "로버트 C. 마틴" },
    { title: "코어 자바스크립트", author: "정재남" },
  ];
  console.log(getBookTitles(books)); // ["자바스크립트 완벽 가이드", "클린 코드", "코어 자바스크립트"]
} catch (error) {}

// 문제
// 숫자 배열과 콜백 함수를 인자로 받아, 배열의 각 원소에 콜백 함수를 적용한 새로운 배열을 반환하는 함수를 작성한다
// 함수명: mapArray
// 반환값: 콜백 함수가 적용된 새로운 배열

try {
  const double = (x) => x * 2;
  console.log(mapArray([1, 2, 3], double)); // [2, 4, 6]

  const square = (x) => x * x;
  console.log(mapArray([1, 2, 3, 4], square)); // [1, 4, 9, 16]
} catch (error) {}

// 문제
// 두 개의 객체를 인자로 받아, 두 객체를 병합한 새로운 객체를 반환하는 함수를 작성한다
// 함수명: mergeObjects
// 반환값: 병합된 새로운 객체

try {
  const obj1 = { a: 1, b: 2 };
  const obj2 = { c: 3, d: 4 };
  console.log(mergeObjects(obj1, obj2)); // { a: 1, b: 2, c: 3, d: 4 }
} catch (error) {}

// 문제
// 숫자를 인자로 받아, 1부터 해당 숫자까지의 총합을 반환하는 함수를 작성한다
// 함수명: sumUpTo
// 반환값: 1부터 n까지의 합

try {
  console.log(sumUpTo(5)); // 15 (1+2+3+4+5)
  console.log(sumUpTo(10)); // 55
} catch (error) {}

// 문제
// 문자열 배열을 인자로 받아, 가장 긴 문자열의 길이를 반환하는 함수를 작성한다
// 함수명: getLongestStringLength
// 반환값: 가장 긴 문자열의 길이

try {
  console.log(getLongestStringLength(["apple", "banana", "kiwi"])); // 6
  console.log(getLongestStringLength(["hello", "world", "javascript"])); // 10
} catch (error) {}

// 문제
// 숫자 배열을 인자로 받아, 짝수만 필터링하여 새로운 배열로 반환하는 함수를 작성한다
// 함수명: getEvenNumbers
// 반환값: 짝수만 포함된 새로운 배열

try {
  console.log(getEvenNumbers([1, 2, 3, 4, 5, 6])); // [2, 4, 6]
  console.log(getEvenNumbers([10, 15, 20, 25])); // [10, 20]
} catch (error) {}

// 문제
// 객체 배열을 인자로 받아, 특정 속성의 값들로만 구성된 새로운 배열을 반환하는 함수를 작성한다
// 함수명: extractProperty
// 반환값: 특정 속성의 값들로 구성된 배열

try {
  const products = [
    { name: "노트북", price: 1000000, category: "전자제품" },
    { name: "책상", price: 150000, category: "가구" },
    { name: "마우스", price: 50000, category: "전자제품" },
  ];
  console.log(extractProperty(products, "name")); // ["노트북", "책상", "마우스"]
  console.log(extractProperty(products, "price")); // [1000000, 150000, 50000]
} catch (error) {}

// 문제
// 두 개의 숫자 배열을 인자로 받아, 두 배열의 원소들을 모두 합친 새로운 배열을 반환하는 함수를 작성한다
// 함수명: combineArrays
// 반환값: 두 배열이 합쳐진 새로운 배열

try {
  console.log(combineArrays([1, 2, 3], [4, 5, 6])); // [1, 2, 3, 4, 5, 6]
  console.log(combineArrays(["a", "b"], ["c", "d"])); // ["a", "b", "c", "d"]
} catch (error) {}

// 문제
// 문자열을 인자로 받아, 각 단어의 첫 글자를 대문자로 변환한 문자열을 반환하는 함수를 작성한다
// 함수명: capitalizeWords
// 반환값: 각 단어의 첫 글자가 대문자인 문자열
// ex) "hello world" -> "Hello World"

try {
  console.log(capitalizeWords("hello world")); // "Hello World"
  console.log(capitalizeWords("javascript is awesome")); // "Javascript Is Awesome"
} catch (error) {}

// 문제
// 숫자 배열을 인자로 받아, 배열의 평균값을 반환하는 함수를 작성한다
// 함수명: getAverage
// 반환값: 배열의 평균값 (소수점 둘째 자리까지)

try {
  console.log(getAverage([1, 2, 3, 4, 5])); // 3.00
  console.log(getAverage([10, 20, 30])); // 20.00
} catch (error) {}
