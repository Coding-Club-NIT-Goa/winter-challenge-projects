const express = require('express')
const {sendMessage, getMessage, deletMessage} = require('../controller/messageController')
const verifyToken = require("../middleware/verifyToken");
const messageRouter = express.Router();

messageRouter.post('/',verifyToken,sendMessage);
messageRouter.get('/:id',verifyToken,getMessage);
messageRouter.delete('/:id',verifyToken,deletMessage)
module.exports = messageRouter;