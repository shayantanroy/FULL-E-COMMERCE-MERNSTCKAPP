import React from 'react'
import { Fragment,useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { clearErrors, createProducts, resetMessage } from '../../reduximplement/actions/ProductActions';
import { useEffect } from 'react';

const AdminCreateProduct = () => {
    const{loding,error,success}=useSelector(state=>state.Admincreateproducts)
const dispatch=useDispatch();
const alert=useAlert()

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
      ];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price,setPrice ] = useState();
    const [Stock, setStock] = useState();
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

 
    // dispatch(createProduct(myForm));

  



    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
          
       
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };

    const forgotPasswordSubmit=(e)=>{

        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        dispatch(createProducts(myForm))
    }
    useEffect(()=>{
        if(success){
            alert.success("product created")
dispatch(resetMessage());
            // resetMessage();
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
    },[dispatch,success,error])
  return (
   <Div>
    <div className="forgotPasswordContainer ">
          <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Create A Product</h2>

            <form
              className="forgotPasswordForm"
              onSubmit={forgotPasswordSubmit}
            >
              <div className="forgotPasswordEmail">
             
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div><br></br>
              <div className="forgotPasswordEmail">
             
             <input
               type="text"
               placeholder="Description"
               required
               name="text"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
             />
           </div><br></br>
              <div className="forgotPasswordEmail">
             
             <input
               type="number"
               placeholder="Price"
               required
            //    readOnly
               name="number"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
             />
           </div><br></br>
           <div className="forgotPasswordEmail">
           <input
               type="number"
               placeholder="Stock"
               required
            //    readOnly
               name="number"
               value={Stock}
               onChange={(e) => setStock(e.target.value)}
             />
           </div><br></br>
           <div className="forgotPasswordEmail" >
           <select required onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories&&categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
           </div><br></br>
           <div id="forgotPasswordEmail">
           <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>
            <div className="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div><br></br><br></br>

              <input
                type="submit"
                value="Send"
                className="forgotPasswordBtn"
              />
            </form>
          </div>
        </div>
        </Div>

  )
}

export default AdminCreateProduct
const Div=styled.div`
.createProductFormImage {
    width: 100%;
    overflow: auto;
  }
  .createProductFormImage > img {
    width: 3vmax;
    margin: 0 0.5vmax;
  }
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
    height: 80vh;
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
  .forgotPasswordForm > div >select {
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax cursive;
    outline: none;
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
    .forgotPasswordForm > div >select {
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


