import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
//import { cartActions } from './reduxStore/cartSlice';
import { useSelector } from 'react-redux';

function App() {
  const cartRdx=useSelector(state=> state.cart.isOpenCart);
  return (
    <Layout>
      {cartRdx  &&   <Cart /> }
    
      <Products />
    </Layout>
  );
}

export default App;
