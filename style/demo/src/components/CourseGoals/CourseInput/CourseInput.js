import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import './CourseInput.css';

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = event => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    } 
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    props.onAddGoal(enteredValue);
    setEnteredValue('');
  };

  const warning = 'input should not be blank';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-control">
        <label style={{ color: !isValid ? 'red' : 'black'}}>Course Goal</label>
        <input style={{ borderColor: !isValid ? 'red' : 'black'}} type="text" onChange={goalInputChangeHandler} value={enteredValue}/>
        <p className='warning'>{ !isValid && warning }</p>
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
