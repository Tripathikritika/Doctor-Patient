const express = require('express')
const router = express.Router()
const { getPatientRecords,postPatientRecords,oneData } = require("../controller/patientController")

router.get('/allRecords' , getPatientRecords)
router.post('/addNew' , postPatientRecords)
router.get('/singleItem/:patient_name' ,oneData )

module.exports = router