
import {createSlice} from '@reduxjs/toolkit';

const cartSlice= createSlice({
    name:'cart',
    initialState:{isOpenCart:false},
    reducers:{
        openCart:(state)=>{
            state.isOpenCart=true;
        },
        closeCart:(state)=>{
            state.isOpenCart=false;
        },
    }
})

export const cartActions=cartSlice.actions;
export default cartSlice.reducer;