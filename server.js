const express = require('express');
const app = express();

app.set('view engine','ejs');

app.listen(process.env.PORT, () => console.log('Running on port 3000!'));