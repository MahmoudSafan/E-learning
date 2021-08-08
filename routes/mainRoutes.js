const express = require('express')
const router = express.Router()
const studentCtrl = require('../controller/mainCtrl')
const auth = require('../middleware/auth') 

router.post('/signup',studentCtrl.signUpStudent)

router.post('/login',studentCtrl.login)

router.post('/logout',auth,studentCtrl.logout)

router.post('/activate/:otp',studentCtrl.activate)

router.post('/deactivate',auth,studentCtrl.deActivate)

router.get('/profile',auth,studentCtrl.profile)

router.post('/addCourse',auth,studentCtrl.addCourse)

router.get('/myClasses',studentCtrl.getUserCourses)

module.exports = router
