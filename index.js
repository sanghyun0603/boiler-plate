const express = require("express");
const app = express();
const port = 5050;
const { User } = require("./models/User");

const config = require("./config/key");

//application/x-xxx-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//application/json 파싱
app.use(express.json());

const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("mongodb connedt"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World1"));

app.post("/register", (req, res) => {
  //회원 가입 할때 필요 정보 클라에서 가져오면 db에 넣는 펑션
  const user = new User(req.body);
  console.log(req.body);
  user
    .save()
    .then((userInfo) => res.status(200).json({ success: true }))
    .catch((err) => res.json({ success: false, err }));
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
