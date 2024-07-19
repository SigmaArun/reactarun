import React from "react";

const VoteContext = React.createContext({
  totalQuantity: 0,
  addItem:(item)=>{},
  showForm: false,
  handleForm: () => {},
  closeForm: () => {},

  
  items:[],
  removeItem:(id)=>{},
  editItem:(id,item)=>{},
  
});
export default VoteContext;
