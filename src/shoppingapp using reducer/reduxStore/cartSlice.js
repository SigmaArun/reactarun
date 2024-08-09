
import {createSlice} from '@reduxjs/toolkit';

const cartSlice= createSlice({
    name:'cart',
    initialState:{isOpenCart:false , notification :null},
    reducers:{
        openCart:(state)=>{
            state.isOpenCart=true;
        },
        closeCart:(state)=>{
            state.isOpenCart=false;
        },
        showNotification:(state,action)=>{
            state.notification={
                status:action.payload.status,
                title:action.payload.title,
                message:action.payload.message,
            
            };
        }
    }
})

export const cartActions=cartSlice.actions;
export default cartSlice.reducer;