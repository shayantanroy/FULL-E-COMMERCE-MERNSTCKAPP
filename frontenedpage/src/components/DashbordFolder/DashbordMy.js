
import styled from 'styled-components';
import React, { useEffect } from "react";

import Sidebar from './Sidebar.js';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import MetaData from '../MetaData';
import { adminproducts } from '../../reduximplement/actions/ProductActions';
import Loder from '../layout/Loder';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import{Doughnut} from'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { adminorders } from '../../reduximplement/actions/OrderAction.js';
import { UsersAll } from '../../reduximplement/actions/UserAction.js';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
    );







const DashbordMy = () => {
    const dispatch = useDispatch();
    const {loding,error,productss}=useSelector((state)=>state.AdminProducts);

    const {orderss}=useSelector(state=>state.adminorders)
  
    const { userss } = useSelector((state) => state.adminusers);
  
    let outOfStock = 0;
  
    productss &&
      productss.forEach((item) => {
        if (item.Stock === 0) {
          outOfStock += 1;
        }
      });
  
    useEffect(() => {
      dispatch(adminorders());
      dispatch(adminproducts());
      dispatch(UsersAll());
    
    // //   dispatch(getAllUsers());
    }, [dispatch]);
  
    let totalAmount = 0;
    orderss &&
      orderss.forEach((item) => {
        totalAmount += item.totalPrice;
      });
  
  
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
          },
        ],
      };
    
  
    const doughnutState = {
      labels: ["Out of Stock", "InStock"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [outOfStock, productss.length - outOfStock],
        },
      ],
    };
  
    return (
        <Div>
            {loding?
            <Loder/>
        :(

      <div className="dashboard">
        <MetaData title="Dashboard - Admin Panel" />
        <Sidebar />
  
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
  
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ₹{totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/adminproducts">
                <p>Product</p>
                <p>{productss && productss.length}</p>
              </Link>
              <Link to="/adminorders">
                <p>Orders</p>
                <p>{orderss && orderss.length}</p>
              </Link>
              <Link to="/adminusers">
                <p>Users</p>
                <p>{userss && userss.length}</p>
              </Link>
            </div>
          </div>
          
        {/* <div className="lineChart">
          <Line data={lineState} />
        </div> */}
          <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
       
        </div>
      </div>
     )} 
      </Div>
    );
  };

export default DashbordMy
const Div=styled.div`
.dashboard {
    width: 100vw;
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 5fr;
    // position: absolute;
  }
  
  .dashboardContainer {
    border-left: 1px solid rgba(0, 0, 0, 0.13);
    background-color: rgb(255, 255, 255);
    padding: 3rem 0;
  }
  
  .dashboardContainer > h1 {
    color: rgba(0, 0, 0, 0.733);
    font: 300 2rem "Roboto";
    text-align: center;
    width: 50%;
    padding: 1.5rem;
    margin: auto;
  }
  
  .dashboardSummary {
    margin: 2rem 0;
  }
  
  .dashboardSummary > div {
    display: flex;
    background-color: white;
    justify-content: center;
  }
  .dashboardSummary > div > p {
    background-color: rgba(70, 117, 218, 0.932);
    color: white;
    font: 300 1.3rem "Roboto";
    text-align: center;
    padding: 1.5rem;
    width: 100%;
    margin: 0 2rem;
  }
  .dashboardSummaryBox2 > a {
    color: rgb(0, 0, 0);
    font: 300 2rem "Roboto";
    text-align: center;
    background-color: rgb(255, 233, 174);
    text-decoration: none;
    padding: 1.5rem;
    width: 10vmax;
    height: 10vmax;
    margin: 2rem;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .dashboardSummaryBox2 > a:first-child {
    background-color: rgb(255, 110, 110);
    color: rgb(255, 255, 255);
  }
  
  .dashboardSummaryBox2 > a:last-child {
    background-color: rgb(51, 51, 51);
    color: rgb(255, 255, 255);
  }
  
  .lineChart {
    width: 80%;
    margin: auto;
  }
  
  .doughnutChart {
    width: 30vmax;
    margin: auto;
  }
  
  @media screen and (max-width: 600px) {
    .dashboard {
      grid-template-columns: 1fr;
    }
  
    .dashboardContainer {
      border-left: none;
    }
  
    .dashboardSummary > div > p {
      margin: 0;
    }
  
    .dashboardSummaryBox2 > a {
      padding: 0.5rem;
      margin: 1rem;
      font: 300 0.9rem "Roboto";
    }
  }`