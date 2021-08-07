const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String
    },
    price:{
        type:Number
    },
    tags:[String]
},
    {timestamps:true}
)

const Course = mongoose.model('Course',courseSchema)

module.exports = Course
