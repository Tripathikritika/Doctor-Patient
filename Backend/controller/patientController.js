const Patients = require('../model/patientsSchema')

const getPatientRecords = async(req,res) =>{
    const page = Number(req.query.page) || 1;
    const sorted = req.query.sort === "Asc" ? 1 : req.query.sort === 'Desc' ? -1 : 0
    const filter = req.query.filter === 'Female' ? 'Female' : req.query.filter === 'Male' ? 'Male' : req.query.filter === 'Others' ? 'Others' : null
    const searchQuery = {}
    if (filter) {
      searchQuery['patient_gender'] = filter;
  }
    const limit = 2;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    results.totalCount = await Patients.countDocuments(searchQuery).exec()

    if (endIndex < (await Patients.countDocuments().exec())) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
            limit: limit,
        };
    }

    try{
        results.current = await  Patients.find(searchQuery).sort({patient_age : sorted}).limit(limit).skip((page - 1) * limit).exec()
        res.json(results)
    }
    catch(e){
        res.status(500).json( { message : e.jmessage})
    }

}

const postPatientRecords = async(req,res) => {

    const { patient_name , patient_gender ,patient_age , patient_avatar, patient_medicine } = req.body
    const patientsList = new Patients( { patient_name , patient_gender ,patient_age , patient_avatar, patient_medicine })
    
    patientsList.save()
                .then(() => res.json("Patient Added Successfully!!"))
                .catch((err) => res.status(400).json(err))

}

const oneData = async (req, res) => {
    try {
      let patient = await Patients.find({ patient_name: req.params.patient_name });
      res.status(200).json(patient);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
module.exports = {
    getPatientRecords ,postPatientRecords,oneData
}