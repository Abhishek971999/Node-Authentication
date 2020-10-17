const mongoose = require('mongoose')
const { isEmail } = require('validator');

//Schema
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required: [true, 'Please enter an email'],
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type:String,
        required: [true, 'Please enter an Password'],
        minlength: [6, 'Password should have length greater than 6'],
    }
})

//Model
const User = mongoose.model('user',userSchema)

module.exports = User