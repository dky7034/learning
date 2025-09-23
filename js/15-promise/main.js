// Promise 객체
// 비동기 처리의 성공과 실패
// 예) 네트워크 통신의 성공과 실패
// 성공 상태일 때 수행할 처리 메서드
// Promise데이터.then(콜백함수)

// 실패 상태일 때 수행할 처리 메서드
// Promise데이터.catch(콜백함수)
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const randomNumber = Math.random();

    if (randomNumber > 0.5) {
      resolve(`성공! 숫자는 ${randomNumber}입니다.`);
    } else {
      reject(new Error(`실패! 숫자는 ${randomNumber}입니다.`));
    }
  }, 1000);
});

// async/await
// Promise 자료형을 쉽게 사용하게 도와주는 키워드

// async 키워드
// 함수 앞에 붙는 키워드.
// 해당 함수가 비동기를 처리하는 함수라는 것을 표시
async function func() {
  try {
    // 비동기 처리를 수행하는 코드 블록
    // await 키워드
    // Promise 기반 비동기처리 수행
    // 수행 결과 resolve() 함수 인자를 반환
    const result = await promise
      .then((msg) => {
        // console.log(msg);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
}

func();
