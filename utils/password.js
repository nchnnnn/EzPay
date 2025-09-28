const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
    const salts = 10;
    return await bcrypt.hash(password, salts);
}

exports.comparedPassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}