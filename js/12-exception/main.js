try {
  const constVar = "상수";
  constVar = "상수 재할당"; // 오류
} catch (error) {
  console.log(`오류 발생: ${error}`);
}

console.log("야호");
