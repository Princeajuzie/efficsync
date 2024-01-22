import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({
    username:{
        type: String ,
        require: true,
        unique: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    bio: {
      type: String,
      default: 'tell us about your self',
    },
    password:{
        type: String,
        require: true,
    }
}, {timestamps: true})


const UserModel = mongoose.model('Users', UserSchema)

 
export default UserModel;  