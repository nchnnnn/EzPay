const User = require("../model/userModel");
const { generateToken } = require('../middleware/auth.js')
const { hashPassword, comparedPassword } = require('../utils/password.js'); 
const { ConnectionStates } = require("mongoose");


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
            alternateNo, address, accountType, lastLogin: new Date()
        })

        await user.save();
        console.log(user._id)
        const token = generateToken()
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
        
        console.log("Email: ", identifier, "Passowrd: ", password)

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

        const isPasswordValid = await comparedPassword(password, user.password);

        if (!isPasswordValid) {
            return invalid(res, 401, "Invalid email/username or password")
        }

        // Generate JWT token
        const token = generateToken(user._id);
        user.lastLogin = new Date();  
        
        await user.save();

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                middleName: user.middleName,
                username: user.username,
                email: user.email,
                balance: `${user.balance}`,
                phone: user.phone,
                lastLogin: user.lastLogin
            }
        });
    } catch (error) {
        return invalid(res, 400, error.message)
    }
}

//Get current user profile

exports.getProfile = async (req, res) => {
  try {
    // req.user is set by the authenticateToken middleware
    const user = req.user;
    
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      username: user.username,
      email: user.email,
      balance: user.balance,
      phone: user.phone,
      isActive: user.isActive,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user profile

exports.updateProfile = async (req, res) => {
  try {
    const { civilStatus, mobileNo, alternateNo, birthDate, address, accountType } = req.body;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { civilStatus, mobileNo, alternateNo, birthDate, address, accountType },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ 
      message: 'Profile updated successfully', 
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        username: user.username,
        email: user.email,
        balance: user.balance,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    if(currentPassword === newPassword){
        return res.status(400).json({ error: "New password must be different from the current password."})
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        error: 'Current password and new password are required' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        error: 'New password must be at least 6 characters long' 
      });
    }

    // Get user with password
    const user = await User.findById(userId);
    
    // Verify current password
    const isCurrentPasswordValid = await comparedPassword(currentPassword, user.password);
    
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);
    
    // Update password
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.logout = async (req, res) => {
  try {
    // In a more advanced setup, you might maintain a blacklist of tokens
    // or store active sessions in Redis
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};