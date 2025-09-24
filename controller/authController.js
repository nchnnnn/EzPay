const User = require("../model/userModel");
const { generateToken } = require('../middleware/auth.js')
const { hashPassword, comparePassword } = require('../utils/password.js') 


// Register Account 
// (WORKING ✅)
// exports.create = async(req, res) =>{
//     try {
//         const {username, password, firstName, lastName, middleName,
//             birthDate, gender, nationality, civilStatus, email, mobileNo,
//             alternateNo, address, accountType
//          } = req.body;


//         const existingUser = await User.findOne({
//             $or: [{ username }, { email }]
//         });


//         if (existingUser) {
//         return res.status(400).json({ 
//             error: "User already exists with this email or username" });
//         }
        
//         const user = new User({
//             username, password, firstName, lastName, middleName,
//             birthDate, gender, nationality, civilStatus, email, mobileNo,
//             alternateNo, address, accountType
//         })
//         await user.save();
//         res.status(201).json({
//             message: "User created successfully",
//             user
//         })

//     }catch (error) {
//         res.status(500).json({"Internal Error: ": error.message});
//     }
// }

function invalid(res, n, j){
    res.status(n).json({
        message : j
    })
}

exports.register = async (req, res) => {
    try {
        const {username, password, firstName, lastName, middleName,
            birthDate, gender, nationality, civilStatus, email, mobileNo,
            alternateNo, address, accountType
        } = req.body;

        // VALIDATE FIRST IF THE USER HAS INPUT IN FIELD

        if(password.length < 6 ){
            return invalid(res, 400, "Password must be at least 6 characters long.")
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email: email.toLowerCase() }]
        });

        if (existingUser) {
            return invalid(res, 400, "User already exists with this email or username")
        }

        const hashedPassword = await hashPassword(password);

        const user = new User({
            username, email: email.toLowerCase(),  password: hashedPassword, firstName, lastName, middleName,
            birthDate, gender, nationality, civilStatus, mobileNo,
            alternateNo, address, accountType
        })

        await user.save();
        const token = generateToken(user)
        res.status(201).json({
            message: "User created successfully",
            token,
            // user
        })

    } catch (error) {
        return invalid(res, 400, error.message)
    }
    
}

//Login User
exports.login = async (req, res) =>{
    try {
        const {identifier, password} = req.body; //identifier can be email or username
        
        if(!identifier || !password) {
            return invalid(res, 400, "Email or Username and password are required")
        }

        //Find user by email or username

        const user = await User.findOne({
            $or: [
                {email: identifier.toLowerCase()},
                {username: identifier}
            ]
        })

        if(!user){
            return invalid(res, 401, "Invalid email/username or password")
        }

        // Check if account is active.
        if(!user.isActive){
            return invalid(res, 401, "Account is deactivated. Please contact support.")
        }

        // Verify password

    } catch (error) {
        return invalid(res, 400, error.message)
    }
}