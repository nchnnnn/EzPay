const jwt = require('jsonwebtoken');
const User = require("../model/userModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticateToken = async (req, res, next) =>{
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        console.log("Token:", token);   
        if(!token){
            return res.status(401).json({
                error: 'Access denied. No token provided.'
            })
        }

        const decode = jwt.verify(token, JWT_SECRET)
       
        const user = await User.findById(decode.userId).select('-password');


        if(!user || !user.isActive){
            return res.status(401).json({
                error: 'Invalid token or user not found.'
            })
        }
        req.user = user;
        next();
        
    } catch (error) {
        res.status(403).json({
            error: "Invalid Token"
        })
    }
}

exports.authorizeUser = (req, res, next) =>{
    const userId = req.params.id || req.params.userId;

    if(req.user._id.toString() != userId && req.user.role != 'admin'){
        return res.status(403).json({
            error: "Access denied. You can only access your own data."
        })
    }
    next();
}

//Generate JWT Token
exports.generateToken = (userId) =>{
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1hr'})
}



