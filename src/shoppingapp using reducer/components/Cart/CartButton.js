import classes from './CartButton.module.css';
import { cartActions } from '../../reduxStore/cartSlice';
import { useDispatch} from 'react-redux';

const CartButton = (props) => {
  //const cartCtx=useSelector((state)=> state.cart.isOpenCart)
  const dispatch=useDispatch();

const cartHandler=()=>{
  dispatch(cartActions.openCart());
}
  return (
    <button className={classes.button} onClick={cartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
