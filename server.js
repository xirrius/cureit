require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const connect = require("./config/connectDb");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const staffRouter = require("./routes/staffRoutes");
const path = require("path")
const app = express();

// middlewares

app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/staff", staffRouter);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(
        `Server running in ${process.env.NODE_MODE} mode on port ${port}`.bgCyan
          .white
      );
    });
  } catch (error) {
    console.log(`${error.message}`.bgRed.white);
  }
};

start();
