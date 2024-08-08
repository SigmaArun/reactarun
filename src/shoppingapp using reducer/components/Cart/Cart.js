import Card from "../UI/Card";
import { useSelector } from "react-redux";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useDispatch } from "react-redux";
import { cartActions } from "../../reduxStore/cartSlice";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cartItem.items);
  const dispatch = useDispatch();

  const closeCartHandler = () => {
    dispatch(cartActions.closeCart());
  };
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            item={{
              id:item.id,
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }}
          />
        ))}
        
      </ul>
      <button onClick={closeCartHandler}>close</button>
    </Card>
  );
};

export default Cart;
