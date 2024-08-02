import classes from './Counter.module.css';
import { useSelector ,useDispatch } from 'react-redux';

const Counter = () => {
  const dispatch=useDispatch();

    const counter= useSelector(state=> state.counter); 

  const toggleCounterHandler = () => {};

  const incrementHandler=()=>{
    dispatch({type:'incrementBY2'});
  }
  const decrementHandler=()=>{
    dispatch({type:'decrementBY2'});
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Incerement</button>
        <button onClick={decrementHandler}>Dcerement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
