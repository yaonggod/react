# Effects, Reducers, Context

## Effects

Main job : 리액트 렌더링에 직접적으로 관련된 것

- JSX 렌더링
- State, Props 관리
- Event, Input에 반응
- 컴포넌트 재평가

Side Effect : 렌더링에 직접적으로 관련되지 않은 것

-> 컴포넌트 함수에 직접 넣으면 렌더링될때마다 실행되므로 버그나 무한 루프에 빠질 수 있음

-> `useEffect()`

- http request
- 브라우저 스토리지
- 타이머

### useEffect()

`useEffect(() => {}, [ dependencies ]);`

- 함수 : 모든 컴포넌트 평가 이후에 실행, 컴포넌트 렌더링 시에는 실행X
- 의존성 배열 : 의존성이 변경될 시에만 함수가 실행됨, 없을 시 무한루프 갈수도

```react
// 초기 앱 실행시에만 실행
useEffect(() => {
    const loginState = localStorage.getItem('isLoggedIn');
    if (loginState === '1') {
      setIsLoggedIn(true);
    }
}, []);

// setFormIsValid, enteredEmail, enteredPassword가 변할때마다 실행
useEffect(() => {
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    )
  }, [setFormIsValid, enteredEmail, enteredPassword])
```



## Reducers

## Context

