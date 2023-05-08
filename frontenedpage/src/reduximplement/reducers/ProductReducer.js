import { createReducer } from "@reduxjs/toolkit";


export const productReducer=createReducer(
    { products:[], product:{} },


    {
        getproductsRequest:(state,action)=>{
            state.loding=true;
        },
        getproductsSuccess:(state,action)=>{
            state.loding=false;
            state.products=action.payload.products;
            state.productsCount=action.payload.productsCount;
            state.resPerPage=action.payload.resPerPage;
            state.filteredProductsCount=action.payload.filteredProductsCount;
        },
        getproducstFail:(state,action)=>{
            state.loding=false;
            state.error=action.payload;
        },
        // get product details
        getproductRequest:(state,action)=>{
            state.loding=true;
        },
        getproductSuccess:(state,action)=>{
            state.loding=false;
            state.product=action.payload.product;
        },
        getproductFail:(state,action)=>{
            state.loding=false;
        },
    


    // export const newReviewReducer = createReducer({
    // },
        NEW_REVIEW_REQUEST:(state,action)=>{
            state.loding=true;
        },
        NEW_REVIEW_SUCCESS:(state,action)=>{
            state.loding=false;
            state.success=action.payload;
        },
        NEW_REVIEW_FAIL:(state,action)=>{
            state.loding=false;
        },



        clearError:(state,action)=>{
        
            state.error=null;
        
        },
        resetmessage:(state,action)=>{
          state.success=null;
        },

    },

    )


    export const newProductReducer =createReducer(
        {product:{},},
        {
            NEW_PRODUCT_REQUEST:(state,action)=>{
                state.loding=true;

            },
            NEW_PRODUCT_SUCCESS:(state,action)=>{
                state.loding=false;
                state.product=action.payload;
            }, NEW_PRODUCT_FAIL:(state,action)=>{
                state.loding=false;
                state.error=action.payload;
                
            },
            clearError:(state,action)=>{
        
                state.error=null;
            
            },
            resetmessage:(state,action)=>{
              state.message=null;
            },
        }
    )


    export const adminProducts=createReducer(
        {productss:[],
    },
    {
        GetproductRequest:(state,action)=>{
            state.loding=true;
        },
        GetproductSuccess:(state,action)=>{
            state.loding=false;
            state.productss=action.payload.products;
        },
        GetproductFail:(state,action)=>{
            state.loding=false;
            state.error=action.payload;
        },
    })


    export const createproducts=createReducer(
      {}  ,
     {
        createreq:(state,action)=>{
            state.loding=true;


        },
        createsuc:(state,action)=>{
            state.loding=false;
            state.success=action.payload;
            
        },
        createfail:(state,action)=>{
            state.loding=false;
            state.error=action.payload;
            
        },
        
        clearError:(state,action)=>{
        
            state.error=null;
        
        },
        resetmessage:(state,action)=>{
          state.success=null;
        },
  

    })


    export const productupdate=createReducer(
        {},
        {
            proupdatereq:(state,action)=>{
                state.loding=true;
            },
            proupdatesuc:(state,action)=>{
                state.loding=false;
                state.proupdate=action.payload.succes;
            },
            proupdatefail:(state,action)=>{
                state.loding=false;
                state.error=action.payload;
            },
            clearError:(state,action)=>{
        
                state.error=null;
            
            },
            resetmessage:(state,action)=>{
              state.success=null;
            },

        }
    )
    
