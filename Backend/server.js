const express =  require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const Patient = require('./model/patientsSchema')
const patientList = require('./patientDetails.js')
const router = require('./router/routes')

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

mongoose.connect( process.env.ATLAS_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
},(err) => {
    if(err){
        console.log("Connection to database Failed")
    }
    else{
        console.log("Connection To database is Successful!!")
        // Patient.insertMany(patientList)
        //         .then(()=> console.log("Inserted Succesfully"))
        //         .catch((err) => console.log(err))
    }
})

app.use('/' , router)

app.listen(5000 , () => {
    console.log("Server is up and running successfully at port 5000!")
})