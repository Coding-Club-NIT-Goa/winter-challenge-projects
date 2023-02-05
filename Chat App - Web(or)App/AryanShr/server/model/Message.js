const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
    },
    messageText: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Message', MessageSchema)