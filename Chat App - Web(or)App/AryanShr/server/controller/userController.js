const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const getUserByEmail = async(req,res,next)=>{
    const email = req.params.email
    let user;
    try{
        user = await User.findOne({email})
    } catch(err){
        console.log(err);
    }

    if(user) return res.status(200).json({id:user._id})
    else return res.status(404).json({message: "No User Found"})
}

const getUser = async(req,res,next)=>{
    const id = req.params.id;
    let users;
    try{
        users = await User.findById(id);
    }catch(err){
        console.log(err)
    }

    if(!users) return res.status(404).json({message: "No Users Found"});
    return res.status(200).json({users});
};

const signup = async(req,res,next) =>{
    const {name, email,password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    } catch(err){
       return console.log(err);
    }
    if(existingUser) return res.status(400).json({message:"User Already Exists!!"});
    else {
        const hashedPassword = bcrypt.hashSync(password,10);
        const user = new User({
            name,
            email,
            password:hashedPassword
        });
        try{
            await user.save();
        } catch(err){
           return console.log(err);
        }
        const { pass, ...others } = user._doc
        const token = createToken(user);
        return res.status(201).json({others, token})
    }
};

const login = async (req,res,next)=>{
    const {email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    } catch (err){
       return console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message:"Couldn't find User"});
    }
    else{
        const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Incorrect Password"});
        }else{
            const { pass, ...others } = existingUser._doc
            const token = createToken(existingUser);
            return res.status(200).json({others, token});
        }
    }
}
const createToken = (user) => {
    const payload = {
        id: user._id.toString(),
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return token;
};

module.exports= {getUser, signup, login, getUserByEmail}