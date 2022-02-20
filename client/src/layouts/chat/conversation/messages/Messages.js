import SuiBox from 'components/SuiBox'
import Checked from "assets/images/checked.png";
import Check from "assets/images/check.png";
import React from "react";
import "./messages.css";

import { format } from "timeago.js";
const Messages = ({ message, own, user, authUser }) => {
  return (
    <SuiBox>
      <SuiBox className={own ? "message own" : "message"}>
        <SuiBox className="messageTop">
          {own ? (
            <img
              className="checkedmsg"
              src={message?.isSeen ? Checked : Check}
              alt=""
            />
          ) : (
            <img className="messageImg" src={user?.profilepic} alt="" />
          )}
          {/* {own ? (message.isSeen ? "seen" : "unseen") : null} */}
          <p className="messageText">{message.text}</p>
        </SuiBox>

        <div className="messageBottom">{format(message.createdAt)}</div>
      </SuiBox>
    </SuiBox>
  );
};

export default Messages;
