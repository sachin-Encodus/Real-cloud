const { newConversation, ConversationUser, ConversationTwoUsers,fetchSpecificConversation } = require("../controller/conversation");

const router = require("express").Router();


router.post("/",newConversation)
router.get("/:userId",ConversationUser)
router.get("/findone/:id",fetchSpecificConversation)
router.get("/find/:firstUserId/:secondUserId",ConversationTwoUsers)
module.exports = router;