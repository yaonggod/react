import Expenses from "./component/Expenses/Expenses";
import NewExpense from "./component/NewExpense/NewExpense";
import {useState} from 'react';

const INITIAL_EXPENSES = [
  { id: 'e1', title: 'Car Insurance1', amount: 294.67, date: new Date(2022, 7, 10) },
  { id: 'e2', title: 'Car Insurance2', amount: 294.68, date: new Date(2022, 7, 11) },
  { id: 'e3', title: 'Car Insurance3', amount: 294.69, date: new Date(2020, 7, 12) },
  { id: 'e4', title: 'Car Insurance4', amount: 294.60, date: new Date(2019, 7, 13) }
]

const App = () => {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  
  const addExpenseHandler = expense => {
    console.log(expense);
    setExpenses(prevExpenses => {
      return [expense, ...prevExpenses];
    });
  }

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler}></NewExpense>
      <Expenses items={expenses}/>
    </div>
  );
}

export default App;
