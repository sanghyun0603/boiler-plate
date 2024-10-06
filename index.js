import express from "express";
import mongoose from "mongoose";
import mongoURI from "./config/key.js";
import User from "./models/User.js";
import cookieParser from "cookie-parser";
const app = express();
const port = 5050;

//application/x-xxx-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//application/json 파싱
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(mongoURI, {})
  .then(() => console.log("mongodb connedt"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World1"));

//현재 원인.. 가입은 문제없이된다. user.save부분 then catch로 콜백없이 해결
//

app.post("/api/user/register", (req, res) => {
  //회원 가입 할때 필요 정보 클라에서 가져오면 db에 넣는 펑션
  const user = new User(req.body);
  console.log(req.body);
  user
    .save()
    .then((userInfo) => res.status(200).json({ success: true }))
    .catch((err) => res.json({ success: false, err }));
});

app.post("/api/user/login", async (req, res) => {
  try {
    console.log(req.body);

    // 이메일로 유저 찾기
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 비밀번호 확인
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }

    // 토큰 발급
    const userWithToken = await user.generateToken();

    // token을 저장. cookie, localstorage, session 등
    res
      .cookie("x_auth", userWithToken.token)
      .status(200)
      .json({ loginSuccess: true, userId: userWithToken._id });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
