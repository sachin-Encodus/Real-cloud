/**
=========================================================
* Soft UI Dashboard Material-UI - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @material-ui core components
import Switch from "@material-ui/core/Switch";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import SuiButton from "components/SuiButton";
import TextField from "@mui/material/TextField";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { useSoftUIController } from "context";
// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";

function SignIn() {
  const [controller, dispatch] = useSoftUIController();
  const { authUser } = controller;
  const history = useHistory();
  const [withPassword, setWithPassword] = useState(false);
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState(false);
  const handleSetRememberMe = () => setWithPassword(!withPassword);

  const login = async () => {
    try {
      const res = await axios.post("/api/loginotp", {
        number,
      });
      console.log(res);
      setOpen(true);
    } catch (error) {
      toast.dark(error.response.data.errors);
    }
  };

  const UserRegister = () => {
    axios
      .post("/api/verify", {
        number,
        otp,
      })
      .then(({ data }) => {
        dispatch({ type: "AUTH_USER", value: data.user });
        console.log("data", data.user);
        history.replace("/");
      })
      .catch((err) => {
        toast.dark(err.response.data.errors);
      });
  };

  const SigninWithPassward = () => {
    console.log("password");
    axios
      .post("/api/signin", {
        number,
        password,
      })
      .then(({ data }) => {
        dispatch({ type: "AUTH_USER", value: data.user });
        console.log("data", data.user);
        history.replace("/");
      })
      .catch((err) => {
        toast.dark(err.response.data.errors);
      });
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <ToastContainer />
      {open ? (
        <div>
          <SuiBox mb={2}>
            <TextField
              autoFocus
              autoComplete
              fullWidth
              type="number"
              label="Otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              id="fullWidth"
            />
          </SuiBox>
          <SuiBox mt={4} mb={1}>
            <SuiButton
              variant="gradient"
              onClick={UserRegister}
              buttonColor="dark"
              fullWidth
            >
              Submit
            </SuiButton>
          </SuiBox>
        </div>
      ) : (
        <SuiBox component="form" role="form">
          <SuiBox mb={2}>
            {/* <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Mobile
            </SuiTypography>
          </SuiBox> */}
            {/* <SuiInput type="email" placeholder="Email" /> */}
            <TextField
              fullWidth
              label="Mobile"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              id="fullWidth"
            />
          </SuiBox>
          {withPassword ? (
            <SuiBox mb={2}>
              <TextField
                fullWidth
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="fullWidth"
              />
            </SuiBox>
          ) : null}

          {/* <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SuiTypography>
          </SuiBox>
          <TextField fullWidth label="fullWidth" id="fullWidth" />
        </SuiBox> */}
          {/* <SuiBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SuiTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            customClass="cursor-pointer user-select-none"
          >
            &nbsp;&nbsp;Remember me
          </SuiTypography>
        </SuiBox> */}
          <Link to="#" onClick={handleSetRememberMe}>
            {withPassword ? "Login with OTP" : "Login with Password !"}
          </Link>
          <SuiBox mt={4} mb={1}>
            <SuiButton
              onClick={() => {
                withPassword ? SigninWithPassward() : login();
              }}
              variant="gradient"
              buttonColor="info"
              fullWidth
            >
              sign in
            </SuiButton>
          </SuiBox>
          <SuiBox mt={3} textAlign="center">
            <SuiTypography
              variant="button"
              textColor="text"
              fontWeight="regular"
            >
              Don&apos;t have an account?{" "}
              <SuiTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                textColor="info"
                fontWeight="medium"
                textGradient
              >
                Sign up
              </SuiTypography>
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      )}
    </CoverLayout>
  );
}

export default SignIn;
