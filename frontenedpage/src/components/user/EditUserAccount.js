import React,{useState,useEffect,Fragment} from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { userupdate,clearErrors} from '../../reduximplement/actions/UserAction'
import Loder from '../layout/Loder'
import { useNavigate } from 'react-router-dom';
import { updatereset } from '../../reduximplement/actions/UserAction'
import MetaData from '../MetaData'
const EditUserAccount = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    let navigate = useNavigate();
    // loderuser action
    // const {isAuthenticated}=useSelector(state=>state.users);
    // userupdate action
    const{error,isUpdate,loding}=useSelector((state)=>state.users);



    const [user, setUser]=useState({
        name:"",
        email:"",
       
      });
      const {name,email}=user;

      
      const [avatar, setAvatar] = useState("");
    //   const [avatarPreview, setAvatarPreview] = useState("");





    //   const myForm=new  FormData();
    //   myForm.set("name",name);
    //   myForm.set("email",email);
    //   myForm.set("avatar", avatar);



      const registerSubmit = (e) => {
        e.preventDefault();
        const myForm=new  FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("avatar", avatar);
      
     
      dispatch(userupdate(myForm));
    //   navigate("/accountprofile")
   
      }


      const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
            //   setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };
      useEffect(()=>{
      
      
        if(isUpdate){
            alert.success("update successfully");
            navigate("/accountprofile");
            
        }
        dispatch(updatereset())
        // dispatch({type:"userupdatereset"})
        // isUpdate=false;
        // if(isAuthenticated===false){
        

        //     navigate("/loginSignup");
        // }
  
      },[dispatch,isUpdate]);


//     return (
//         <X>
//             {loding?
//             <Loder/>:
//         <Addproduct>
//             <Div ><br></br>
            
//            <h2>Update Profile-Account</h2><br></br>
//            {/* <Link to={"/products"}><button style={{height:"30px",fontWeight:"600",backgroundColor:"red",cursor:"pointer"}}>Go To Product</button></Link>  */}
//             </Div>
           
    
           
//             <Details>
//             {/* <h2>Update Profile-Account</h2><br></br> */}
//             <form
//                 className="signUpForm"
               
//                 encType="multipart/form-data"
//                 onSubmit={registerSubmit}
//               >
//                 <label for="title">User Name</label><br></br><br></br>
//                 <input
//                 id='title'
//                     type="text"
//                     placeholder="Name"
//                     required
//                     name="name"
//                     value={name}
//                     onChange={registerDataChange}
//                   /><br></br><br></br>
              
//                 <label for="email">Email-id</label><br></br><br></br>
//                 <input
//                 id='email'
//                     type="email"
//                     placeholder="Email"
//                     required
//                     name="email"
//                     value={email}
//                     onChange={registerDataChange}
//                   /><br></br><br></br>
                
//                 <label for="avatar">Profile Icon</label><br></br><br></br>
//                 <input
//                     type="file"
//                     name="avatar"
//                     accept="image/*"
//                     onChange={registerDataChange}
//                   />
//                   <input type="submit" value="Submit" className="signUpBtn" />
//                   </form>
//                        </Details>
                      
          
//         </Addproduct>
// }
//         </X>
//       )
// }


return (
  <Fragment>
  {loding ? (
    <Loder />
  ) : (
    <Div>
      <MetaData title="Forgot Password" />
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Update Profile</h2>

          <form
            className="forgotPasswordForm"
            onSubmit={registerSubmit}
          >
            <div className="forgotPasswordEmail">
          
            <input
                id='title'
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
            </div><br></br>
            <div className="forgotPasswordEmail"> 
            <input
                id='email'
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
            </div><br></br>
            <div className="forgotPasswordEmail">
            <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
            </div><br></br>

            <input
              type="submit"
              value="Send"
              className="forgotPasswordBtn"
            />
          </form>
        </div>
      </div>
    </Div>
  )}
</Fragment>
);
};

export default EditUserAccount
// const Addproduct=styled.div`
// width:80%;
// background:#F0F8FF;
// // height:90vh;

// // margin:70px 20% 0;
// padding-top:80px;
// margin:auto;
// // background:black;
// `
// const Details=styled.div`
// width:50%;
// // height:400px;
// padding:10px;
// margin:50px 50px;
// // box-shadow: 0px 5px 10px 5px rgb(159, 159, 159);
// box-shadow: 0px 0px 6px 0px #aaa;

// input{
//     width:85%;
//     height:30px;
// }
// textarea{
//     width:85%;
// }
// background:white;
// `
// const Div=styled.div`
// margin-left:50px;
// // background:green;`
// const X=styled.div``




const Div=styled.div`
.forgotPasswordContainer {
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
  
  .forgotPasswordBox {
    background-color: white;
    width: 25vw;
    height: 50vh;
    box-sizing: border-box;
    overflow: hidden;
  }
  
  .forgotPasswordHeading {
    text-align: center;
    color: rgba(0, 0, 0, 0.664);
    font: 400 1.3vmax "Roboto";
    padding: 1.3vmax;
    border-bottom: 1px solid rgba(0, 0, 0, 0.205);
    width: 50%;
    margin: auto;
  }
  
  .forgotPasswordForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 2vmax;
    justify-content: space-evenly;
    height: 70%;
    transition: all 0.5s;
  }
  
  .forgotPasswordForm > div {
    display: flex;
    width: 100%;
    align-items: center;
  }
  
  .forgotPasswordForm > div > input {
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax cursive;
    outline: none;
  }
  
  .forgotPasswordForm > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }
  
  .forgotPasswordBtn {
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
  
  .forgotPasswordBtn:hover {
    background-color: rgb(179, 66, 46);
  }
  
  @media screen and (max-width: 600px) {
    .forgotPasswordContainer {
      background-color: white;
    }
    .forgotPasswordBox {
      width: 100vw;
      height: 95vh;
    }
  
    .forgotPasswordForm {
      padding: 5vmax;
    }
  
    .forgotPasswordForm > div > input {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax cursive;
    }
  
    .forgotPasswordForm > div > svg {
      font-size: 2.8vmax;
    }
  
    .forgotPasswordBtn {
      font: 300 1.9vmax "Roboto";
      padding: 1.8vmax;
    }
  }`

