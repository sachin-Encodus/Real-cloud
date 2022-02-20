
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import List from "@mui/material/List";

import { useSoftUIController } from 'context';
import  axios  from 'axios';
import React, { useEffect, useState } from "react";
import Chatlist from "./Chatlist";

import BottomTabs from "examples/BottomTabs/BottomTabs";

export default function Chats() {
  const [controller, dispatch] = useSoftUIController();
  const { authUser,currentChat } = controller;
const [conversations, setConversations] = useState([]);




 useEffect(() => {
   const getConversations = async () => {
     try {
       const res = await axios.get("/api/conversations/" + authUser?._id);
       setConversations(res.data);
     
     } catch (err) {
       console.log(err);
     }
   };

   getConversations();
 }, [authUser]);













  return (
    <DashboardLayout>
      <DashboardNavbar relative light />
      <h3 style={{ marginLeft: 15, color: "black" }}>Messages</h3>
      <List sx={{ width: "100%" }}>
        {conversations.map((c, index) => (
          // <Link key={index} to={"/conversation/" + c._id}>
          <Chatlist
            conversations={c}
            index={index}
            dispatch={dispatch}
            authUser={authUser}
          />
          // </Link>
        ))}
      </List>
      <BottomTabs />
    </DashboardLayout>
  );
}
