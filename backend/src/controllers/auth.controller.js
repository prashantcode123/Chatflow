import userModel from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'Username Email and Password are required'
        })
    }

    const isUserExist = await userModel.findOne({ email })
    if (isUserExist) {
        return res.status(400).json({
            message: "User already exist with this email address"
        })
    }

    const isUsernameExist = await userModel.findOne({ username })
    if (isUsernameExist) {
        return res.status(400).json({
            message: "Username already exist"
        })
    }

    try {
        const hashPassword = await bcryptjs.hash(password, 10)

        const user = await userModel.create({
            username: username,
            email: email,
            password: hashPassword
        })

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "Strict",
            secure: false
        })

        res.status(201).json({
            message: 'User created successfully',
            user: {
                username: user.username,
                email: user.email
            }
        })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: err.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and Password are required'
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not found, enter valid email address or register first"
            })
        }

        const comparePassword = await bcryptjs.compare(password, user.password)

        if (!comparePassword) {
            return res.status(400).json({
                message: 'Incorrect password'
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "Strict",
            secure: false
        })

        res.status(200).json({
            message: 'User logedIn successfully',
            user
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({
            message: 'user logout successfully'
        })
    } catch (err) {
        console.log(err.message)
    }
}

export const getMe = async (req, res) => {
    try {
        const id = req.userId
        const user = await userModel.findById(id).select('-password')
        return res.status(200).json({ user })
    } catch (err) {
        console.log(err.message)
    }
}