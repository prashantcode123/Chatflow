import express from 'express'
import * as authControllers from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const Router = express.Router()

Router.post('/register', authControllers.register)
Router.post('/login', authControllers.login)
Router.get('/logout', authControllers.logout)
Router.get('/get-profile', authMiddleware, authControllers.getMe)


export default Router