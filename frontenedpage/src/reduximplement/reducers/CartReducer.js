import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  };
  


export const Cart=createReducer(initialState,{

    cartaddsucc:(state,action)=>{
        const item=action.payload;
                const isExist=state.cartItems.find((i)=>i.product===item.product)
    if (isExist) {
         state.cartItems= state.cartItems.map((i) =>(
            i.product === isExist.product ? item : i
          ))
      } else {
            state.cartItems.push(item);
      
           }
       
      },
   
    // remove cartitem
    removecatitems:(state,action)=>{
        state.cartItems=state.cartItems.filter((i)=>i.product!==action.payload)
    },





    addShippingInfo:(state,action)=>{
        // state.shippingInfo=action.payload;
        state.shippingInfo = {
        address: action.payload.address,
        city: action.payload.city,
        state: action.payload.state,
        country: action.payload.country,
        pinCode: action.payload.pinCode,
        phoneNo: action.payload.phoneNo,
      };
    
    },





}
)












//     shippingInfo:localStorage.getItem("shippingInfo")
//     ?JSON.parse(localStorage.getItem("shippingInfo"))
//     :{},



// cartItems: localStorage.getItem("cartItems")
// ? JSON.parse(localStorage.getItem("cartItems"))
// : [],