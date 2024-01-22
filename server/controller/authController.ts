import { log } from "console";
import { Response, Request, NextFunction } from "express";
import UserModel from "../models/usermodel";
import bycryptjs from "bcryptjs";
import { triggerAsyncId } from "async_hooks";
import { authErrorHandler } from "../errors/authError";
import * as jwt from "jsonwebtoken";
require("dotenv").config();
async function signup(req: Request, res: Response, next: NextFunction) {
  const { username, email, password } = req.body;
  const hashpassword = bycryptjs.hashSync(password, 10);

  const checkusername = await UserModel.findOne({ username });

  if (checkusername) {
    return res.status(400).json({ message: "username already exist" });
  }

  const newUser = new UserModel({
    username,
    email,
    password: hashpassword,
  });

  try {
    await newUser.save();

    res.status(201).json({ newUser, message: "user created successfully" });
    log(newUser, "newUser");
  } catch (error: Error | any) {
    next(error);
  }
}

async function signIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const ValidUser = await UserModel.findOne({ email });

    if (!ValidUser) return next(authErrorHandler(404, "User Not Found"));
    const validPassword = bycryptjs.compareSync(password, ValidUser.password!);
    if (!validPassword)
      return next(authErrorHandler(401, "Invalid Cresidentials"));
    const token = jwt.sign({ id: ValidUser._id }, process.env.JWT_SECRET!);
    const { password: hashpassword, ...rest } = ValidUser.toObject();
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const maxAge = 2 * 30 * 24 * 60 * 60 * 1000;
    log(rest);
    const expiryDate = new Date(Date.now() + maxAge); // 2 months
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
        secure: true,
        sameSite: "none",
      }) 
      .status(200)
      .json(rest);
  } catch (error: Error | any) {}
}
export { signup, signIn };
