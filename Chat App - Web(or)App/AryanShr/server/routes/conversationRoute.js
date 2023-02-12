const verifyToken = require("../middleware/verifyToken");
const {createConversation,getConvoById,getUserConversation, deleteConversation} = require('../controller/conversationController')

const ConversationRouter = require('express').Router()

ConversationRouter.post('/',verifyToken,createConversation);
ConversationRouter.get('/find/:userId',verifyToken,getUserConversation);
ConversationRouter.get('/:convoId',verifyToken,getConvoById);
ConversationRouter.delete('/:id',verifyToken,deleteConversation)

module.exports = ConversationRouter;