import { useRef, useState } from 'react';
import classes from './Checkout.module.css';
const isEmpty =value=>value.trim()==='';
const isFiveChars=value=>value.length===5;
const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name:true,
        street:true,
        postal: true,
        city:true
    })
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? "" : classes.invalid
      }`;
      const streetControlClasses = `${classes.control} ${
        formInputsValidity.street ? "" : classes.invalid
      }`;
      const postalControlClasses = `${classes.control} ${
        formInputsValidity.postal ? "" : classes.invalid
      }`;
      const cityControlClasses = `${classes.control} ${
        formInputsValidity.city ? "" : classes.invalid
      }`;
  const confirmHandler = (event) => {

    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalIsValid = isFiveChars(enteredPostal)
    const enteredCityIsValid =  !isEmpty(enteredCity)
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;
    setFormInputsValidity({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        postal: enteredPostalIsValid,
        city:enteredCityIsValid
    })

    if(!formIsValid){
        return
    }
    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        postal:enteredPostal,
        city:enteredCity
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref = {nameInputRef} type='text' id='name' />
        {!formInputsValidity.name && <p>Please enter valid Name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input ref = {streetInputRef} type='text' id='street' />
        {!formInputsValidity.street && <p>Please enter valid street!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalInputRef} type='text' id='postal' />
        {!formInputsValidity.postal && <p>Please enter valid Postal!</p>}

      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formInputsValidity.city && <p>Please enter valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;