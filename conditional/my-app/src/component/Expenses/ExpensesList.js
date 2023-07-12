import ExpenseItem from "./ExpenseItem";
import './ExpensesList.css';

const ExpensesList = props => {
    if (props.items.length === 0) {
        return <p>no expenses found</p>;
    }
    return <ul className='expenses-list'>
        {
            props.items.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date}
                />
            ))
        }
    </ul>
};

export default ExpensesList;