import React,{useEffect, useState} from 'react'
import MetaData from './MetaData'
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import styled from 'styled-components';
import PhoneIcon from "@material-ui/icons/Phone";
import{Country ,State,City} from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
// import { useState } from 'react'
import { AddShippingInformation } from '../reduximplement/actions/CartAction';
// import { Shippinginformation } from '../reduximplement/actions/ShippingAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import CheckOut from './CheckOut';


const Shipping = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();




     const {shippingInfo}=useSelector(state=>state.cartitems);
      

     const [address, setAddress] = useState(shippingInfo.address);
     const [city, setCity] = useState(shippingInfo.city);
     const [state, setState] = useState(shippingInfo.state);
     const [country, setCountry] = useState(shippingInfo.country);
     const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
     const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
   



    const shippingSubmit = (e) => {
        e.preventDefault();
   
    
        if (phoneNo.length < 10 || phoneNo.length > 10) {
          alert.error("Phone Number should be 10 digits Long");
          return;
        }
        dispatch(AddShippingInformation(address,
              city,
              state,
              country,
              pinCode,
              phoneNo,));
     
        // dispatch({
        //   type: "addShippingInfo",
        //   payload: {
        //     address,
        //     city,
        //     state,
        //     country,
        //     pinCode,
        //     phoneNo,
        //   },
        // });
    
        localStorage.setItem(
          "shippingInfo",
          JSON.stringify({
            address,
            city,
            state,
            country,
            pinCode,
            phoneNo,
          })
        );
        navigate("/confrimorder");
      }
 
     
        // history.push("/order/confirm");


  return (


    <Div>
        <MetaData title="shipping Details"/>
        <CheckOut activeStep={0}/>
        
        <div className='shippingcontainer'>
            <h2>Shipping Details</h2>
            <div className='shippingbox'>
                <form className='shippingform'
                encType='multipart/form-data'
                onSubmit={shippingSubmit}
                >

          <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
            //   disabled={state ? false : true}
            />

                </form>
            </div>
        </div>


        
      
    </Div>
  )
}

export default Shipping
 const Div=styled.div`
//  height:100vh;
//  background:red;



.shippingcontainer{
    width: 100vw;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}
.shippingbox{
    // background:yellow;
    width:25vw;
    box-izing:border-box;
    height: 90vh;
overflow:hidden;


}
.shippingform{
    display:flex;
    flex-direction:column;
    margin:auto;
    align-items:center;
//  background:green;
 justify-content: space-evenly;
 height: 80%;
 position:relative;


 

}
.shippingform > div{
    display:flex;
    width:100%;
    align-items:center;
}
.shippingform > div > input,
.shippingform > div > select
{
    width:100%;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.267);
outline:none;
padding: 1vmax 4vmax;
padding-right: 1vmax;


}
.shippingform > div >svg{
    position:absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
}

.shippingBtn {
    border: none;
    background-color: tomato;
    color: white;
    font: 300 1vmax "Roboto";
    width: 100%;
    padding: 1vmax;
    cursor: pointer;
    transition: all 0.5s;
    outline: none;
    margin: 2vmax;
  }
  
  .shippingBtn:hover {
    background-color: rgb(179, 66, 46);
  }

 `
 
