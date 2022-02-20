
const Conversation = require("../schemas/conversation");

//new conv


  exports.newConversation = async (req, res) => {
    console.log(req.body.senderId, req.body.receiverId);
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};



//get conv of a user

 exports.ConversationUser =  async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    console.log(conversation);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

 exports.fetchSpecificConversation =  async (req, res) => {
  try {
    const conversation = await Conversation.find({
     _id:req.params.id,
    });
   
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get conv includes two userId
 exports.ConversationTwoUsers =  async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
};