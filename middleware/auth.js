const jwt = require('jsonwebtoken')
const UserModal = require('../models/User')
const ProductModal = require('../models/Product')

const checkuserauth = async(req,res,next)=>{
    const {token} = req.cookies
    if (!token){
        res.status(401)
        .json({status:"failed", message:"unauthorized user, no token"})
    }
    else{
        const verifytoken = jwt.verify(token,'psj@mca123456789')
        // console.log(verify)
        const data =await UserModal.findOne({_id:verifytoken.ID})
        // console.log(user)
        req.data1 = data
        next()
    }
}
module.exports = checkuserauth
