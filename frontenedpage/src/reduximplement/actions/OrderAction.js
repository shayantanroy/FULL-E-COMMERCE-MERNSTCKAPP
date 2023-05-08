import axios from "axios";



export const placeOrderOnline=(userdata)=>async(dispatch)=>{
    try{
      
            dispatch({
              type: "createOrderRequest",
            });
    const config={headers:{"content-Type":"multipart/from-data"}};
    const{data}=await axios.post(`/api/v1/order/new`,userdata,config);
    dispatch({type:"createOrderSuccess",payload:data})
    }catch(error){
        dispatch({type:"createOrderFail",
    payload:error.response.data.message});

    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: 'clearError' });
  };

  
export const resetMessage=()=>async(dispatch)=>{
    dispatch({type:"resetmessage"})

}



export const paymentVerification =
  (razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "paymentVerificationRequest",
      });

      const { data } = await axios.post(
        '/api/v1/payment/verification',
        {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          orderOptions,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "paymentVerificationSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "paymentVerificationFail",
        payload: error.response.data.message,
      });
    }
  };





  // export const myorders=()=>async(dispatch)=>{
  //   try{
  //     dispatch({type:"myorderreq"});
  //     const {data}=await axios.get("/api/v1/orders");
  //     dispatch({type:"myordersuc",payload:data.orders})
  //   }catch(error){
  //     dispatch({type:"myorderfail",payload:error.response.data.message});
  //   }
  // }



  export const myorders = () => async (dispatch) => {
    try {
      dispatch({ type:"myorderreq" });
  
      const { data } = await axios.get("/api/v1/orders/me");
  
      dispatch({ type: "myordersuc", payload: data.orders });
    } catch (error) {
      dispatch({
        type: "myorderfail",
        payload: error.response.data.message,
      });
    }
  };



  export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: "getOrderDetailsRequest" });
     
      const { data } = await axios.get(`/api/v1//order/${id}`
        // withCredentials: true,
      );
  
      dispatch({ type: "getOrderDetailsSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "getOrderDetailsFail",
        payload: error.response.data.message,
      });
    }
  };




  // admin orders
  
  export const adminorders = () => async (dispatch) => {
    try {
      dispatch({ type:"Ordersrequest" });
  
      const { data } = await axios.get("/api/v1/admin/orders");
  
      dispatch({ type: "orderssucc", payload: data.orders });
    } catch (error) {
      dispatch({
        type: "ordersfail",
        payload: error.response.data.message,
      });
    }
  };




  export const orderupdate=(id,userdata)=>async(dispatch)=>{
    try{
      dispatch({type:"orderupdatereq"})
      const config={headers:{"content-Type":"multipart/from-data"}};
      const{data}= await axios.put(`/api/v1/admin/order/${id}`,userdata,config)
dispatch({type:"orderupdatesuc",payload:data})
    }catch(error){
      dispatch({type:"orderupdatefail", 
      payload: error.response.data.message,})

    }
  }