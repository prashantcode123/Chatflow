import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({
                message: 'token not found'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded.id

        next()
    } catch (err) {
        console.log(err.message)
    }
}