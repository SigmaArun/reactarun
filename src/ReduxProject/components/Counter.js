import classes from './Counter.module.css';
import { useSelector ,useDispatch } from 'react-redux';

import {counterActions} from '../store/reduxlogic';

const Counter = () => {
  const dispatch=useDispatch();

    const counter= useSelector(state=> state.counter.counter); 
    const show= useSelector(state=> state.counter.showCounter); 

  const toggleCounterHandler = () => {
    //dispatch({type:'toggle'});
    dispatch(counterActions.toggleCounter())
  };

 // this is action with payload 
  const incrementHandler=()=>{
   // dispatch({type:'incrementBY2',amount:2});
   //dispatch(counterActions.increment())  // here i am using payload also so
   dispatch(counterActions.increment(2))
  }
  const decrementHandler=()=>{
    //dispatch({type:'decrementBY2',amount:2});
    dispatch(counterActions.decrement(2))
  }

  // const increaseHandler=()=>{
  //   dispatch({type:'increase', amount:2})
  // }



  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
     { show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>IncrementBy2</button>
      
        <button onClick={decrementHandler}>DecrementBy2</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
