import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import Loder from '../layout/Loder'
// import HomeProductCard from '../HomeProductCard'
import  {Link, useParams } from 'react-router-dom'
// import Footer from './Footer'
import { adminproducts } from '../../reduximplement/actions/ProductActions';
import Adminhomeproductcard from './Adminhomeproductcard'

const AdminProducts = () => {
 
    
  
    const alert=useAlert()
    const dispatch=useDispatch();


    const {loding,error,productss}=useSelector((state)=>state.AdminProducts);
    // const {loding,error,products,productsCount,resPerPage,filteredProductsCount,}=useSelector((state)=>state.products);
  
    const{keyword}=useParams();
    // const keyword = match.params.keyword;

   

  
  

    // let count=filteredProductsCount;
    useEffect(() => {
        dispatch(adminproducts());
   
      }, [dispatch]);






  return (
    <div>

        {loding ?
            (<Loder/>): 
            
             ( <Homepage>
            
  
            <h2 className='productheading'>PRODUCTS</h2>
            <Productcard>
                {productss && productss.map((product)=>(
         <Adminhomeproductcard key={product._id} product={product}/>
               ))}

            </Productcard>
        
{/* 
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
  )} */}
 
 
        </Homepage>
         )} 
    
    </div>
  )
}

export default AdminProducts
const Homepage=styled.div`
width:100%;
padding-top:90px;
// height:140vh;
.productheading{
    text-align:center;
    border-bottom:1px solid grey;
    width:15%;
    // margin:20px 750px;
    margin: auto;
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
// display: flex;
// gap:5.4%;
// flex-wrap: wrap;
display: grid;
grid-template-columns: repeat(4, 1fr);
max-width:1200px;
// margin:0px 270px;
margin:auto;
width:80%;
// border:1px solid red;
min-height:30vh;


   @media(max-width:600px){
    margin:0px 150px;
    grid-template-columns: repeat(1, 1fr);
       }

  
`
