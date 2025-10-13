// 각 문제에서 요구하는 답변을 작성한다
// try ~ catch 문 코드는 수정하지 않는다

// 문제
// 사용자 정보 객체 배열과 사용자 이름을 인자로 받아, 해당 이름을 가진 사용자 객체를 반환하는 함수를 작성한다
// 함수명: findUserByName
// 반환값: 해당 이름을 가진 사용자 객체 (없으면 undefined)

try {
  const users = [
    { name: "홍길동", age: 30, city: "서울" },
    { name: "김철수", age: 25, city: "부산" },
    { name: "이영희", age: 28, city: "서울" },
  ];
  console.log(findUserByName(users, "김철수")); // { name: '김철수', age: 25, city: '부산' }
  console.log(findUserByName(users, "박영미")); // undefined
} catch (error) {}

// 문제
// 장바구니 객체 배열을 인자로 받아, 모든 상품의 총액을 계산하여 반환하는 함수를 작성한다
// 함수명: calculateTotalPrice
// 반환값: 모든 상품의 가격 합계

try {
  const cart = [
    { name: "노트북", price: 1000000, quantity: 1 },
    { name: "책상", price: 150000, quantity: 2 },
    { name: "마우스", price: 50000, quantity: 1 },
  ];
  console.log(calculateTotalPrice(cart)); // 1350000
} catch (error) {}

// 문제
// 학생 정보 객체 배열을 인자로 받아, 점수(score)를 기준으로 내림차순 정렬된 새로운 배열을 반환하는 함수를 작성한다
// 함수명: sortStudentsByScore
// 반환값: 점수 기준 내림차순으로 정렬된 학생 객체 배열

try {
  const students = [
    { name: "김영희", score: 85 },
    { name: "홍길동", score: 65 },
    { name: "박철수", score: 95 },
  ];
  console.log(sortStudentsByScore(students));
  /*
  [
  { name: '박철수', score: 95 },
  { name: '김영희', score: 85 },
  { name: '홍길동', score: 65 }
  ]
  */
} catch (error) {}

// 문제
// 숫자 배열과 특정 숫자를 인자로 받아, 배열의 모든 원소가 특정 숫자보다 큰지 여부를 불리언 값으로 반환하는 함수를 작성한다
// 함수명: areAllNumbersGreaterThan
// 반환값: 모든 원소가 특정 숫자보다 크면 true, 아니면 false

try {
  console.log(areAllNumbersGreaterThan([10, 20, 30], 5)); // true
  console.log(areAllNumbersGreaterThan([10, 20, 30], 15)); // false
} catch (error) {}

// 문제
// 문자열 배열을 인자로 받아, 각 문자열의 등장 횟수를 객체로 만들어 반환하는 함수를 작성한다
// 함수명: countStringOccurrences
// 반환값: 각 문자열의 등장 횟수를 담은 객체

try {
  console.log(
    countStringOccurrences([
      "apple",
      "banana",
      "apple",
      "orange",
      "banana",
      "apple",
    ])
  );
  // { apple: 3, banana: 2, orange: 1 }
} catch (error) {}

// 문제
// 배열을 인자로 받아, 중복된 원소를 제거한 새로운 배열을 반환하는 함수를 작성한다
// 함수명: removeDuplicates
// 반환값: 중복이 제거된 새로운 배열

try {
  console.log(removeDuplicates([1, 2, 3, 2, 1, 4])); // [1, 2, 3, 4]
  console.log(removeDuplicates(["a", "b", "c", "a", "b"])); // ["a", "b", "c"]
} catch (error) {}

// 문제
// 문자열을 인자로 받아, 해당 문자열이 팰린드롬(거꾸로 읽어도 같은 단어)인지 여부를 불리언 값으로 반환하는 함수를 작성한다
// 함수명: isPalindrome
// 반환값: 팰린드롬이면 true, 아니면 false

try {
  console.log(isPalindrome("level")); // true
  console.log(isPalindrome("hello")); // false
  console.log(isPalindrome("기러기")); // true
} catch (error) {}

// 문제
// 상품 정보 객체 배열과 카테고리 이름을 인자로 받아, 해당 카테고리에 속하는 상품만 필터링하여 새로운 배열로 반환하는 함수를 작성한다
// 함수명: getProductsByCategory
// 반환값: 특정 카테고리에 속하는 상품 객체 배열

try {
  const products = [
    { name: "노트북", price: 1000000, category: "전자제품" },
    { name: "책상", price: 150000, category: "가구" },
    { name: "마우스", price: 50000, category: "전자제품" },
  ];
  console.log(getProductsByCategory(products, "전자제품"));
  /*
  [
  { name: '노트북', price: 1000000, category: '전자제품' },
  { name: '마우스', price: 50000, category: '전자제품' }
  ]
  */
} catch (error) {}

// 문제
// 객체 배열과 키(key)를 인자로 받아, 각 객체에서 해당 키의 값만 추출하여 새로운 배열로 반환하는 함수를 작성한다
// 함수명: getValuesByKey
// 반환값: 특정 키의 값들로 이루어진 배열

try {
  const users = [
    { name: "홍길동", age: 30, city: "서울" },
    { name: "김철수", age: 25, city: "부산" },
    { name: "이영희", age: 28, city: "서울" },
  ];
  console.log(getValuesByKey(users, "age")); // [30, 25, 28]
  console.log(getValuesByKey(users, "city")); // ["서울", "부산", "서울"]
} catch (error) {}

// 문제
// 객체 배열과 키(key)를 인자로 받아, 해당 키를 기준으로 객체들을 그룹화한 새로운 객체를 반환하는 함수를 작성한다
// 함수명: groupByKey
// 반환값: 특정 키를 기준으로 그룹화된 객체

try {
  const students = [
    { name: "김영희", grade: "A" },
    { name: "홍길동", grade: "B" },
    { name: "박철수", grade: "A" },
    { name: "이민준", grade: "C" },
  ];
  console.log(groupByKey(students, "grade"));
  /*
  {
  A: [ { name: '김영희', grade: 'A' }, { name: '박철수', grade: 'A' } ],
  B: [ { name: '홍길동', grade: 'B' } ],
  C: [ { name: '이민준', grade: 'C' } ]
  }
  */
} catch (error) {}
