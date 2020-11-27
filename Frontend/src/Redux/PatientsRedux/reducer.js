import actionConstants from './actionTypes'

const initState = {
    patientArray : [],
    totalCount : 0,
    singleItem : []
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
                patientArray : action.payload,
                totalCount : action.totalCount
            }
        case actionConstants.PATIENTS_GET_DETAILS_FAILURE :
            return {
                ...state
            }
        case actionConstants.PATIENTS_POST_DETAILS_REQUEST:
            return {
                ...state
            }
        case actionConstants.PATIENTS_POST_DETAILS_SUCCESS :
            return {
                ...state,
                patientArray :[...state.patientArray, action.payload]
            }
        case actionConstants.PATIENTS_POST_DETAILS_FAILURE :
            return {
                ...state
            }
            case actionConstants.PATIENTS_SINGLE_DETAILS_REQUEST:
                return {
                    ...state
                }
            case actionConstants.PATIENTS_SINGLE_DETAILS_SUCCESS :
                return {
                    ...state,
                    singleItem :action.payload
                }
            case actionConstants.PATIENTS_SINGLE_DETAILS_FAILURE :
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