import actionConstants from './actionTypes'
import axios from 'axios'

const patientsDetailsRequest = () =>  ({
    type : actionConstants.PATIENTS_GET_DETAILS_REQUEST
})
const patientsDetailsSuccess= (payload) =>  ({
    type:actionConstants.PATIENTS_GET_DETAILS_SUCCESS,
    payload
})
const patientsDetailsFailure = () =>  ({
    type:actionConstants.PATIENTS_GET_DETAILS_FAILURE
})
export const getPatientsDetails = (payload) => (dispatch) => {
    dispatch(patientsDetailsRequest())
    axios.get('http://localhost:5000/allRecords')
        .then((res) => {
            console.log(res.data)
            dispatch(patientsDetailsSuccess(res.data))
        })
        .catch((err) => {
            console.log(err)
            dispatch(patientsDetailsFailure())
        })
}

export default {
    patientsDetailsRequest,
    patientsDetailsSuccess,
    patientsDetailsFailure,
}