import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const HomeUsers = ({i}) => {
    return (
    
        <Div>
        <div className="CartItemCard">
    
          <img src={i.avatar.url} alt="ssa" />
         
          <div >  
            {/* <Link style={{fontSize:"19px"}}  to={`/product/${i.product}`}>{i.name}</Link> */}
            {/* here item.product=item._id */}
            <span style={{fontSize:"17px"}} >{`Name: ${i.name}`}</span><br></br>
            {/* <span style={{fontSize:"17px"}} >quantity:{i.quantity}</span> */}
            {/* <p style={{fontSize:"19px"}}
            className="cartSubtotal">{`₹${
                    i.price * i.quantity
                  }`}</p> */}
            {/* <Link to={`/orderdetails/${i._id}`} style={{fontWeight:"700",color:"tomato"
          }}>Order Details</Link> */}
          </div>
   
        </div>
    
        </Div>
        
      )
         }

export default HomeUsers
const Div=styled.div`
.CartItemCard {
    display: flex;
    padding: 1vmax;
    height: 12vmax;
    align-items: flex-start;
    box-sizing: border-box;
  }
  .CartItemCard > img {
    width: 8vmax;
    height:8vmax;
  }
  
  .CartItemCard > div {
    display: flex;
    margin: 0.3vmax 1vmax;
    flex-direction: column;
  }
  
  .CartItemCard > div > a {
    font: 300 0.9vmax cursive;
    color: rgba(24, 24, 24, 0.815);
    text-decoration: none;
  }
  
  .CartItemCard > div > span {
    font: 300 0.9vmax "Roboto";
    color: rgba(24, 24, 24, 0.815);
  }
  
  .CartItemCard > div > p {
    color: tomato;
    font: 100 0.8vmax "Roboto";
    cursor: pointer;
  }
  
  @media screen and (max-width: 600px) {
    .CartItemCard {
      padding: 3vmax;
      height: 25vmax;
    }
    .CartItemCard > img {
      width: 10vmax;
    }
  
    .CartItemCard > div {
      margin: 1vmax 2vmax;
    }
  
    .CartItemCard > div > a {
      font: 300 2vmax cursive;
    }
  
    .CartItemCard > div > span {
      font: 300 1.9vmax "Roboto";
    }
  
    .CartItemCard > div >button {
      font: 100 1.8vmax "Roboto";
    }
  }
`


