import {useState} from 'react';

import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';

function ExpenseItem(props) {
    // 현재 상태값, title을 업데이트하는 함수
    const [title, setTitle] = useState(props.title);

    const clickHandler = () => {
        setTitle('updated');
    }
    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date} />
            <div className="expense-item__description">
                <h2>{title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
            <button onClick={clickHandler}>change title</button>
        </Card>
    );
}

export default ExpenseItem;