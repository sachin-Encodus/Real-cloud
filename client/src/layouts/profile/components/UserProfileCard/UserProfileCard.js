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
import Social from "../../Social";

import { useSoftUIController } from "context";
// import ProfileHeader from "./components/ProfileHeader";
import Divider from "@material-ui/core/Divider";

import QRCode from "qrcode";

function UserProfileCard({ user }) {
  //   const [controller, dispatch] = useSoftUIController();
  //   const { authUser } = controller;

  const [url, setUrl] = useState("");

  useEffect(() => {
    // if (authUser) {
    //   setData(authUser);

    // }
    if (user) {
      QRCode.toDataURL(
        "https://real-cloud.herokuapp.com/userProfile/" + user._id
      ).then((data) => {
        setUrl(data);
      });
    }
  }, [user]);

  return (
    // <DashboardLayout>
    //   <ProfileHeader authUser={authUser} />

    <SuiBox mt={5} mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={6}>
          <Card>
            <SuiBox pt={2} px={2}>
              <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Profile settings
              </SuiTypography>
            </SuiBox>

            <SuiBox pt={2} px={2}>
              <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Name : {user && user.name}
              </SuiTypography>
              <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Email : {user && user.email}
              </SuiTypography>
              <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Username : {user && user.username}
              </SuiTypography>
              <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                User_id :{}
              </SuiTypography>
            </SuiBox>
            <SuiBox p={2}>
              <SuiBox mb={2} lineHeight={1.5}>
                <SuiTypography variant="button" textColor="text" fontWeight="regular">
                  description
                </SuiTypography>
              </SuiBox>
              <SuiBox opacity={0.3}>
                <Divider />
              </SuiBox>
              <SuiBox>
                <SuiTypography variant="button" textColor="text" fontWeight="regular">
                  name:
                </SuiTypography>

                <SuiBox style={{ justifyContent: "center" }} display="flex" py={1} pr={2}>
                  {url ? (
                    <img src={url} alt="qr" style={{ width: 150, height: 150 }} />
                  ) : (
                    "...Loading"
                  )}
                </SuiBox>
              </SuiBox>
            </SuiBox>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} xl={6}>
          <Social />
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

export default UserProfileCard;
