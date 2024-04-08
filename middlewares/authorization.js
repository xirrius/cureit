const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: `No token provided` });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ success: false, message: `User unauthorized` });
  }
};
