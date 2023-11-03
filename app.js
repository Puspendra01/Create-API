const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const web = require('./routes/web.js')
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload");
const cookieparser = require('cookie-parser')
const cors = require('cors')


app.use(cors())
//get token in auth
app.use(cookieparser())
//temp file uploader
app.use(fileUpload({useTempFiles: true}));


app.use(express.json())

connectdb()






//load router
app.use('/api',web)
//localhost:4444/api



//server create
app.listen(process.env.PORT,()=>{
    console.log(`server running on localhost: ${process.env.PORT}`)
})