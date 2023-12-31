import Expenses from "./component/Expenses/Expenses";

const App = () => {
  const expenses = [
    { id: 'e1', title: 'Car Insurance1', amount: 294.67, date: new Date(2023, 7, 10) },
    { id: 'e2', title: 'Car Insurance2', amount: 294.68, date: new Date(2023, 7, 11) },
    { id: 'e3', title: 'Car Insurance3', amount: 294.69, date: new Date(2023, 7, 12) },
    { id: 'e4', title: 'Car Insurance4', amount: 294.60, date: new Date(2023, 7, 13) }
  ]

  return (
    <div>
      <h2>Let's Get Started</h2>
      <Expenses items={expenses}/>
    </div>
  );
}

export default App;
