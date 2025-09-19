# JavaScript 집합 (Set)

이 문서는 ES6에서 도입된 컬렉션(Collection) 객체 중 하나인 **집합(Set)**에 대해 설명합니다. Set은 중복되지 않는 유일한 값들의 집합을 저장하고 관리하는 데 사용됩니다.

- Set의 기본 개념과 특징 (배열과의 차이점)
- Set 생성 및 기본 조작 방법 (추가, 삭제, 확인, 비우기)
- Set의 크기 확인 및 순회 방법

---

## 사전 학습

- **JavaScript 자료형 및 변수**: Set에 저장될 값의 종류를 이해하는 데 필요합니다.
- **JavaScript 배열(Array)**: Set과 배열을 비교하며 이해하면 더욱 효과적입니다.

---

## 1. 집합(Set)이란?

**Set** 객체는 **중복을 허용하지 않는** 값들의 순서 있는 목록을 저장하는 컬렉션입니다. 즉, 하나의 Set 안에는 동일한 값이 두 번 이상 존재할 수 없습니다.

배열(Array)과 유사하게 여러 값을 순서대로 저장하지만, 가장 큰 차이점은 **값의 유일성 보장**에 있습니다. 이 특징 덕분에 배열에서 중복된 항목을 제거하거나, 특정 항목의 존재 여부를 효율적으로 확인할 때 매우 유용합니다.

### 주요 특징

- **값의 유일성**: 동일한 값은 한 번만 저장됩니다.
- **순서 유지**: 값은 추가된 순서대로 저장되고 순회됩니다.
- **모든 자료형 저장**: 원시 자료형, 객체, 함수 등 모든 유형의 값을 저장할 수 있습니다.

---

## 2. Set 기본 조작

### Set 생성

`new Set()` 생성자를 사용하여 Set 객체를 생성합니다. 선택적으로 배열(또는 다른 이터러블 객체)을 인자로 전달하여 초기화할 수 있으며, 이 과정에서 중복된 값은 자동으로 제거됩니다.

```javascript
// 빈 Set 생성
const emptySet = new Set();

// 배열을 이용해 Set 생성 (중복 값 2는 자동으로 제거됨)
const numbers = [1, 2, 2, 3, 4, 4];
const numberSet = new Set(numbers);

console.log(numberSet); // Set(4) { 1, 2, 3, 4 }
```

### 크기 확인: `size`

`size` 프로퍼티를 사용하여 Set에 포함된 요소(값)의 개수를 확인할 수 있습니다. (배열의 `length`와 유사합니다.)

```javascript
const mySet = new Set([1, 2, 3, 3]);
console.log(mySet.size); // 3
```

---

## 3. Set 메서드

### `add(value)`: 요소 추가

`add()` 메서드를 사용하여 Set에 새로운 요소를 추가합니다. 이미 존재하는 값을 추가하면 아무런 변화가 일어나지 않습니다. `add()` 메서드는 체이닝(chaining)이 가능하도록 Set 객체 자신을 반환합니다.

```javascript
const set = new Set();

set.add(1); // Set(1) { 1 }
set.add("hello"); // Set(2) { 1, "hello" }
set.add(1); // Set(2) { 1, "hello" } (변화 없음)

// 체이닝
set.add(2).add(3);
console.log(set); // Set(4) { 1, "hello", 2, 3 }
```

### `has(value)`: 요소 존재 여부 확인

`has()` 메서드는 특정 값이 Set에 존재하는지 확인하고, 그 결과를 불리언(`true` 또는 `false`)으로 반환합니다.

```javascript
const set = new Set([1, 2, 3]);

console.log(set.has(2)); // true
console.log(set.has(4)); // false
```

### `delete(value)`: 요소 삭제

`delete()` 메서드는 Set에서 특정 값을 삭제합니다. 삭제에 성공하면 `true`를, 해당 값이 없어 삭제에 실패하면 `false`를 반환합니다.

```javascript
const set = new Set([1, 2, 3]);

const result1 = set.delete(2);
console.log(result1); // true
console.log(set); // Set(2) { 1, 3 }

const result2 = set.delete(4); // 존재하지 않는 요소 삭제 시도
console.log(result2); // false
```

### `clear()`: 모든 요소 제거

`clear()` 메서드는 Set의 모든 요소를 한 번에 제거합니다.

```javascript
const set = new Set([1, 2, 3]);
set.clear();
console.log(set); // Set(0) {}
```

---

## 4. Set 순회 (Iteration)

Set 객체는 이터러블(iterable)이므로, `for...of` 반복문이나 `forEach()` 메서드를 사용하여 요소를 순회할 수 있습니다.

### `for...of` 반복문

```javascript
const numberSet = new Set([10, 20, 30]);

for (const value of numberSet) {
  console.log(value);
}
// 10
// 20
// 30
```

### `forEach()` 메서드

Set의 `forEach`는 배열의 `forEach`와 유사하지만, 콜백 함수에 전달되는 첫 번째와 두 번째 인자가 모두 **값(value)**이라는 점이 독특합니다. 이는 배열과의 호환성을 위한 것입니다.

```javascript
const stringSet = new Set(["apple", "banana", "cherry"]);

stringSet.forEach((value, valueAgain, set) => {
  console.log(`값: ${value}, 다시 값: ${valueAgain}`);
});
// 값: apple, 다시 값: apple
// 값: banana, 다시 값: banana
// 값: cherry, 다시 값: cherry
```
