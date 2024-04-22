const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists. Please login instead." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json(newUser);
  } catch (error) {

    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found , Sign up instead!' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user.id }, 'saidulSecretKey');

    res.status(200).json({ message: 'Login successful', token: token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};