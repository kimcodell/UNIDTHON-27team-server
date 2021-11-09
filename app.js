const path = require('path');
const express = require('express');
// const session = require('express-session'); //
// const cookieParser = require('cookie-parser'); //
// const passport = require('passport'); //
const dotenv = require('dotenv'); //
const morgan = require('morgan');

//라우터 import
const companyRouter = require('./router/company');
const reservationRouter = require('./router/reservation');
const videoRouter = require('./router/video');

const db = require('./models');
// const passportConfig = require('./passport');

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 8000);

//시퀄라이즈 연결
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('DB 연결 성공');
    })
    .catch(console.error);

//morgan
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

// app.use('/', express.static(path.join(__dirname, '')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}
// app.use(session(sessionOption));

// app.use(passport.initialize());
// app.use(passport.session());


app.get('/connection-test', (req, res) => {
    console.log('let\'s start');
    res.send('welcome');
});

//라우터 연결
app.use('/company', companyRouter);
app.use('/reservation', reservationRouter);
app.use('/video', videoRouter);

//404 미들웨어
app.use((req, res, next) => {
	const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
	error.status = 404;
	next(error);
});

//에러 미들웨어
app.use((err, req, res, next) => {
    console.log("server error: ", err);
    res.status(err.status || 500);
    process.env.NODE_ENV !== 'production' ? res.send(err) : res.send('서버 요청 중 오류가 발생했습니다.');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중...');
});