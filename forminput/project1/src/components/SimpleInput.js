
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {

  const { value: enteredName, 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler: nameChangeHandler, 
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(value => value.trim() !== '');

  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  } 

  const formSubmitHandler = event => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    resetNameInput();
  }

  
  const nameInputClasses = nameInputHasError
  ? 'form-control invalid' 
  : 'form-control'

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
        value={enteredName} 
        type='text' id='name' 
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler} />
        {nameInputHasError && <p className="error-text">name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
