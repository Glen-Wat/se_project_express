const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const auth = require("./middlewares/auth");

const { errors } = require("celebrate");

require("dotenv").config();

const { PORT = 3001 } = process.env;
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");

const {
  validateLogin,
  validateCreateUser,
} = require("./middlewares/validation");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log("Incoming request body:", req.body);
  next();
});

app.use(cors());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signin", validateLogin, require("./controllers/users").login);
app.post(
  "/signup",
  validateCreateUser,
  require("./controllers/users").createUser
);

app.get("/items", require("./controllers/clothingItems").getItems);
app.use(auth);
app.use("/", mainRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(console.error);
