import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from '../Styling/Card.module.css'
import {getPatientsDetails} from '../Redux/PatientsRedux/actions'

export default function Cards() {
    const patientArray = useSelector(state => state.patientReducer.patientArray)
    const dispatch = useDispatch()
    
    useEffect(() => {
        console.log(patientArray)
        dispatch(getPatientsDetails())
    }, [])
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            {
                                patientArray && patientArray.map((item) => (
                                    < div key={item.registration_id} >
                                        <div className="col-12 col-md-6" >
                                            <div className="card h-100" style={{width:'15rem' , display:'flex' , alignSelf: 'center'}}>
                                                <img src={item.patient_avatar} className={`card-img-top img-fluid`} alt={item.patient_name} />
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
