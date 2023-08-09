import { useRef, useState } from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef();

  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState();
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  }

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true);
    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return
    }
    setEnteredNameIsValid(true);
  }

  const formSubmitHandler = event => {
    // 요청 전송 방지 => 페이지 새로고침 방지
    event.preventDefault();

    setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return
    }

    setEnteredNameIsValid(true);

    console.log(enteredName);
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    // DOM 직접 조작 : 지양
    nameInputRef.current.value = '';
    // 이거로해라
    setEnteredName('');
  }

  const nameInputIsInValid = !enteredNameIsValid && enteredNameTouched;
  const nameInputClasses = nameInputIsInValid 
  ? 'form-control invalid' 
  : 'form-control'

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
        value={enteredName} 
        ref={nameInputRef} 
        type='text' id='name' 
        onChange={nameInputChangeHandler}
        onBlur={nameInputBlurHandler} />
        {nameInputIsInValid && <p className="error-text">name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
