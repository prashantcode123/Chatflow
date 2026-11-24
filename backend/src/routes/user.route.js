import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { deleteUser, editProfile, getOtherUsers, searchUser } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.js'
const router = express.Router()

router.patch('/profile', authMiddleware, upload.single("image"), editProfile)
router.get('/otherusers', authMiddleware, getOtherUsers)
router.get('/search', authMiddleware, searchUser)
router.get('/deleteAccount', authMiddleware, deleteUser)

export default router