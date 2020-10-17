const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT ||3000
// Middleware
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');

// DB connection
const dbURI = 'mongodb://127.0.0.1:27017/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));