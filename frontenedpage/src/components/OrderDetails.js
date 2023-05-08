import React, { useState,Fragment, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { getOrderDetails } from '../reduximplement/actions/OrderAction';
import Loder from './layout/Loder';
import LaunchIcon from "@material-ui/icons/Launch";
import MetaData from './MetaData';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { useAlert } from 'react-alert';
import HomeOrder from './HomeOrder'
import { Orderreducer } from '../reduximplement/reducers/OrderReducer';


const OrderDetails = () => {
  const dispatch=useDispatch();
  const alert=useAlert();
  const{loding,error,orderitem}=useSelector(state=>state.userorders);
  const {id}=useParams();
  useEffect(()=>{
    if(error){
      alert.error(error)
    }
    dispatch(getOrderDetails(id));
  },[dispatch,error])
  return (
    <Divx>
        <Fragment>
       <Div1>
            <h2>Delivary Address</h2><br></br>
            <span>
              Adddress:
                    {orderitem.shippingInfo && orderitem.shippingInfo.address}
                  </span>
                  <span>
                    City:
                    {orderitem.shippingInfo && orderitem.shippingInfo.city}
                  </span>
                  <span>
                    State:
                    {orderitem.shippingInfo && orderitem.shippingInfo.state}
                  </span>
           
            <span>
              CountryCode:
                    {orderitem.shippingInfo && orderitem.shippingInfo.country}
                  </span>
                  <span>
                  Phone Number:  {orderitem.shippingInfo && orderitem.shippingInfo.phoneNo}
                  </span>
                  <span>
                PinCode: {orderitem.shippingInfo && orderitem.shippingInfo.pinCode}
                  </span>
            {/* <span>{orderitem.shippingInfo.address}</span> */}
            {/* <span>{orderitem.shippingInfo.city}</span>
            <span>{orderitem.shippingInfo.address}</span>
            <span>{orderitem.shippingInfo.address}</span> */}
     </Div1>
          <div className="cartPage">
          
              {
                orderitem.orderItems&&
                orderitem.orderItems.map((i)=>(

              //  <div>
                <div className="cartContainer" key={i.product} >
                  <HomeOrder i={i}  />
                  <div className=" quantity" style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                    <div style={{display:"flex",alignItems:"flex-start" ,alignItems:"center"}}>
                  <p>paymentMethod:</p>
              <span style={{color:"green"}}>{orderitem.paymentMethod}</span>
              </div>
              <div style={{display:"flex",alignItems:"flex-start",alignItems:"center"}}>
              <p>paymentID:</p>
              <span>{orderitem.paymentInfo}</span>
              </div>
              <div style={{display:"flex",alignItems:"flex-start",alignItems:"center"}}>
              <p>PaidAt:</p>
              <span>{orderitem.paidAt}</span>
              </div>
              <div style={{display:"flex",alignItems:"flex-start",alignItems:"center"}}>
              <p>Order Status:</p>
              <span style={{color:"tomato"}}>{orderitem.orderStatus}</span>
              </div>

                  </div>
                  </div>
                 
              
                ))}
          </div>
          <Div2>
                
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",fontSize:"20px"}}>            
                  <div style={{borderTop:"4px solid tomato"}} >
                    <p>Shipping Charges:</p>
                    <span style={{color:"green"}}>₹{orderitem.shippingPrice}</span>
                  </div>
                
      
                <div className="orderSummaryTotal">
                  <p>
                    <b >Total:</b>
                  </p>
                  <span style={{color:"green"}}>₹{orderitem.totalPrice}</span>
                </div>
                </div>
            </Div2>
     
        </Fragment>
      
    </Divx>
  );
};

export default OrderDetails
const Div2=styled.div`
padding-top:90px;
display:flex;
flex-direction:column;
width:90%;
align-items:flex-end;;
margin:auto;
padding-right: 5vmax;
padding-top:3vmax;


`
const Div1=styled.div`
span{
  font-size:19px;
}
padding-top:90px;
display:flex;
flex-direction:column;
width:90%;
margin:auto;
padding-left: 5vmax;
`

const Divx=styled.div`


  .cartPage {
    padding-left: 5vmax ;
    padding-top:3vmax;
  }
  

  
  .cartContainer {
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    // background:red;
    // display:flex;
    // flex:direction:column;
  }
  
  .quantity{
  
    padding-top:20px;
    span{
      padding-top:4px;
    }
    display: flex;
      align-items: center;
      height: 8vmax;
    button{
      margin-left:8px;
      margin-right:8px;
     padding:3px 15px;
          border-radius:50px;
            background-color: rgba(0, 0, 0, 0.616);
          color:black;
    border:none;
    font-weight:700;
     
    }
   input{
      width:30px;
      font-weight:500;
      // padding-left:3px;
      text-align:center;
      // border:none;
  
   }
   p{
    padding-right:4px;
    font-weight:700;
   }
    
    }

  
  @media screen and (max-width: 600px) {
    .cartPage {
      padding: 0;
      min-height: 60vh;
    }
  
    .cartHeader {
      width: 100%;
      font: 300 1.7vmax "Roboto";
      grid-template-columns: 3fr 1fr 1fr;
    }
  
    .cartContainer {
      width: 100%;
      grid-template-columns: 3fr 1fr 1fr;
    }
  
    .cartInput {
      height: 20vmax;
    }
  
    .cartInput > button {
      padding: 1.5vmax;
    }
  
    .cartInput > input {
      width: 2vmax;
      padding: 1.5vmax;
      font: 400 1.8vmax "Roboto";
    }
  
   `