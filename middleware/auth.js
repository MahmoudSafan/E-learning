const User = require('../models/user')
const jwt = require('jsonwebtoken')
const auth = async (req,res,next)=>{
 try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decodedToken = jwt.verify(token,process.env.JWTKEY)
        const user = await User.findOne({
            _id:decodedToken._id,
            'tokens.token':token
        })
        if(!user) throw new Error('401 Unauthorized')
        req.user = user
        req.token = token
        next()
    }
    catch(e){
        console.log(e);
        res.status('401').send({
            apiStatus:false,
            message:"401 Unauthorized"
        })
    }
}

module.exports = auth