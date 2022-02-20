const express = require("express");
const auth = require("../../middleware/auth");
const confirm = require("../../middleware/confirm");
const router = express.Router();

const {
  register,
  Verifyotp,
  signinOtp,
  signUp,
  userNames,
  follow,
  UnFollow,
  rootUser,
  fetchUserDetails,
  userUpdate,
  searchUser,
  friends,
  Usersfriends,
  socialUpdate,
  SigninWithPassward,
  findUser,
} = require("../controller/user.controller");
router.get("/logoutall", auth, async (req, res) => {
  try {
    req.rootUser.tokens = [];

    res.clearCookie("jwtoken");

    await req.rootUser.save();
    return res.status(200).json(req.rootUser);
  } catch (error) {
    res.status(500).send("you have already logged out sir !");
  }
});
router.get("/logout", auth, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((currElement) => {
      return currElement.token !== req.token;
    });

    res.clearCookie("jwtoken");

    // console.log( req.user.tokens);

    await req.rootUser.save();
    console.log("============================ aya hai yha tak");
  } catch (error) {
    res.status(500).send("you have already logged out sir !");
  }

  res.status(200).json(req.rootUser);
});
router.post("/registerotp", register);
router.post("/loginotp", signinOtp);
router.post("/signup", signUp);
router.get("/friends", auth, friends);

router.post("/verify", Verifyotp);
router.post("/signin", SigninWithPassward);
router.get("/user/", auth, rootUser);
router.get("/search-user/:id", searchUser);

router.get("/userdetails/:username", confirm, fetchUserDetails);
router.get("/username/:id", userNames);
router.get("/find-user/:id", findUser);
router.put("/user-update", auth, userUpdate);
router.put("/update-social", auth, socialUpdate);
router.put("/follow-user/:id", auth, follow);
router.put("/unfollow-user/:id", auth, UnFollow);

module.exports = router;
