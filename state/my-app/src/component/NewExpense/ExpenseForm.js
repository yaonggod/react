import './ExpenseForm.css';
import {useState} from 'react';

const ExpenseForm = (props) => {
    // const [userInput, setUserInput] = useState({
    //     enteredTitle: '', enteredAmount: '', enteredDate: ''
    // })

    const [enteredTitle, setEnteredTitle] = useState('');
    const titleChangeHandler = (event) => {
        // setUserInput((prevState) => {
        //     return {...prevState, enteredTitle: event.target.value};
        // })
        setEnteredTitle(event.target.value);
    };

    const [enteredAmount, setEnteredAmount] = useState('');
    const amountChangeHandler = (event) => {
        // setUserInput({
        //     ...userInput, enteredAmount: event.target.value
        // })
        setEnteredAmount(event.target.value);
    };

    const [enteredDate, setEnteredDate] = useState('');
    const dateChangeHandler = (event) => {
        // setUserInput({
        //     ...userInput, enteredDate: event.target.value
        // })
        setEnteredDate(event.target.value);
    };
    
    const submitHandler = (event) => {
        // submit 할때마다 새로 요청을 보내서 페이지가 갱신됨, 그걸 막음
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

    return (
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label>Title</label>
                    <input type='text' value={enteredTitle} onChange={titleChangeHandler}></input>
                </div>
                <div className='new-expense__control'>
                    <label>Amount</label>
                    <input type='number' value={enteredAmount} min='0.01' step='0.01' onChange={amountChangeHandler}></input>
                </div>
                <div className='new-expense__control'>
                    <label>Date</label>
                    <input type='date' value={enteredDate} min="2020-01-01" max="2024-04-02" onChange={dateChangeHandler}></input>
                </div>
            </div>
            <div className='new-expense__actions'>
                <button type='submit'>Add Expense</button>
            </div>
        </form>
    )
};

export default ExpenseForm;

