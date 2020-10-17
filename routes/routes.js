const {Router} = require('express')
const {index,smoothies,signup_get,signup_post,login_get,login_post} = require('../controllers/authController')
const router = Router()

//Routes
router.get('/',index)
router.get('/smoothies',smoothies)
router.get('/signup',signup_get)
router.post('/signup',signup_post)
router.get('/login',login_get)
router.post('/login',login_post)

module.exports = router