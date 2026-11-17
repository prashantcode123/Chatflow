import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { editProfile, getOtherUsers, searchUser } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.js'
const router = express.Router()

router.patch('/profile', authMiddleware, upload.single("image"), editProfile)
router.get('/otherusers', authMiddleware, getOtherUsers)
router.get('/search', authMiddleware, searchUser)

export default router