import { Request,Response} from "express"

/**
 * Handles the request to get a user.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const getUser = (req: Request, res: Response) => {
    // Send a JSON response with a message
    res.json({
        message: "Api controller is working"
    }); 
};
const Login=(req:Request , res:Response)=>{
 
}


export  {getUser,Login}