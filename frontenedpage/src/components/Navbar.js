import React,{ useEffect, useState } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { loderUser,clearErrors } from '../reduximplement/actions/UserAction';
import { logOut } from '../reduximplement/actions/UserAction';

const Navbar = () => {
  const dispatch=useDispatch();
  const alert=useAlert();

        const{error,User,isAuthenticated,message}=useSelector(state=>state.users);

    const[burgerstatus,setBurgerstatus]=useState(false);
    const[profilestatus,setProfilestatus]=useState(false);



    let navigate=useNavigate();

    const dashboard=()=>{
      navigate("/mydash");
      setProfilestatus(false);
      
    }
    const profile=()=>{
      navigate("/accountprofile");
      setProfilestatus(false);
      
    }
    const orders=()=>{
      navigate("/myorder");
      setProfilestatus(false);
      
    }
    const logout=()=>{
      dispatch(logOut());
      alert.success("logOut successfull")
      setProfilestatus(false);
      navigate('/');
      
    }




    useEffect(()=>{
     

   
      dispatch(loderUser());
      
     

    },[dispatch,message]);


// let navigate=useNavigate();

//     const dashboard=()=>{
//       navigate("/dashboard");
//       setProfilestatus(false);
      
//     }
//     const profile=()=>{
//       navigate("/profile");
//       setProfilestatus(false);
      
//     }
//     const orders=()=>{
//       navigate("/orders");
//       setProfilestatus(false);
      
//     }
//     const logout=()=>{
//       dispatch(logout());
//       setProfilestatus(false);
      
//     }
  return (
    <Div>
       <Link to={"/"}  ><Logo>
            <h1>Roy Bazar</h1>
        </Logo></Link>
  
       
            <RightMenu>
        
        <ul>
            <Link to={"/"}><li>HOME</li></Link>
            <Link to={"/products"} ><li>PRODUCT</li></Link>
            <li>ABOUT</li>
            <li>CONTACT</li>
           
        </ul>
        <Link to={"/search"}><SearchIcon style={{"cursor":"pointer"}}/></Link>
        <Link to={"/cart"}><LocalMallIcon style={{"cursor":"pointer"}}/></Link>
        
        {isAuthenticated?
        <div className='profi' style={{display:"flex",flexDirection:"column",alignItems:"center"}} >
            <img src={User.avatar.url} style={{width:"40px",borderRadius:"100%",position:"relative"}} onClick={()=>setProfilestatus(!profilestatus)} />
            {profilestatus &&
              <ul style={{display:"flex",flexDirection:"column" ,position:"absolute",marginTop:"42px",zIndex:"999",background:"white",paddingRight:"35px"}} >
                <li onClick={profile}>Profile</li>
                {User.role==="user"&&
                <li onClick={orders}>Orders</li>}
                 {User.role==="admin"&&
                 <li onClick={dashboard}>DashBoard</li>   
                              }
               <li onClick={logout}>LogOut</li>
              </ul>
            // </div>
           }
        </div>:
        // <Link to={"/products"}><label for="profilemenu"><img src={User.avatar.url}  style={{width:"40px",borderRadius:"50px"}}/></label></Link>:
        <Link to={"/loginSignup"}><Profileicon  style={{"cursor":"pointer"}}/></Link>}

         


        {/* <LocalMallIcon style={{"cursor":"pointer"}}/> */}
        <Hamicon onClick={()=>{setBurgerstatus(true)}}/>
        </RightMenu>
        <BurgerNav show={burgerstatus}>
           
        <ul >
          <Closeicondiv>
          <Closeicon onClick={()=>{setBurgerstatus(false)}}/>
          </Closeicondiv>
          <li><SearchIcon/></li>
         <Link to={"/"}><li>HOME</li></Link> 
         <Link to={"/products"}> <li>PRODUCT</li></Link> 
         <Link to={"/about"}> <li>ABOUT</li></Link> 
         <Link to={"/contact"}><li>CONTACT</li></Link> 
        </ul>
      </BurgerNav>

     
       
    </Div>
  )
}

export default Navbar
const Profileicon=styled(AccountBoxIcon)`
cursor:pointer;
&:hover{
  color:red;

}

`
const Div=styled.div`
width:100%;
height:70px;
display:flex;
justify-content:space-between;
align-items:center;
position:fixed;
opacity:0.85;
background-color: rgb(226, 226, 175);
box-shadow: 0px 1px 1px 1px rgb(159, 159, 159);
padding-left:20px;
z-index:999;

`
const Logo=styled.div`
color:black;
`
const BurgerNav=styled.div`
// display:none;
position:fixed;
background-color:white;
top:0;
bottom:0;
right:0;
width:250px;
z-index:999;
display:flex;
padding:20px;
flex-direction:column;
 text-align:start;
 font-weight:700;
 transform:${props=>props.show?"translateX(0)":"translateX(100%)"};
 transition:0.3s;
li{
  padding:15px 0;
  border-bottom:1px solid black;
  list-style:none;
  
}
`






const RightMenu=styled.div`
display:flex;
gap:20px;
color:black;
font-weight:700;
padding-right:20px;

ul{
    display:flex;
    gap:20px;
    li{
        list-style:none;
        cursor:pointer;
        padding-left:10px;
        color:black;
        &:hover{
          color:red;
      
        }
       
    }
    form{
        margin-left:15px;
    }


    @media(max-width:600px){
      display:none;
     }
   
   
   
   
}`
const Closeicon=styled(CloseIcon)`
cursor:pointer;
&:hover{
  color:red;

}`
const Closeicondiv=styled.div`
display:felx;
justify-content:flex-end;`
const Hamicon=styled(MenuIcon)`
cursor:pointer;
&:hover{
  color:red;

}

`

