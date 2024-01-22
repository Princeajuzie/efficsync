import express from "express";
import userRouter from "../routes/userRoute";
import ConnectDB from "../db/dbConnect";
import { Response, Request, NextFunction } from "express";
import cors from "cors";
import authRouter from "../routes/authRoute";
const app = express();
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );
app.use("/api/v1/client/user", userRouter);

app.use(express.json());
app.use("/api/v1/client/auth", authRouter);



app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

ConnectDB(app);

export default app;
