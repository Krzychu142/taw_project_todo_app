const jwt = require("jsonwebtoken");

const generateJWT = (userId, name) => {
  const token = jwt.sign({ userId, name }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = { generateJWT };
