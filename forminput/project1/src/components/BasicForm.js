import useInput from "../hooks/use-input";

const BasicForm = (props) => {

  const { value: enteredFirstName, 
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError, 
    valueChangeHandler: firstNameChangeHandler, 
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(value => value.trim() !== '');

  const { value: enteredLastName, 
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError, 
    valueChangeHandler: lastNameChangeHandler, 
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(value => value.trim() !== '');

  const { value: enteredEmail, 
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError, 
    valueChangeHandler: emailChangeHandler, 
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(value => value.includes('@'));

  let formIsValid = false;

  if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const submitForm = event => {
    event.preventDefault();
    if (formIsValid) {
      alert('success');
      resetFirstNameInput();
      resetLastNameInput();
      resetEmailInput();
    } else {
      alert('fail')
    }
  }

  const nameClass = (hasError) => hasError ? 'form-control invalid' : 'form-control'; 

  return (
    <form onSubmit={submitForm}>
      <div className='control-group'>
        <div className={nameClass(firstNameInputHasError)}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' value={enteredFirstName} onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler}/>
          { firstNameInputHasError && <p class='error-text'>first name must not be empty</p>}
        </div>
        <div className={nameClass(lastNameInputHasError)}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' value={enteredLastName} onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler}/>
          { lastNameInputHasError && <p class='error-text'>last name must not be empty</p>}
        </div>
      </div>
      <div className={nameClass(emailInputHasError)}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler}/>
        { emailInputHasError && <p class='error-text'>email must include @</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
