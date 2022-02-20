const {
  Messages,
  GetMessages,
  DeleteMessage,
  MessageSeen,
} = require("../controller/messages.controller");

const router = require("express").Router();

router.post("/", Messages);
router.get("/:conversationId", GetMessages);
router.put("/isSeen", MessageSeen);
router.delete("/:conversationId/:senderId", DeleteMessage);
module.exports = router;
