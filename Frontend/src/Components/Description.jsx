import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { singleData } from '../Redux/PatientsRedux/actions'

export default function Description() {
    const params = useParams()
    const patientArray = useSelector(state => state.patientReducer.singleItem)
    const dispatch = useDispatch()
    const [med , setMed] = useState([])
    console.log(patientArray.patient_medicine)
    useEffect(() => {
        dispatch(singleData(params.patient_name))
    }, [])

   useEffect(() => {
        setMed(patientArray.patient_medicine)
    }, [patientArray])

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                               {
                                   med && med.map((item)=>
                                        <p>
                                            {item.medicine_name}
                                        </p>
                                   )
                               }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
