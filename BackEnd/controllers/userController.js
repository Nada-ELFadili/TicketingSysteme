const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {userValidation,loginValidation} = require('../validations/userValidation');

module.exports.addNewUser = async (req,res) =>{
    //Get user infos
    const {fname, lname, username, password, type, email, state} = req.body;

    //Validate infos
    const {error} = userValidation(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});
    
    //Check if the username already exist
    const usernameExist = await User.findOne({username: username});
    if(usernameExist) return res.status(400).json({message: 'Username already exit'});
    
    //Save the user
    try {
        const createdUser = await User.create({fname, lname, username, password, type, email, state});
        if (createdUser) res.status(200).json({newUser : createdUser._id});
    } catch (error) {
        res.status(400).json({message: error});
    }  
};

module.exports.deleteUser = async (req,res) =>{
    await User.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            return res.status(404).send({ message: 'Cannot delete the user' });
        }
        res.status(201).send('User removed');
    });
};

module.exports.updatePassword = async (req,res) => {
    //Get user infos
    const {password} = req.body;
    //check password
    if(!password) {
        return res.status(400).json({message: 'Password is empty'});
    }
    //The password will be hashed in the user model inside mongoose hook

    //Save updated user
    //Look for a user in the database
    const userToUpdate = await User.findOne({_id: req.params.id});
    
    //if user doesn't exit
    if (!userToUpdate){
        return res.status(404).json({ message: 'This user does not exist' });
    }
    
    //If the user is already updated deny request
    if (userToUpdate.state != 'disabled'){
        return res.status(404).json({ message: 'User already enabled' });
    }

    //Check if the new password is not different from the old one
    const validPassword = await bcrypt.compare(password,userToUpdate.password);
    if(validPassword) {
        return res.status(404).json({ message: 'New and old password must be differents' });
    }

    //Define fields to update
    userToUpdate.password = password;
    userToUpdate.state = 'enabled';

    //Update the user
    const updatedUser = await userToUpdate.save();
    if (!updatedUser) {
        return res.status(404).json({ message: 'Cannot update user' });
    }
    res.status(201).json({ user: updatedUser._id, newState: 'enabled', password: 'updated', type: updatedUser.type });
}

module.exports.getAllUsers = async (req,res) =>{
    try {
        const users = await User.find();
        if (users) res.status(200).json(users);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports.getUsersByType = async(req,res) => {
    try {
        const usersByType = await User.find({type : req.params.type});
        if (usersByType) res.status(200).json(usersByType)
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports.loginUser = async (req,res) =>{
    //Get user infos
    const {username, password} = req.body;
    
    //Validate infos
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});
    
    //Check if the username already exist
    const user = await User.findOne({username: username});
    if(!user) return res.status(400).json({message: 'Username doesn\'t exit'});
    
    //Check if password is correct
    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword) return res.status(400).json({message: 'Password is wrong'});
    

    //Create a token
    const token = jwt.sign({id: user._id , type: user.type, state: user.state},process.env.TOKEN_SECRET,{
        expiresIn: 60 * 60 * 24
    })

    //Create and send a cookie containing a token
    res.cookie('jwtAuth',token,{httpOnly: true, maxAge : 60* 60 * 24 * 1000});
    res.status(201).json({  userId: user._id, 
                            type: user.type, 
                            state: user.state, 
                            username: user.username, 
                            fname: user.fname, 
                            lname: user.lname,
                            isAuth: true
                        });
}