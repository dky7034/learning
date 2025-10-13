// 각 문제에서 요구하는 답변을 작성한다
// try ~ catch 문 코드는 수정하지 않는다

// 문제
// 숫자 배열을 인자로 받아 배열의 원소 중 가장 작은 값을 반환하는 함수를 작성한다
// 함수명: findMin
// 반환값: 배열의 최솟값

try {
  console.log(findMin([5, 2, 8, 1, 9])); // 1
  console.log(findMin([-1, -5, -2, -8, -3])); // -8
} catch (error) {}

// 문제
// 사용자 정보 객체 배열을 인자로 받아, age 속성의 평균을 계산하여 반환하는 함수를 작성한다
// 함수명: getAverageAge
// 반환값: 사용자들의 age 속성의 평균

try {
  const users = [
    { name: "홍길동", age: 20 },
    { name: "김철수", age: 30 },
    { name: "이영희", age: 40 },
  ];
  console.log(getAverageAge(users)); // 30
} catch (error) {}

// 문제
// 문자열을 인자로 받아, 해당 문자열의 모든 공백을 제거한 새로운 문자열을 반환하는 함수를 작성한다
// 함수명: removeWhitespace
// 반환값: 공백이 제거된 문자열

try {
  console.log(removeWhitespace("  hello   world  ")); // "helloworld"
  console.log(removeWhitespace("javascript is awesome")); // "javascriptisawesome"
} catch (error) {}

// 문제
// 두 개의 배열을 인자로 받아, 두 배열의 공통된 원소만으로 구성된 새로운 배열을 반환하는 함수를 작성한다
// 함수명: getIntersection
// 반환값: 두 배열의 공통 원소로 구성된 배열

try {
  console.log(getIntersection([1, 2, 3, 4], [3, 4, 5, 6])); // [3, 4]
  console.log(getIntersection(["a", "b", "c"], ["b", "c", "d"])); // ["b", "c"]
} catch (error) {}

// 문제
// 객체와 키(key) 문자열을 인자로 받아, 해당 키에 해당하는 값을 반환하는 함수를 작성한다. 만약 키가 존재하지 않으면 null을 반환한다
// 함수명: getKeyValue
// 반환값: 키에 해당하는 값 또는 null

try {
  const person = { name: "홍길동", age: 30, city: "서울" };
  console.log(getKeyValue(person, "age")); // 30
  console.log(getKeyValue(person, "country")); // null
} catch (error) {}

// 문제
// 문자열 배열을 인자로 받아, 모든 문자열을 하나로 합친 단일 문자열을 반환하는 함수를 작성한다
// 함수명: joinStrings
// 반환값: 하나로 합쳐진 문자열

try {
  console.log(joinStrings(["hello", " ", "world"])); // "hello world"
  console.log(joinStrings(["javascript", " ", "is", " ", "fun"])); // "javascript is fun"
} catch (error) {}

// 문제
// 숫자를 원화(KRW) 형식의 문자열로 변환하여 반환하는 함수를 작성한다
// 함수명: formatToKRW
// 반환값: 원화 형식의 문자열 (ex: 1000 -> "₩1,000")

try {
  console.log(formatToKRW(1000)); // "₩1,000"
  console.log(formatToKRW(1234567)); // "₩1,234,567"
} catch (error) {}

// 문제
// 객체를 인자로 받아, 해당 객체의 키(key)와 값(value)을 서로 뒤바꾼 새로운 객체를 반환하는 함수를 작성한다
// (객체의 값(value)은 유일한 문자열이라고 가정한다)
// 함수명: invertObject
// 반환값: 키와 값이 뒤바뀐 새로운 객체

try {
  const obj = { name: "홍길동", city: "서울" };
  console.log(invertObject(obj)); // { '홍길동': 'name', '서울': 'city' }

  const obj2 = { a: "1", b: "2", c: "3" };
  console.log(invertObject(obj2)); // { '1': 'a', '2': 'b', '3': 'c' }
} catch (error) {}

// 문제
// 학생 정보 객체 배열과 특정 과목명을 인자로 받아, 해당 과목의 점수가 가장 높은 학생의 이름을 반환하는 함수를 작성한다
// 함수명: findTopStudent
// 반환값: 특정 과목에서 최고 점수를 받은 학생의 이름

try {
  const students = [
    { name: "김철수", scores: { math: 90, science: 85 } },
    { name: "이영희", scores: { math: 95, science: 88 } },
    { name: "박민준", scores: { math: 88, science: 92 } },
  ];
  console.log(findTopStudent(students, "math")); // "이영희"
  console.log(findTopStudent(students, "science")); // "박민준"
} catch (error) {}

// 문제
// [['key1', 'value1'], ['key2', 'value2']] 형태의 2차원 배열을 인자로 받아, 이를 객체로 변환하는 함수를 작성한다
// 함수명: arrayToObject
// 반환값: 키-값 쌍으로 이루어진 객체

try {
  const arr = [
    ["name", "홍길동"],
    ["age", 30],
    ["city", "서울"],
  ];
  console.log(arrayToObject(arr)); // { name: '홍길동', age: 30, city: '서울' }

  const arr2 = [
    ["a", 1],
    ["b", 2],
  ];
  console.log(arrayToObject(arr2)); // { a: 1, b: 2 }
} catch (error) {}

// 문제
// 상품 정보 객체 배열과 카테고리 키를 인자로 받아, 카테고리별로 상품을 그룹화한 객체를 반환하는 함수를 작성한다
// 함수명: groupByCategory
// 반환값: 카테고리별로 그룹화된 상품 객체

try {
  const products = [
    { name: "사과", category: "과일" },
    { name: "당근", category: "채소" },
    { name: "바나나", category: "과일" },
    { name: "오이", category: "채소" },
  ];
  console.log(groupByCategory(products));
  /*
  {
    '과일': [
      { name: '사과', category: '과일' },
      { name: '바나나', category: '과일' }
    ],
    '채소': [
      { name: '당근', category: '채소' },
      { name: '오이', category: '채소' }
    ]
  }
  */
} catch (error) {}
