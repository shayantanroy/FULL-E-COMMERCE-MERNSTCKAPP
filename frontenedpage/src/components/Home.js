import React, { useEffect } from 'react'
import styled from "styled-components"
// import ReactStars from "react-rating-stars-component"
import MetaData from './MetaData';
// import { getProducts } from '../redux/productSlice';
import { useSelector,useDispatch } from 'react-redux';
import HomeProductCard from './HomeProductCard';
import Loder from './layout/Loder';
import { useAlert } from 'react-alert';
import Footer from './Footer';
import { getproducts } from '../reduximplement/actions/ProductActions';


const Home = () => {
  const alert=useAlert();
  const dispatch=useDispatch();

 // "proxy": "http://172.20.222.154:4000"

  const {loding,error,products,productsCount,message}=useSelector(state=>state.products);
  useEffect(()=>{
    if(error){
      return alert.error(message);
     }
   dispatch(getproducts());
  
  },[dispatch,error,message]);

 

  return (
    <div>
      {loding?
      (<Loder/>):(
    <Homepage>
      {/* for title your page name */}
      <MetaData title="AGRO FARMER-home"/>

    <Div>
     <Conatiner>
     <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <h4>Save upto 70%& and get some gift</h4>
        <Botton>Explore Now</Botton>
     </Conatiner>
    </Div>
    <h2 class="hello">Product Feature</h2>
    <Productcard>
    {products && products.map((product)=>(
      <HomeProductCard class="a" key={product._id} product={product}/>

     ))}
   </Productcard>
    </Homepage>
      )}
     
    </div>
  )
}
// "../images/tea-pickers-working-kerela-india.jpg" alt='bkl'

export default Home
const Div=styled.div`
background:url("../images/tea-pickers-working-kerela-india.jpg");
// Free Vector _ Smartphone website market to shopping online.jpg
// tea-pickers-working-kerela-india.jpg
width: 100%;
height:60vh;
background-size:cover;
background-position:center;
background-repeat: no-repeat;
// clip-path: polygon(0 0, 100% 0, 100% 83%, 0 99%);


`
const Conatiner=styled.div`
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
padding-top:150px;
h1{
  font-size:50px;
  line-height: 64px;
  color:black;
}
h2{
  font-size: 46px;
  line-height: 54px;
color:black;
}
h4{
  font-size:20px;
  color:black;
}
h5{
  font-size: 15px;
  color:black;
}

`
const Botton=styled.button`
padding:10px 22px;
margin-top:25px;
border-radius:50px;
font-weight:700;
border:none;
cursor:pointer;
&:hover{
  transition:0.8s;
  color:black;
  background:red;
}`



const Homepage=styled.div`
width:100%;

.hello{
  text-align:center;
  border-bottom:1px solid grey;
  width:15%;
  margin:15px auto;

}

`

const Productcard=styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);

max-width:1200px;
// border:1px solid red;
margin:auto;
width:80%;
// .product{
//   width:20%;
//   min-width:250px;
//   padding:10px;
//   border: 1px solid rgb(207, 207, 207);
//   border-radius:15px;
//   cursor: pointer;
//   margin-bottom:10px;
//   margin-top:20px;
//   text-align: left;
//  transition: 0.4s;
// //  z-index:-1;

// &:hover{
//   box-shadow: 0px 5px 10px 5px rgb(159, 159, 159);
//   // transform: translateY(-1vmax);
// }
// }

// img{
//   width:100%;
// }





// }


// @media(max-width:600px){
// display:flex;
// justify-content:center;
 
//  }
@media(max-width:600px){
  margin:0px 150px;
  grid-template-columns: repeat(1, 1fr);
     }

`



