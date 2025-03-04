/* eslint-disable */
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      throw new Error("No token provided");
    }
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user Id";
    } else {
      req.userId = userId;
      next();
    }
  } catch (error) {
    res.status(401).json({ error: new Error("Invalid Request!") });
  }
};
