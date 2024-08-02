import {createStore} from 'redux';


const counterReducer=(state={counter :0}, action)=>{
    if(action.type==='incrementBY5'){
        return{
            counter: state.counter +5,
        }
    }

    if(action.type==='decrementBY5'){
        return{
            counter: state.counter -5,
        }
    }
    return state;
};

// i am pointing reducer function to store not calling just pointing 
 const store= createStore(counterReducer);

 // conect react app to store so comonent can listen and dispatch 
 export default store;
 // providing store to index js 