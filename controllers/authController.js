const User = require('../models/user.js')

const handleErrors = (err) => {
    let errors = { email: '', password: '' }
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
       res.status(201).send(user)
   } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
   }
   
  }
  
module.exports.login_get = (req,res)=>{
    res.render('login')
}
module.exports.login_post = (req,res)=>{
    res.send('login post')
}
