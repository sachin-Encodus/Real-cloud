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

// @material-ui core components
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

// @material-ui icons
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard Material-UI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Overview page components

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import TextField from "@mui/material/TextField";
import Social from "../profile/Social";
import { useSoftUIController } from "context";
import ProfileHeader from "./components/ProfileHeader";
import EditSocial from "./EditSocial";
import SuiAvatar from "components/SuiAvatar";
import { Backdrop, CircularProgress } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
function EditProfile() {
  const [controller, dispatch] = useSoftUIController();
  const { authUser } = controller;
  const [loading, setloading] = useState(false);
  console.log("authUser ", authUser);
  // setTimeout(() => {
  //   socket.emit("confirmed", value);
  // }, 9000);
  useEffect(() => {
    axios
      .get("https://randomuser.me/api/")
      .then((data) => {
        console.log("randomuser", data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [formData, setFormData] = useState({
    profilepic: authUser?.profilepic,
    username: "",
    password: "",
    email: "",
    name: "",
    adhaar: "",
    pan: "",
    bio: "",
    number: "",
    dob: "",
    alt_number: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    textChange: "Update",
  });

  useEffect(() => {
    if (authUser) {
      setFormData({
        ...formData,
        //  email: '',
        email: authUser.email,
        name: authUser.name,
        username: authUser.username,

        adhaar: authUser.adhaar,
        pan: authUser.pan,
        bio: authUser.bio,
        number: authUser.number,
        dob: authUser.dob,
        alt_number: authUser.alt_number,
        country: authUser.country,
        state: authUser.state,
        city: authUser.city,
        pincode: authUser.pincode,
        address: authUser.address,
      });
    }
  }, [authUser]);

  const {
    profilepic,
    email,
    name,
    username,
    password,
    adhaar,
    pan,
    bio,
    number,
    dob,
    alt_number,
    country,
    state,
    city,
    pincode,
    address,
    textChange,
  } = formData;
  console.log(
    email,
    name,
    adhaar,
    pan,
    bio,
    number,
    dob,
    alt_number,
    country,
    state,
    city,
    pincode,
    address
  );
  const handleChange = (text) => (e) => {
    setFormData({
      ...formData,
      [text]: e.target.value,
    });
  };

  const onSubmits = (event) => {
    event.preventDefault();
    console.log("hello world");
    setFormData({ ...formData, textChange: "Updating" });

    axios
      .put(`/api/user-update`, {
        profilepic,
        email,
        name,
        adhaar,
        username,
        password,
        pan,
        bio,
        number,
        dob,
        alt_number,
        country,
        state,
        city,
        pincode,
        address,
      })
      .then((res) => {
        setFormData({
          ...formData,
          //  email: '',
          email: "",
          name: "",
          adhaar: "",
          username: "",
          password: "",
          pan: "",
          bio: "",
          number: "",
          dob: "",
          alt_number: "",
          country: "",
          state: "",
          city: "",
          pincode: "",
          address: "",
          textChange: "Updated",
        });
        dispatch({ type: "AUTH_USER", value: res.data.user });
        console.log("nnnnnnnnnnnnn", res);
      })
      .catch((err) => {
        setFormData({
          ...formData,
          //  email: '',
          email: "",
          name: "",
          adhaar: "",
          pan: "",
          bio: "",
          number: "",
          dob: "",
          alt_number: "",
          country: "",
          state: "",
          city: "",
          pincode: "",
          address: "",
          textChange: "Failed",
        });
        console.log(err.response.data.errors);
      });
  };

  const updateProfilepic = (e) => {
    const files = e.target.files;
    const imagedata = new FormData();
    setloading(true);
    imagedata.append("file", files[0]);
    imagedata.append("upload_preset", "tiklma54");

    imagedata.append("upload_preset", "tiklma54");
    fetch("  https://api.cloudinary.com/v1_1/realback/image/upload", {
      method: "post",
      body: imagedata,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.url);
        setFormData({ ...formData, profilepic: data.url });
        setloading(false);
      })
      .catch((err) => console.log(err));

    // const reader = new FileReader();
    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setAdhaarImg(reader.result);
    //   }
    // };
    // reader.readAsDataURL(e.target.files[0]);
    // console.log(reader);
  };

  return (
    // <DashboardLayout>
    //   <ProfileHeader authUser={authUser} />

    <SuiBox mt={5} mb={3}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={6}>
          <Card>
            <SuiBox pt={2} px={2}>
              <SuiTypography
                variant="h6"
                fontWeight="medium"
                textTransform="capitalize"
              >
                Profile settings
              </SuiTypography>
              <SuiBox
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SuiBox>
                  <label htmlFor="upload">
                    <SuiAvatar
                      src={profilepic}
                      alt="profile-image"
                      size="xl"
                      customClass="shadow-sm"
                    />
                    <SuiBox
                      style={{
                        position: "relative",
                        top: -30,
                        left: 60,
                        color: " #666666",
                      }}
                    >
                      <PhotoCameraIcon fontSize="medium" />
                    </SuiBox>
                  </label>

                  <input
                    style={{ display: "none" }}
                    id="upload"
                    accept="image/*"
                    type="file"
                    onChange={updateProfilepic}
                  />
                </SuiBox>
              </SuiBox>
            </SuiBox>
            <SuiBox component="form" onSubmit={onSubmits} role="form">
              <SuiBox pt={2} px={2} mb={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={handleChange("name")}
                      value={name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="bio"
                      label="Bio"
                      name="bio"
                      autoComplete="bio"
                      onChange={handleChange("bio")}
                      value={bio}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="adhaar"
                      name="adhaar"
                      required
                      fullWidth
                      id="adhaar"
                      label="Adhaar number"
                      autoFocus
                      onChange={handleChange("adhaar")}
                      value={adhaar}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      onChange={handleChange("username")}
                      value={username}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="password"
                      name="password"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      autoFocus
                      type="password"
                      onChange={handleChange("password")}
                      value={password}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="pan"
                      label="Pan Number"
                      name="pan"
                      autoComplete="pan"
                      onChange={handleChange("pan")}
                      value={pan}
                    />
                  </Grid>
                </Grid>
              </SuiBox>
              <SuiBox pt={2} px={2} mb={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="DOB"
                      name="dob"
                      required
                      fullWidth
                      id="dob"
                      label="DOB"
                      autoFocus
                      onChange={handleChange("dob")}
                      value={dob}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="altnumber"
                      label="Alt Number"
                      name="altnumber"
                      autoComplete="number"
                      onChange={handleChange("alt_number")}
                      value={alt_number}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="Number"
                      required
                      fullWidth
                      id="Number"
                      label="Mobile No."
                      autoFocus
                      onChange={handleChange("number")}
                      value={number}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange("email")}
                      value={email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="city"
                      name="city"
                      required
                      fullWidth
                      id="city"
                      label="city"
                      autoFocus
                      onChange={handleChange("city")}
                      value={city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="pincode"
                      label="pincode"
                      name="pincode"
                      autoComplete="pincode"
                      onChange={handleChange("pincode")}
                      value={pincode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="country"
                      name="country"
                      required
                      fullWidth
                      id="country"
                      label="country"
                      autoFocus
                      onChange={handleChange("country")}
                      value={country}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="state"
                      label="state"
                      name="state"
                      autoComplete="state"
                      onChange={handleChange("state")}
                      value={state}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      label="address"
                      name="address"
                      autoComplete="address"
                      onChange={handleChange("address")}
                      value={address}
                    />
                  </Grid>
                </Grid>

                <SuiBox mt={4} mb={1}>
                  <SuiButton
                    variant="gradient"
                    type={onSubmits}
                    buttonColor="dark"
                    fullWidth
                  >
                    {textChange}
                  </SuiButton>
                </SuiBox>
              </SuiBox>
            </SuiBox>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} xl={6}>
          <EditSocial />
        </Grid>

        {/* <Grid item xs={12} xl={4}>
            <ProfilesList title="conversations" profiles={profilesListData} />
          </Grid> */}
      </Grid>
    </SuiBox>

    //   {/* <Footer />
    // </DashboardLayout> */}
  );
}

export default EditProfile;
