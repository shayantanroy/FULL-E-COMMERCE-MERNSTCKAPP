import React from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
// import { loderUser } from '../../reduximplement/actions/UserAction'
import { useEffect } from 'react'
import Loder from '../layout/Loder'
import { Link, useNavigate } from 'react-router-dom'
// import store from'Store'

const ProfileAccount = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {User,loding,error,isAuthenticated}=useSelector((state)=>state.users);
    let navigate=useNavigate();
    const editbutton=()=>{
        navigate("/updateprofile");
    }

    useEffect(()=>{
   
    //   dispatch(loderUser());


      
      if(isAuthenticated===false){
        navigate("/loginSignup");
        
      }
    //   dispatch(loderUser());

    },[isAuthenticated]);
  return (
    <Divx>
        {loding?(
            <Loder/>):
        // <h2>MY PROFILE</h2>
        <Div>
        <Div1>
            <div>
                {/* <h1>roy</h1> */}
                <img src={User.avatar.url}/>
            </div>
           <button onClick={editbutton} style={{cursor:"pointer"}}>Edit Profile</button>

        </Div1>
        <Div2>
            <ul>
                {/* <li>Full Name:  {User.name}</li>
                <li>Email:  {User.email}</li>
                <li>Joined On:  {String(User.createdAt).substring(0,10)}</li> */}
                <li>Full Name:<p style={{fontWeight:"400"}}>{User.name}</p></li>
                <li>Email:<p style={{fontWeight:"400"}}>{User.email}</p></li>
                <li>Joined On:<p style={{fontWeight:"400"}}>{String(User.createdAt).substring(0,10)}</p></li>

                {/* <li></li> */}
            </ul>
            <button>My Order</button>

        </Div2>
        </Div>
}
    </Divx>
  )
}

export default ProfileAccount
const Divx=styled.div``
const Div=styled.div`
display:flex;
max-width:70%;
height:85vh;
margin:auto;
justify-content:space-between;
// border:2px solid black;
padding-top:80px;`
const Div1=styled.div`
padding-top:20px;
width:49%;
// border:2px solid black;
display:flex;
flex-direction:column;
align-items:center;
div{
    width:40%;
    height:40%;
    border-radius:20%;
    border:2px solid black;
    margin-bottom:20%;
    img{
        width:100%;
        height:100%;
        border-radius:20%;
    }
}
button{
    width:50%;
    height:5%;
    background:tomato;
   border:none;
   font-weight:700;
}
`
const Div2=styled.div`
width:49%;
// border:2px solid black;
padding-top:20px;
display:flex;
flex-direction:column;
// align-items:center;
justify-content:flex-start;
button{
    width:50%;
    height:5%;
   margin:30% auto;
   background:grey;
   border:none;
   font-weight:700;
}
ul{
    // border:2px solid black;
    list-style:none;
    height:30%;
    display:flex;
    justify-content:space-between;
    flex-direction:column;
    font-weight:700;
}`
