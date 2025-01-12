import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, "Email is required!!!"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Password is required!!!"],
        min:6,
    }
})

const AdminAccount = mongoose.model("Admin_Account" , adminSchema)

export default AdminAccount;