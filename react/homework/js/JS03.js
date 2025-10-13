// 각 문제에서 요구하는 답변을 작성한다
// try ~ catch 문 코드는 수정하지 않는다

// 문제
// 숫자 배열을 인자로 받아 모든 원소를 더한 값을 반환하는 함수를 작성한다
// 함수명: sumArray
// 반환값: 배열의 모든 원소의 합
// for...of 반복문을 활용한다

try {
  console.log(sumArray([1, 2, 3, 4, 5])); // 15
  console.log(sumArray([10, 20, 30])); // 60
} catch (error) {}

// 문제
// 숫자 배열을 인자로 받아 배열의 최댓값을 반환하는 함수를 작성한다
// 함수명: findMax
// 반환값: 배열의 최댓값
// for...of 반복문을 활용한다

try {
  console.log(findMax([1, 5, 2, 8, 3])); // 8
  console.log(findMax([-1, -5, -2, -8, -3])); // -1
} catch (error) {}

// 문제
// 배열과 특정 원소를 인자로 받아, 배열에 그 원소가 몇 번 나타나는지 횟수를 반환하는 함수를 작성한다
// 함수명: countOccurrences
// 반환값: 원소의 등장 횟수
// for...of 반복문을 활용한다

try {
  console.log(countOccurrences([1, 2, 2, 3, 2, 4], 2)); // 3
  console.log(countOccurrences(["a", "b", "a", "c", "a"], "a")); // 3
} catch (error) {}

// 문제
// 배열과 특정 원소를 인자로 받아, 배열에 그 원소가 처음 나타나는 인덱스를 반환하는 함수를 작성한다. 원소가 없으면 -1을 반환한다
// 함수명: findIndex
// 반환값: 원소의 인덱스
// for...of 반복문을 활용한다

try {
  console.log(findIndex([1, 2, 2, 3, 2, 4], 2)); // 1
  console.log(findIndex(["a", "b", "a", "c", "a"], "a")); // 0
  console.log(findIndex([1, 2, 3, 4, 5], 6)); // -1
} catch (error) {}

// 문제
// 배열과 특정 원소를 인자로 받아, 배열에 그 원소가 마지막으로 나타나는 인덱스를 반환하는 함수를 작성한다. 원소가 없으면 -1을 반환한다
// 함수명: findLastIndex
// 반환값: 원소의 마지막 인덱스
// for...of 반복문을 활용한다

try {
  console.log(findLastIndex([1, 2, 2, 3, 2, 4], 2)); // 4
  console.log(findLastIndex(["a", "b", "a", "c", "a"], "a")); // 4
  console.log(findLastIndex([1, 2, 3, 4, 5], 6)); // -1
} catch (error) {}

// 문제
// 객체와 키를 인자로 받아, 객체에 해당 키가 존재하는지 여부를 불리언 값으로 반환하는 함수를 작성한다
// 함수명: hasKey
// 반환값: 키의 존재 여부 (true 또는 false)
// for...in 반복문을 활용한다

try {
  const student = { name: "김영희", grade: 3, subject: "수학" };
  console.log(hasKey(student, "grade")); // true
  console.log(hasKey(student, "class")); // false
} catch (error) {}

// 문제
// 사용자 정보 객체 배열을 인자로 받아, 각 사용자의 이름(name)만으로 구성된 새로운 배열을 반환하는 함수를 작성한다
// 함수명: getUserNames
// 반환값: 사용자 이름 배열
// 배열 고차 메서드 map()을 활용한다

try {
  const users = [
    { name: "홍길동", age: 30, city: "서울" },
    { name: "김철수", age: 25, city: "부산" },
    { name: "이영희", age: 28, city: "대구" },
  ];
  console.log(getUserNames(users)); // ["홍길동", "김철수", "이영희"]
} catch (error) {}

// 문제
// 상품 정보 객체 배열을 인자로 받아, 재고가 있는(inStock: true) 상품만 필터링하여 새로운 배열로 반환하는 함수를 작성한다
// 함수명: getInStockProducts
// 반환값: 재고가 있는 상품 객체 배열
// 배열 고차 메서드 filter()를 활용한다

try {
  const products = [
    { name: "노트북", price: 1200000, inStock: true },
    { name: "스마트폰", price: 800000, inStock: false },
    { name: "키보드", price: 50000, inStock: true },
  ];
  console.log(getInStockProducts(products));
  /*
  [
    { name: '노트북', price: 1200000, inStock: true },
    { name: '키보드', price: 50000, inStock: true }
  ]
  */
} catch (error) {}

// 문제
// 두 숫자와 연산자(문자열)를 인자로 받아, 연산 결과는 반환하는 계산기 함수를 작성한다
// 함수명: calculate
// 반환값: 연산 결과
// if 조건문을 활용한다

try {
  console.log(calculate(10, "+", 5)); // 15
  console.log(calculate(10, "-", 5)); // 5
  console.log(calculate(10, "*", 5)); // 50
  console.log(calculate(10, "/", 5)); // 2
} catch (error) {}

// 문제
// 사용자 정보 객체를 인자로 받아, 주소 객체 안의 도시(city) 값을 반환하는 함수를 작성한다
// 함수명: getCity
// 반환값: 도시 이름
// 구조 분해 할당을 매개변수에서 활용한다

try {
  const user = {
    name: "홍길동",
    age: 30,
    address: {
      city: "서울",
      country: "대한민국",
    },
  };
  console.log(getCity(user)); // 서울
} catch (error) {}
