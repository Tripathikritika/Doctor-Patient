import actionConstants from './actionTypes'
import axios from 'axios'

const patientsDetailsRequest = () =>  ({
    type : actionConstants.PATIENTS_GET_DETAILS_REQUEST
})
const patientsDetailsSuccess= (payload , totalCount) =>  ({
    type:actionConstants.PATIENTS_GET_DETAILS_SUCCESS,
    payload,
    totalCount
})
const patientsDetailsFailure = () =>  ({
    type:actionConstants.PATIENTS_GET_DETAILS_FAILURE
})
export const getPatientsDetails = (sortValue , filterValue,value) => (dispatch) => {
    dispatch(patientsDetailsRequest())
    axios.get(`http://localhost:5000/allRecords/?sort=${sortValue}&filter=${filterValue}&page=${value}&limit=4`)
        .then((res) => {
            // console.log(res.data.totalCount)
            dispatch(patientsDetailsSuccess(res.data,res.data.totalCount))
        })
        .catch((err) => {
            // console.log(err)
            dispatch(patientsDetailsFailure())
        })
}

const postNewpatientsDetailsRequest = () =>  ({
    type : actionConstants.PATIENTS_POST_DETAILS_REQUEST
})
const postNewpatientsDetailsSuccess= (payload ) =>  ({
    type:actionConstants.PATIENTS_POST_DETAILS_SUCCESS,
    payload,
})
const postNewpatientsDetailsFailure = () =>  ({
    type:actionConstants.PATIENTS_POST_DETAILS_FAILURE
})
export const  postNewPatientsDetails = (payload) => (dispatch) => {
    dispatch (postNewpatientsDetailsRequest())
    axios.post(`http://localhost:5000/addNew/`,{
        patient_name : payload.patient_name,
        patient_gender :  payload.patient_gender,
        patient_avatar : payload.patient_avatar,
        patient_age : payload.patient_age,
        patient_medicine : payload.patient_medicine
    })
        .then((res) => {
            console.log(res.data)
            dispatch (getPatientsDetails())
        })
        .catch((err) => {
            // console.log(err)
            dispatch (postNewpatientsDetailsFailure())
        })
}

const singleDataRequest = () => ({
    type : actionConstants.PATIENTS_SINGLE_DETAILS_REQUEST

})
const singleDataSuccess = (payload) => ({
    type : actionConstants.PATIENTS_SINGLE_DETAILS_SUCCESS,
    payload

})
const singleDataFailure = () => ({
    type : actionConstants.PATIENTS_SINGLE_DETAILS_FAILURE,

})
export const singleData = (payload) =>(dispatch) => {
    dispatch(singleDataRequest())
    axios.get(`http://localhost:5000/singleItem/${payload}`)
        .then((res) => dispatch(singleDataSuccess(res.data[0])))
        .catch((err => dispatch(singleDataFailure(err))))
     

}
export default {
    patientsDetailsRequest,
    patientsDetailsSuccess,
    patientsDetailsFailure,

    postNewpatientsDetailsRequest,
    postNewpatientsDetailsSuccess,
    postNewpatientsDetailsFailure,
    singleDataRequest,
    singleDataSuccess,
    singleDataFailure,

}