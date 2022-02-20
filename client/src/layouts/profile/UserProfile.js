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

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard Material-UI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import SuiButton from "components/SuiButton";
import { useSoftUIController } from "context";
import FollowersTabs from "layouts/followers/FollowersTabs";
import UserProfileCard from "./components/UserProfileCard/UserProfileCard";
import BottomTabs from "examples/BottomTabs/BottomTabs";

function UserProfile() {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [controller, dispatch] = useSoftUIController();
  const { authUser } = controller;
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [toggle, setToggle] = useState(false);
const [CurrentChat, setCurrentChat] = useState(null);
  // console.log(authUser.following.includes(user._id));
  useEffect(() => {
    if (authUser) {
      setFollowed(authUser.following.includes(user._id));
    }
    if (authUser && authUser._id === user._id) {
      history.push("/profile");
    }
  }, [authUser, user]);




  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/search-user/" + id)
      .then(({ data }) => {
        // console.log(":::::::::::", data.FollowerList);
        setFollowers(data.FollowerList);
        setFollowing(data.FollowingList);
        setUser(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, authUser]);

// useEffect(() => {
// const fetchCoversation = async()=>{
//    try {
//      const res = await axios.get(`/api/conversations/find/${authUser?._id}/${id}`);
//     //  setCurrentChat(res.data);
//      console.log("chatid",res.data);
//    } catch (err) {
//      console.log(err);
//    }
// }
// fetchCoversation()
// }, [authUser,id])

// const handleClick = () =>{
//    axios
//      .post("/api/conversations", {
//        senderId: authUser._id,
//        receiverId: id,
//      })
//      .then(({ data }) => {
//        console.log(data);
//      })
//      .catch((err) => {
//        console.log(err);
//      });
// }

  // const handleClick = async (user) => {
   
  // };

  console.log("::::::::", followers);
  const handlfollowers = async () => {
    if (followed) {
      try {
        const res = await axios.put("/api/unfollow-user/" + id);
        console.log("unfollow user", res);
        dispatch({ type: "AUTH_USER", value: res.data });
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        const res = await axios.put("/api/follow-user/" + id);
        console.log("follow user", res);
        dispatch({ type: "AUTH_USER", value: res.data });
      } catch (error) {
        console.log("error", error);
      }
    }
  };
// console.log("currentchat",CurrentChat);
  // const followUser = async () => {
  //   try {
  //     const res = await axios.put("/api/follow-user/" + id);
  //     console.log("follow user", res);
  //     dispatch({ type: "AUTH_USER", value: res.data });
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  // const unfollowUser = async () => {
  //   try {
  //     const res = await axios.put("/api/unfollow-user/" + id);
  //     console.log("unfollow user", res);
  //     dispatch({ type: "AUTH_USER", value: res.data });
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  return (
    <DashboardLayout>
      <Header user={user} handlfollowers={handlfollowers} authUser={authUser} followed={followed} />
      <SuiButton
        style={{ marginTop: 10, marginBottom: 5 }}
        buttonColor="info"
        variant="gradient"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? "Profile" : "Followers"}
      </SuiButton>
      {toggle ? (
        <FollowersTabs followers={followers} following={following} />
      ) : (
        <SuiBox mt={5} mb={3}>
          <UserProfileCard user={user} />
          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <ProfileInfoCard
                title="profile information"
                description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                info={{
                  fullName: user.name,
                  mobile: user.number,
                  email: user.email,
                  location: "USA",
                  id: user._id,
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
              />
            </Grid>

            <Grid item xs={12} xl={4}>
              <ProfilesList title="conversations" profiles={profilesListData} />
            </Grid>
          </Grid> */}
        </SuiBox>
      )}
<BottomTabs/>
      <Footer />
    </DashboardLayout>
  );
}

export default UserProfile;
