const express = require("express");
const app = express();
const port = 5050;

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://hyun:abcd1234@cluster0.dnv9x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {}
  )
  .then(() => console.log("mongodb connedt"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
