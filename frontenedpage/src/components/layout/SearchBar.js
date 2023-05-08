import React, {useState}from 'react'
import styled from 'styled-components';
import MetaData from '../MetaData'
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
    const [keyword, setKeyword] = useState("");
    let navigate = useNavigate();

    const searchSubmitHandler = (e) => {
      e.preventDefault();
 
    // navigate(keyword.trim() ? (`/products/${keyword}`):( "/products"));
    // };
    if(keyword.trim()){
        navigate(`/products/${keyword}`);
    }else{
        navigate("/products")
    }
};
  return (
    <Div>
        <MetaData title="Search a product--Agro-farmer"/>
      <form onSubmit={searchSubmitHandler} >
        <input className='A' type="text" placeholder="search a product"
        // value={keyword}
        onChange={(e)=>setKeyword(e.target.value)} />
        <input className='B' type="submit" value="Search" />
      </form>
    </Div>

  )
}

export default SearchBar
const Div=styled.div`
form{
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(231, 231, 231);
    // position:fixed;
    // top: 0%;
    // left: 0;
}
 .A{
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.274);
    background-color: white;
    border: none;
    color: rgba(0, 0, 0, 0.637);
    padding: 1vmax 2vmax;
    width: 50%;
    outline: none;
    border-radius: 0%;
    font: 300 1.1vmax cursive;
    box-sizing: border-box;
    height: 8%;
  
 }
 .B{
   
    height: 8%;
    border-radius: 0%;
    background-color: tomato;
    border: none;
    padding: 1vmax;
    width: 10%;
    font: 300 1.1vmax "Roboto";
    cursor: pointer;
    color: white;
    transition: all 0.5s;
    &:hover{
        background-color: rgb(55, 97, 214);
        
 
    }
 
}`
