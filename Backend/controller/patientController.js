const Patients = require('../model/patientsSchema')

const getPatientRecords = async(req,res) =>{
    Patients.find()
            .then((patients) => res.json(patients))
            .catch((err) => res.status(400).json("Error: " + err));
}

module.exports = {
    getPatientRecords
}