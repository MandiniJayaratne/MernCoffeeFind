const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../middleware/authService");

// Fetch all users (excluding their passwords)
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(
      new HttpError("Fetching users failed, please try again later.", 500)
    );
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// User Signup
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  if (existingUser) {
    return next(
      new HttpError("User exists already, please login instead.", 422)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await hashPassword(password);
  } catch (err) {
    return next(new HttpError("Password encryption failed.", 500));
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path, //
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  const token = generateToken(createdUser._id, email);

  res
    .status(201)
    .json({ user: createdUser.toObject({ getters: true }), token });
};

// User Login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(
        new HttpError("Invalid credentials, could not log you in.", 401)
      );
    }
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }

  let isValidPassword;
  try {
    isValidPassword = await comparePassword(password, existingUser.password);
    if (!isValidPassword) {
      return next(
        new HttpError("Invalid credentials, could not log you in.", 401)
      );
    }
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }

  const token = generateToken(existingUser._id, existingUser.email);

  res.json({
    message: "Logged in!",
    user: existingUser.toObject({ getters: true }),
    token,
  });
};

module.exports = {
  getUsers,
  signup,
  login,
};
