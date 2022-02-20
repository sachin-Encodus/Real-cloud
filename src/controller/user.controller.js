const User = require("../schemas/user");

const bcrypt = require("bcryptjs");
const { Service_id, Account_Sid, Auth_Token } = require("../../config/key");
const accountSid = Account_Sid;
const authToken = Auth_Token;
// Set environment variables for your Account Sid and Auth Token!
// These can be found at twilio.com/console

const client = require("twilio")(accountSid, authToken);

exports.register = (req, res) => {
  const { number } = req.body;

  try {
    User.findOne({ number }).exec((err, user) => {
      if (user) {
        return res
          .status(400)
          .json({ errors: "User with this credentilas is already exist" });
      }

      client.verify
        .services(Service_id)
        .verifications.create({ to: "+91" + number, channel: "sms" })
        .then((verification) => {
          res.status(200).json({ verification });
        })
        .catch((error) => {
          res.status(400).json({ errors: error });
        });
    });
  } catch (error) {}
};

exports.signUp = (req, res) => {
  const { number, otp, email, name, password } = req.body;
  console.log(number, otp);
  client.verify
    .services(Service_id)
    .verificationChecks.create({ to: "+91" + number, code: otp })
    .then(async (verification_check) => {
      const Userdata = new User({
        name,
        email,
        number,
        password,
      });
      await Userdata.save();
      res.status(200).json({ verification_check });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ errors: "Please enter correct Otp" });
    });
};

exports.SigninWithPassward = async (req, res) => {
  try {
    const { number, password } = req.body;
    const user = await User.findOne({ number: number });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = await user.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(2147483647 * 1000),
        httpOnly: true,
      });

      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json({
        errors: " password do not match",
      });
    }
  } catch (error) {
    return res.status(400).json({
      errors: "User with this credentials does not exist",
    });
  }
};

exports.Verifyotp = (req, res) => {
  const { number, otp } = req.body;
  console.log(number, otp);
  client.verify
    .services(Service_id)
    .verificationChecks.create({ to: "+91" + number, code: otp })
    .then(async (verification_check) => {
      const user = await User.findOne({ number });
      const token = await user.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(2147483647 * 1000),
        httpOnly: true,
      });
      return res.status(200).json({ verification_check, user, token });
    })
    .catch((error) => {
      res.status(400).json({ errors: error });
    });
};

exports.signinOtp = (req, res) => {
  const { number } = req.body;
  try {
    User.findOne({ number }).exec(async (err, user) => {
      if (user) {
        client.verify
          .services(Service_id)
          .verifications.create({ to: "+91" + number, channel: "sms" })
          .then((verification) => {
            return res.status(200).json({ verification });
          })
          .catch((error) => {
            console.log(error);
            return res.status(400).json({ error });
          });
      } else {
        return res
          .status(500)
          .json({ errors: "User with this number dose not exist" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

// specific user details by searching

exports.userNames = async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.find({});

    const userdata = user.filter(
      (user) =>
        user.email &&
        user.email.toLowerCase().includes(req.params.id.toLowerCase())
    );
    return res.status(201).send({ userdata });
  } catch (error) {
    console.log("logout error", error);
    res.status(500).json({ message: error });
  }
};

// users Friends

exports.friends = async (req, res) => {
  try {
    const user = req.rootUser;
    const userFollowing = await Promise.all(
      user.following.map((user_id) => {
        return User.findById(user_id);
      })
    );
    const FollowingList = [];
    userFollowing.map(({ _id, name, email, profilepic }) => {
      FollowingList.push({ _id, name, email, profilepic });
    });
    const userFollower = await Promise.all(
      user.followers.map((user_id) => {
        return User.findById(user_id);
      })
    );

    const FollowerList = [];
    userFollower.map(({ _id, name, email, profilepic }) => {
      FollowerList.push({ _id, name, email, profilepic });
    });

    return res.status(200).json({ user, FollowingList, FollowerList });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const userFollowing = await Promise.all(
      user.following.map((user_id) => {
        return User.findById(user_id);
      })
    );
    const FollowingList = [];
    userFollowing.map(({ _id, name, email, profilepic }) => {
      FollowingList.push({ _id, name, email, profilepic });
    });
    const userFollower = await Promise.all(
      user.followers.map((user_id) => {
        return User.findById(user_id);
      })
    );

    const FollowerList = [];
    userFollower.map(({ _id, name, email, profilepic }) => {
      FollowerList.push({ _id, name, email, profilepic });
    });

    return res.status(200).json({ user, FollowingList, FollowerList });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

// exports.Usersfriends = async (req, res) => {
//   try {
//     const user = req.rootUser;
//     console.log("got user", user);
//     const friends = await Promise.all(
//       user.followoing.map((user_id) => {
//         return User.findById(user_id);
//       })
//     );
//     const FriendsList = [];
//     friends.map(({ _id, name, username }) => {
//       FriendsList.push({ _id, name, username });
//     });
//     return res.status(200).json(FriendsList);
//   } catch (error) {
//     return res.status(400).json({ err: error });
//   }
// };

// // Follow user
// exports.follow = async(req,res) =>{
//   const myid = "61582b7167791ded2503b0f3"
// //  if(myid !== req.params.id){
//    try {

//     const followUser = await User.findById(req.params.id)
//     const user = await User.findById(myid)
//     console.log(">>>>>>>", user);
//     console.log(">>>xxxxx", followUser);
//     if(!followUser.followers.includes(myid)){
//      const data = await  followUser.updateOne({$push:{followers: myid}})
//      user.updateOne({$push:{following:req.params.id}})
//      console.log("data",data);
//         return res.status(200).json({data})
//     }else{
//       return res.status(400).json("you already follow this user")
//     }
// } catch (error) {
//    return res.status(400).json(error)
// }

// //  }else{
// //    return res.status(400).json("you can not follow yourself")
// //  }

// }

exports.follow = (req, res) => {
  if (req.rootUser.following.includes(req.params.id)) {
    console.log("you already follow this user");
    return res.status(422).json("you already follow this user");
  }

  User.findByIdAndUpdate(
    req.params.id,
    { $push: { followers: req.UserID } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.UserID,
        { $push: { following: req.params.id } },
        { new: true }
      )
        .then((result) => {
          console.log("=====>>>>>>>>>>>>>", result);
          res.status(200).json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
};

exports.UnFollow = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { followers: req.UserID },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.UserID,
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      )
        .then((result) => {
          console.log("=====>>>>>>>>>>>>>", result);
          res.status(200).json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
};

// exports.UnFollow = (req, res) => {
//   User.findByIdAndUpdate(
//     req.body.unfollowId,
//     {
//       $pull: { followers: req.user._id },
//     },
//     {
//       new: true,
//     },
//     (err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       }
//       User.findByIdAndUpdate(
//         req.user._id,
//         {
//           $pull: { following: req.body.unfollowId },
//         },
//         { new: true }
//       )
//         .select("-password")
//         .then((result) => {
//           res.json(result);
//         })
//         .catch((err) => {
//           return res.status(422).json({ error: err });
//         });
//     }
//   );
// };

exports.rootUser = async (req, res) => {
  try {
    return res.status(200).json(req.rootUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

exports.fetchUserDetails = async (req, res) => {
  try {
    // console.log("fetchuser",req.fetchUserName);
    const user = await User.findOne({ email: req.params.username });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.findUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
// ! update social

exports.socialUpdate = (req, res) => {
  const { formData } = req.body;
  console.log("calling");

  try {
    User.findByIdAndUpdate(
      req.UserID,
      {
        $set: { socials: formData },
      },
      {
        new: true,
      },
      (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true,
          user,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(403).json(error);
  }
};

// ! update user Profile

exports.userUpdate = (req, res) => {
  const {
    profilepic,
    email,
    name,
    adhaar,
    pan,
    bio,
    number,
    dob,
    alt_number,
    country,
    password,
    state,
    city,
    pincode,
    address,
  } = req.body;

  try {
    User.findByIdAndUpdate(
      req.UserID,
      {
        $set: {
          profilepic,
          email,
          name,
          adhaar,
          pan,
          bio,
          number,
          password,
          dob,
          alt_number,
          country,
          state,
          city,
          pincode,
          address,
        },
      },
      {
        new: true,
      },
      (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true,
          user,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(200).send({ error });
  }
};

// router.put('/follow',requireLogin,(req,res)=>{
//     User.findByIdAndUpdate(req.body.followId,{
//         $push:{followers:req.user._id}
//     },{
//         new:true
//     },(err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }
//       User.findByIdAndUpdate(req.user._id,{
//           $push:{following:req.body.followId}

//       },{new:true}).select("-password").then(result=>{
//           res.json(result)
//       }).catch(err=>{
//           return res.status(422).json({error:err})
//       })

//     }
//     )
// })
// router.put('/unfollow',requireLogin,(req,res)=>{
//     User.findByIdAndUpdate(req.body.unfollowId,{
//         $pull:{followers:req.user._id}
//     },{
//         new:true
//     },(err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }
//       User.findByIdAndUpdate(req.user._id,{
//           $pull:{following:req.body.unfollowId}

//       },{new:true}).select("-password").then(result=>{
//           res.json(result)
//       }).catch(err=>{
//           return res.status(422).json({error:err})
//       })

//     }
//     )
// })
