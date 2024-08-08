import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../reduxStore/cartSlice';

const Cart = (props) => {
  const dispatch=useDispatch();

  const closeCartHandler=()=>{
    dispatch(cartActions.closeCart());
  }
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        <CartItem
          item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
        />
      </ul>
      <button onClick={closeCartHandler}>close</button>
    </Card>
  );
};

export default Cart;
