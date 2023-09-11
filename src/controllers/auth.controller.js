const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { createAccessToken } = require("../libs/jwt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const emailExist = await User.findOne({ email });

    if (emailExist) return res.status(400).json(["email already registered"]);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const token = await createAccessToken({
      id: savedUser._id,
    });
    {
      res.cookie("token", token);
      res.status(201).json({
        message: "succesfully created",
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ message: "user or email are incorrect" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "user or email are incorrect" });
    }

    const token = await createAccessToken({
      id: foundUser._id,
    });

    {
      res.cookie("token", token, {});
      res.status(201).json({
        message: "succesfully login",
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "successfully logout" });
};

const profile = async (req, res) => {
  try {
    console.log(req.payload);
    const foundUser = await User.findById({ _id: req.payload.id });

    if (!foundUser) {
      res.status(404).json({ message: "user Not Found" });
    } else {
      return res.status(200).json({
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
        createdAt: foundUser.createdAt,
        modifiedAt: foundUser.updatedAt,
      });
    }

    res.send("all good");
  } catch (error) {
    error;
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "secret123", async (error, payload) => {
    if (error) {
      return res.status(401).json({ message: "Authorization denied" });
    }
    const foundUser = await User.findById(payload.id);
    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.json({
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    });
  });
};

module.exports = { register, login, logout, profile, verifyToken };
