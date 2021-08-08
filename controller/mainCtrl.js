const Student = require('../models/user')
const Course = require('../models/course');
const { findOne } = require('../models/user');


const signUpStudent = (req,res) => {
   try{
        const studentData = new Student(req.body)
        studentData.save()

        res.status(200).send({
            apiStatus: true,
            data: studentData,
            message:"Student successfully inserted"
        })
    }
    catch(e){
        console.log(e);
        res.status(500).send({
            apiStatus: false,
            data: e,
            message:"User Inserted Rejected"
        })
    }
}

const login = async (req,res)=>{
    try{
       student =  await Student.login(req.body.email,req.body.password)
       student.generateToken()
    // console.log(student);

       res.status(200).send({
           apiStatus:true,
           data:{student},
           message:"User Successfully logged"
       })
    }
    catch(e){
        console.log(e);
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"User Failled to login"
        })
    }
}

const profile = async (req,res) =>{
    res.send(req.user)    
}

const activate = async (req,res)=>{
    try{
        const student = await Student.findOne({otp:req.params.otp, userStates:false})
        if(!student) throw new Error('User not found')
        student.userStates = true
        student.otp = ""
        student.save()
        res.status(200).send({
            apiStatus:true,
            data:{student},
            message:"Üser Successfuly Activated"
        })
    }
    catch(e){
        console.log(e);
        res.status(400).send({
            apiStatus:false,
            data:e,
            message:"User not found"
        })
    }
}

const deActivate = async (req,res)=>{
    try{
        const student = await Student.findOne({email:req.body.email})
        if(!student) throw new Error('User not found')
        student.userStates = false
        student.otp = Date.now()
        student.save()
        
        res.status(200).send({
            apiStatus:true,
            data:{},
            message:"User Deactivated"
        })
    }
    catch(e){
        
        res.status(500).send({
            apiStatus:false,
            data:e,
            message:"User Cannot Deactivated"
        })
    }
}

const logout = async (req,res) =>{
    req.user.tokens = req.user.tokens.filter(ele =>{
        return ele.token != req.token
    })
    await req.user.save()
    res.status(200).send({
        apiStatus:true,
        message:"User Logged out"
    })
}

const addCourse = async (req,res)=>{
    try{
        // console.log(req.body.courseId,req.user._id);
    courseSearch = Student.findOne({course:req.body.courseId.toString()})
        if(courseSearch){
            res.status(400).send({
                apiStatus:false,
                message:"course alredy inrolled"
            })
        }
        else{
        Student.addCourse(req.body.courseId,req.user._id)
        res.status(200).send({
            apiStatus:true,
            message:"course was added successfuly"
        })
    }
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message
        })
    }
}

const getUserCourses = async (req,res)=>{
    try{
        await req.user.populate({
            path:"Courses"
        }).execPopulate()
        res.status(200).send({
            apiStatus:true,
            data:{user:res.user,course:res.course}
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message
        })
    }
}

module.exports = {
    signUpStudent,
    login,
    logout,
    profile,
    activate,
    deActivate,
    getUserCourses,
    addCourse,
}