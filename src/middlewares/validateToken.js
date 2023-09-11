const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
  //   const token = req.headers.cookie;
  // const cookies = req.cookies;
  // const token = req.cookies.token;
  const { token } = req.cookies; //escribir esto, es igual que escribir lo de arriba

  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  jwt.verify(token, "secret123", (error, payload) => {
    if (error) {
      return res.status(401).json({ message: "Authorization denied" });
    } else {
      req.payload = payload;
      next();
    }
  });
};
module.exports = { authRequired };
