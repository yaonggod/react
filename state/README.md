# 리액트 State, 이벤트

## 이벤트 리스닝, 이벤트 핸들러

```react
function ExpenseItem(props) {
    const clickHandler = () => {
        console.log("clicked");
    }
    return <button onClick={clickHandler}>change title</button>;
     
}
```

리액트는 컴포넌트 태그를 불러올 때마다 컴포넌트 함수를 불러옴

-> 하위 컴포넌트에서 업데이트가 있을 때마다 전체 DOM을 재평가해야함

이벤트로 인해 데이터가 변경되어도 데이터 그 자체만 바뀌었을 뿐, DOM에 반영되지는 않음

```react
function ExpenseItem(props) {
    let title = props.title; 

    const clickHandler = () => {
        title = "updated";
    }
    return (
        <Card className="expense-item">
            <h2>{title}</h2>  
            <button onClick={clickHandler}>change title</button>
        </Card>
    );
}
```

## State

```react
import {useState} from 'react';

function ExpenseItem(props) {
    
    // 현재 상태값, title을 업데이트하는 함수
    // props.title은 초기에 state에 title이 없을 때에만 불러옴
    const [title, setTitle] = useState(props.title);

    // state 업데이트해주기 -> 컴포넌트 함수 재실행 
    const clickHandler = () => {
        setTitle('updated');
    }
    
    return (
        <Card className="expense-item">
            <h2>{title}</h2>  
            <button onClick={clickHandler}>change title</button>
        </Card>
    );
}
```

같은 컴포넌트지만 props이 다름

**개별 컴포넌트(ExpenseItem)마다 state를 따로 관리함** -> title은 컴포넌트마다 다름

```react
function Expenses(props) {
    return (
        <Card className="expenses">
            <ExpenseItem></ExpenseItem>
            <ExpenseItem></ExpenseItem>
            <ExpenseItem></ExpenseItem>
            <ExpenseItem></ExpenseItem>
        </Card>
    );
}
```

개별적인 state로 관리하기

```react
const Form = () => {
    const [enteredInput, setEnteredInput] = useState('');
    const inputChangeHandler = (event) => {
        setEnteredInput(event.target.value);
    };
    
    return (
    	<form>
            <input type='text' onChange={inputChangeHandler}></input>
            <button type='submit'>Submit</button>
   		</form>
    )
}
```

하나의 state로 여러 개의 변수 관리하기, 근데 웬만하면 따로따로 관리하자...

```react
const [userInput, setUserInput] = useState({
        enteredTitle: '', enteredAmount: '', enteredDate: ''
    })

// 기존 state 스냅샷에서 업데이트한 변수는 새로운 인풋으로 덮어씌우기
const titleChangeHandler = (event) => {
        setUserInput((prevState) => {
            return {...prevState, enteredTitle: event.target.value};
        })
    };
```

제출하기

```react
const submitHandler = (event) => {
    // submit 할때마다 새로 요청을 보내서 페이지가 갱신됨, 그걸 막음
    event.preventDefault();
    const expenseData = {
        title: enteredTitle,
        amount: enteredAmount,
        date: new Date(enteredDate)
    }

    console.log(expenseData);
};

<form onSubmit={submitHandler}></form>
```

양방향 바인딩

```react
const Form = () => {
    const [enteredInput, setEnteredInput] = useState('');
    const inputChangeHandler = (event) => {
        setEnteredInput(event.target.value);
    };
    
    const submitHandler = (event) => {
        event.preventDefault();
        // 인풋 처리하고
        console.log(enteredInput);
        // 초기화
        setEnteredInput('');
    };
    
    return (
    	<form onSubmit={submitHandler}>
            <input type='text' value={enteredInput} onChange={inputChangeHandler}></input>
            <button type='submit'>Submit</button>
   		</form>
    )
}
```

## 부모, 자식 컴포넌트 통신

props - 부모 -> 자식

자식 -> 부모?

부모

- props로 onSaveExpenseData를 보냄

- 자식에서 props로 받은 onSaveExpenseData를 수행해서 매개변수를 보냄
- 이 변수(enteredExpenseData)를 가지고 saveExpenseDataHandler를 실행해줘

```react
const NewExpense = () => {
    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData, id: Math.random().toString()
        };
        console.log(expenseData);
    } 

    return (
        <div className='new-expense'>
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}></ExpenseForm>
        </div>
    )
};
```

자식

```react
const submitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
        title: enteredTitle,
        amount: enteredAmount,
        date: new Date(enteredDate)
    }

    props.onSaveExpenseData(expenseData);
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
};
```



