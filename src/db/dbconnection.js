const mongoose = require("mongoose");
const { MONGO_URI } = require("../../config/key");

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("App is connected to the DB");
  })
  .catch((e) => {
    console.log("Connection failed" + e);
  });
