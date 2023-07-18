const express = require("express");
const userauth = require("../model/userauth");
const bcrypt = require("bcrypt");
const generateToken = require("../GenToken");
const router = express.Router();


router.get("/users", async (req, res) => {
  const user = await userauth.find();
  if (!user) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json(user);
});

router.post("/signup", async (req, res) => {
  const {Name, Email, Password } = req.body;
  const user = await userauth.findOne({ Email });
  if (!user) {
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new userauth({ Name,Email,Password: hashedPassword });

    await newUser.save();

    return res.status(201).json({ message: "user Created" });
  }
  res.status(404).json({ message: "user Already exist" });
});

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  const user = await userauth.findOne({ Email });

  if (!user) {
    return res.status(404).json({ message: "Incorrect email or password" });
  }

  const passwordValidate =await bcrypt.compare(Password, user.Password);

  if (!passwordValidate) {
    return res.status(404).json({ message: "Incorrect email or password" });
  }

  const token = generateToken(user._id);
  res.json({ user, token });
});


module.exports = router;
