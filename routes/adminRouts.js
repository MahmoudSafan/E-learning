const express = require('express')
const router = express.Router()
const adminCtrl = require('../controller/adminCtrl')
const auth = require('../middleware/auth') 

router.get('/students',adminCtrl.showAllStudents)

router.get('/students/:userId',adminCtrl.showSingleStudent)

router.post('/deleteUser',adminCtrl.deleteStudent)

router.post('/addCourse',auth,adminCtrl.addCourse)

module.exports = router