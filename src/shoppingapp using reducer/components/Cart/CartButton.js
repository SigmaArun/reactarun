import classes from './CartButton.module.css';
import { cartActions } from '../../reduxStore/cartSlice';
import { useDispatch,useSelector} from 'react-redux';

const CartButton = (props) => {
  //const cartCtx=useSelector((state)=> state.cart.isOpenCart)
  const dispatch=useDispatch();
 const cartQuantity= useSelector(state=> state.cartItem.totalQuantity);

const cartHandler=()=>{
  dispatch(cartActions.openCart());
}
  return (
    <button className={classes.button} onClick={cartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
