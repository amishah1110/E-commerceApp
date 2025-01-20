const userModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

async function UserSignUpController(req, res) {
    try{
        const{email, password, name} = req.body;
        // console.log(req.body);

        const user = userModel.findOne({email});
        if(user){
            throw new Error("User already exists")
        }

        if(!email){
            throw new Error("Please provide email address");
        }
        if(!password){
            throw new Error("Please provide password");
        }0
        if(!name){
            throw new Error("Please provide name");
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong with the password");
        }

        const payload = {
            ...req.body, password: hashPassword
        }

        const userData = new userModel(payload) 
        const saveUser = userData.save();

        res.status(201).json({
            data:saveUser, 
            success: true,
            error: false,
            message: "user created successfully!!"
        })
    }
    catch(error){
        res.json({
            message: error.message || error,
            error: true, 
            success: false
        })
    }
}

module.exports = UserSignUpController; 