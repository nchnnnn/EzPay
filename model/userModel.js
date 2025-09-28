const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },

    firstName: { type: String, required: true},
    lastName:  { type: String, required: true},
    middleName:{ type: String },
    birthDate: { type: Date, required: true },
    gender:    { type: String, enum: ["Male", "Female"], required: true },
    nationality: { type: String, required: true },

    civilStatus: {
        type: String,
        enum: ["Single", "Married", "Widowed", "Divorced"],
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    mobileNo: {
        type: String,
        required: true,
    },
    alternateNo: { type: String },
    address: { type: String, required: true },
    accountType: {
        type: [String],
        enum: ["Savings", "Salary", "Student", "Checking", "Business"],
        required: true
    },

    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    isActive:{
        type:Boolean,
        default: true   
    },
    role: {
        type: String,
        default: "basic"
    },
    lastLogin: { 
        type: Date

    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});






