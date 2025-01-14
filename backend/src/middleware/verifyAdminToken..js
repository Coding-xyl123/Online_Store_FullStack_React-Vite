const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyAdminToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: "Forbidden" });
    }
    if (user.role !== "admin") {
      return res.status(403).send({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

module.exports = verifyAdminToken;
