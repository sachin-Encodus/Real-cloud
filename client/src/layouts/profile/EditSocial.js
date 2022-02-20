import { Card, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import TextField from "@mui/material/TextField";
import Socialdata from "./data/Socialdata";
import Stack from "@mui/material/Stack";
import axios from "axios";
import SuiButton from "components/SuiButton";
import { useSoftUIController } from "context";
const EditSocial = () => {
  const [formData, setFormData] = useState(Socialdata);
  const [controller, dispatch] = useSoftUIController();
  const { authUser } = controller;
  console.log("authUser ", authUser);
  useEffect(() => {
    if (authUser) {
      if (authUser.socials.length === 0){
        console.log("nothing");
      }else{
        setFormData(authUser.socials);
      }
        
   
    }
    console.log("==============xxxxxxxxxxx",authUser.socials.length);
  }, [authUser]);

  const UpdateSocial = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put("/api/update-social", {
        formData,
      });
      console.log(res);
      dispatch({ type: "AUTH_USER", value: res.data.user });
    } catch (error) {
      console.log(error);
    }
  };

  // const [formData, setFormData] = useState([
  //   {
  //     links: "",
  //     image: "https://image.flaticon.com/icons/png/128/733/733585.png",
  //     name: "Whatsapp",
  //   },
  //   {
  //     links: "",
  //     image: "https://image.flaticon.com/icons/png/128/733/733558.png",
  //     name: "Instagram",
  //   },
  //   // {
  //   //   name: {
  //   //     whatsapp: {
  //   //       links: "",
  //   //       image: "https://image.flaticon.com/icons/png/128/733/733585.png",
  //   //       name: "Whatsapp",
  //   //     },
  //   //   },
  //   // },
  //   // {
  //   //   name: {
  //   //     instagram: {
  //   //       links: "",
  //   //       image: "https://image.flaticon.com/icons/png/128/733/733558.png",
  //   //       name: "Instagram",
  //   //     },
  //   //   },
  //   // },
  //   // instagram: {
  //   //   links: "",
  //   //   image: "https://image.flaticon.com/icons/png/128/733/733558.png",
  //   //   name: "Instagram",
  //   // },
  //   // facebook: {
  //   //   links: "",
  //   //   image: "https://image.flaticon.com/icons/png/128/733/733547.png",
  //   //   name: "Facebook",
  //   // },
  //   // twitter: {
  //   //   links: "",
  //   //   image: "https://image.flaticon.com/icons/png/128/733/733579.png",
  //   //   name: "Twitter",
  //   // },
  //   // snapchat: {
  //   //   links: "",
  //   //   image: "https://image.flaticon.com/icons/png/128/1409/1409941.png",
  //   //   name: "Snapchat",
  //   // },
  //   // linkedin: {
  //   //   links: "",
  //   //   image: "https://image.flaticon.com/icons/png/128/174/174857.png",
  //   //   name: "Linkedin",
  //   // },
  //   // github: {
  //   //   links: "",
  //   //   image: "https://image.flaticon.com/icons/png/128/733/733609.png",
  //   //   name: "Github",
  //   // },
  //   // },
  // ]);

  // const [whatsapp, instagram, facebook, twitter, snapchat, linkedin, github] = formData;

  // const handleChange = (index) => (e) => {
  //   console.log(e.target.name);
  //   console.log(e.target.value);
  //   // setFormData({
  //   //   ...formData,
  //   //   [text]: {
  //   //     ...formData[text],
  //   //     [e.target.name]: e.target.value,
  //   //   },
  //   // });

  //   console.log("index: " + index);
  //   console.log("property name: " + e.target.name);
  //   let newArr = [...formData]; // copying the old datas array
  //   newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to

  //   setFormData(newArr);
  // };
  const updateFieldChanged = (text, index) => (e) => {
    let newArr = formData.map((item, i) => {
      if (index === i) {
        return { ...item, [text]: e.target.value };
      } else {
        return item;
      }
    });
    setFormData(newArr);
  };
  // console.log(
  //   "========xxxxxxx",
  //   whatsapp,
  //   instagram,
  //   facebook,
  //   twitter,
  //   snapchat,
  //   linkedin,
  //   github
  // );

  // const data = formData.map((curr) => {
  //   return curr;
  // });

  // console.log(data[0]);
  console.log(formData);
  return (
    <Card>
      <SuiBox component="form" onSubmit={UpdateSocial} role="form">
        <SuiBox pt={2} px={2} mb={5} mt={2}>
          <Stack spacing={2}>
            {formData &&
              formData.map(({ name, link, image }, index) => {
                return (
                  <>
                    <TextField
                      key={index}
                      autoComplete="fname"
                      name="link"
                      required
                      fullWidth
                      id={name}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img
                              src={image}
                              width={20}
                              height={20}
                              alt={name}
                            />
                          </InputAdornment>
                        ),
                      }}
                      label={name}
                      autoFocus
                      onChange={updateFieldChanged("link", index)}
                      value={link}
                    />
                  </>
                );
              })}
          </Stack>
          <SuiBox mt={2} mb={1}>
            <SuiButton variant="gradient" type={UpdateSocial} buttonColor="dark" fullWidth>
              Update
            </SuiButton>
          </SuiBox>
          {/* <h1>{whatsapp.name}</h1>
          <h1>{whatsapp.links}</h1>
          <img src={whatsapp.image} alt="whatsapp" /> */}

          <Grid container spacing={3}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="links"
                required
                fullWidth
                id="whatsapp"
                label="First Name"
                autoFocus
                onChange={handleChange("whatsapp")}
                value={whatsapp.links}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="links"
                required
                fullWidth
                id="instagram"
                label="First Name"
                autoFocus
                onChange={handleChange("instagram")}
                value={instagram.links}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="links"
                required
                fullWidth
                id="facebook"
                label="First Name"
                autoFocus
                onChange={handleChange("facebook")}
                value={facebook.links}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="links"
                required
                fullWidth
                id="twitter"
                label="First Name"
                autoFocus
                onChange={handleChange("twitter")}
                value={twitter.links}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="links"
                required
                fullWidth
                id="snapchat"
                label="First Name"
                autoFocus
                onChange={handleChange("snapchat")}
                value={snapchat.links}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="links"
                required
                fullWidth
                id="linkedin"
                label="First Name"
                autoFocus
                onChange={handleChange("linkedin")}
                value={linkedin.links}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="links"
                required
                fullWidth
                id="github"
                label="First Name"
                autoFocus
                onChange={handleChange("github")}
                value={github.links}
              />
            </Grid> */}
          </Grid>
          {/* <Grid item xs={12} sm={6}>
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
                id="pan"
                label="Pan Number"
                name="pan"
                autoComplete="pan"
                onChange={handleChange("pan")}
                value={pan}
              />
            </Grid>
          </Grid>
        </SuiBox> */}
          {/* <SuiBox pt={2} px={2} mb={2}>
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
            <SuiButton variant="gradient" type={onSubmits} buttonColor="dark" fullWidth>
              {textChange}
            </SuiButton>
          </SuiBox> */}
        </SuiBox>
      </SuiBox>
    </Card>
  );
};

export default EditSocial;
