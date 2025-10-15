jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.employee_token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Access denied: Admins only" });
  }
  next();
};



module.exports = { authMiddleware, verifyAdmin };
