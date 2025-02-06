const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courses");
const userRoutes = require('./routes/users');
const subscriptionRoutes = require('./routes/subscriptions');

require("dotenv").config;

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors());
app.use(cors({
  origin: "https://coursehubui.netlify.app", // Allow frontend to access
  methods: "GET,POST,PUT,DELETE",
  credentials: true, 
}));
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Routes
app.use("/api", courseRoutes);
app.use('/api', userRoutes);
app.use('/api', subscriptionRoutes)

// Catch-all for undefined routes
// app.use((req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
