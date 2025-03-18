require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimiter = require("express-rate-limit");
const { PORT } = process.env;
const routes = require("./routes");

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many request, try again later",
  })
);
app.use(routes);

app.get("/", (req, res) => {
  res.send("Welcome to our API!");
});

// error handling 404
app.use((req, res, next) => {
  return res.status(404).json({
    status: false,
    message: "are you lost?",
  });
});

// error handling 500
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: false,
    message: `Internal server error ${err.message}`,
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
