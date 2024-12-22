const express = require("express")
const { register, login, updateProfile } = require("../controllers/user.controller")
const auth = require("../middlewares/auth")


const router = express.Router()


router.route("/register").post(register)

router.route("/login").post(login)

router.route("/profile/update").post(auth , updateProfile)



module.exports = router