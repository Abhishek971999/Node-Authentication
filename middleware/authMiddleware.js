const jwt = require('jsonwebtoken')

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token,'SECRET',(err,decoded)=>{
            if(err){
                res.redirect('/login')
            }else{
                next()
            }
        })
    }else{
        res.redirect('/login')
    }
}

module.exports = requireAuth