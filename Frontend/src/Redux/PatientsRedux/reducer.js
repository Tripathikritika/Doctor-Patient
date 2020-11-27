import actionConstants from './actionTypes'

const initState = {
    patientArray : []
}

const reducer =  ( state = initState , action) => {
    switch ( action.type ) {
        case actionConstants.PATIENTS_GET_DETAILS_REQUEST :
            return {
                ...state
            }
        case actionConstants.PATIENTS_GET_DETAILS_SUCCESS :
            return {
                ...state,
                patientArray : action.payload
            }
        case actionConstants.PATIENTS_GET_DETAILS_FAILURE :
            return {
                ...state
            }
        default : 
            return {
                ...state
            }
    }
}

export default reducer