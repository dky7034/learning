// axios 라이브러리 사용을 위한 기본 설정을 한다
// 1. axios 라이브러리 설치 명령어를 터미널에서 실행 (npm install axios)
// 2. package.json 파일에 "type": "module" 추가
// 3. .gitignore 파일에 node_modules 추가

// 각 문제에서 요구하는 코드를 작성한다
// 모든 문제는 DummyJSON을 기준으로 문제를 해결한다
// DummyJSON : https://dummyjson.com/docs
// 각 문제 해결 후 실행 결과와 출력 결과가 동일하면, 해당 문제의 코드는 주석 처리한다

// 아래 코드는 수정하지 않는다
import axios from "axios";

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getAllProductsResponse
// 요구사항 : 모든 상품 목록 조회(Get all products) API를 호출하고 응답 객체를 출력한다

/* 출력 결과
{
  products: [
    {
      id: 1,
      title: 'Essence Mascara Lash Princess',
      description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
      category: 'beauty',
      price: 9.99,
      discountPercentage: 10.48,
      rating: 2.56,
      stock: 99,
      tags: [Array],
      brand: 'Essence',
      sku: 'BEA-ESS-ESS-001',
      weight: 4,
      dimensions: [Object],
      warrantyInformation: '1 week warranty',
      shippingInformation: 'Ships in 3-5 business days',
      availabilityStatus: 'In Stock',
      reviews: [Array],
      returnPolicy: 'No return policy',
      minimumOrderQuantity: 48,
      meta: [Object],
      images: [Array],
      thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'
    },
    // 중략...
  ],
  total: 194,
  skip: 0,
  limit: 30
}
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getAllProductsResponseKeys
// 요구사항 : 모든 상품 목록 조회(Get all products) API를 호출하고 응답 객체의 모든 속성명(key)을 출력한다

/* 출력 결과
[ 'products', 'total', 'skip', 'limit' ]
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getAllProductsArray
// 요구사항 : 모든 상품 목록 조회(Get all products) API를 호출하고 응답 객체의 속성 중 products 를 불러와서 출력한다

/* 출력 결과
[
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    category: 'beauty',
    price: 9.99,
    discountPercentage: 10.48,
    rating: 2.56,
    stock: 99,
    tags: [Array],
    brand: 'Essence',
    sku: 'BEA-ESS-ESS-001',
    weight: 4,
    dimensions: [Object],
    warrantyInformation: '1 week warranty',
    shippingInformation: 'Ships in 3-5 business days',
    availabilityStatus: 'In Stock',
    reviews: [Array],
    returnPolicy: 'No return policy',
    minimumOrderQuantity: 48,
    meta: [Object],
    images: [Array],
    thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'
  },
  // 중략...
]
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getSingleProduct
// 요구사항 : 단일 상품 목록 조회(Get a single product) API를 호출해서 상품 id가 1인 상품 정보를 출력한다

/* 출력 결과
{
  id: 1,
  title: 'Essence Mascara Lash Princess',
  description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
  category: 'beauty',
  price: 9.99,
  discountPercentage: 10.48,
  rating: 2.56,
  stock: 99,
  tags: [ 'beauty', 'mascara' ],
  brand: 'Essence',
  sku: 'BEA-ESS-ESS-001',
  weight: 4,
  dimensions: { width: 15.14, height: 13.08, depth: 22.99 },
  warrantyInformation: '1 week warranty',
  shippingInformation: 'Ships in 3-5 business days',
  availabilityStatus: 'In Stock',
  reviews: [
    {
      rating: 3,
      comment: 'Would not recommend!',
      date: '2025-04-30T09:41:02.053Z',
      reviewerName: 'Eleanor Collins',
      reviewerEmail: 'eleanor.collins@x.dummyjson.com'
    },
    {
      rating: 4,
      comment: 'Very satisfied!',
      date: '2025-04-30T09:41:02.053Z',
      reviewerName: 'Lucas Gordon',
      reviewerEmail: 'lucas.gordon@x.dummyjson.com'
    },
    {
      rating: 5,
      comment: 'Highly impressed!',
      date: '2025-04-30T09:41:02.053Z',
      reviewerName: 'Eleanor Collins',
      reviewerEmail: 'eleanor.collins@x.dummyjson.com'
    }
  ],
  returnPolicy: 'No return policy',
  minimumOrderQuantity: 48,
  meta: {
    createdAt: '2025-04-30T09:41:02.053Z',
    updatedAt: '2025-04-30T09:41:02.053Z',
    barcode: '5784719087687',
    qrCode: 'https://cdn.dummyjson.com/public/qr-code.png'
  },
  images: [
    'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp'
  ],
  thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'
}
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getSearchPosts
// 요구사항 : 게시글 검색 목록 조회(Search posts) API를 호출해서 검색어가 "love"인 게시글 목록의 응답 객체를 출력한다

/* 출력 결과
{
  posts: [
    {
      id: 7,
      title: 'This is important to remember.',
      body: "This is important to remember. Love isn't like pie. You don't need to divide it among all your friends and loved ones. No matter how much love you give, you can always give more. It doesn't run out, so don't try to hold back giving it as if it may one day run out. Give it freely and as much as you want.",
      tags: [Array],
      reactions: [Object],
      views: 168,
      userId: 70
    },
    // 중략...
  ],
  total: 17,
  skip: 0,
  limit: 17
}
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getSearchPostsArray
// 요구사항 : 게시글 검색 목록 조회(Search posts) API를 호출해서 검색어가 "love"인 게시글 목록의 응답 객체의 속성 중 posts 배열을 출력한다

/* 출력 결과
[
  {
    id: 7,
    title: 'This is important to remember.',
      body: "This is important to remember. Love isn't like pie. You don't need to divide it among all your friends and loved ones. No matter how much love you give, you can always give more. It doesn't run out, so don't try to hold back giving it as if it may one day run out. Give it freely and as much as you want.",
      tags: [Array],
      reactions: [Object],
      views: 168,
      userId: 70
  },
  // 중략...
]
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getPostsByUserId
// 요구사항 : 사용자 id로 게시글 목록 조회(Get all posts by user id) API를 호출해서 사용자 id가 70인 게시글 목록의 응답 객체를 출력한다

/* 출력 결과
{
  posts: [
    {
      id: 7,
      title: 'This is important to remember.',
      body: "This is important to remember. Love isn't like pie. You don't need to divide it among all your friends and loved ones. No matter how much love you give, you can always give more. It doesn't run out, so don't try to hold back giving it as if it may one day run out. Give it freely and as much as you want.",
      tags: [Array],
      reactions: [Object],
      views: 168,
      userId: 70
    },
    {
      id: 68,
      title: 'She sat down with her notebook in her hand',
      body: "She sat down with her notebook in her hand, her mind wandering to faraway places. She paused and considered all that had happened. It hadn't gone as expected. When the day began she thought it was going to be a bad one, but as she sat recalling the day's events to write them down, she had to admit, it had been a rather marvelous day.",
      tags: [Array],
      reactions: [Object],
      views: 3551,
      userId: 70
    }
  ],
  total: 2,
  skip: 0,
  limit: 2
}
*/
