

const mongoose=require("mongoose")

const SignupSchema=mongoose.Schema({
    name:String,
    gender:String,
    email:String,
    password:String
})

const SignupModel=mongoose.model("signup",SignupSchema)

module.exports={
    SignupModel
}