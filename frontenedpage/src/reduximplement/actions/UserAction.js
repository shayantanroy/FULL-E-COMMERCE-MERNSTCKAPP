import axios from "axios";


export const login=(email,password)=>async(dispatch)=>{

    try{
        dispatch({type:'loginRequest'});
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } =await axios.post(`/api/v1/login`,{email,password},
        config);
        dispatch({type:'loginSuccess',
           payload:data});

    }catch(error){
        dispatch({type:'loginFail',
    payload:error.response.data.message});

    }
}


// register

export const register=(userdata)=>async(dispatch)=>{
    try{
        dispatch({type:'registerRequest'});
        const config={headers:{"content-Type":"multipart/from-data"}}
        const {data}=await axios.post(`/api/v1/register`,userdata,config);
        dispatch({type:'registerSuccess',
    payload:data});
    }catch(error){
        dispatch({type:'registerFail',
    payload:error.response.data.message});

    }
}



// loder user or get user details
export const loderUser=()=>async(dispatch)=>{
    try{
        dispatch({type:'loderRequest'});
       
        const { data } =await axios.get(`/api/v1/me`);
        dispatch({type:'loderSuccess',
           payload:data});

    }catch(error){
        dispatch({type:'loderFail',
    payload:error.response.data.message});

    }

}


// logout
export const logOut=()=>async(dispatch)=>{
    const{data}=await axios.get(`/api/v1/logout`);
    
        dispatch({type:"logOut",
    payload:data});
    

}
// userupadate--user

export const userupdate=(userdata)=>async(dispatch)=>{
    try{
        dispatch({type:'userupdaterequest'});
        const config={headers:{"content-Type":"multipart/from-data"}};
        const {data}=await axios.put(`/api/v1/me/update`,userdata,config);

        dispatch({type:'userupdatesuccess',
    payload:data});

    }catch(error){
        dispatch({type:'userupdatefail',
    payload:error.response.data.message});

    }

}
export const updatereset=()=>async(dispatch)=>{
    dispatch({type:"userupdatereset"})
}


// forgetPassword 
export const Forgetpassword=(userdata)=>async(dispatch)=>{
    try{
      dispatch({type:"forgetpasswordreq"});
        const config={headers:{"content-Type":"multipart/from-data"}};
        // const config = { headers: { "Content-Type": "application/json" } };

        const {data}=await axios.post(`/api/v1/password/forgot`,userdata,config);
    
                dispatch({type:"forgetpasswordsuc",payload:data});
    }catch(error){
        dispatch({type:"forgetpasswordfail",
        payload:error.response.data.message})
    }
}

// reset password
export const resetPassword=(token,password,confirmPassword)=>async(dispatch)=>{
    try{
        dispatch({type:"resetpasswordreq"});
        // const config={headers:{"content-Type":"multipart/from-data"}};
        const config = { headers: { "Content-Type": "application/json" } };
        const {data}=await axios.put( `/api/v1/password/reset/${token}`,{password,confirmPassword},config);
                dispatch({type:"resetpasswordsuc",payload:data});

    }catch(error){
        dispatch({type:"resetpasswordfail",
        payload:error.response.data.message});

    }
}




export const UsersAll=()=>async(dispatch)=>{
    try{
        dispatch({type:"usersreq"});
        const {data}=await axios.get("/api/v1/admin/users");
        dispatch({type:"userssucc",payload:data});
    }catch(error){
        dispatch({type:"usersfail",payload:error.response.data.message})
    }
}




export const resetMessage=()=>async(dispatch)=>{
    dispatch({type:"resetmessage"})

}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: 'clearError' });
  };




