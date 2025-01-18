import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import courseRoutes from "./routes/courses.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server running." });
});

app.use("/courses", courseRoutes);

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server is running on port ${
          process.env.PORT || 3000
        }\nVisit http://localhost:${process.env.PORT || 3000}`
      );
    });
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });
