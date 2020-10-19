const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

//Function to handle errors
const handleErrors = (err) => {
    console.log(err.message,err.code)
    let errors = { email: '', password: '' }
    if(err.message=='Email not found'){
        errors.email = err.message;
    }
    if(err.message=='Wrong Password'){
        errors.password = err.message;
    }
    if (err.code === 11000) {
        errors.email = 'Email is already registered';
        return errors;
    }
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        });
    }
    return errors
}

const maxTokenAge = 3*24*60*60
const createToken = (id)=>{
    return jwt.sign({id},'SECRET',{expiresIn:maxTokenAge})
}

//Route Controllers
module.exports.index = (req,res)=>{
    res.render('home')
}
module.exports.smoothies = (req,res)=>{
    res.render('smoothies')
}
module.exports.signup_get = (req,res)=>{
    res.render('signup')
}
module.exports.signup_post = async (req, res) => {
   const {email,password} = req.body
   try {
       const user = await User.create({email,password})
       const token = createToken(user._id)
       res.cookie('jwt',token,{httpOnly:true,maxAge:maxTokenAge})
       res.status(201).send({user:user._id})
   } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
   }
   
  }
  
module.exports.login_get = (req,res)=>{
    res.render('login')
}
module.exports.login_post = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.login(email,password)
        const token = createToken(user._id)
       res.cookie('jwt',token,{httpOnly:true,maxAge:maxTokenAge})
        res.status(200).json({user:user._id})
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/')
}