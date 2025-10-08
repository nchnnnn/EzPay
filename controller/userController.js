const User = require("../model/userModel.js");

//Get Specific User using ID
// (WORKING ✅)

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET -  Get All Users
// (WORKING ✅)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "User Not Found." });
    }

    res.status(200).json({
      length: users.length,
      users,
    });

    //FOR ACTIVE USER ONLY
    // const newArray = []
    // users.forEach(element => {
    //     if(element.isActive){
    //         newArray.push(element)
    //     }

    // });

    // res.status(200).json({
    //     Length : newArray.length,
    //     "User": newArray
    // })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE - Update User (Account profile)
// (WORKING ✅)
exports.updateUser = async (req, res) => {
  try {
    const {
      password,
      civilStatus,
      email,
      mobileNo,
      alternateNo,
      birthDate,
      address,
      accountType,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        password,
        civilStatus,
        email,
        mobileNo,
        alternateNo,
        birthDate,
        address,
        accountType,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
    asd;
  }
};

//DELETE - Deactivate user (soft delete)

// (WORKING ✅)
exports.deactiveUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({
      message: "User deactivated successfully",
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

// module.exports = {create, getUser, getUsers, updateUser, deactiveUser};asdasd
