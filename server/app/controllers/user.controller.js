const bcrypt = require("bcrypt");
const User = require("../db/models/user.model");
const { generateJWT } = require("../utils/generateJWT");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long." });
    }

    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialChars.test(password)) {
      return res.status(400).json({
        error: "Password must contain at least one special character.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "A user with the provided email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    const token = generateJWT(user._id, user.name);

    res.status(200).json({ message: "User registered successfully.", token });
  } catch (error) {
    res.status(500).json({ error: "Error registering user." });
  }
};

module.exports = { registerUser };
