import axios from "axios";


export const getproducts=(keyword="",currentPage=1,price=[0,200000000],category,ratings=0)=>async(dispatch)=>{
    try{
        dispatch({type:"getproductsRequest"});
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratings}`;

        if (category) {
          link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${ratings}`;
        }
        // const {data}=await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`)
        const { data } = await axios.get(link);
        dispatch({
            type:"getproductsSuccess",
            payload:data
        });
    }catch(error){
        dispatch({type:"getproductsFail",
        payload:error.response.data.message,
    });
    }
}




// create product
export const createProducts=(userdata)=>async(dispatch)=>{
try{
  dispatch({type:"createreq"})
  const config={headers:{"content-Type":"multipart/from-data"}};
  const{data}=await axios.post(`/api/v1/product/new`,userdata,config)
  dispatch({type:"createsuc",payload:data.success})

}catch(error){
  dispatch({type:"createfail",
  payload:error.response.data.message})

}
}




// get product details
export const getproduct=(id)=>async(dispatch)=>{
    try{
        dispatch({type:"getproductRequest"});
        const {data}=await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type:"getproductSuccess",
        payload:data
    });

    }catch(error){
        dispatch({type:"getproductFail",
        payload:error.response.data.message,
    });
    }
}



// new review create

export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type:"NEW_REVIEW_REQUEST"});
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
  
      dispatch({
        type:"NEW_REVIEW_SUCCESS",
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type:"NEW_REVIEW_FAIL",
        payload: error.response.data.message,
      });
    }
  };




  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: 'clearError' });
  };

  
export const resetMessage=()=>async(dispatch)=>{
    dispatch({type:"resetmessage"})

}



export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: "NEW_PRODUCT_REQUEST" });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/admin/product/new`,
        productData,
        config
      );
  
      dispatch({
        type:"NEW_PRODUCT_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "NEW_PRODUCT_FAIL",
        payload: error.response.data.message,
      });
    }
  };
  export const adminproducts=()=>async(dispatch)=>{
    try{
        dispatch({type:"GetproductRequest"});
        const {data}=await axios.get('/api/v1/admin/products');
        dispatch({
            type:"GetproductSuccess",
        payload:data
    });

    }catch(error){
        dispatch({type:"GetproductFail",
        payload:error.response.data.message,
    });
    }

  }




  export const UpdateProduct=(id,userdata)=>async(dispatch)=>{
    try{
      dispatch({type:"proupdatereq"})
      const config={headers:{"content-Type":"multipart/from-data"}};   
        const {data}=await axios.put(`/api/v1/product/${id}`,userdata,config);
      
      dispatch({type:"proupdatesuc",payload:data})

    }catch(error){
      dispatch({type:"proupdatefail",payload:error.response.data.message})
    }
  }