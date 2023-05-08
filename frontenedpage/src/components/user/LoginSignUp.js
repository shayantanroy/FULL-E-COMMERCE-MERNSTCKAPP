
import React,{useRef,useState,useEffect} from 'react'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { Link, redirect } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { login,clearErrors,register } from '../../reduximplement/actions/UserAction';
import Loder from '../layout/Loder';
import { useNavigate } from 'react-router-dom';
// import { UseLocation } from 'react-router-dom';

import { useLocation } from 'react-router-dom';



const LoginSignUp = ()=>{
  const dispatch=useDispatch();
  const alert=useAlert();
  let navigate = useNavigate();
  const location=useLocation();


        const{loding,error,User,isAuthenticated}=useSelector(state=>state.users);



    
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);


    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");



    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
        
      };

      const [user, setUser]=useState({
        name:"",
        email:"",
        password:"",
      });
      const {name,email,password}=user;


      const [avatar, setAvatar] = useState("");
      const [avatarPreview, setAvatarPreview] = useState("");




      const myForm=new  FormData();
      myForm.set("name",name);
      myForm.set("email",email)
      myForm.set("password", password);
      myForm.set("avatar", avatar);
      // // dispatch(register(myForm));


      
      const registerSubmit = (e) => {
        e.preventDefault();
      
     
      dispatch(register(myForm));
      }


      const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };
      



  const redirect=location.search?location.search.split("=")[1]:"/"

      useEffect(()=>{

        if (isAuthenticated) {
          // navigate('/');
          navigate(redirect)
        }



        if(error){
          alert.error(error);
          dispatch(clearErrors());

        }
        // dispatch(loderUser());


       
      },[dispatch,error,isAuthenticated]);







      const switchTabs = (e, tab) => {
        if (tab === "login") {
          switcherTab.current.classList.add("shiftToNeutral");
          switcherTab.current.classList.remove("shiftToRight");
    
          registerTab.current.classList.remove("shiftToNeutralForm");
          loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
          switcherTab.current.classList.add("shiftToRight");
          switcherTab.current.classList.remove("shiftToNeutral");
    
          registerTab.current.classList.add("shiftToNeutralForm");
          loginTab.current.classList.add("shiftToLeft");
        }
      };
    
  return (
    <Divx>
      {loding ?
      <Loder/>:(
        <Divy>
            <div className='LoginSignUpContainer'>
                <div className='LoginSignUpBox'>
                    <div>
                        <div className='login_signUp_toggle'>
                            <p onClick={(e)=> switchTabs(e,"login")}>LOGIN</p>
                            <p onClick={(e)=> switchTabs(e,"register")}>REGISTER</p>

                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/forgetpassword">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              {/* register form */}
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div><br></br>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                 <input type="submit" value="Register" className="signUpBtn" />
              </form>
                   
                  
                    
                </div>
            </div>
        </Divy>

      )}
    </Divx>
  )
}

export default LoginSignUp
const Divx=styled.div`
`
const Divy=styled.div`
.LoginSignUpContainer {
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(231, 231, 231);
  // position: fixed;
  top: 0%;
  left: 0;
}

.LoginSignUpBox {
  background-color: white;
  width: 25vw;
  height: 70vh;
  box-sizing: border-box;
  overflow: hidden;
}
.login_signUp_toggle {
  display: flex;
  height: 3vmax;
}
.login_signUp_toggle > p {
  color: rgba(0, 0, 0, 0.678);
  font: 300 1vmax "Roboto";
  transition: all 0.5s;
  cursor: pointer;
  display: grid;
  place-items: center;
  width: 100%;
}
.login_signUp_toggle > p:hover {
  color: tomato;
}

.LoginSignUpBox > div > button {
  background-color: tomato;
  height: 3px;
  width: 50%;
  border: none;
  transition: all 0.5s;
}

.loginForm,
.signUpForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 2vmax;
  justify-content: space-evenly;
  height: 70%;
  transition: all 0.5s;
}

.signUpForm {
  transform: translateY(-100%) translateX(-100vmax);
}

.loginForm > div,
.signUpForm > div {
  display: flex;
  width: 100%;
  align-items: center;
}
.loginForm > div > input,
.signUpForm > div > input {
  padding: 1vmax 4vmax;
  padding-right: 1vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font: 300 0.9vmax cursive;
  outline: none;
}

.loginForm > div > svg,
.signUpForm > div > svg {
  position: absolute;
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
}

.loginForm > a {
  color: rgba(0, 0, 0, 0.651);
  text-decoration: none;
  align-self: flex-end;
  transition: all 0.5s;
  font: 500 0.8vmax "Gill Sans";
}

.loginForm > a:hover {
  color: black;
}

#registerImage > img {
  width: 3vmax;
  border-radius: 100%;
}
#registerImage > input {
  display: flex;
  padding: 0%;
}

#registerImage > input::file-selector-button {
  cursor: pointer;
  width: 100%;
  z-index: 2;
  height: 5vh;
  border: none;
  margin: 0%;
  font: 400 0.8vmax cursive;
  transition: all 0.5s;
  padding: 0 1vmax;
  color: rgba(0, 0, 0, 0.623);
  background-color: rgb(255, 255, 255);
}

#registerImage > input::file-selector-button:hover {
  background-color: rgb(235, 235, 235);
}

.loginBtn,
.signUpBtn {
  border: none;
  background-color: tomato;
  color: white;
  font: 300 0.9vmax "Roboto";
  width: 100%;
  padding: 0.8vmax;
  cursor: pointer;
  transition: all 0.5s;
  border-radius: 4px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
}

.loginBtn:hover,
.signUpBtn:hover {
  background-color: rgb(179, 66, 46);
}

.shiftToLeft {
  transform: translateX(-100%);
}
.shiftToNeutral {
  transform: translateX(0%);
}

.shiftToNeutralForm {
  transform: translateX(0%) translateY(-100%);
}

.shiftToRight {
  transform: translateX(100%);
}`

