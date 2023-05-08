import { configureStore } from "@reduxjs/toolkit";
import { Cart } from "./reducers/CartReducer";
import { adminProducts, createproducts, newProductReducer, productReducer, productupdate } from "./reducers/ProductReducer";
// import { resetpassword } from "./reducers/Resetpasswordreducer";
import { allusers, userReducer } from "./reducers/UserReducer";
import { forgetpasswordreducer } from "./reducers/UserReducer";
import { Adminorders, Orderreducer, orderUpdate } from "./reducers/OrderReducer";
import { myOrders } from "./reducers/OrderReducer";
// import { createProducts } from "./actions/ProductActions";
// import { resetpasword } from "./reducers/Resetpasswordreducer";
// import { Shippinginfo } from "./reducers/ShippingReducer";
// import { Shippinginfo } from "./reducers/ShippingReducer";


   
const store=configureStore({
    reducer:{
        AdminProducts:adminProducts,
        products:productReducer,
        users:userReducer,
        forgetuser:forgetpasswordreducer,
        cartitems:Cart,
        Ordervalues:Orderreducer,
        userorders:myOrders,
    //    myshippinginfo:Shippinginfo,
    creproduct:newProductReducer,
    Admincreateproducts:createproducts,
      adminorders:Adminorders,
      updateorder:orderUpdate,
      adminusers:allusers,
      adminproductupdate:productupdate,
    },
  
   

    // initialstate,
 

    // reducer:persistreducer,

});
export default store;
