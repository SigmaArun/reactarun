import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch } from 'react-redux';
import { itemActions } from '../../reduxStore/itemSlice';

// here i will atach add to cart buttoin with redux function 

const ProductItem = (props) => {
  const dispatch=useDispatch();
  const { title, price, description ,id} = props;
  const addToCartHandler=()=>{
    //passing obejct as payload 
    dispatch(itemActions.addItemToCart({
      id,
      title,
      price,
    }))
    }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
