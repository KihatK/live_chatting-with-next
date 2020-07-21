const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');

const db = require('./models/index');
const socket = require('./socket');
const userRouter = require('./routes/user');
const roomRouter = require('./routes/room');
const passportConfig = require('./passport');

dotenv.config();

const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('database connected');
    });
passportConfig();

const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
});

app.use(morgan('dev'));
app.use(cors({
    origin: true,
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/room', roomRouter);

const server = app.listen(3065, () => {
    console.log('Server is running on port 3065');
});

socket(server, app);