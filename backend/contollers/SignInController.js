const userModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

async function UserSignInController(req,res) {
    try{
        const {email, password} = req.body;
        
        if(!email){
            throw new Error("Please enter your email");
        }
        if(!password){
            throw new Error("Please enter your password");
        }
        const user = await userModel.findOne({ email });

        if(!user){
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        // console.log("check password - ",checkPassword);

        if(checkPassword){
            const tokenData={
                _id : user._id,
                email : user.email
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: 60*60});
            const tokenOption = {
                httpOnly:true, 
                secure:true
            }
            res.cookie("token", token, tokenOption).json({
                message: "Logged in successfully",
                data:token,
                success:true,
                error:false
            })
        }
        else{
            throw new Error("Please check password");
        }
    }
    catch(error){
        res.json({
            message : error.message,
            error : true,
            success : false
        })
    }
}
module.exports = UserSignInController;