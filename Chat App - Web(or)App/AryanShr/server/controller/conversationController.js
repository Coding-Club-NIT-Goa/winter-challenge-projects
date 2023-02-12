const Conversation = require('../model/Conversations');
const Message = require('../model/Message');
const User = require('../model/User');


const deleteConversation = async(req,res,next)=>{
    const id = req.params.id;
    let convo;
    let messages;
    console.log(id)
    try{
        convo = await Conversation.findByIdAndRemove(id);

    }catch(err){
        console.log(err) 
    }
    if(convo){
        try{
            messages = await Message.deleteMany({conversationId:id})
        }catch(err){
            console.log(err)
        }
    } else{
        return res.status(404).json({msg:"Unable to delete Conversation"});
    }

    if(messages){
        return res.status(200).json({msg:"Successfully Deleted Conversations and messages"})
    }
    else{
        return res.status(200).json({msg:"Successfully Deleted Conversation"});
    }
}
const createConversation = async(req,res,next)=>{
    const {receiverId} = req.body;
    const currentId = req.user.id;
    let sender;
    let receiver;
    let isConvo;
    try{
        receiver = await User.findById(receiverId);
        sender = await User.findById(currentId)
        isConvo = await Conversation.findOne({members:{$all:[receiver,sender]}});
    }catch(err){
        return res.status(500).json(err)
    }
    if(isConvo) return res.status(500).json({msg: 'There is already such a conversation'})
    else{
        await Conversation.create({members: [receiver,sender]});
        return res.status(201).json({msg: 'Conversation successfully created'})
    }
}

const getUserConversation = async(req,res,next)=>{
    if(req.user.id  === req.params.userId){
        const userId = req.user.id
        try {
            const conversations = await Conversation.find({members: {$in: [userId]}}).populate("members").sort({updatedAt:'desc'})
            if(!conversations) return res.status(404).json({msg:"Conversation Doesn't exists"})
            else return res.status(200).json(conversations)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    } else {
        return res.status(403).json({msg: 'You can get only your own conversations'})
    }
}

const getConvoById = async(req,res,next)=>{
    try {
        const conversation = await Conversation.findById(req.params.convoId)
        if(conversation.members.includes(req.user.id)){
            return res.status(200).json(conversation)
        } else {
            return res.status(403).json({msg: 'This conversation does not include you'})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {createConversation,getConvoById,getUserConversation ,deleteConversation};