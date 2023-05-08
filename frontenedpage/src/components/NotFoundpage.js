import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
// import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
const NotFoundpage = () => {
    return (
        <Div>
        <div className="PageNotFound">
          <ErrorIcon />
    
          <Typography>Page Not Found </Typography>
          <Link to="/">Home</Link>
        </div>
        </Div>
      );
    };

export default NotFoundpage
const Div=styled.div`
.PageNotFound {
    margin: auto;
    text-align: center;
    padding: 10vmax;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .PageNotFound > svg {
    font-size: 7vmax;
    color: tomato;
  }
  .PageNotFound > p {
    font-size: 2vmax;
  }
  .PageNotFound > a {
    background-color: rgb(51, 51, 51);
    color: white;
    border: none;
    padding: 1vmax 3vmax;
    cursor: pointer;
    font: 400 1vmax "Roboto";
    text-decoration: none;
    margin: 2vmax;
  }
  
  @media screen and (max-width: 600px) {
    .PageNotFound > a {
      padding: 3vw 6vw;
      font: 400 4vw "Roboto";
      margin: 2vmax;
    }
  
    .PageNotFound > svg {
      font-size: 20vw;
    }
    .PageNotFound > p {
      margin: 2vmax;
      font-size: 5vw;
    }
  }`
