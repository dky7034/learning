// 기존 axios 실습 환경 폴더를 유지한 상태로 새 파일을 만들어서 실습을 진행한다

// 각 문제에서 요구하는 코드를 작성한다
// 모든 문제는 DummyJSON을 기준으로 문제를 해결한다
// DummyJSON : https://dummyjson.com/docs
// 각 문제 해결 후 실행 결과와 출력 결과가 동일하면, 해당 문제의 코드는 주석 처리한다

// 아래 코드는 수정하지 않는다
import axios from "axios";

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getAllUsersResponse
// 요구사항 : 모든 사용자 목록 조회(Get all users) API를 호출하고 응답 객체를 출력한다

/*
{
  users: [
    {
      id: 1,
      firstName: 'Emily',
      lastName: 'Johnson',
      // ... 중략
    },
    // ... 중략
  ],
  total: 208,
  skip: 0,
  limit: 30
}
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getSingleUser
// 요구사항 : 단일 사용자 목록 조회(Get a single user) API를 호출해서 사용자 id가 1인 사용자 정보를 출력한다

/* 출력 결과
{
  id: 1,
  firstName: 'Emily',
  lastName: 'Johnson',
  maidenName: 'Smith',
  age: 28,
  gender: 'female',
  email: 'emily.johnson@x.dummyjson.com',
  phone: '+81 965-431-3024',
  username: 'emilys',
  password: 'emilyspass',
  birthDate: '1996-5-30',
  image: 'https://dummyjson.com/icon/emilys/128',
  bloodGroup: 'O-',
  height: 193.24,
  weight: 63.16,
  eyeColor: 'Green',
  hair: { color: 'Brown', type: 'Curly' },
  ip: '42.48.100.32',
  address: {
    address: '626 Main Street',
    city: 'Phoenix',
    state: 'Mississippi',
    stateCode: 'MS',
    postalCode: '29112',
    coordinates: { lat: -77.16213, lng: -92.084824 },
    country: 'United States'
  },
  macAddress: '47:fa:41:18:ec:eb',
  university: 'University of Wisconsin--Madison',
  bank: {
    cardExpire: '03/26',
    cardNumber: '9289760655481815',
    cardType: 'Elo',
    currency: 'CNY',
    iban: 'YPUXISOBI7TTHPK2BR3HAIXL'
  },
  company: {
    department: 'Engineering',
    name: 'Dooley, Kozey and Cronin',
    title: 'Sales Manager',
    address: {
      address: '263 Tenth Street',
      city: 'San Francisco',
      state: 'Wisconsin',
      stateCode: 'WI',
      postalCode: '37657',
      coordinates: [Object],
      country: 'United States'
    }
  },
  ein: '977-175',
  ssn: '900-590-289',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
  crypto: {
    coin: 'Bitcoin',
    wallet: '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a',
    network: 'Ethereum (ERC20)'
  },
  role: 'admin'
}
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getSearchUsers
// 요구사항 : 사용자 검색 목록 조회(Search users) API를 호출해서 검색어가 "emily"인 사용자 목록의 응답 객체를 출력한다

/* 출력 결과
{
  users: [
    {
      id: 1,
      firstName: 'Emily',
      lastName: 'Johnson',
      maidenName: 'Smith',
      age: 28,
      gender: 'female',
      email: 'emily.johnson@x.dummyjson.com',
      phone: '+81 965-431-3024',
      username: 'emilys',
      password: 'emilyspass',
      birthDate: '1996-5-30',
      image: 'https://dummyjson.com/icon/emilys/128',
      bloodGroup: 'O-',
      height: 193.24,
      weight: 63.16,
      eyeColor: 'Green',
      hair: [Object],
      ip: '42.48.100.32',
      address: [Object],
      macAddress: '47:fa:41:18:ec:eb',
      university: 'University of Wisconsin--Madison',
      bank: [Object],
      company: [Object],
      ein: '977-175',
      ssn: '900-590-289',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
      crypto: [Object],
      role: 'admin'
    },
    {
      id: 103,
      firstName: 'Emily',
      lastName: 'Brown',
      maidenName: 'Taylor',
      age: 42,
      gender: 'female',
      email: 'emily.brown@x.dummyjson.com',
      phone: '+61 875-999-8871',
      username: 'emilyt',
      password: 'emilytpass',
      birthDate: '1982-12-5',
      image: 'https://dummyjson.com/icon/emilyt/128',
      bloodGroup: 'AB-',
      height: 181.96,
      weight: 89.65,
      eyeColor: 'Blue',
      hair: [Object],
      ip: '41.156.197.109',
      address: [Object],
      macAddress: '3b:9b:ee:cf:1f:de',
      university: 'Georgetown University',
      bank: [Object],
      company: [Object],
      ein: '844-425',
      ssn: '119-906-830',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
      crypto: [Object],
      role: 'user'
    }
  ],
  total: 2,
  skip: 0,
  limit: 2
}

*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getAllCommentsByPostId
// 요구사항 : 게시글 id로 댓글 목록 조회(Get all comments by post id) API를 호출해서 게시글 id가 1인 댓글 목록의 응답 객체를 출력한다

/* 출력 결과
{
  comments: [
    {
      id: 93,
      body: 'These are fabulous ideas!',
      postId: 1,
      likes: 7,
      user: [Object]
    },
    {
      id: 107,
      body: 'You are a symbol of beauty.',
      postId: 1,
      likes: 7,
      user: [Object]
    },
    {
      id: 209,
      body: 'Your eyes are like stars.',
      postId: 1,
      likes: 10,
      user: [Object]
    }
  ],
  total: 3,
  skip: 0,
  limit: 3
}
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getRandomTodo
// 요구사항 : 무작위 할일 목록 조회(Get a random todo) API를 호출해서 응답 객체를 출력한다

/* 출력 결과
{
  id: 122,
  todo: 'Make tie dye shirts',
  completed: false,
  userId: 120
}
*/
