const asyncHandler = require("express-async-handler");
const User = require("../models/userModule.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc Get all users
//@route GET /api/user/currentUser
//@access Public
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})

//@desc register users
//@route POST /api/user/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    console.log("1");
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    console.log("2");
    //Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashPassword);
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });
console.log("3");
    console.log(`"User Created: ",${user}`);
    if(user){
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
        });
        console.log("5");
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
})


//@desc login users
//@route post /api/user/loginUser
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    const user = await User.findOne({email});
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }else{
        console.log("User found: ", user);
    }
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '10m'} );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Invalid credentials");
    }
})

module.exports = {
    loginUser,
    registerUser,
    currentUser
};