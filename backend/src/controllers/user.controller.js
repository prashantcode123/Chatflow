import { uploadImage } from "../service/cloudinary.js";
import userModel from '../models/user.model.js'

export const editProfile = async (req, res) => {
    try {
        const { name } = req.body
        let image;
        if (req.file) {
            image = await uploadImage(req.file.path)
        }

        const user = await userModel.findByIdAndUpdate({ _id: req.userId }, {
            name, image
        })


        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        return res.status(200).json({ user })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const otherUsers = await userModel.find({
            _id: { $ne: req.userId }
        }).select("-password")

        if (!otherUsers) {
            return res.status(400).json({
                message: 'not found any other user'
            })
        }

        return res.status(200).json({
            otherUsers
        })
    } catch (err) {
        console.log(err.message)
    }
}

export const searchUser = async (req, res) => {
    try {
        const { query } = req.query

        if (!query) {
            return res.status(400).json({ message: "query is required" })
        }

        const users = await userModel.find({
            $or:[
                {name : {$regex: query, $options : "i"}},
                {username : {$regex: query, $options : "i"}},
            ]
        })
        if (!users) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        res.status(200).json(users)
    } catch (err) {
        return res.status(500).json({
            message: "server error : " + err.message
        })
    }
}