// 기존 axios 실습 환경 폴더를 유지한 상태로 새 파일을 만드러 실습을 진행한다

// 각 문제에서 요구하는 코드를 작성한다
// 모든 문제는 DummyJSON을 기준으로 문제를 해결한다
// DummyJSON : https://dummyjson.com/docs
// 각 문제 해결 후 실행 결과와 출력 결과가 동일하면, 해당 문제의 코드는 주석 처리한다

// 아래 코드는 수정하지 않는다
import axios from "axios";

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getAllCarsResponse
// 요구사항 : 모든 장바구니 목록 조회(Get all carts) API를 호출하고 응답 객체를 출력한다

/*
{
  carts: [
    {
      id: 1,
      products: [Array],
      total: 103774.85,
      discountedTotal: 89686.65,
      userId: 33,
      totalProducts: 4,
      totalQuantity: 15
    },
    // ... 중략
  ],
  total: 50,
  skip: 0,
  limit: 30
}
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getAllCarsResponseKeys
// 요구사항 : 모든 장바구니 목록 조회(Get all carts) API를 호출하고 응답 객체의 모든 속성명(key)을 출력한다

/* 출력 결과
[ 'carts', 'total', 'skip', 'limit' ]
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getAllCarsArray
// 요구사항 : 모든 장바구니 목록 조회(Get all carts) API를 호출하고 응답 객체의 속성 중 carts 를 불러와서 출력한다

/* 출력 결과
[
  {
    id: 1,
    products: [Array],
    total: 103774.85,
    discountedTotal: 89686.65,
    userId: 33,
    totalProducts: 4,
    totalQuantity: 15
  },
  // ... 중략
]
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getSingleCart
// 요구사항 : 단일 장바구니 목록 조회(Get a single cart) API를 호출해서 장바구니 id가 1인 장바구니 정보를 출력한다

/* 출력 결과
{
  id: 1,
  products: [
    {
      id: 168,
      title: 'Charger SXT RWD',
      price: 32999.99,
      quantity: 3,
      total: 98999.97,
      discountPercentage: 13.39,
      discountedTotal: 85743.87,
      thumbnail: 'https://cdn.dummyjson.com/products/images/vehicle/Charger%20SXT%20RWD/thumbnail.png'
    },
    {
      id: 78,
      title: 'Apple MacBook Pro 14 Inch Space Grey',
      price: 1999.99,
      quantity: 2,
      total: 3999.98,
      discountPercentage: 18.52,
      discountedTotal: 3259.18,
      thumbnail: 'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png'
    },
    {
      id: 183,
      title: 'Green Oval Earring',
      price: 24.99,
      quantity: 5,
      total: 124.94999999999999,
      discountPercentage: 6.28,
      discountedTotal: 117.1,
      thumbnail: 'https://cdn.dummyjson.com/products/images/womens-jewellery/Green%20Oval%20Earring/thumbnail.png'
    },
    {
      id: 100,
      title: 'Apple Airpods',
      price: 129.99,
      quantity: 5,
      total: 649.95,
      discountPercentage: 12.84,
      discountedTotal: 566.5,
      thumbnail: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/thumbnail.png'
    }
  ],
  total: 103774.85,
  discountedTotal: 89686.65,
  userId: 33,
  totalProducts: 4,
  totalQuantity: 15
}
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getSingleCartFirstProduct
// 요구사항 : 단일 장바구니 목록 조회(Get a single cart) API를 호출해서 장바구니 id가 1인 장바구니 정보 중 첫 번째 상품의 상세 정보를 출력한다
// 힌트: Get a single cart 로 첫 번째 상품의 id를 추출하고, 그 id를 기반으로 Get a single product 를 연쇄적으로 호출한다

/* 출력 결과
{
  id: 168,
  title: 'Charger SXT RWD',
  description: 'The Charger SXT RWD is a powerful and sporty rear-wheel-drive sedan, offering a blend of performance and practicality.',
  category: 'vehicle',
  price: 32999.99,
  discountPercentage: 8.23,
  rating: 2.58,
  stock: 57,
  tags: [ 'sedans', 'sports cars', 'vehicles' ],
  brand: 'Dodge',
  sku: 'VEH-DOD-CHA-168',
  weight: 6,
  dimensions: { width: 16.77, height: 23.03, depth: 8.18 },
  warrantyInformation: '1 month warranty',
  shippingInformation: 'Ships in 3-5 business days',
  availabilityStatus: 'In Stock',
  reviews: [
    {
      rating: 2,
      comment: 'Not worth the price!',
      date: '2025-04-30T09:41:02.054Z',
      reviewerName: 'Lily Torres',
      reviewerEmail: 'lily.torres@x.dummyjson.com'
    },
    {
      rating: 5,
      comment: 'Would buy again!',
      date: '2025-04-30T09:41:02.054Z',
      reviewerName: 'Hazel Evans',
      reviewerEmail: 'hazel.evans@x.dummyjson.com'
    },
    {
      rating: 4,
      comment: 'Fast shipping!',
      date: '2025-04-30T09:41:02.054Z',
      reviewerName: 'Owen Fisher',
      reviewerEmail: 'owen.fisher@x.dummyjson.com'
    }
  ],
  returnPolicy: 'No return policy',
  minimumOrderQuantity: 1,
  meta: {
    createdAt: '2025-04-30T09:41:02.054Z',
    updatedAt: '2025-04-30T09:41:02.054Z',
    barcode: '0376498933302',
    qrCode: 'https://cdn.dummyjson.com/public/qr-code.png'
  },
  images: [
    'https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/1.webp',
    'https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/2.webp',
    'https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/3.webp',
    'https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/4.webp',
    'https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/5.webp',
    'https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/6.webp'
  ],
  thumbnail: 'https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/thumbnail.webp'
}

*/
