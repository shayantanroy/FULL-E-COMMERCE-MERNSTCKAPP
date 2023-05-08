import React, { useState,Fragment, useEffect } from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { clearErrors, getOrderDetails } from '../../reduximplement/actions/OrderAction';
import { useAlert } from 'react-alert';
import HomeOrder from '../HomeOrder'
import { orderupdate} from '../../reduximplement/actions/OrderAction';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { resetMessage } from '../../reduximplement/actions/OrderAction';

const AdminOrderDetails = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const{loding,orderitem}=useSelector(state=>state.userorders);
    const{suc,error}=useSelector(state=>state.updateorder);

    const {id}=useParams();


        const[status,setStatus]=useState("Shipped");
    const[delivers,SetDelivers]=useState("Delivered")



const shipping = (e) => {
    e.preventDefault();
const myForm = new FormData();

myForm.set("status", status);

dispatch(orderupdate(id, myForm));
};


const deliver = (e) => {
    e.preventDefault();
const myForm = new FormData();

myForm.set("status", delivers);

dispatch(orderupdate(id, myForm));
};






    useEffect(()=>{
        if(suc){
            alert.success(`product ${delivers}`)
           dispatch(resetMessage());
        }
       
      if(error){
        alert.error(error)
        dispatch(clearErrors());
      }
      dispatch(getOrderDetails(id));
    },[dispatch,error,suc,clearErrors,resetMessage])
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
                      {/* <button onClick={deliver} style={{paddingLeft:"4px",marginLeft:"3px",width:"50px"}}><DeliveryDiningIcon  style={{color:"green"}}/></button> */}
                      <div style={{display:"flex"}}>
                         <button onClick={shipping} style={{paddingLeft:"4px",marginLeft:"3px",width:"50px"}}><LocalShippingIcon style={{color:"orange"}}/></button>
                         
                         <button onClick={deliver} style={{paddingLeft:"4px",marginLeft:"3px",width:"50px"}}><DeliveryDiningIcon style={{color:"green"}} /></button>
                         </div>

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
    

export default AdminOrderDetails
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