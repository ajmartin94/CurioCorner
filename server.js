require('dotenv').config();

const express = require('express');
const app = express();

// app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render('index.ejs')
})

console.log('I think this works')

app.listen(process.env.PORT, () => console.log('Running on port '+process.env.PORT));

