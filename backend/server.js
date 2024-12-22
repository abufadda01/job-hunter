const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const connectDB = require("./controllers/connectDB")


dotenv.config()


const app = express()


app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({origin : process.env.UI_URL , credentials : true}))
app.use(cookieParser())




const PORT = process.env.PORT

const start = async () => {
    try {
        app.listen(PORT , console.log(`job hunter server started on port ${PORT}`))
        await connectDB()
    } catch (error) {
        console.log(error)
    }
}


start()