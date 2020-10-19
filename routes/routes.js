const {Router} = require('express')
const {index,smoothies,signup_get,signup_post,login_get,login_post,logout_get} = require('../controllers/authController')
const {requireAuth,checkUser} = require('../middleware/authMiddleware.js')
const router = Router()

//Routes
router.get('*',checkUser)
router.get('/',index)
router.get('/smoothies',requireAuth,smoothies)
router.get('/signup',signup_get)
router.post('/signup',signup_post)
router.get('/login',login_get)
router.post('/login',login_post)
router.get('/logout',logout_get)

module.exports = router