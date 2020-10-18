const express = require('express');
const authRoutes = require('./routes/routes')
const cookieParser = require('cookie-parser')
require('./db/mongoose')
const app = express();
const PORT = process.env.PORT ||3000

// Middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())
app.use(authRoutes)

// View engine
app.set('view engine', 'ejs');

app.listen(PORT,()=>console.log('Server listening to 3000'))