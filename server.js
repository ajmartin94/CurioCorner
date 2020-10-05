require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes');
const methodOverride = require('method-override');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const verifyToken = (req,res,next) => {
    let token = req.cookies.jwt;

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if(err || !decodedUser){
            return res.send("Error in JWT");
        }

        req.user = decodedUser;

        next();
    })
};


app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/users', verifyToken, routes.users);
app.use('/posts', verifyToken, routes.posts);
app.use('/auth',routes.auth);


app.get('/',(req,res) => {
    res.render('index.ejs')
});

app.listen(process.env.PORT, () => console.log('Running on port '+process.env.PORT));

