const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { log } = require("console");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const premium = false;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please login instead." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword ,premium });
    const token = jwt.sign({ userId: newUser.id }, 'saidulSecretKey');
    res.status(200).json({ message: 'signup succesfull', newUser, token });
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
    const premium = user.premium;
    res.status(200).json({ message: 'Login successful', token ,premium});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token using bcrypt
    const token = crypto.randomBytes(32).toString('hex');

    user.resetToken = token;
    await user.save();
    
    const encryptedEmail = Buffer.from(email).toString('base64');
    // Send reset password link to user's email
    const resetLink = `http://localhost:3000/reset-password/${encodeURIComponent(encryptedEmail)}`;

    await sendResetPasswordEmail(email, resetLink);

    res.status(200).json({ message: "Reset password link sent successfully" });
  } catch (error) {
    console.error("Error in forgetPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to send reset password email
async function sendResetPasswordEmail(email, resetLink) {
  try {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'lou36@ethereal.email',
          pass: 'Ck1rFDZDUu99rEgbYy'
      }
  });

    // Send the email
    await transporter.sendMail({
      from: 'amaya.green76@ethereal.email', // Sender address
      to: email, // Recipient address
      subject: 'Reset Your Password', // Subject line
      text: `Click the following link to reset your password: ${resetLink}`, // Plain text body
      // You can also use HTML if you prefer
      html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`
    });

    console.log('Reset password email sent successfully');
    
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw error; // Rethrow the error to handle it in the forgetPassword controller
  }
}

exports.resetPassword = async (req, res) => {
  console.log("reset passowrd :   :  :  : : ",req.body);
  const { password,token } = req.body;
  
  try {
    // Find the user by reset token
    const decryptedEmail = Buffer.from(token, 'base64').toString('ascii');
    console.log(decryptedEmail);
    const user = await User.findOne({ where: { email:decryptedEmail } });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    // Update the user's password with the new hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    // user.resetToken = null; // Clear the reset token
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};