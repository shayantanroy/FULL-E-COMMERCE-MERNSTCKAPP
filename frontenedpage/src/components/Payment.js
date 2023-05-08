import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
 import { placeOrderOnline,clearErrors,resetMessage } from '../reduximplement/actions/OrderAction';
import { selectClasses } from '@mui/material';
import styled from 'styled-components';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { paymentVerification } from '../reduximplement/actions/OrderAction';
import CheckOut from './CheckOut';

const Payment = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const alert=useAlert();
  // const [paymentMethod, setPaymentMethod] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Online");




  const{shippingInfo,cartItems}=useSelector(state=>state.cartitems);
  const{loding,error,message}=useSelector(state=>state.Ordervalues);

  // const OrderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const orderinfo=JSON.parse(sessionStorage.getItem("orderInfo"));
 
  const submitHandler=async(e)=>{
    // setDisableBtn(true);
    e.preventDefault();
    // if(paymentMethod==="COD"){
    //  dispatch(placeOrderOnline({
    //   shippingInfo,
    //   orderItems:cartItems,
    //   paymentMethod,
    //   itemsPrice:orderinfo.subtotal,
    //   taxPrice:orderinfo.tax,
    //   shippingPrice:orderinfo.shippingCharges,
    //   totalPrice:orderinfo.totalPrice,

    //  }));

    
     
    


    // } else{
  const {
    data: { order, orderOptions },
  } = await axios.post(
    "/api/v1/paymentonline",
    {
      shippingInfo,
          orderItems:cartItems,
          paymentMethod,
          itemsPrice:orderinfo.subtotal,
          // taxPrice:orderinfo.tax,
          shippingPrice:orderinfo.shippingCharges,
          totalPrice:orderinfo.totalPrice,
  
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
 
  const options = {
    key: "rzp_test_e0LAVu6NPbF8vi",
    amount: order.amount,
    currency: "INR",
    name: "MBA Burger Wala",
    description: "Burger App",
    order_id: order.id,
    handler: function (response) {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        response;

      dispatch(
        paymentVerification(
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          orderOptions
        )
      );
    },
  

    theme: {
      color: "#9c003c",
    },
  };
  const razorpay = new window.Razorpay(options);
  razorpay.open();
}

// }






  useEffect(()=>{
    if (message) {
    alert.success(message);
        // setDisableBtn(true);
    dispatch(resetMessage(message));

      navigate("/sucessorders");
      
// navigate("/");
    }
    if (error) {
      alert.error("process failed")
      // dispatch(clearErrors());
      setDisableBtn(false);
    }
  }, [dispatch, message, error]);



  return (
    <Div>
      <CheckOut activeStep={2} />
    <section className="confirmOrder">
      <main>
        <h1>Confirm Order</h1>

        <form onSubmit={submitHandler}>
          {/* <div>
            <label>Cash On Delivery</label>
            <input
              type="radio"
              name="payment"
              onChange={() => setPaymentMethod("COD")}
              required
            />
          </div> */}
          <div>
            <label>Online</label>
            <input
              type="radio"
              required
              name="payment"
              // onChange={() => setPaymentMethod("Online")}
            />
          </div>

          <button disabled={disableBtn} type="submit">
            Place Order
          </button>
        </form>
      </main>
    </section>
    </Div>
  );
};



export default Payment
const Div=styled.div`

.confirmOrder {
  background-color: $pink;
  width: 100%;
  height: 70vh;
  > main {
    height: 100%;
    background-color: white;
    max-width: 900px;
    margin: auto;
    padding: 2rem;

    > h1 {
      text-transform: uppercase;
      text-align: center;
      margin: 3rem;
      font: 100 3rem "Roboto";
    }

    > form {
      display: flex;
      flex-direction: column;
      align-items: center;

      > div {
        background-color: rgb(233, 233, 233);
        margin: 1rem;
        border-radius: 5px;
        padding: 1rem;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      > button {
        background-color:tomato;
        color: white;
        outline: none;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        margin: 1rem;
        text-align: center;
        cursor: pointer;
        font-size: 1.1rem;
        &:hover{
          background:red;
          transition:0.4s;
        }
      }
     
    }
  }
}

@media screen and (max-width: 600px) {
  .confirmOrder > main > form {
    > div {
      width: 100%;
    }
    > button {
      width: 100%;
    }
  }
}`
