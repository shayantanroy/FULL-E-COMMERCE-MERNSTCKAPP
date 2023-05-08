import { createReducer } from "@reduxjs/toolkit";
export const userReducer=createReducer(
    {User:{}
},

{
    loginRequest:(state,action)=>{
       state.loding=true;
       state.isAuthenticated= false;

    },
    loginSuccess:(state,action)=>{
        state.loding=false;
        state.isAuthenticated=true;
        state.User=action.payload.user;
    },
    loginFail:(state,action)=>{
        state.loding=false;
        state.isAuthenticated=false;
        state.error=action.payload;
    },
  

    // register
    registerRequest:(state,action)=>{
        state.loding=true;
        state.isAuthenticated=false;
    },
    registerSuccess:(state,action)=>{
        state.loding=false;
        state.isAuthenticated=true;
        state.User=action.payload.user;
        
    },
    registerFail:(state,action)=>{
        state.loding=false;
        state.isAuthenticated=false;
        state.error=action.payload;
    },

    // loder user
    loderRequest:(state,action)=>{
        state.loding=true;
        state.isAuthenticated=false;
    },
    loderSuccess:(state,action)=>{
        state.loding=false;
        state.isAuthenticated=true;
        state.User=action.payload.user;
        
    },
    loderFail:(state,action)=>{
        state.loding=false;
        state.User=null;
        state.isAuthenticated=false;
       
    },

    // loguot reducer
    logOut:(state,action)=>{
        state.isAuthenticated=false;
        // state.message=action.payload.message;

    },
    // user-update --user
    userupdaterequest:(state,action)=>{
        state.loding=true;
        state.isUpdate=false;
        // state.isAuthenticated=false;
    },
    userupdatesuccess:(state,action)=>{
        state.loding=false;
        state.isUpdate=true;
        // state.isAuthenticated=true;
        state.User=action.payload.user;
    },
    userupdatefail:(state,action)=>{
        state.loding=false;
        state.isUpdate=false;
        // state.isAuthenticated=false;
    
    },
    userupdatereset:(state,action)=>{
        state.isUpdate=false;
    },
clearError:(state,action)=>{
        
    state.error=null;

},
}
)






export const forgetpasswordreducer=createReducer(
    { User:{}
},
{

    // forgetpass word
    forgetpasswordreq:(state,action)=>{
        state.loding=true;

    },
    forgetpasswordsuc:(state,action)=>{
        state.loding=false;
        state.message=action.payload.message;


},
forgetpasswordfail:(state,action)=>{
    state.loding=false;
    state.error=action.payload;

},
resetmessage:(state,action)=>{
    state.message=null;
},

// reset passs word reducers
resetpasswordreq:(state,action)=>{
    state.loding=true;
},
resetpasswordsuc:(state,action)=>{
    state.loding=false;
    state.success=action.payload.success;
},
resetpasswordfail:(state,action)=>{
    state.loding=false;
    state.error=action.payload;
},



clearError:(state,action)=>{
        
    state.error=null;

},
}
)


export const allusers=createReducer(
    {userss:[],},
    {
        usersreq:(state,action)=>{
            state.loding=true;
        },
        userssucc:(state,action)=>{
            state.loding=false;
            state.userss=action.payload.user;

        },
        usersfail:(state,action)=>{
            state.loding=false;
            state.error=action.apyload;
        },
        clearError:(state,action)=>{
        
            state.error=null;
        
        },
    }
)