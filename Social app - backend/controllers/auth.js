import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js"


export const register = async(req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()*10000),
            impression: Math.floor(Math.random()*10000)
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json({error:err.message})
    }
};

export const login = async(req, res)=>{
    try{
        const {email, password} = req.body;
        const isUser = await User.findOne({email:email});
        if(!isUser) return res.status(400).json({msg:"User does not exisit"});

        const isMatch = await bcrypt.compare(password, isUser.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid Password"});

        const token = jwt.sign({id:isUser._id}, process.env.JWT_SECRET);
        delete isUser.password;
        res.status(500).json({token,isUser});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}