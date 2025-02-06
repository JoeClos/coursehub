const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courses");
const userRoutes = require("./routes/users");
const subscriptionRoutes = require("./routes/subscriptions");

require("dotenv").config();
// console.log("Allowed Frontend URL:", process.env.CLIENT_URL);

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = process.env.CLIENT_URL;
console.log("CORS Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Request Origin:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Routes
app.use("/api", courseRoutes);
app.use("/api", userRoutes);
app.use("/api", subscriptionRoutes);

// Catch-all for undefined routes
// app.use((req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
