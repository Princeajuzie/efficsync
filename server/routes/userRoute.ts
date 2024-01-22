 import express from "express"
 import { getUser } from "../controller/UserController"
 const userRouter  = express.Router()


 userRouter.route('/').get(getUser )


 export default userRouter; 