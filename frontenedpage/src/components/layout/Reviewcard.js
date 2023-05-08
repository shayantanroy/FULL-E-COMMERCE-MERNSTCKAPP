import React from 'react'
import ReactStars from "react-rating-stars-component"
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Reviewcard = ({review}) => {
    
  const options = {
    edit:false,
    color:"grey",
    activateColor:"red",
    value:review.rating,
    isHalf:true,
    size:window.innerWidth <600?20:25,
    };
  return (
    <Div>
    
            <div className='a'>
                <AccountCircleIcon style={{color:"red"}}/>
        <h4>{review.name}</h4>
        <ReactStars {...options} style={{color:"red"}} />
        </div>
        <p>{review.comment}</p>
        
    </Div>
    
  )
}

export default Reviewcard
const Div=styled.div`
flex: none;
box-shadow: 0 0 5px rgba(0, 0, 0, 0.226);
border: 1px solid rgba(56, 56, 56, 0.116);
width: 30%;
display: flex;
flex-direction: column;
align-items: center;
margin: 1vmax;
padding: 3vmax;
overflow-wrap: anywhere;
.a{
    display:flex;
    flex-direction: column;
    align-items: center;
}

 
 
`


