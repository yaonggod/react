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
  - 의존성에 추가하지 않아도 되는 것
    - 상태 업데이트 기능 ex) `setFormIsValid` -> React가 변경되지 않음을 보장
    - 내장 API 또는 함수 (`fetch()`, `localStorage`) -> 렌더링과 관련 없음
    - 기타 외부 변수 또는 함수


```react
// 초기 앱 실행시에만 실행
useEffect(() => {
    const loginState = localStorage.getItem('isLoggedIn');
    if (loginState === '1') {
      setIsLoggedIn(true);
    }
}, []);

// enteredEmail, enteredPassword가 변할때마다 실행
useEffect(() => {
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    )
  }, [enteredEmail, enteredPassword])
```

`cleanUp()`

- useEffect가 실행될 때마다 타이머가 돌아감
- 다른 useEffect가 실행되면 이전 useEffect의 결과물인 이전 타이머들을 치움(cleanup)
- 마지막 useEffect의 타이머만 돌아감
- state가 한 글자씩 변할때마다 평가하는 것이 비효율적임 -> 시간차를 두고 재평가 ㄱㄱ

```react
useEffect(() => {
    // 3초후에 이 함수를 실행해라 하는 타이머를 돌림
    const identifier = setTimeout(() => {
      console.log('value is changing');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      )
    }, 3000);
	
    // useEffect가 실행될 때마다 identifier를 지움
    return () => {
      console.log('cleanup');
      clearTimeout(identifier);
    };
}, [enteredEmail, enteredPassword])
```

## Reducers

### useReducer

복잡한 state 관리에 활용 

state(`enteredEmail`)로 다른 state(`emailIsValid`)를 업데이트

 == 지양해야할 것, 참고해야할 state가 가장 최신의 상태가 아닐수도 있음

```react
const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };
```

state를 하나로 통합하거나

`useReducer` 이용하기

```react
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);
```

`dispatchFn` 새로운 state를 set하는 대신 action을 dispatch

`reducerFn` 최신 state를 가져옴, 디스패치된 액션을 가져옴, 업데이트된 state를 반환

```react
import { useReducer } from 'react';

const emailReducer = (state, action) => {
  // input 변화 : emailState를 action에서 받아온 값을 이용해 업데이트 
  if (action.type === 'INPUT_CHANGE') {
    return {value: action.val, isValid: action.val.includes('@')};
  }
  // input창에서 포커스 해제 : 기존 emailState 유지
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')};
  }
  // 나머지 경우에는 초기값으로 설정
  return {value: '', isValid: false};
};

// emailState의 초기값 설정 - form은 valid하지도 invalid하지도 않으므로 null로 
// dispatchEmail 실행 시 emailReducer라는 액션 실행
const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null})

// email input이 변할 때마다 실행
const emailChangeHandler = (event) => {
    // emailState 바꿀 때 활용할 객체 
    dispatchEmail({type: 'INPUT_CHANGE', val: event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  };

// email input 포커스 해제 시 실행 
const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR'})
  };

```

useReducer로 useEffect 업데이트

```react
// 객체 디스트럭쳐링 : const emailIsValid = emailState.isValid; 
const { isValid: emailIsValid } = emailState;
const { isValid: passwordIsValid } = passwordState;

useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('value is changing');
      setFormIsValid(emailIsValid, passwordIsValid)
    }, 500);

	// isValid가 변할 때에만 useEffect 실행
    return () => {
      console.log('cleanup');
      clearTimeout(identifier);
    };
}, [emailIsValid, passwordIsValid])
```





## Context

