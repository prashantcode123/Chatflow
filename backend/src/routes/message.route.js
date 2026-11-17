import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.js'
import { getMessage, sendMessage } from '../controllers/message.controller.js'
const router = express.Router()

router.post('/send/:receiver', authMiddleware, upload.single("image"), sendMessage)
router.get('/get/:receiver', authMiddleware, getMessage)

export default router