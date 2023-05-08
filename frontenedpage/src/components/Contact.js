import React from "react";
import styled from "styled-components";

const Contact = () => {
  return (
    <ContactContainer>
      <a class="mailBtn" href="mailto:mymailforabhi@gmail.com">
        <button>Contact: mymailforabhi@gmail.com</button>
      </a>
    </ContactContainer>
  );
};

export default Contact;
// const Div=styled.div``
// const Button=styled.button`
// padding:10px 22px;
// margin-top:25px;
// border-radius:50px;
// font-weight:700;
// border:none;
// cursor:pointer;
// &:hover{
//   transition:0.8s;
//   color:black;
//   background:red;
// }`
const ContactContainer =styled.div`
    height: 100vh;
    width: 100vw;
    max-width: 100%;
    display: grid;
    place-items: center;
    background-color: white;
    position: fixed;
  
  
  .mailBtn {
    text-decoration: none;
    transform: translateX(-100vw);
    animation: mailBtnAnimation 2s forwards;
  }
  
  .mailBtn > button {
    text-decoration: none;
    font: 200 2vmax "Roboto";
    cursor: url("https://img.icons8.com/color/48/000000/edit--v2.png"), pointer;
    padding: 2vmax;
  }
  
  @keyframes mailBtnAnimation {
    to {
      transform: translateX(0);
    }
  }
  `