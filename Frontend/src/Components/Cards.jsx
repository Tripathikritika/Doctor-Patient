import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {getPatientsDetails} from '../Redux/PatientsRedux/actions'

export default function Cards({sorted ,filters }) {
    const patientArray = useSelector(state => state.patientReducer.patientArray)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {

        dispatch(getPatientsDetails(sorted ,filters,1 ))
    }, [sorted ,filters])

    const handleDescription = (patient_name) => {
        history.push(`/description/${patient_name}`)
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row"style={{display:'flex',justifyContent:'center'}}>
                            {
                                patientArray.current && patientArray.current.map((item) => (
                                    < div key={item.registration_id} >
                                        <div className="col-12"  >
                                            <div className="card h-100" style={{width:'15rem' , display:'flex' }}>
                                                <img src={item.patient_avatar} onClick={() =>handleDescription(item.patient_name)} className={`card-img-top img-fluid`} alt={item.patient_name} />
                                                <div className="card-body">
                                                    <p className="card-text">
                                                        <b>Name: </b> {item.patient_name} <br/>
                                                        <b>Age :</b> {item.patient_age}<br/>
                                                        <b>Gender:</b>  {item.patient_gender}<br/>
                                                        <b>Medicine Count:</b> {item.patient_medicine.length}<br/>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
