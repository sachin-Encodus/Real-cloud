const User = require("../src/schemas/user");
const emitterFile = require("../server");
const MyEmitter = emitterFile.emitter;
const confirm = async (req, res, next) => {
  try {



     const user  =  await User.findOne({  email: req.params.username })

     if(!user)  return res.status(500).json({ err: "user not found"});        
       
     
     const EventEmitter = req.app.get("eventemitter");
     EventEmitter.emit("confirm-req", req.params.username);
        EventEmitter.on("denied-req", () => {
          console.log("error");
       return res.status(400).json({err:"User denied"})
      });
      EventEmitter.on("confirmed-req", () =>  next());
 
    
 
  












//  User.findOne({  email: req.params.username }).exec(async (err, user) => {
//       if (user) {
   
//     const EventEmitter = req.app.get("eventemitter");
//     EventEmitter.emit("confirm-req", req.params.username);

//     EventEmitter.on("confirmed-req", (data) => {
//       console.log(data.value);
//       if(data.value === true){
        
//         req.fetchUserName = user; next();
//       }else{
//         return res
//           .status(404)
//           .json({ err: "User denied" });
//       }
       
//     });
//       } else {
//         return res
//           .status(500)
//           .json({ err: err});
//       }
//     });

  } catch (error) {

 return   res
          .status(500)
          .send( error );
  }
};

module.exports = confirm;
