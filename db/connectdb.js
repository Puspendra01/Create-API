const mongoose = require('mongoose')



const connectDB =()=>{
    return mongoose.connect(process.env.LOCAL_URL)

    .then(()=>{
        console.log("Database connected...")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDB