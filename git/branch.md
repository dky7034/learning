# Git 브랜치(Branch) 가이드

이 문서는 Git의 핵심 기능인 브랜치(Branch)의 개념과 사용법을 상세히 설명합니다. 이 문서를 통해 개발자는 독립적인 작업 공간을 확보하고, 여러 기능을 동시에 개발하며, 안정적으로 코드를 통합하는 방법을 학습할 수 있습니다.

## 1. 브랜치(Branch)란?

**브랜치(Branch, 가지)**는 Git 프로젝트 내에서 독립적으로 어떤 작업을 진행하기 위한 **개별적인 작업 공간**입니다. 메인 개발 라인에서 가지를 뻗어 나오는 것처럼, 기존 코드에 영향을 주지 않고 새로운 기능 개발이나 실험적인 코드 작성을 안전하게 수행할 수 있습니다.

- **독립성**: 각 브랜치는 다른 브랜치의 영향을 받지 않으므로, 여러 작업을 동시에 진행할 수 있습니다.
- **메인(main/master) 브랜치**: 프로젝트의 중심이 되는 브랜치로, 보통 최종적으로 배포 가능한 안정적인 버전의 코드가 위치합니다.

### 브랜치의 필요성

- **기능별 개발**: 새로운 기능을 개발할 때 메인 코드(main)에 영향을 주지 않고 독립적으로 작업할 수 있습니다.
- **실험적 작업**: 새로운 아이디어나 리팩토링 등 실험적인 코드를 안전하게 테스트하고, 실패 시 쉽게 폐기할 수 있습니다.
- **협업**: 여러 개발자가 동시에 서로 다른 기능을 충돌 없이 개발할 수 있습니다.
- **버전 관리**: 안정적인 버전(main)과 개발 중인 버전(develop), 특정 기능(feature)을 분리하여 체계적으로 관리할 수 있습니다.

---

## 2. 브랜치 기본 명령어

| 명령어                 | 설명                                  |
| ---------------------- | ------------------------------------- |
| `git branch`           | 브랜치 목록을 확인합니다.             |
| `git branch <이름>`    | 새로운 브랜치를 생성합니다.           |
| `git switch <이름>`    | 다른 브랜치로 전환합니다. (HEAD 이동) |
| `git branch -d <이름>` | 브랜치를 삭제합니다.                  |

### `git branch`: 브랜치 목록 확인

- `git branch`: 로컬 브랜치 목록을 출력합니다. 현재 위치한 브랜치는 `*` 표시로 구분됩니다.
- `git branch -a`: 원격 저장소의 브랜치까지 모두 표시합니다.
- `git branch -v`: 각 브랜치의 마지막 커밋 메시지도 함께 표시합니다.

### `git branch <브랜치명>`: 브랜치 생성

현재 커밋을 기준으로 새로운 브랜치를 생성합니다. 브랜치를 생성해도 자동으로 해당 브랜치로 전환되지는 않습니다.

```bash
# 'feature-login'이라는 이름의 브랜치 생성
git branch feature-login
```

### `git switch <브랜치명>`: 브랜치 전환

다른 브랜치로 작업 공간을 전환합니다. 이 명령을 실행하면 작업 디렉토리의 파일들이 해당 브랜치의 마지막 커밋 상태로 변경됩니다.

**주의**: 전환하기 전에 현재 작업 중인 변경사항을 커밋하거나 임시 저장(stash)해야 합니다.

```bash
# 'feature-login' 브랜치로 전환
git switch feature-login
```

### `git branch -d <브랜치명>`: 브랜치 삭제

- `-d` (delete): 다른 브랜치와 **병합이 완료된** 브랜치만 안전하게 삭제합니다.
- `-D` (force delete): 병합되지 않은 브랜치도 강제로 삭제합니다.

```bash
# 병합이 완료된 'feature-login' 브랜치 삭제
git branch -d feature-login
```

---

## 3. 브랜치 병합 (Merge)

**병합(Merge)**은 서로 다른 두 브랜치의 변경사항을 하나의 브랜치로 합치는 작업입니다. 예를 들어, `feature-login` 브랜치에서 개발한 로그인 기능을 `main` 브랜치에 통합할 때 사용합니다.

### `git merge <브랜치명>`

현재 위치한 브랜치에 대상 브랜치(`<브랜치명>`)의 변경사항을 병합합니다.

```bash
# 1. main 브랜치로 전환
git switch main

# 2. feature-login 브랜치의 내용을 main으로 병합
git merge feature-login
```

### 병합 시뮬레이션 (충돌 없는 경우)

1.  **Git 저장소 생성**

    ```bash
    mkdir merge-demo && cd merge-demo
    git init
    ```

2.  **초기 파일 생성 및 커밋 (`main` 브랜치)**

    ```bash
    echo "프로젝트: 웹사이트 제작" > main.txt
    git add main.txt
    git commit -m "초기 프로젝트 파일 생성"
    ```

3.  **`feature-login` 브랜치 생성 및 기능 추가**

    ```bash
    git switch -c feature-login # 생성과 동시에 전환
    echo "로그인 기능 개발 완료" > login.txt
    git add login.txt
    git commit -m "feat: 로그인 기능 개발 완료"
    ```

4.  **`main` 브랜치로 돌아가서 다른 기능 추가**

    ```bash
    git switch main
    echo "회원가입 기능 개발 완료" > signup.txt
    git add signup.txt
    git commit -m "feat: 회원가입 기능 개발 완료"
    ```

5.  **브랜치 상태 확인**
    `git log --oneline --all --graph` 명령어로 각 브랜치가 분기된 상태를 시각적으로 확인할 수 있습니다.

    ```
    * 8a1b2c3 (HEAD -> main) feat: 회원가입 기능 개발 완료
    | * 7d4e5f6 (feature-login) feat: 로그인 기능 개발 완료
    |/
    * 6h7i8j9 초기 프로젝트 파일 생성
    ```

6.  **`feature-login` 브랜치를 `main`으로 병합**

    ```bash
    git merge feature-login
    ```

    > Merge made by the 'recursive' strategy.
    > login.txt | 1 +
    > 1 file changed, 1 insertion(+)
    > create mode 100644 login.txt

7.  **병합 결과 확인**
    `git log --oneline --graph`로 병합 커밋이 생성되고 두 브랜치가 합쳐진 것을 확인할 수 있습니다.

    ```
    *   e9l0m1n (HEAD -> main) Merge branch 'feature-login'
    |\
    | * 7d4e5f6 feat: 로그인 기능 개발 완료
    * | 8a1b2c3 feat: 회원가입 기능 개발 완료
    |/
    * 6h7i8j9 초기 프로젝트 파일 생성
    ```

8.  **불필요한 브랜치 삭제**
    ```bash
    git branch -d feature-login
    ```

---

## 4. 병합 충돌 (Merge Conflict)

**병합 충돌**은 두 브랜치에서 **동일한 파일의 동일한 부분을 다르게 수정**했을 때 발생합니다. Git이 어떤 변경사항을 선택해야 할지 자동으로 결정할 수 없기 때문에, 개발자가 직접 충돌을 해결해야 합니다.

### 병합 충돌 및 해결 시뮬레이션

1.  **Git 저장소 및 초기 파일 생성**

    ```bash
    mkdir conflict-demo && cd conflict-demo
    git init
    echo "프로젝트 이름: 미정" > README.txt
    git add README.txt
    git commit -m "초기 README 파일 생성"
    ```

2.  **`feature` 브랜치에서 파일 수정**

    ```bash
    git switch -c feature
    echo "프로젝트 이름: 모바일 앱 개발" > README.txt
    git add README.txt
    git commit -m "docs: 프로젝트 이름을 모바일 앱으로 변경"
    ```

3.  **`main` 브랜치에서 동일 파일 수정**

    ```bash
    git switch main
    echo "프로젝트 이름: 웹사이트 개발" > README.txt
    git add README.txt
    git commit -m "docs: 프로젝트 이름을 웹사이트로 변경"
    ```

4.  **충돌 발생시키기**

    ```bash
    git merge feature
    ```

    > Auto-merging README.txt
    > CONFLICT (content): Merge conflict in README.txt
    > Automatic merge failed; fix conflicts and then commit the result.

5.  **충돌 상태 확인 및 해결**

    - `git status`로 충돌이 발생한 파일을 확인합니다. (`both modified: README.txt`)
    - 텍스트 에디터로 `README.txt` 파일을 엽니다.

    ```
    <<<<<<< HEAD
    프로젝트 이름: 웹사이트 개발
    =======
    프로젝트 이름: 모바일 앱 개발
    >>>>>>> feature
    ```

    - `<<<<<<< HEAD`는 현재 브랜치(`main`)의 변경사항입니다.
    - `=======`는 변경사항의 구분선입니다.
    - `>>>>>>> feature`는 병합하려는 브랜치(`feature`)의 변경사항입니다.

    - **충돌 마커(`<<<`, `===`, `>>>`)를 모두 제거하고, 두 변경사항을 고려하여 최종적으로 원하는 내용으로 파일을 수정합니다.**

    ```bash
    # 예시: 두 내용을 통합하여 새로운 이름으로 결정
    echo "프로젝트 이름: 풀스택 개발 프로젝트" > README.txt
    ```

6.  **해결된 파일 커밋**
    충돌을 해결한 파일을 다시 스테이징하고, 새로운 병합 커밋을 생성합니다.

    ```bash
    git add README.txt
    git commit # -m 옵션 없이 실행하면 커밋 메시지 편집기가 열립니다.
    ```

7.  **결과 확인**
    `git log --oneline --graph`로 충돌이 해결되고 병합이 완료된 히스토리를 확인할 수 있습니다.
