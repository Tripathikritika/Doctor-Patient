const { string } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DoctorPatientSchema = new Schema ({
    registration_id : {
        type:String
    },
    patient_name : {
        type : String,
    },
    patient_gender : {
        type : String
    },
    patient_avatar : {
        type : String
    },
    patient_age : {
        type : String
    },
    patient_medicine : {
        type:Array
    }
},
    {
        versionKey: false,
    }
)

module.exports = mongoose.model("Patient" , DoctorPatientSchema)