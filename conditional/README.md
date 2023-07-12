# 렌더링 리스트, 조건부 컨텐츠

## 리스트 업데이트

배열을 props에 전달해서 요소에 매핑하기

- 새로운 ExpenseItem을 Expense 안에 append하고 배열 순서에 맞게 모든 컴포넌트를 업데이트함 == 배열의 첫 번째 인덱스에 원소를 삽입하는 것과 비슷함

- 이를 방지하기 위해 key를 같이 props에 보내서 객체를 key로 인식하게끔 함

```react
<Expenses items={expenses}/>

{props.items.map(expense => (
    <ExpenseItem 
    key={expense.id}
    title={expense.title} 
    amount={expense.amount} 
    date={expense.date}/>
))}
```

새로운 데이터가 들어오면 배열 업데이트하기 -> state로 관리

```react
// 초기 배열
const INITIAL_EXPENSES = []

// state
const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  
const addExpenseHandler = expense => {
    setExpenses(prevExpenses => {
      return [expense, ...prevExpenses];
    });
}
```

## 필터링

조건으로 필터링된 배열 선언

```react
const filteredExpenses = props.items.filter(expense => {
    return expense.date.getFullYear().toString() === filteredYear;
});
```

매핑

```react
{filteredExpenses.map((expense) => (
<ExpenseItem
    key={expense.id}
    title={expense.title}
    amount={expense.amount}
    date={expense.date}
/>
))}
```

## 조건부 렌더링

삼항연산

```react
{filteredExpenses.length === 0 ? 
(<p>no expenses found</p>) :
(
    filteredExpenses.map((expense) => (
        <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
        />
    ))
)}
```

조건에 맞으면 렌더링

```react
{filteredExpenses.length === 0 && <p>no expenses found</p>}
```

JSX를 변수로 저장하기

```react
let expensesContent = <p>no expenses found</p>

if (filteredExpenses.length > 0) {
    expensesContent = filteredExpenses.map((expense) => (
                            <ExpenseItem
                                key={expense.id}
                                title={expense.title}
                                amount={expense.amount}
                                date={expense.date}
                            />
                        ))
}

return {expensesContent};
```

## 동적 스타일

```react
let barHeight = Math.round((props.value / props.maxValue) * 100) + '%';

<div className='chart-bar__fill' style={{height: barHeight}}></div>
```

스타일은 컴포넌트 제한이 아닌 전역적으로 설정된 상태.
