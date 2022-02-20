const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config/key");

const UserSchema = new mongoose.Schema({
  profilepic: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "user",
  },
  adhaar: {
    type: String,
    default: "",
  },

  pan: {
    type: String,
    default: "",
  },

  alt_number: {
    type: String,
    default: "",
  },
  dob: {
    type: String,
    default: "",
  },

  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },

  country: {
    type: String,
    default: "",
  },

  pincode: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },

  socials: { type: Array, default: [] },

  followers: { type: Array, default: [] },
  following: { type: Array, default: [] },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//  generating token
UserSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id.toString() }, SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    res.send("the error part  " + error);
    console.log("the error part" + error);
  }
};



// bcrypt password 
UserSchema.pre("save" , async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10)
  }
  next();
})

const User = new mongoose.model("User", UserSchema);

module.exports = User;
