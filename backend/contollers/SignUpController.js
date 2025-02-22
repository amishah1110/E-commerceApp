const userModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

async function UserSignUpController(req, res) {
    try{
        const{email, password, name} = req.body;
        console.log(req.body);

        if(!email){
            throw new Error("Please provide email address");
        }
        if(!password){
            throw new Error("Please provide password");
        }
        if(!name){
            throw new Error("Please provide name");
        }

        const user = await userModel.findOne({email});
        if(user){
            throw new Error("User already exists!");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword =  bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong with the password");
        }

        const payload = {
            ...req.body, 
            role:"GENERAL", 
            password: hashPassword
        }

        const userData = new userModel(payload) 
        const saveUser = await userData.save();

        res.status(201).json({
            data:saveUser, 
            success: true,
            error: false,
            message: "User created successfully!"
        });
    }
    catch(error){
        console.log("Error- ",error.message)
        res.json({
            message: error.message || error,
            error: true, 
            success: false
        })
    }
}

module.exports = UserSignUpController; 