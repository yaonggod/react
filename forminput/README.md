# form, input

여러 개의 인풋에 대해 유효성을 검사 => 언제? 제출할 때? 포커스가 이동할 때? 입력이 변할때마다?

## 사용자 입력 가져오기 

- state로 input 입력 감지해서 저장하기

```react
const [enteredName, setEnteredName] = useState('');

const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
}

<input type='text' id='name' onChange={nameInputChangeHandler} /> 
```

- ref로 제출할 때 감지하기

```react
const nameInputRef = useRef();

const enteredValue = nameInputRef.current.value;

<input ref={nameInputRef} type='text' id='name'/>
```

- 초기화

```react
// DOM 직접 조작 : 지양
nameInputRef.current.value = '';
// 이거로해라
setEnteredName('');
```

## 유효성 검증하기

### 제출

```react
// 입력값이 valid한지 판별하는 state
const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);

const formSubmitHandler = event => {
    event.preventDefault();
    
    // 입력값이 공백일 때
    if (enteredName.trim() === '') {
        setEnteredNameIsValid(false);
        return;
    }
    
    // 유효성 검사를 통과했을때
    setEnteredNameIsValid(true);
    
}

<form onSubmit={formSubmitHandler}></form>
```

- 입력을 시도한 적이 없음 === valid하지도 invalid하지도 않음

- 입력을 시도했고, 유효함 === valid

- 입력을 시도했으나 유효하지 않음 === invalid

=> invalid한 상태만 골라서 form에 보여주기

```react
// 입력값이 valid한지 판별하는 state
const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
// 입력 시도가 있었는지 판별하는 state
const [enteredNameTouched, setEnteredNameTouched] = useState(false);

const formSubmitHandler = event => {
    event.preventDefault();
    
    // 폼을 제출했음 === 입력을 시도했음
    setEnteredNameTouched(true);
    
    // 입력값이 공백일 때
    if (enteredName.trim() === '') {
        setEnteredNameIsValid(false);
        return;
    }
    
    // 유효성 검사를 통과했을 때
    setEnteredNameIsValid(true);
    
    // 진짜 최종 valid 판별 변수
    const nameInputIsInValid = !enteredNameIsValid && enteredNameTouched;
    // 결과에 따라서 valid, invalid 클래스 동적으로 변화
    const nameInputClasses = nameInputIsInValid 
      ? 'form-control invalid' 
      : 'form-control'
}

<form onSubmit={formSubmitHandler}>
	<div className={nameInputClasses}></div>
</form>
```

### 포커스를 잃음

=== 포커스를 했다가 포커스를 잃음 === 입력을 시도한 적이 있음

```react
const nameInputBlurHandler = event => {
    
    // 입력을 시도한 적이 있음
    setEnteredNameTouched(true);
    
    // 유효성 검사 통과X
    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return
    }
}

<input onBlur={nameInputBlurHandler}/>
```

### 입력이 변함

```react
const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
    
    // enteredName을 set해도 리액트에서 비동기적으로 처리하므로 enteredName하고 event.target.value가 다를 수 있음
    if (event.target.value.trim() !== '') {
      setEnteredNameIsValid(true);
    }
}
```

### 간소화

valid 변수들을 state로 관리하지 않고 enteredName과 touched의 변화에 따라 변하게 

```react
const [enteredName, setEnteredName] = useState('');
const [enteredNameTouched, setEnteredNameTouched] = useState(false);

const enteredNameIsValid = enteredName.trim() !== '';
const nameInputIsInValid = !enteredNameIsValid && enteredNameTouched;

// nameInput state 관리
const nameInputChangeHandler = event => {
	setEnteredName(event.target.value);
}

const nameInputBlurHandler = event => {
	setEnteredNameTouched(true);
}

const formSubmitHandler = event => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    // 유효성 검증 통과 후 form 초기화
    // input value 초기화
    setEnteredName('');
    // touched 초기화
    setEnteredNameTouched(false);
}
```

## form 여러개

전체 input에 대해 유효성 검사

```react
let formIsValid = false;

if (enteredNameIsValid && ...) {
	formIsValid = true;
}

<button disabled={!formIsValid}></button>
```

input 유효성 검사를 커스텀 훅으로 일반화하기

```react
import { useState } from 'react'

// 유효성 조건을 validateValue라는 prop으로 전달
const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched; 

    const valueChangeHandler = event => {
        setEnteredValue(event.target.value);
    }

    const inputBlurHandler = event => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return { 
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    }
}

export default useInput;
```

```react
const { value: enteredName, 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler: nameChangeHandler, 
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
} = useInput(value => value.trim() !== '');
```

`useReducer` 

```react
const initialInputState = {
    value: '', isTouched: false,
}

const inputStateReducer = (state, action) {
    if (action.type === 'INPUT') {
        return { value: action.value, isTouched: state.isTouched };
    } 
    if (action.type === 'BLUR') {
        return { value: state.value, isTouched: true };
    }
    if (action.type === 'RESET') {
        return initialInputState;
    }
}
```

```react
const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value})
}

const inputBlurHandler = (event) => {
    dispatch({ type: 'BLUR' })
}

const reset = () => {
    dispatch({ type: 'RESET'})
}
```
