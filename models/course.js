const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Student'
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String
    },
    description:{
        type:String,
    },
    price:{
        type:Number
    },
    tags:[{
        tag:{
            type:String,
            trim:true,
            // unique:true
        }
    }],
    reviews:[{
        review:{
            type:String
        }
    }]
},
    {timestamps:true}
)

const Course = mongoose.model('Course',courseSchema)

module.exports = Course
