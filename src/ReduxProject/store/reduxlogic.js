//import {createStore} from 'redux';
import {createSlice,configureStore} from '@reduxjs/toolkit';

// what is to be done on a particular action when that action dispatch to reducer function will here
// i am adding a new state 
const initialCounterState ={counter :0 ,showCounter :true}

 const counterSlice=createSlice({
    name:'counter',
    initialState :initialCounterState,
    reducers:{
        increment(state,action){
            state.counter=state.counter + action.payload;
        },
        decrement(state,action){
            state.counter=state.counter -action.payload;
        }, 
        // increse(state,action){
        //     state.counter=state.counter + action.payload;
        // },
        toggleCounter(state){
            state.showCounter=!state.showCounter;
        },

    }
});  // to make store aware of this slice take value in constant counterSlice and remove reducer function below

 const initialAuthState={isAuthenticated: false};
// for Auth another slice 
   const authSlice= createSlice({
        name:'authentication',
        initialState:initialAuthState,
        reducers:{
            login(state){
                state.isAuthenticated=true;
            },
            logout(state){
                state.isAuthenticated=false;
            },
        }
    })

// i am dispatching action using counter slice 
//counterSlice.actions.toggleCounter;

// const counterReducer=(state=initialState, action)=>{
//     if(action.type==='incrementBY2'){
//         return{
//             counter: state.counter + action.amount,
//             showCounter: state.showCounter,
//         }
//     }

//    if(action.type==='toggle'){
//     return{
//         showCounter: !state.showCounter,
//         counter:state.counter,
//     }
//    }

//     if(action.type==='decrementBY2'){
//         return{
//             counter: state.counter - action.amount,
//             showCounter: state.showCounter,
//         }
//     }
//     return state;
// };

// i am pointing reducer function to store not calling just pointing 
 //const store= createStore(counterReducer);
 // making store aware of slice
 //const store= createStore(counterSlice.reducer);

 // for  multiple slices i use configureStore 
 const store= configureStore(
    {
       // reducer:counterSlice.reducer
       reducer:{counter:counterSlice.reducer, auth: authSlice.reducer},
    }
 );

 // so i will eport actions to counter component 
export const authActions=authSlice.actions;
 export const counterActions=counterSlice.actions;

 // conect react app to store so comonent can listen and dispatch 
 export default store;
 // providing store to index js 