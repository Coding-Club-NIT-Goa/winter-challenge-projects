const Message = require('../model/Message')
const cryptojs = require('crypto-js');
const Conversations = require('../model/Conversations');
require('dotenv').config();
const sendMessage = async (req, res, next) => {
    const { messagetxt, conversationId } = req.body;
    let isUserinConvo;
    try {
        isUserinConvo = await Conversations.findById(conversationId);
    } catch (err) {
        console.log(err);
    }
    if (isUserinConvo?.members?.includes(req.user.id)) {
        const hashedMessage = cryptojs.AES.encrypt(messagetxt, process.env.SECRET_KEY).toString();
        const message = new Message({
            conversationId: conversationId,
            messageText: hashedMessage,
            senderId: req.user.id
        });

        try {
            await message.save();
            await Conversations.updateOne({_id:conversationId},{$currentDate:{"updatedAt":true}});
        } catch (err) {
            console.log(err)
        }
        return res.status(201).json({ message });
    }
    else{
        return res.status(403).json({msg: "you can't send message to this conversation"})
    }
}

const getMessage = async (req, res, next) => {
    const convoID = req.params.id;
    let existingConvo;
    try {
        existingConvo = await Message.find({conversationId: convoID});
    } catch (err) {
        console.log(err);
    }
    if (!existingConvo) return res.status(404).json({ prompt: 'Conversation not found' });
    else {
        return res.status(201).json({ existingConvo });
    }
}
const deletMessage = async(req,res,next)=>{
    const id = req.params.id;
    let mess;
    try {
        mess = await Message.findByIdAndDelete(id);
    } catch (error) {
        console.log(err)
    }
    if(mess){
        res.status(200).json({msg:'Successfully deleted'});
    }
    else{
        return res.status(404).json({msg:"Unable to delete the message"});
    }
}
module.exports = { sendMessage, getMessage,deletMessage }