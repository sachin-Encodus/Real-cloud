const jwt = require("jsonwebtoken");

const User = require("../src/schemas/user");
const { SECRET_KEY } = require("../config/key");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;

    const verifyUser = jwt.verify(token, SECRET_KEY);

    const rootUser = await User.findOne({
      _id: verifyUser._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("User not found ");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.UserID = rootUser._id;
    req.Email = rootUser.email;

    next();
  } catch (error) {
    res.status(400).send(error);
    console.log("Unauthorized: no token provided", error);
  }
};

module.exports = auth;
