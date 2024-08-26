import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      default: "Low",
    },
    avatar: {
      type: String,
      default:"https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
    },
  },
  { timestamps: true }
);
userSchema.pre("save",async function(next){
  if(!this.isModified('password'))
    return next();
  this.password=await bcrypt.hash(this.password,10);
})

userSchema.methods.isPasswordCorrect=async function(password){
 return await bcrypt.compare(password,this.password);
}
export const User=mongoose.model("User",userSchema);