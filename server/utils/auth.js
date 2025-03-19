const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if(!token) {
    return res.status(401).json({message: "Unauthorized: No token provided."});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch(error) {
    res.status(500).json({message: "Forbidden: Invalid or expired token."});
  }
}

module.exports = authMiddleware;