import react,{useState} from "react";
import './ExpenseForm.css'

const ExpenseForm = (props) => {
// using useState here so that we can detach input data from this function.
// so that no matter how many times the function is called our data is retained and stored at a different place.
// other ways to solve this as well.
    const [enteredTitle,setEnteredTitle]= useState('');
    const [enteredAmount,setEnteredAmount]= useState('');
    const [enteredDate,setEnteredDate]= useState('');

    // // we can also use just one state for it. 
    // const [userInput,setUserInput]=useState({
    //     enteredTitle : '',
    //     enteredAmount : '',
    //     enteredDate: ''
    // });
    

    const titleChangeHandler = (event) =>{
        setEnteredTitle( event.target.value);

        // // when using one state
        // // we depend on one previous state snapshot to update our value, if react decides to schedule this then we may/may not get correct values every time
        // setUserInput({
        //     ...userInput,
        //     title: event.target.value,
        // })
        // ---------------------------------------------------
        // // better sol. for when using one state
        // // when using this react will not schedule state updates so we always get the latest snapshot of it.
        //  setUserInput((prevState)=>{    
        //     return{
        //     ...prevState,
        //     enteredTitle: event.target.value,
        //     };
        //     });

    }
    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value)
    }
    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    }


    const submitHandler = (event) =>{

      // disabling html from loading a new page when submt button is clicked
      event.preventDefault();

      const eventData = {
        title: enteredTitle,
        amount: enteredAmount,
        date: new Date(enteredDate)
      };

      // Passing the data up the ladder from ExpenseForm to NewExpense to App
      props.onSaveExpenseData(eventData);

      console.log(eventData);

      // clearing inputs when data is submitted
      // value = {enteredTitle}
      setEnteredTitle('');
      setEnteredDate('');
      setEnteredAmount('');
    }

    return (
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__controls">
            <label>Title</label>
            <input type="text" value={enteredTitle} onChange={titleChangeHandler} />
          </div>
          <div className="new-expense__controls">
            <label>Amount</label>
            <input type="number" min="0.01" step="0.01" value={enteredAmount}  onChange={amountChangeHandler} />
          </div>
          <div className="new-expense__controls">
            <label>Date</label>
            <input type="date" min="2019-01-01" max="2022-12-31" value={enteredDate} onChange={dateChangeHandler}/>
          </div>
        </div>
        <button className="new-expense__actions" type="submit">Submit</button>
      </form>
    );

}

export default ExpenseForm;