const Student = require('../models/user')
const Course = require('../models/course');
const { findOne } = require('../models/user');

const showAllStudents = async (req,res)=>{
    try{
        let students = await Student.find({})
        console.log(students);
        res.status(200).send({
            apiStatus:true,
            data:{students},
            message:'Retrive all data'
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e,
            message:'Vailed to retrive all data'
        })
    }
}

const showSingleStudent = async (req,res)=>{
    try{
        let student = await Student.find({'userId':req.params.userId})
        res.status(200).send({
            apiStatus:true,
            data:{student},
            message:'Retrive Student data'
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e,
            message:'Vailed to retrive  data'
        })
    }

}

const deleteStudent = async (req,res)=>{
    try{
        await Student.deleteUser(req.body.email)

        res.status(200).send({
            apiStatus:true,
            message:"User Deleted Successfully"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"Invalid User Email"
        })
    }
}

const addCourse = async (req,res) =>{
    try{
        
        const courseData = new Course({
            userId:req.user._id,
            ...req.body
        })
        await courseData.save() 
        
        res.status(200).send({
            apiStatus:true,
            data:courseData,
            message:"Course successfully add"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e,
            message:"Invalid course data"
        })
    }
}

module.exports = {
    showAllStudents,
    showSingleStudent,
    deleteStudent,
    addCourse,
}