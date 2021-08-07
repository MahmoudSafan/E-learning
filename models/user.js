const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const studentSchema = mongoose.Schema({
    userId:{
        type:Number
    },
    name:{
        type:String,
        required:true,
        // unique:true,
        trim:true
    },
    
    password:{
        type:String,
        required:true,
        trim:true
        
    },
    email:{
        type:String,
        required:true,        
        unique:true
    },
    courses:[{
        course:{
            type:[String]
        }
    }],
    tokens:[{
        token:{
            type:String,
            trim:true
        }
    }],
    otp:{
        type:String,
        default:Date.now()
    },
    userStates:{
        type:Boolean,
        default:false
    }
},
    {timestamps:true}
)

studentSchema.pre('save',async function(){
    const student = this
    const lastStudent = await Student.findOne({}).sort({_id:-1})

    if(!lastStudent)
        student.userId = 1 
    else{
        student.userId = lastStudent.userId + 1;
    }
    
    if(student.isModified('password')){
        let salt =  bcrypt.genSaltSync(10)
        student.password =  bcrypt.hashSync(student.password, salt)
    }
})

studentSchema.statics.login = async (email,pass) => {
    const student = await Student.findOne({email});
    if(!student) throw new Error('email not found')
    
    const x = await bcrypt.compare(pass,student.password);
    if(!x) throw new Error('Invalid password')
    console.log(x);
    return student
}

studentSchema.methods.generateToken = async function(){
    const student = this
    const token = jwt.sign({_id:student._id.toString()},process.env.JWTKEY)
    student.tokens = student.tokens.concat({token})
    await student.save()
    return token

}

studentSchema.statics.findByEmail = (email) =>{
    let user = Student.findOne({email})
    if(!user) return 'Invalid Email'
    return user 
}

studentSchema.statics.deleteUser = async (email) => {
    const x =  await Student.findByEmail(email)
    if(!x) throw new Error("Invalid Email")
    await Student.deleteOne({email})
}

const Student = mongoose.model('Student',studentSchema); 

module.exports = Student