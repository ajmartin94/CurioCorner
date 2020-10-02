require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/users',routes.users);
app.use('/posts',routes.posts);
app.use('/auth',routes.auth);


app.get('/',(req,res) => {
    res.render('index.ejs')
});

app.listen(process.env.PORT, () => console.log('Running on port '+process.env.PORT));

