import express from "express";
import { signup, signIn } from "../controller/authController";


const authRouter = express.Router()


authRouter.route('/signup').post(signup)
authRouter.route('/signin').post(signIn)



export default authRouter;