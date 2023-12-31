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

state를 여러 컴포넌트를 거쳐서 목적 컴포넌트로 보내는 경우
-> 부모 컴포넌트를 거치지 않고 리액트 전체 state로 관리 

### Context

```react
import React from "react";

// 디폴트 객체 : 사용할 원소들을 형태 맞춰서 다 넣어주는게 좋음 -> 자동완성
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
});

export default AuthContext;
```

Provider : 전달할 값을 value에 넣고 context가 적용될 범위를 감싸기 
-> MainHeader, Main이 context에 접근 가능, 자식 컴포넌트로 내려갈 때마다 props로 전달할 필요X

```react
import AuthContext from './store/auth-context';

return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn}}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider> 
  );
```

Consumer : 자식 컴포넌트가 받아서 활용

```react
<AuthContext.Consumer>
  {(context) => {
    return (
        {context.isLoggedIn && <a href="/">Users</a>}
    )}
</AuthContext.Consumer>
```

`useContext`

```react
import { useContext } from 'react';

const context = useContext(AuthContext);
return (
  {context.isLoggedIn && <a href="/">Users</a>}
)
```

context에서 state를 관리하고, App은 JSX를 렌더링하는데 집중하기
-> AuthContextProvider Wrapper를 export해서 사용, ACP로 App을 감싸기
-> context를 import한 컴포넌트에서 context를 사용하던가 바꾸던가 하기

```react
import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const logoutHandler = () => {
        setIsLoggedIn(false);
    }
    const loginHandler = () => {
        setIsLoggedIn(true);
    }

    useEffect(() => {
        const loginState = localStorage.getItem('isLoggedIn');
        if (loginState === '1') {
          setIsLoggedIn(true);
        }
    }, []);
	
    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;
```

```react
import { AuthContextProvider } from './store/auth-context';

root.render(<AuthContextProvider><App /></AuthContextProvider>);
```

Button과 같이 전체 app에서 적용되는 UI같은 컴포넌트는 context로 관리하면 전역적으로 적용
-> props가 더 적합

변경이 잦은 경우에는 context가 적합하지 않음

## Hooks

- 리액트 훅은 리액트 함수 내에서만 사용, 일반 함수 내에서 X

- 중첩 함수(callback)나 블록 내(if, while)에서 호출 X , 최상위 수준에서만 호출 

- useEffect는 참조하는 모든 것들을 의존성에 추가 

```react
useEffect(() => {
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    )
  }, [enteredEmail, enteredPassword])
```

예외: useEffect나 useReducer에 의해 노출된 state 업데이트 함수는 react가 변하지 않음을 보장
-> dependency에 추가하지 않아도 됨

## useRef

특정 DOM을 선택해줌

react는 ref 사용 권장 X

```react
import { useRef } from 'react';

const emailInputRef = useRef();
emailInputRef.current.focus();

return <Input ref={emailInputRef}></Input>
```

## useImperativeHandle

ref를 사용할 때 부모 컴포넌트로 특정 값을 객체로 보냄

```react
import React, { useRef, useImperativeHandle } from 'react';

// Input 컴포넌트에서 focus일 경우 activate하라고 부모에게 알려줌
const Input = React.forwardRef((props, ref) => {
    const activate = () => {};
    useImperativeHandle(ref, () => {
        return {focus: activate};
    })
})

// 부모 컴포넌트에서 Input컴포넌트의 ref에다가 focus(== activate)함
const emailInputRef = useRef();
emailInputRef.current.focus();
```

