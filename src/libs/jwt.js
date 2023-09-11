const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, "secret123", { expiresIn: "1d" }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = { createAccessToken };
