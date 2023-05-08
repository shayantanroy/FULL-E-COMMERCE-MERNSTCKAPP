
import { createReducer } from "@reduxjs/toolkit";

export const Orderreducer=createReducer({
  

},
{
    createOrderRequest: (state) => {
        state.loding = true;
      },
      createOrderSuccess: (state, action) => {
        state.loding = false;
        state.message = action.payload.message;
      },
      createOrderFail: (state, action) => {
        state.loding = false;
        state.error = action.payload;
      },


      paymentVerificationRequest: (state) => {
        state.loding = true;
      },
      paymentVerificationSuccess: (state, action) => {
        state.loding = false;
        state.message = action.payload;
      },
      paymentVerificationFail: (state, action) => {
        state.loding = false;
        state.error = action.payload;
      },



      clearError:(state,action)=>{
        
        state.error=null;
    
    },
    resetmessage:(state,action)=>{
      state.message=null;
  },
})


export const myOrders=createReducer(
  {orders:[],orderitem:{},}
,
{
  myorderreq:(state,action)=>{
    state.loding=true;
  },
  myordersuc:(state,action)=>{
state.loding=false;
state.orders= action.payload;
// state.message=action.payload.message;
  },
  myorderfail:(state,action)=>{
    state.loding=false;
    state.error=action.payload;
  },

  getOrderDetailsRequest: (state) => {
    state.loding = true;
  },
  getOrderDetailsSuccess: (state, action) => {
    state.loding = false;
    state.orderitem = action.payload.order;
  },
  getOrderDetailsFail: (state, action) => {
    state.loding = false;
    state.error = action.payload;
  },



  clearError:(state,action)=>{
        
    state.error=null;

},
resetmessage:(state,action)=>{
  state.message=null;
},




orderdetailsreq:(state,action)=>{
  state.loding=true;

},
orederdetailssuc:(state,action)=>{
  state.loding=false;
  state.orderdetails=action.payload;
},
orderdetailsfail:(state,actin)=>{
  state.loding=false;
  state.error=actin.payload;
}


}
)


export const Adminorders=createReducer(
  {orderss:[],orderItem:{},},
  {
  Ordersrequest:(state,action)=>{
    state.loding=true;
  },
  orderssucc:(state,action)=>{
    state.loding=false;
    state.orderss=action.payload;

  },
  ordersfail:(state,action)=>{
    state.loding=false;
    state.error=action.payload;
  },
  clearError:(state,action)=>{
        
    state.error=null;

},
resetmessage:(state,action)=>{
  state.message=null;
},

}
)




// admin order update
 export const orderUpdate=createReducer(
  {},
  {
    orderupdatereq:(state,action)=>{
      state.loding=true;
    },
    orderupdatesuc:(state,action)=>{
      state.loding=false;
      state.suc=action.payload.success;
    },
    orderupdatefail:(state,action)=>{
      state.loding=false;
      state.error=action.payload;
    }
    ,  clearError:(state,action)=>{
        
      state.error=null;
  
  },
  resetmessage:(state,action)=>{
    state.suc=null;
  },
  
  }
 )


