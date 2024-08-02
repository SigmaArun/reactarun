import classes from './Counter.module.css';
import { useSelector ,useDispatch } from 'react-redux';

const Counter = () => {
  const dispatch=useDispatch();

    const counter= useSelector(state=> state.counter); 

  const toggleCounterHandler = () => {};

  const incrementHandler=()=>{
    dispatch({type:'incrementBY5'});
  }
  const decrementHandler=()=>{
    dispatch({type:'decrementBY5'});
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>IncerementBy5</button>
        <button onClick={decrementHandler}>DcerementBy5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
