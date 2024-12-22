const jwt = require("jsonwebtoken")
const createError = require("../utils/createError")
const User = require("../models/user.model")



const auth = async (req , res , next) => {

    try {
    
        const token = req.cookies.token

        if(!token){
            return next(createError("UnAuthorized" , 401))
        }

        jwt.verify(token , process.env.JWT_SECRET , async (err , decodedToken) => {

            if(err){
                return next(createError("Access Forbiden" , 403))
            }

            const user = await User.findById(decodedToken.userId)

            if(!user){
                return next(createError("User not exist" , 404))
            }

            req.user = user
        })

    } catch (error) {
        next(error)
    }
}




module.exports = auth