require('dotenv').config();
require('jquery');

const express = require('express');
const app = express();
const routes = require('./routes');
const methodOverride = require('method-override');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Posts = require("./models").Posts
const path = require('path');
const multer = require("multer");

const Category = require('./models').Category;

const uploadProf = multer({dest: __dirname + "/public/images/profile/" });

app.use(cookieParser());

const verifyToken = (req,res,next) => {
    if(req.query.require === 'false') {
        let token = req.cookies.jwt;
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
            if(err || !decodedUser) {
                req.user = null;
                next();
                return;
            } else {
                req.user = decodedUser;
                next();
                return;
            }  
        })
    } else {
        let token = req.cookies.jwt;

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
            if(err || !decodedUser){
                return res.redirect("/auth/login?redirect="+req.originalUrl);
            }
                
            req.user = decodedUser;

            next();
            return;
        })
    }
};

const findCategories = (req,res,next) => {
    Category.findAll()
    .then(allCategories => {
        req.categories = allCategories;
        next();
    })
}


app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));



app.use('/css', express.static('node_modules/bootstrap/dist/css'));
app.use('/js', express.static('node_modules/bootstrap/dist/js'));
app.use('/js', express.static('node_modules/jquery/dist'));
app.use('/images',express.static('public/images'));
app.use("/public", express.static("public"));

app.use(express.static('public'));

app.use('/users', verifyToken, findCategories, routes.users);
app.use('/posts', verifyToken, findCategories, routes.posts);
app.use('/auth', findCategories, routes.auth);
app.use("/view", routes.view)

app.get('/',(req,res,next) => {
    let token = req.cookies.jwt;

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if(err || !decodedUser) {
            req.user = null;
            return;
        }

        req.user = decodedUser;
    })

    Category.findAll()
    .then(allCategories => {
        req.categories = allCategories;
    })

    Posts.findAll()
    .then(allPosts => {
        res.render('index.ejs', {
            posts: allPosts,
            user: req.user,
            allCategories: req.categories
        })
    })
    
});

app.post("/uploadProf", uploadProf.single("profileImg"), (req,res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error'
})

app.get('/about', (req,res) => {
    Category.findAll()
    .then(allCategories => {
        req.categories = allCategories;
        res.render('about.ejs', {
            allCategories: req.categories
        })
    })
})

app.listen(process.env.PORT, () => console.log('Running on port '+process.env.PORT));

module.exports = {
    uploadProf
}