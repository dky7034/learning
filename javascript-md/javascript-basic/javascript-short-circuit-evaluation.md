### 자바스크립트 단락 평가(Short-circuit Evaluation)

단락 평가는 논리 연산자 `&&` (AND)와 `||` (OR)가 표현식을 평가하는 특별한 방법입니다. 불필요한 연산을 건너뛰어 코드의 효율성을 높이고, 가독성을 향상시킵니다.

-----

### 1. 논리 AND (`&&`) 연산자

`A && B` 구문에서, `A`가 **Falsy**(거짓과 같은 값)인 경우, `B`는 평가되지 않고 즉시 `A`의 값이 반환됩니다. `A`가 **Truthy**(참과 같은 값)인 경우에만 `B`가 평가되고, 최종적으로 `B`의 값이 반환됩니다.

  * **Falsy 값**: `false`, `0`, `''`(빈 문자열), `null`, `undefined`, `NaN`
  * **Truthy 값**: Falsy 값을 제외한 모든 값

**활용 예시:**
조건부 실행이나 객체 속성에 접근하기 전에 존재 여부를 확인할 때 사용됩니다.

```javascript
// user가 null이므로 user.name은 실행되지 않고 'null'이 반환됨.
const user = null;
const username = user && user.name;
console.log(username); // null

// message가 truthy이므로 console.log가 실행됨.
const message = 'Hello';
message && console.log('메시지 있음!'); // '메시지 있음!' 출력
```

-----

### 2. 논리 OR (`||`) 연산자

`A || B` 구문에서, `A`가 **Truthy**인 경우, `B`는 평가되지 않고 즉시 `A`의 값이 반환됩니다. `A`가 **Falsy**인 경우에만 `B`가 평가되고, 최종적으로 `B`의 값이 반환됩니다.

**활용 예시:**
변수에 **기본값**을 할당할 때 자주 사용됩니다.

```javascript
// name이 falsy이므로 'Guest'가 할당됨.
const name = '';
const displayName = name || 'Guest';
console.log(displayName); // 'Guest'

// user.profileImage가 존재하면 그 값을 사용하고, 없으면 기본 이미지 경로를 사용.
const userProfile = user.profileImage || 'default.png';
```

-----

### 3. 논리 Nullish 병합 연산자 (`??`) (ES2020)

`A ?? B` 구문은 `||` 연산자의 단점을 보완합니다. `A`가 **`null` 또는 `undefined`**인 경우에만 `B`가 평가되고, 그렇지 않으면 `A`의 값이 반환됩니다.

**`||` 와의 차이점:**
`||`는 `0`이나 `''` 같은 Falsy 값을 기본값으로 처리하지만, `??`는 오직 `null`과 `undefined`만 기본값으로 처리합니다.

```javascript
// || 연산자는 0을 falsy로 간주하여 '기본값'을 할당.
let count = 0;
let defaultCount = count || '기본값';
console.log(defaultCount); // '기본값'

// ?? 연산자는 0을 null 또는 undefined로 간주하지 않아 0을 그대로 유지.
let countNullish = 0;
let defaultCountNullish = countNullish ?? '기본값';
console.log(defaultCountNullish); // 0
```

단락 평가는 자바스크립트의 효율성을 높이는 중요한 개념입니다. 이 내용을 잘 이해하시면 더욱 간결하고 성능 좋은 코드를 작성하실 수 있습니다.