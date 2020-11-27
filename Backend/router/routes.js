const express = require('express')
const router = express.Router()
const { getPatientRecords } = require("../controller/patientController")

router.get('/allRecords'  , getPatientRecords)
module.exports = router