const Message = require("../schemas/messages");



exports.Messages = async(req, res) =>{
 const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
   return res.status(200).json(savedMessage);
  } catch (err) {
   return res.status(500).json(err);
  }
}



exports.GetMessages = async(req, res)=>{
try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
   return res.status(200).json(messages);
  } catch (err) {
  return  res.status(500).json(err);
  }
}

exports.MessageSeen = async (req, res) => {
  console.log("=========xxxxxxxxxx", req.body.conversationId, req.body.sender);
  try {
    const messages = await Message.updateMany(
      {
        conversationId: req.body.conversationId,
        sender: req.body.sender,
      },
      { $set: { isSeen: true } },
      { new: true }
    );
    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.DeleteMessage = async (req, res) => {
  try {
    const delteMessage = await Message.deleteMany({
      sender: req.params.senderId,
      conversationId: req.params.conversationId,
    });
    return res.status(200).json(delteMessage);
  } catch (error) {
    return res.status(500).json(error);
  }
};