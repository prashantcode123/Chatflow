import conversationModel from "../models/conversation.model.js"
import messageModel from "../models/message.model.js"
import { uploadImage } from '../service/cloudinary.js'
import { getReceiverSocketIds, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const sender = req.userId
        const { receiver } = req.params
        const { message } = req.body

        let image;
        if (req.file) {
            image = await uploadImage(req.file.path)
        }

        let conversation = await conversationModel.findOne({
            participents: { $all: [receiver, sender] }
        })

        const newMessage = await messageModel.create({
            sender, receiver, message, image
        })

        if (!conversation) {
            conversation = await conversationModel.create({
                participents: [sender, receiver],
                messages: [newMessage._id]
            })
        } else {
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }

        const receiverSocketIds = getReceiverSocketIds(receiver);

        receiverSocketIds.forEach((socketId) => {
            io.to(socketId).emit("newMessage", newMessage);
        });

        return res.status(201).json(newMessage)
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: err.message })
    }

}

export const getMessage = async (req, res) => {
    try {
        const sender = req.userId
        const { receiver } = req.params

        const conversation = await conversationModel.findOne({
            participents: { $all: [receiver, sender] }
        }).populate("messages")

        if (!conversation) {
            return res.status(400).json({message : "Not found"})
        }

        return res.status(200).json(conversation?.messages)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}
