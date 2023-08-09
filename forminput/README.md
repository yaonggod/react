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

state로 isValid 상태에 따라서 class나 DOM 토글하기 

```react
const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);

if (enteredName.trim() === '') {
  setEnteredNameIsValid(false);
  return
}

setEnteredNameIsValid(true);
```

제출한 적이 없다 => 경고X

제출하거나 변한 이력이 있다 && 그런데 결과가 invalid했다 => 경고

제출하거나 변한 이력이 있다 && valid했다 => 경고X

```react
const [enteredNameTouched, setEnteredNameTouched] = useState(false);

const nameInputIsInValid = !enteredNameIsValid && enteredNameTouched;
```

포커스가 변했을 때(블러)

```react
<input type='text' id='name' onBlur={nameInputBlurHandler} />
```

