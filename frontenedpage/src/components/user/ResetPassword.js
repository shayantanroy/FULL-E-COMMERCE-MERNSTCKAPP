import React, { Fragment, useState, useEffect } from "react";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { clearErrors} from "../../reduximplement/actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../MetaData";
import styled from "styled-components";
import Loder from "../layout/Loder";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../reduximplement/actions/UserAction";





const ResetPassword = () => {
  const {token}=useParams();
  let navigate=useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loding } = useSelector(
    (state) => state.forgetuser
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("password", password);
    // myForm.set("confirmPassword", confirmPassword);

    // dispatch(resetPassword(token, myForm));
    dispatch(resetPassword(token,password,confirmPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/loginsignup")
      // history.push("/login");
    }
  }, [dispatch, error, alert, success]);

  return (
    <Fragment>
      {loding ? (
        <Loder />
      ) : (
        <Fragment>
          <Div>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
          </Div>
        </Fragment>
        
      )}
    </Fragment>
  );
};
export default ResetPassword

const Div=styled.div`
.resetPasswordContainer {
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

.resetPasswordBox {
  background-color: white;
  width: 25vw;
  height: 70vh;
  box-sizing: border-box;
  overflow: hidden;
}

.resetPasswordHeading {
  text-align: center;
  color: rgba(0, 0, 0, 0.664);
  font: 400 1.3vmax "Roboto";
  padding: 1.3vmax;
  border-bottom: 1px solid rgba(0, 0, 0, 0.205);
  width: 50%;
  margin: auto;
}

.resetPasswordForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 2vmax;
  justify-content: space-evenly;
  height: 70%;
  transition: all 0.5s;
}

.resetPasswordForm > div {
  display: flex;
  width: 100%;
  align-items: center;
}

.resetPasswordForm > div > input {
  padding: 1vmax 4vmax;
  padding-right: 1vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font: 300 0.9vmax cursive;
  outline: none;
}

.resetPasswordForm > div > svg {
  position: absolute;
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
}

.resetPasswordBtn {
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

.resetPasswordBtn:hover {
  background-color: rgb(179, 66, 46);
}

@media screen and (max-width: 600px) {
  .resetPasswordContainer {
    background-color: white;
  }
  .resetPasswordBox {
    width: 100vw;
    height: 95vh;
  }

  .resetPasswordForm {
    padding: 5vmax;
  }

  .resetPasswordForm > div > input {
    padding: 2.5vmax 5vmax;
    font: 300 1.7vmax cursive;
  }

  .resetPasswordForm > div > svg {
    font-size: 2.8vmax;
  }

  .resetPasswordBtn {
    font: 300 1.9vmax "Roboto";
    padding: 1.8vmax;
  }
}

`
  