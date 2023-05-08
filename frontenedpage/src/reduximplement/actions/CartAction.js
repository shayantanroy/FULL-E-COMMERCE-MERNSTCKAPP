import axios from "axios";

export const cartAdd=(id,quantity)=>async(dispatch)=>{
    // try{
       
        const {data}=await axios.get(`/api/v1/product/${id}`);
        dispatch({type:"cartaddsucc",
        payload:{
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            Stock: data.product.Stock,
          quantity,
        }
});
}

export const removeItemsFromCart=(id)=>async(dispatch)=>{
    dispatch({type:"removecatitems",
payload:id});
}






export const AddShippingInformation=(address, city, state, country, pinCode, phoneNo)=>async(dispatch)=>{
    dispatch({type:"addShippingInfo",
    payload:{address, city, state, country, pinCode, phoneNo}})

}