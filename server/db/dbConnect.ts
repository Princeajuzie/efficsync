
import mongoose from "mongoose";
import dotenv from "dotenv";

require("dotenv").config();

interface Server {
  listen: (port: number | string, callback: () => void) => void;
}
const port = process.env.PORT || 8001;

function ConnectDB(server: Server) {

  if (process.env.MONGO_URL) {
    mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      return server.listen(port, () => {
        console.log(`server is connected to port ${port} ❤️‍🔥..`);
      });
    })
    .catch((err: Error) => {
      console.log(err);
    });
  } else {
    console.log('Mongo URL is undefined');
  }

}



export default ConnectDB;
