import React, {useEffect,useState } from 'react'
import styled from 'styled-components'
import Carousel from"react-material-ui-carousel";
// import { getProduct } from '../redux/productSlice';
import { clearErrors, getproduct } from '../reduximplement/actions/ProductActions';
import {useDispatch,useSelector} from "react-redux"
import { useNavigate, useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import Loder from './layout/Loder';
import Reviewcard from './layout/Reviewcard';
import { useAlert } from 'react-alert';
// import Footer from './Footer';
import MetaData from './MetaData';
import { cartAdd } from '../reduximplement/actions/CartAction';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import { newReview } from '../reduximplement/actions/ProductActions';
import { resetMessage } from '../reduximplement/actions/ProductActions';

// import
// import Navbar from './Navbar'
const ProductDetails = () => {
  const dispatch=useDispatch();
  let navigate=useNavigate();
  const alert=useAlert();
  const {id}=useParams();
  const {product,loding,error,message,success}=useSelector((state)=>state.products);
    // dispatch(cartAdd(id));
    // const gotocart=()=>{
    //   dispatch(cartAdd(id));
    //   // navigate("/cart");

    // }
  const options = {
    edit:false,
    color:"grey",
    activateColor:"tomato",
    value:product.rating,
    isHalf:true,
    size:window.innerWidth <600?20:25,
    
    };
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };


    const reviewSubmitHandler = () => {
      const myForm = new FormData();
  
      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId",id);
  
      dispatch(newReview(myForm));
  
      setOpen(false);
    };






  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (quantity>=product.Stock )
       return;
    setQuantity(quantity +1);
  };
  const decreaseQuantity = () => {
    if ( quantity<=1)
      return;
    setQuantity(quantity - 1);
  };
   




  const gotocart=()=>{
    dispatch(cartAdd(id,quantity));
    navigate("/cart");

  }




 
    useEffect(()=>{
      if(success){
        alert.success("review submitted");
        dispatch(resetMessage());
      }
    
      if(error){
        return alert.error(message);
        dispatch(clearErrors());
      }
  dispatch(getproduct(id));
    },[dispatch,error,message,id,success,resetMessage]);


  return (
    <Divx>
      <MetaData title={`${(product.name)}--AgroFarmer`}/>
      
 {loding? 
      (<Loder/>):(
    <DivY>
      {/* {loding? 
      (<Loder/>):( */}
        <Div>
        <Div1>
          <Aarousel>
          {product.images &&
                  product.images.map((item, i) => (
                    <img 
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i}Slide`}
                    />
                  ))}
          </Aarousel>      
        </Div1>
        <Div2>
          <div className='sub'>
          <h1>{product.name}</h1>
          <p>{`product # ${product._id}`}</p>
          </div>
          <div className='opti'>
          <ReactStars {...options}/>
          <span> {`(${product.numOfReviews}Reviews)`}</span>
          </div>
          <h2>{`₹ ${product.price}`}</h2><br></br>
          <div className='quntityandcardbutton'>
          <div className='quantity'>
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
          </div>
          <div className='cart'>
            
           <button  onClick={gotocart}>Add to Cart</button>
          </div>
          </div><br></br>
          <div className='status'>
          <p>Status:</p>
          <b className={product.Stock<1?'redcolor':'greencolor'}>
            {product.Stock<1?'Out of Stock':'In Stock'}</b>
            </div><br></br>
           <h4>Description:</h4>
           <p>{product.description}</p><br></br>
           <br></br><br></br>
           
           <button onClick={submitReviewToggle}>Submit Review</button>
        </Div2>
        </Div><br></br>
     <div className='con'>
      <h3>REVIEWS</h3>



      <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>




      {product.reviews && product.reviews[0]?(
        <div className='reviewcon'>
        {product.reviews && 
        product.reviews.map((review)=>(
          <Reviewcard key={product._id} review={review} />
        ))}
        </div>
      ):(
        <p className="noReviews">No Reviews Yet</p>      )
      }


     </div>
    </DivY>
    )}
    
    </Divx>
  )
}

export default ProductDetails
const Divx=styled.div`
width:100%;
// background-color: rgb(207, 209, 211);`
const Div=styled.div`
width:80%;
margin:auto;
padding-top:100px;
height:60vh;
display:flex;
justify-content:space-between;
// background:grey;

`
const Div1=styled.div`

width:49%;
padding-top:110px;

// box-shadow: 0px 5px 10px 5px rgb(159, 159, 159);
display:flex;
justify-content:center;
align-items:center;




`
const Div2=styled.div`
width:49%;

display:flex;
flex-direction:column;
align-items:flex-start;
// box-shadow: 0px 5px 10px 5px rgb(159, 159, 159);
padding-left:10px;
padding-top:20px;
.sub{
  border-bottom:1px solid black;
  margin-bottom:10px;
  padding-bottom:10px;
}
.opti{
  display:flex;
  align-items:center;
  border-bottom:1px solid black;
  margin-bottom:10px; 
   padding-bottom:10px;
}

.quntityandcardbutton{
  display:flex;
  align-items:center;
 
 }
 .quantity{
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
    width:45px;
    padding:3px;

 }
  
  }
  .cart{
    button{
      margin-left:8px;
      margin-right:8px;
     padding:3px 15px;
          border-radius:50px;
    background-color:tomato;
    color:white;
    border:none;
    }

  }
  button{
    margin-left:8px;
    margin-right:8px;
   padding:3px 15px;
        border-radius:50px;
  background-color:tomato;
  color:white;
  border:none;
  }
  .status{
    display:flex;
  }
  .redcolor{
    color:red;
  }
  .greencolor{
    color:green;
  }
 
`
const Aarousel=styled(Carousel)`
width:50%;
img{
  box-shadow: 0px 5px 10px 5px rgb(159, 159, 159);
  width:100%;
  // height:80%;
}`

const DivY=styled.div`
.con{

  margin-top:50px;
  h3{
    text-align:center;
    border-bottom:1px solid grey;
    width:15%;
    margin:15px auto;
  }

}
.reviewcon{
  padding:30px 50px;
  // border:1px solid green;
  display: flex;
  overflow: auto;
 

}
.noReviews {
  font: 400 1.3vmax "Gill Sans";
  text-align: center;
  color: rgba(0, 0, 0, 0.548);
}
`
