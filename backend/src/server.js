const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courses");
const userRoutes = require('./routes/users');

require("dotenv").config;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Routes
app.use("/api", courseRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
