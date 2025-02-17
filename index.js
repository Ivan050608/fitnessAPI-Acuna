const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://ivanacuna055:admin123@cluster0.bcl9r.mongodb.net/fitness-tracker-API?retryWrites=true&w=majority&appName=Cluster0");

mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if (require.main === module) {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`);
  });
}

module.exports = { app, mongoose };
