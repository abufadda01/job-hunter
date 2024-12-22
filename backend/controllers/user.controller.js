const createError = require("../utils/createError")
const User = require("../models/user.model")
const bcrypt = require("bcrypt")



const register = async (req , res , next) => {

    try {
        
        const {fullname , email , phone , password , role} = req.body

        if(!fullname || !email || !phone || !password || !role){
            return next(createError("Invalid credentials" , 400))
        }

        const isUserExist = await User.findOne({email})

        if(isUserExist){
            return next(createError("User already exist" , 400))
        }

        const newUser = new User({
            email ,
            fullname ,
            phone ,
            password ,
            role
        })

        newUser.password = undefined

        await newUser.save()

        res.status(201).json({
            newUser,
            token,
        })

    } catch (error) {
        next(error)
    }

}




const login = async (req , res , next) => {

    try {
        
        const {email , password , role} = req.body

        if(!email || !password || !role){
            return next(createError("Invalid credentials" , 400))
        }

        let user = await User.findOne({email}).select("+password")

        if(!user){
            return next(createError("Invalid credentials" , 404))
        }

        const isPasswordMatched = await bcrypt.compare(password , user.password)

        if(!isPasswordMatched){
            return next(createError("Invalid credentials" , 400))
        }

        if(role !== user.role){
            return next(createError("no account exist with this role" , 404))
        }

        const token = user.signJWT()

        user.password = undefined

        res.status(200).cookie("token" , token , {
            maxAge : 1 * 24 * 60 * 60 * 1000 , // 1 day expire time
            httpOnly : true ,
            sameSite : "strict"
        }).json({
            message : `Welcome back ${user.fullname}` ,
            user
        })

    } catch (error) {
        next(error)
    }

}




// TODO ADD THE PROFILE IMAGE CLOUDNAIRY CASE
const updateProfile = async (req, res, next) => {

    try {

        const { fullname, email, phone, bio, skills } = req.body
        const file = req.file

        if (!fullname && !email && !phone && !bio && !skills) {
            return next(createError("You must provide new values", 400))
        }

        const userId = req.user._id

        let user = await User.findById(userId)

        if (!user) {
            return next(createError("User does not exist", 404))
        }

        const updateFields = {}

        if (fullname) updateFields.fullname = fullname
        if (email) updateFields.email = email
        if (phone) updateFields.phone = phone
        if (bio) updateFields.bio = bio

        if (skills) {
            const skillsArray = skills.split(",").map(skill => skill.trim())
            updateFields["profile.skills"] = skillsArray
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true } 
        );

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        })

    } catch (error) {
        next(error)
    }

}




const logOut = async (req , res , next) => {

    try {
        return res.status(200).cookie("token" , "" , {maxAge : 0}).json({message : "logged out successfully"})
    } catch (error) {
        next(error)    
    }

}









module.exports = {register , login , updateProfile , logOut}