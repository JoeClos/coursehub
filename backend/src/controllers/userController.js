const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register new user
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//   Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide both email and password" });
  }

  try {
    let user = await User.findOne({ email });
    console.log("Found user:", user);
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = {
      user: { id: user.id, role: user.role, email: user.email },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Generated token:", token);
    res.status(200).json({ token, message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//   Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// const registerUser = async (req, res) => {
//     try {
//       const { firstName, lastName, email, password, role } = req.body;
//       console.log(req.body);
//       if (!firstName || !lastName || !email || !password ) {
//         return res.status(400).json({ message: "All fields are required" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({ firstName, lastName, email, password: hashedPassword, role });

//       await newUser.save();
//       res.status(201).json({ message: "User registered successfully!" });
//     } catch (error) {
//       console.error("Error registering user:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   };

module.exports = { registerUser, getUsers, loginUser };
