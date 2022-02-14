const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const config = require('./config/key');

const { User } = require('./models/User');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.status(200).json({
            success: true
        });
    })
});

app.listen(port, () => {
    console.log(`서버 실행 @ 포트 ${port}번`);
});