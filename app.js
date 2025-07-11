const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const auth = require("./middlewares/auth");

const app = express();
const { PORT = 3001 } = process.env;
const { login, createUser } = require("./controllers/users");

app.use(express.json());
app.use(cors());

app.post("/signin", login);
app.post("/signup", createUser);

app.get("/items", require("./controllers/clothingItems").getItems);

app.use(auth);

app.use("/", mainRouter);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Internal Server Error" : message,
  });
  next();
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(console.error);
