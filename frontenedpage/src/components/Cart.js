import React, { useEffect ,useState,Fragment} from 'react'
import styled from 'styled-components'
import Homecartproduct from './layout/Homecartproduct'
// import { getproduct } from '../reduximplement/actions/ProductActions'
import { useDispatch, useSelector } from 'react-redux'
import Loder from './layout/Loder'
// import HomeProductCard from './HomeProductCard'
import { Link, useNavigate } from 'react-router-dom'
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Typography } from "@material-ui/core";
import { cartAdd } from '../reduximplement/actions/CartAction';
import { removeItemsFromCart } from '../reduximplement/actions/CartAction'
// import { myorders } from '../reduximplement/actions/OrderAction'
// import redire

const Cart = () => {
    const{cartItems}=useSelector(state=>state.cartitems)
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
          return;
        }
        dispatch(cartAdd(id, newQty));
      };
    
      const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
          return;
        }
        dispatch(cartAdd(id, newQty));
      };
      const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
      };


    const checkoutHandler=()=>{
      // navigate("/loginSignup?redirect=shipping")
      navigate("/shipping")
      
    }
    useEffect(()=>{
      localStorage.setItem("cartItems",JSON.stringify(cartItems))
    },[cartItems]);




return(
    <Divx>
          {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <Homecartproduct item={item} deleteCartItems={deleteCartItems} />
                  <div className=" quantity">

                    <button
                      onClick={()=>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input readOnly  type="number" value={item.quantity} />
                    {/* <h1>{item.quantity}</h1> */}
                    <button
                      onClick={()=>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.Stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Divx>
  );
};

{/* <Div>
    {cartItems&& cartItems.map((item)=>(
    <Homecartproduct key={item._id} item={item}/>
    ))}
    </Div> */}



export default Cart

const Divx=styled.div`
.emptyCart {
    margin: auto;
    text-align: center;
    padding: 10vmax;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
  }
  .emptyCart > svg {
    font-size: 5vmax;
    color: tomato;
  }
  .emptyCart > p {
    font-size: 2vmax;
  }
  .emptyCart > a {
    background-color: rgb(51, 51, 51);
    color: white;
    border: none;
    padding: 1vmax 3vmax;
    cursor: pointer;
    font: 400 1vmax "Roboto";
    text-decoration: none;
  }
  
  .cartPage {
    padding: 5vmax;
  }
  
  .cartHeader {
    background-color: tomato;
    width: 90%;
    box-sizing: border-box;
    margin: auto;
    color: white;
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    font: 300 0.7vmax "Roboto";
  }
  .cartHeader > p {
    margin: 10px;
  }
  .cartHeader > p:last-child {
    text-align: end;
  }
  
  .cartContainer {
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
  }
  
  .quantity{
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
    
    }








  
  .cartSubtotal {
    display: flex;
    padding: 0.5vmax;
    height: 8vmax;
    align-items: center;
    box-sizing: border-box;
    font: 300 1vmax cursive;
    justify-content: flex-end;
    color: rgba(0, 0, 0, 0.753);
  }
  
  .cartGrossProfit {
    display: grid;
    grid-template-columns: 2fr 1.2fr;
  }
  
  .cartGrossProfitBox {
    border-top: 3px solid tomato;
    margin: 1vmax 4vmax;
    box-sizing: border-box;
    padding: 2vmax 0;
    font: 300 1vmax "Roboto";
    display: flex;
    justify-content: space-between;
  }
  
  .checkOutBtn {
    display: flex;
    justify-content: flex-end;
  }
  .checkOutBtn > button {
    background-color: tomato;
    color: white;
    border: none;
    padding: 0.8vmax 4vmax;
    width: 50%;
    font: 300 0.8vmax "Roboto";
    margin: 1vmax 4vmax;
    cursor: pointer;
    border-radius: 30px;
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
  
    .cartSubtotal {
      padding: 1.5vmax;
      height: 20vmax;
      font: 300 2vmax "Roboto";
    }
  
    .cartGrossProfit {
      display: grid;
      grid-template-columns: 0fr 2fr;
    }
  
    .cartGrossProfitBox {
      padding: 2vmax;
      font: 300 2vmax "Roboto";
    }
  
    .checkOutBtn > button {
      padding: 2vmax 4vmax;
      width: 100%;
      font: 300 2vmax "Roboto";
    }
  }
`
