// const express = require("express");
// const User = require("./user.model");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET;

// // Admin login route
// router.post("/admin", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const admin = await User.findOne({ username });
//     if (!admin) {
//       console.log("User not found");
//       return res.status(404).send({ message: "User not found" });
//     }

//     console.log("Admin found:", admin);

//     const isPasswordValid = await bcrypt.compare(password, admin.password);
//     console.log("Password comparison result:", isPasswordValid);
//     if (!isPasswordValid) {
//       console.log("Password is invalid");
//       return res.status(401).send({ message: "Password is invalid" });
//     }

//     const token = jwt.sign(
//       {
//         id: admin._id,
//         username: admin.username,
//         role: admin.role,
//       },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     return res.status(200).json({
//       message: "Admin login successful",
//       token: token,
//       user: {
//         id: admin._id,
//         username: admin.username,
//         role: admin.role,
//       },
//     });
//   } catch (error) {
//     console.error("Error in admin login", error);
//     return res.status(500).send({ message: "Internal server error" });
//   }
// });

// // User creation route
// router.post("/register", async (req, res) => {
//   const { username, password, role } = req.body;

//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).send({ message: "Username already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("Hashed password:", hashedPassword);

//     const newUser = new User({
//       username,
//       password: hashedPassword,
//       role,
//     });

//     await newUser.save();

//     return res.status(201).send({ message: "User created successfully" });
//   } catch (error) {
//     console.error("Error in user registration", error);
//     return res.status(500).send({ message: "Server error" });
//   }
// });

// // Admin creation route
// // Temporary route to create a user
// router.post("/create-admin", async (req, res) => {
//   const { username, password, role } = req.body;

//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).send({ message: "Username already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("Hashed password:", hashedPassword);

//     const newUser = new User({
//       username,
//       password: hashedPassword,
//       role,
//     });

//     await newUser.save();

//     res.status(201).send({ message: "User created successfully" });
//   } catch (error) {
//     console.error("Error in user registration", error);
//     res.status(500).send({ message: "Server error" });
//   }
// });

// module.exports = router;
const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Admin login route
router.post("/admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Received login request:", { username, password });
    const admin = await User.findOne({ username });
    if (!admin) {
      console.log("User not found");
      return res.status(404).send({ message: "User not found" });
    }

    console.log("Admin found:", admin);

    if (password !== admin.password) {
      console.log("Password is invalid");
      return res.status(401).send({ message: "Password is invalid" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful, generating token");
    return res.status(200).json({
      message: "Admin login successful",
      token: token,
      user: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Error in admin login", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

// User creation route
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: "Username already exists" });
    }

    const newUser = new User({
      username,
      password, // Storing plain text password (not recommended)
      role,
    });

    await newUser.save();

    return res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in user registration", error);
    return res.status(500).send({ message: "Server error" });
  }
});

// Admin creation route
// Temporary route to create a user
router.post("/create-admin", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: "Username already exists" });
    }

    const newUser = new User({
      username,
      password, // Storing plain text password (not recommended)
      role,
    });

    await newUser.save();

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in user registration", error);
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = router;
