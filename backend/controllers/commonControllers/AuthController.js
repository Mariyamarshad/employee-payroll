const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (password != confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User already exists, you can login ",
        });
    }

    if (role === "admin") {
      const adminExists = await User.findOne({ role: "admin" })
      if(adminExists) {
        return res.status(403).json({
          message: "An admin already exists. You cannot register as admin"
        })
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "employee",
    });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password} = req.body;

    const existingUser = await User.findOne({ email });
    const errorMSG = "Login failed: email or password is wrong";

    if (!existingUser) {
      return res.status(403).json({ succes: false, message: errorMSG })
    }

    const isPassEqual = await bcrypt.compare(password, existingUser.password)
    if (!isPassEqual) {
      return res.status(403).json({ success: false, message: errorMSG })
    }

    const jwtToken = jwt.sign(
      { email: existingUser.email,
        id: existingUser.id,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24*60*60*1000
    })

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
      }
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

module.exports = {
  signup,
  login,
};
