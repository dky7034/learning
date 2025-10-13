// 기존 axios 실습 환경 폴더를 유지한 상태로 새 파일을 만들어서 실습을 진행한다

// 각 문제에서 요구하는 코드를 작성한다
// 모든 문제는 TMDB API를 사용하여 문제를 해결한다
// TMDB API 문서 : https://developer.themoviedb.org/reference/getting-started
// 각 문제 해결 후 실행 결과와 출력 결과가 동일하면, 해당 문제의 코드는 주석 처리한다
//

// 아래 코드는 수정하지 않는다
import axios from "axios";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2NkYjhkZTE1Y2Q5YmFjOTdhMDI0NDM4ZDA3NzVmNyIsIm5iZiI6MTU2ODg3Njk5MS4wMSwic3ViIjoiNWQ4MzI5YmYxNjJiYzMwMjI3ZGRmY2Q2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.mVYTY9HFgARKfLsWAv6kTUsg60tvBNAW6856OUiwpqo";

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getTopRatedMoviesResponse
// 요구사항 : MOVIE LISTS - Top Rated API를 호출하고 응답 객체를 출력한다

/* 출력 결과
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
      "genre_ids": [
        18,
        80
      ],
      "id": 278,
      "original_language": "en",
      "original_title": "The Shawshank Redemption",
      "overview": "촉망받는 은행 간부 앤디 듀프레인은 아내와 그녀의 정부를 살해했다는 누명을 쓴다. 주변의 증언과 살해 현장의 그럴듯한 증거들로 그는 종신형을 선고받고 악질범들만 수용한다는 지옥같은 교도소 쇼생크로 향한다. 인간 말종 쓰레기들만 모인 그곳에서 그는 이루 말할 수 없는 억압과 짐승보다 못한 취급을 당한다. 그러던 어느 날, 간수의 세금을 면제받게 해 준 덕분에 그는 일약 교도소의 비공식 회계사로 일하게 된다. 그 와중에 교도소 소장은 죄수들을 이리저리 부리면서 검은 돈을 긁어 모으고 앤디는 이 돈을 세탁하여 불려주면서 그의 돈을 관리하는데...",
      "popularity": 28.1802,
      "poster_path": "/qV9BQZdiM8foEzDz0Ag5hGWE5qM.jpg",
      "release_date": "1994-09-23",
      "title": "쇼생크 탈출",
      "video": false,
      "vote_average": 8.712,
      "vote_count": 28987
    },
    // ... 중략
  ],
  "total_pages": 520,
  "total_results": 10395
}
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getSingleMovieResponse
// 요구사항
// MOVIES - Details API를 호출하고 응답 객체를 출력한다
// movie_id: 22

/* 출력 결과
{
  "adult": false,
  "backdrop_path": "/rrCc7dONpjAt8N8VO0dGpdIXCVU.jpg",
  "belongs_to_collection": {
    "id": 295,
    "name": "캐리비안의 해적 시리즈",
    "poster_path": "/4KUJ38SsViJTsUmTRvXxerBNwAv.jpg",
    "backdrop_path": "/wxgD3fB5lQ2sGJLog0rvXW049Pf.jpg"
  },
  "budget": 140000000,
  "genres": [
    {
      "id": 12,
      "name": "모험"
    },
    {
      "id": 14,
      "name": "판타지"
    },
    {
      "id": 28,
      "name": "액션"
    }
  ],
  "homepage": "",
  "id": 22,
  "imdb_id": "tt0325980",
  "origin_country": [
    "US"
  ],
  "original_language": "en",
  "original_title": "Pirates of the Caribbean: The Curse of the Black Pearl",
  "overview": "잭 스패로우는 10년 전의 반란 사건으로 자신의 배 블랙펄을 빼앗긴 해적 선장이다. 혼자 대양을 떠돌던 그는 자메이카의 로열포트에 이르러 유령선처럼 변해버린 블랙펄과 재회하게 된다. 아즈텍의 황금을 훔친 블랙펄의 선원들은 영원히 죽지 못하는 저주에 걸린 처지. 보물을 모두 제자리에 돌려놓고 피의 제물을 바쳐야만 고대 신들이 내린 저주를 풀 수 있다. 그들은 로열포트를 습격해 아즈텍의 마지막 목걸이를 가진 총독의 딸 엘리자베스를 납치하고, 엘리자베스를 사랑하는 어린 시절 친구 윌과 스패로우는 그 뒤를 쫓는데...",
  "popularity": 19.4608,
  "poster_path": "/3ovejwQO4fKOWx4VgGBJeT8CKCn.jpg",
  "production_companies": [
    {
      "id": 2,
      "logo_path": "/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
      "name": "Walt Disney Pictures",
      "origin_country": "US"
    },
    {
      "id": 130,
      "logo_path": "/c9dVHPOL3cqCr2593Ahk0nEKTEM.png",
      "name": "Jerry Bruckheimer Films",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2003-07-09",
  "revenue": 655011224,
  "runtime": 143,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "저주받은 황금이 해적들에게 저주를 내렸다",
  "title": "캐리비안의 해적: 블랙펄의 저주",
  "video": false,
  "vote_average": 7.814,
  "vote_count": 21490
}
*/

// 문제. 아래 요구사항을 해결하는 함수를 작성하고 함수를 실행한다.
// 함수이름 : getNowPlayingTopMoviesResponse
// 요구사항
// MOVIE LISTS - Now Playing API를 호출하고 첫 번째 페이지의 영화 목록 중 vote_average가 가장 큰 영화 정보를 출력한다

/* 출력 결과
{
  adult: false,
  backdrop_path: '/dh0dLVLDLqUKhtytCFjkf3EHeJI.jpg',
  genre_ids: [ 16, 28, 14 ],
  id: 1218925,
  original_language: 'ja',
  original_title: 'チェンソーマン レゼ篇',
  overview: '데블 헌터로 일하는 소년 ‘덴지’는 조직의 배신으로 죽음에 내몰린 순간 전기톱 악마견 ‘포치타’와의 계약으로 하나로 합쳐져 누구도 막을 수 없는 존재 ‘체인소 맨’으로 다시 태어난다. 악마와 사냥꾼, 그리고 정체불명의 적들이 얽힌 잔혹한 전쟁 속에서 ‘레제’라는 이름의 미스터리한 소녀가 ‘덴지’ 앞에 나타나는데… ‘덴지’는 사랑이라는 감정에 이끌려 지금껏 가장 위험한 배틀에 몸을 던진다!',
  popularity: 93.0327,
  poster_path: '/Amu0HNWfpxo2ZaulueNVxDLADz8.jpg',
  release_date: '2025-09-19',
  title: '극장판 체인소 맨: 레제편',
  video: false,
  vote_average: 8.6,
  vote_count: 18
}
*/
