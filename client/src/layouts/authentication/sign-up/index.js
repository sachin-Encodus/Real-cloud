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
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import TextField from "@mui/material/TextField";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import { ToastContainer, toast } from "react-toastify";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import axios from "axios";

function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState(false);

  const handleSetAgremment = () => setAgremment(!agreement);
  const submit = (e) => {
    e.preventDefault();
    axios
      .post("/api/registerotp", {
        number,
      })
      .then((data) => setOpen(true))
      .catch((err) => {
        console.log(err.response.data.err);
        toast.dark(err.response.data.errors);
      });
  };

  const UserRegister = () => {
    axios
      .post("/api/signup", {
        name,
        email,
        number,
        otp,
        password,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  return (
    <BasicLayout>
      <ToastContainer />
      <SuiBox p={3} mb={1} textAlign="center">
        <SuiTypography variant="h5" fontWeight="medium">
          Register with
        </SuiTypography>
      </SuiBox>
      <SuiBox mb={2}>
        <Socials />
      </SuiBox>
      <Separator />
      <SuiBox pt={2} pb={3} px={3}>
        {open ? (
          <div>
            <SuiBox mb={2}>
              <TextField
                fullWidth
                autoFocus
                autoComplete="number"
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
          <SuiBox component="form" onSubmit={submit} role="form">
            <SuiBox mb={2}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="fullWidth"
              />
            </SuiBox>
            <SuiBox mb={2}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="fullWidth"
              />
            </SuiBox>
            <SuiBox mb={2}>
              <TextField
                fullWidth
                label="Mobile"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                id="fullWidth"
              />
            </SuiBox>
            <SuiBox mb={2}>
              <TextField
                fullWidth
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="fullWidth"
              />
            </SuiBox>

            <SuiBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                customClass="cursor-pointer user-select-none"
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SuiTypography>
              <SuiTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton
                type={submit}
                variant="gradient"
                buttonColor="info"
                fullWidth
              >
                sign up
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography
                variant="button"
                textColor="text"
                fontWeight="regular"
              >
                Already have an account?&nbsp;
                <SuiTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  textColor="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        )}
      </SuiBox>
    </BasicLayout>
  );
}

export default SignUp;
