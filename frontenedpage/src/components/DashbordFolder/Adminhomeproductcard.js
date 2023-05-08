import React from 'react'
import ReactStars from "react-rating-stars-component"
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Adminhomeproductcard = ({product}) => {
    const options = {
        edit:false,
        color:"grey",
        activateColor:"tomato",
        value:product.rating,
        isHalf:true,
        size:window.innerWidth <600?20:25,
        
        };
  return (
   <Link to={`/updateproduct/${product._id}`}>
    <Home> 
      <img src={product.images[0].url} alt={product.name}/>
      <p>{product.name}</p>
      <div>
       <ReactStars {...options}/>
        <span>{`(${product.numOfReviews}reviews)`}</span>
      </div>
      <span>{`₹${product.price}`}</span>
      
        </Home> 
        </Link>
    
  )
}

export default Adminhomeproductcard

const Home=styled.div`
width:20%;
min-width:250px;
height:380px;
padding:10px;
border: 1px solid rgb(207, 207, 207);
border-radius:15px;
cursor: pointer;
margin-bottom:10px;
margin-top:20px;
text-align: left;
transition: 0.4s;

//  z-index:-1;

&:hover{
box-shadow: 0px 5px 10px 5px rgb(159, 159, 159);
// transform: translateY(-1vmax);
}
}

img{
width:100%;
height:75%;
}

`

