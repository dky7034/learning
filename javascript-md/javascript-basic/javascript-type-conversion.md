# JavaScript 형변환 (Type Conversion)

이 문서는 JavaScript의 형변환에 대해 설명합니다. 문서를 통해 다음 내용을 학습할 수 있습니다.

- 형변환의 개념과 종류
- 명시적 형변환: `String()`, `Number()`, `Boolean()` 함수의 사용법
- 암시적 형변환: 연산 중에 자동으로 발생하는 형변환의 이해

---

## 사전 학습

- **JavaScript 원시 자료형**: `String`, `Number`, `Boolean` 등 기본 데이터 타입에 대한 이해가 필요합니다.
- **JavaScript 연산자**: 연산자에 따라 형변환이 어떻게 발생하는지 이해하는 데 도움이 됩니다.

---

## 형변환(Type Conversion)이란?

**형변환**은 데이터의 자료형을 다른 자료형으로 변환하는 과정을 의미합니다. JavaScript에서는 두 가지 종류의 형변환이 있습니다.

1.  **명시적 형변환 (Explicit Type Conversion)**: 개발자가 의도를 가지고 직접 자료형을 변환하는 경우입니다.
2.  **암시적 형변환 (Implicit Type Conversion)**: JavaScript 엔진이 특정 연산을 수행하기 위해 자동으로 자료형을 변환하는 경우입니다.

---

## 1. 명시적 형변환

### 문자열(String)로 변환

#### `String()` 함수 사용

가장 직접적이고 명확한 방법입니다. `null`과 `undefined`를 포함한 모든 값을 문자열로 변환할 수 있습니다.

```javascript
console.log(String(123)); // "123"
console.log(String(true)); // "true"
console.log(String(false)); // "false"
console.log(String(null)); // "null"
console.log(String(undefined)); // "undefined"
```

#### `toString()` 메서드 사용

데이터에 내장된 `toString()` 메서드를 호출하여 문자열로 변환합니다. 단, `null`과 `undefined`는 메서드를 가지고 있지 않아 이 방법으로는 변환할 수 없습니다.

```javascript
console.log((123).toString()); // "123"
console.log(true.toString()); // "true"
console.log([1, 2, 3].toString()); // "1,2,3"

// null.toString();      // TypeError
// undefined.toString(); // TypeError
```

### 숫자(Number)로 변환

#### `Number()` 함수 사용

문자열이 온전히 숫자로만 구성되어 있을 때 숫자형으로 변환합니다. 변환할 수 없는 문자가 포함되어 있거나, 빈 문자열이 아닌 경우 `NaN`(Not a Number)을 반환합니다.

```javascript
console.log(Number("123")); // 123
console.log(Number("123.45")); // 123.45
console.log(Number("123abc")); // NaN
console.log(Number("")); // 0 (빈 문자열은 0으로 변환)
console.log(Number("   ")); // 0 (공백 문자열도 0으로 변환)

console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
```

#### `parseInt()`와 `parseFloat()` 함수 사용

- `parseInt()`: 문자열의 시작 부분부터 **정수**로 변환 가능한 부분까지만 변환합니다.
- `parseFloat()`: 문자열의 시작 부분부터 **실수(소수 포함)**로 변환 가능한 부분까지만 변환합니다.

```javascript
// parseInt()
console.log(parseInt("123")); // 123
console.log(parseInt("123.45")); // 123 (정수 부분만 추출)
console.log(parseInt("123abc")); // 123 (숫자 부분까지만 변환)

// parseFloat()
console.log(parseFloat("123")); // 123
console.log(parseFloat("123.45")); // 123.45
console.log(parseFloat("123.45abc")); // 123.45 (실수 부분까지만 변환)
```

### 불리언(Boolean)으로 변환

#### `Boolean()` 함수 사용

`Boolean()` 함수는 "Falsy" 값들을 `false`로, 나머지 "Truthy" 값들을 `true`로 변환합니다.

**Falsy 값 (거짓으로 취급되는 값)**
`false`, `undefined`, `null`, `0`, `-0`, `NaN`, `""` (빈 문자열)

```javascript
// Falsy 값의 변환
console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false

// Truthy 값의 변환
console.log(Boolean(1)); // true
console.log(Boolean("hello")); // true
console.log(Boolean("false")); // true (내용이 있는 문자열)
console.log(Boolean({})); // true (객체)
console.log(Boolean([])); // true (배열)
```

---

## 2. 암시적 형변환

### 문자열 연결 시 형변환

`+` 연산자를 사용할 때 피연산자 중 하나라도 문자열이면, 다른 피연산자도 문자열로 변환된 후 두 문자열이 연결됩니다.

```javascript
const a = 1;
const b = "2";
console.log(a + b); // "12" (숫자 1이 문자열 "1"로 변환됨)
```

### 산술 연산 시 형변환

`+`를 제외한 다른 산술 연산자(`-`, `*`, `/`, `%`)는 피연산자들을 숫자형으로 변환하여 계산합니다.

```javascript
console.log("10" - 5); // 5 (문자열 "10"이 숫자 10으로 변환)
console.log("10" * 2); // 20
console.log("10" / 2); // 5
console.log("10" % 3); // 1
console.log("abc" - 5); // NaN (문자열 "abc"는 숫자로 변환 불가)
```

### 논리 연산 시 형변환

논리 연산자(`!`, `&&`, `||`)는 피연산자를 불리언 값으로 암시적 형변환하여 평가합니다. 이때 위에서 언급된 "Falsy"와 "Truthy" 규칙이 적용됩니다.

```javascript
// ! (NOT) 연산자는 값을 불리언으로 변환 후 그 반대 값을 반환
console.log(!false); // true
console.log(!0); // true (0은 Falsy -> true)
console.log(!""); // true (빈 문자열은 Falsy -> true)
console.log(!null); // true
console.log(!undefined); // true
console.log(!NaN); // true

console.log(!true); // false
console.log(!100); // false (100은 Truthy -> false)
console.log(!"hello"); // false ("hello"는 Truthy -> false)
```
