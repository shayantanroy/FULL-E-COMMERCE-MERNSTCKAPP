import React, { useEffect, useState } from 'react'
// import { getProducts } from '../redux/productSlice'
import { getproducts } from '../reduximplement/actions/ProductActions'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Loder from './layout/Loder'
import HomeProductCard from './HomeProductCard'
import  {Link, useParams } from 'react-router-dom'
// import Footer from './Footer'
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import { Slider } from '@material-ui/core'

// import Slider from "@material-ui/core/Slider";



const categories = [
  "laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];


const Products = () => {

  
    
  
    const alert=useAlert()
    const dispatch=useDispatch();
    // const alert=useAlert();

   
    const [currentPage, setCurrentPage] = useState(1);
    const[price,setCurrentprice]=useState([0,200000000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);


    const {loding,error,products,productsCount,resPerPage,filteredProductsCount,}=useSelector((state)=>state.products);
  
    const{keyword}=useParams();
    // const keyword = match.params.keyword;

   
    const setCurrentPageNo = (e) => {
      setCurrentPage(e);
    };
    const priceHandler=(event,newPrice)=>{
      setCurrentprice(newPrice);
    }
  

    let count=filteredProductsCount;
useEffect(()=>{
    if(error){
        return alert.error(error);
    }
    dispatch(getproducts(keyword,currentPage,price,category,ratings));
},[dispatch,error,keyword,currentPage,price,category,ratings]);




// let count=filteredProductsCount;


  return (
    <div>

        {loding ?
            (<Loder/>): 
            
             ( <Homepage>
            
  
            <h2 className='productheading'>PRODUCTS</h2>
            <Productcard>
                {products && products.map((product)=>(
         <HomeProductCard key={product._id} product={product}/>
               ))}

            </Productcard>

            <div className='filterBox'>
              <Typography>Price</Typography>
              <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby='range-slider'
              // aria-labelledby="continuous-slider"

              min={0}
              max={20000000}
              />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
             
            </ul>

            <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />


            </div>

           



             {resPerPage <count && (
            <div className="paginationBox">
             <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
                
       </div>
  )}
 
 
        </Homepage>
         )} 
    
    </div>
  )
}

export default Products
const Homepage=styled.div`
width:100%;
padding-top:90px;
// height:140vh;
.productheading{
    text-align:center;
    border-bottom:1px solid grey;
    width:15%;
    // margin:20px 750px;
    margin: 20px auto;
}



.paginationBox {
    display: flex;
    justify-content: center;
    margin: 6vmax;
  
    @media(max-width:600px){
      margin:6vmax 35vmax;
         
         }
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    padding: 0;
  }
  
  .page-item {
    background-color: rgb(255, 255, 255);
    list-style: none;
    border: 1px solid rgba(0, 0, 0, 0.178);
    padding: 1vmax 1.5vmax;
    transition: all 0.3s;
    cursor: pointer;
  }
  .page-item:first-child {
    border-radius: 5px 0 0 5px;
  }
  
  .page-item:last-child {
    border-radius: 0 5px 5px 0;
  }
  .page-link {
    text-decoration: none;
    font: 300 0.7vmax "Roboto";
    color: rgb(80, 80, 80);
    transition: all 0.3s;
  }
  
  .page-item:hover {
    background-color: rgb(230, 230, 230);
  }
  
  .page-item:hover .page-link {
    color: rgb(0, 0, 0);
  }
  
  .pageItemActive {
    background-color: tomato;
  }
  
  .pageLinkActive {
    color: white;
  }
  
  .filterBox {
    width: 10vmax;
    position: absolute;
    top: 10vmax;
    left: 4vmax;
  }
  @media screen and (max-width: 600px) {
    .filterBox {
      width: 20vmax;
      position: static;
      margin: auto;
    }
  
    .page-link {
      font: 300 1.7vmax "Roboto";
    }
    .category-link {
      font: 400 1.8vmax "Roboto";
    }
  }
  
  .categoryBox {
    padding: 0%;
  }
  
  .category-link {
    list-style: none;
    color: rgba(0, 0, 0, 0.61);
    font: 400 0.8vmax "Roboto";
    margin: 0.4vmax;
    cursor: pointer;
    transition: all 0.5s;
  }
  .category-link:hover {
    color: tomato;
  }

  
  `
const Productcard=styled.div`
position:relative;
max-width:1200px;
margin:0px 270px;
width:80%;

display: grid;
grid-template-columns: repeat(4, 1fr);
}

@media(max-width:600px){
margin:0px 150px;
grid-template-columns: repeat(1, 1fr);
   }

  
`