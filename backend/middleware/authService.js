// authService.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Hash a password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10); 
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new Error("Error hashing password");
  }
};

// Compare plain password with hashed password
const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    throw new Error("Error comparing password");
  }
};

// Generate JWT token
const generateToken = (userId, email) => {
  const secretKey = "your_jwt_secret_key"; 
  return jwt.sign(
    { userId, email },
    secretKey,
    { expiresIn: "1h" } 
  );
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};
