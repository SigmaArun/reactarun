import Cart from './components/Cart/Cart';
import React,{useEffect} from 'react';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { cartActions } from './reduxStore/cartSlice';
import { useSelector ,useDispatch} from 'react-redux';
import Notification from './components/UI/Notification';

//const isInitial=true;  //const will give error assignment to constant variable 
let isInitial=true;

function App() {
  const dispatch=useDispatch();
  const cartRdx=useSelector(state=> state.cart.isOpenCart);
  const cartApi=useSelector(state=> state.cartItem)
  const notification=useSelector((state)=>state.cart.notification);  // cart is key for this slice in store 
  // sideeffect code out of reducer 
  useEffect(
    ()=>{
      const sendCartData=async ()=>{
        dispatch(cartActions.showNotification(
          {
            status:'pending',
            title:'Sending...',
            message:'Sending cart data!',
          }
        ));  // dispatch closed
    const response=await  fetch('https://trackmyexpenses-5d3c6-default-rtdb.firebaseio.com/cart.json',
        {
          method:'PUT',
          body:JSON.stringify(cartApi),

          
        }
      );
        if(!response.ok){
          throw new Error('sending failed')
        }

        dispatch(cartActions.showNotification(
          {
            status:'success',
            title:'Success',
            message:'Sent cart data successfully!'
          }
        )); // dispatch closed
        //const responseData=await response.json();

      };// sendCartData finished

      if(isInitial){
        isInitial=false;
        return;
      }
      sendCartData().catch( (error)=>{
             dispatch(cartActions.showNotification(
              {
                status:'error',
                title:'Error',
                message:'Sending cart data failed '
              }
             )); // dispatch finished 
      })
      },[cartApi,dispatch]
  );  // useeffect closed 
  return (
    <>
   {notification   && ( 
           <Notification 
             status={notification.status}
             title={notification.title}
             message={notification.message}
         ></Notification>  
         )}
    <Layout>
      {cartRdx  &&   <Cart /> }
    
      <Products />
    </Layout>
    </>
  );
}

export default App;
