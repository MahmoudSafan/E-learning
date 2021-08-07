const mongoose = require('mongoose')

try{
    mongoose.connect('mongodb://localhost:27017/StudentTask',{
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
catch(e){
    console.log(e)
}