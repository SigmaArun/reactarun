import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import itemReducer from './itemSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartItem:itemReducer,
   
  },
});

export default store;