const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
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

//Hash password before saving to DB
userSchema.pre('save',async function(next){
    const user = this
    const salt = await bcrypt.genSalt()
    user.password =await bcrypt.hash(user.password,salt)
    next()
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('Wrong Password');
    }
    throw Error('Email not found');
  };
//Model
const User = mongoose.model('user',userSchema)

module.exports = User