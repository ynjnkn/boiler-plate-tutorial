const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { User } = require('./models/User');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose
    .connect(config.mongoURI)
    .then(() => {
        console.log("MongoDB 연결");
    })
    .catch((err) => {
        console.log(err);
    })

app.get("/", (req, res) => {
    res.send("보일러 플레이트 튜토리얼");
});

// 회원가입 라우터
app.post('/api/users/register', (req, res) => {
    console.log(`${req.body.name} 회원가입 시작`);
    const user = new User(req.body);
    user.save((err, doc) => {
        console.log("save() 실행");
        if (err) {
            return res.json({ success: false, err });
        }
        console.log(`${req.body.name} 회원가입 완료`);
        return res
            .status(200)
            .json({
                success: true
            });
    })
});

// 로그인 라우터
app.post('/api/users/login', (req, res) => {
    // DB에서 요청한 이메일 찾기
    User.findOne({ email: req.body.email }, (err, user) => {
        console.log(`${req.body.email}에 대한 findOne() 실행`);
        if (!user) {
            console.log(`${req.body.email}에 해당하는 유저 없음`);
            return res.json({
                loginSucess: false,
                message: "입력된 이메일에 해당하는 유저가 없습니다."
            })
        }
        console.log(`${req.body.email}에 해당하는 유저 있음`);
        // 요청한 이메일이 DB에 있다면? 비밀번호가 같은지 확인
        user.comparePassword(req.body.password, (err, isMatched) => {
            console.log("콜백 comparePassword() 실행 완료");
            if (!isMatched) {
                console.log("비밀번호 일치하지 않음");
                return res.json({ loginSuccess: false, message: "잘못된 비밀번호 입니다." });
            };
            // 비밀번호가 같다면 토큰 생성
            console.log("비밀번호 일치함. 토큰 생성 시작");
            user.generateToken((err, user) => {
                console.log("콜백 generateToken() 실행 완료");
                if (err) {
                    console.log("토큰 생성 실패");
                    return res.status(400).send(err);
                };
                // 토큰을 쿠키에 저장
                console.log("쿠키에 토큰 저장");
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

app.listen(port, () => {
    console.log(`서버 실행 @ 포트 ${port}번`);
});