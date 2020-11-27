import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postNewPatientsDetails } from '../Redux/PatientsRedux/actions'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CancelIcon from '@material-ui/icons/Cancel';

export default function AddData() {
    const [queryDetails, setqueryDetails] = useState({patient_name: "", patient_gender:"", patient_avatar:"", patient_age:"", patient_medicine:[]})
    const [medicine, setMedicine] = useState("")
    const [quantity, setQuantity] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()
    
    const handleChange = (e) =>{
        setqueryDetails({
            ...queryDetails,
            [e.target.name] : e.target.value
        })
    }
    const handleMultipleMed = () => {
        let arrayData = {
            medicine_name: medicine,
            medicine_quantity: quantity
        }
        setqueryDetails({
            ...queryDetails,
            patient_medicine: [...queryDetails.patient_medicine, arrayData]
        })
        setMedicine("")
        setQuantity("")
    }
    const handleAddNewPatient = (e) => {
        e.preventDefault()
        dispatch(postNewPatientsDetails(queryDetails)) 
        history.push('/')
        
    }
    const handleCancel = (e) => {
        e.preventDefault()
        history.push('/')
    }
    return (
        <div className="container p-5" >
            <div className="row mx-5 p-5" style={{border:'1px solid black'}}>
                <div className="col-12 mx-5 px-5" >
                    <h4 >Add New Patient</h4>
                </div>
            <div className="col-12">
            <form  onSubmit={handleAddNewPatient}>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <input type="text" onChange={handleChange} value={queryDetails.patient_name} className="form-control" name="patient_name" placeholder="Patient's Name" required/>
                    </div>
                    <div className="form-group col-md-12">
                        <input type="text" onChange={handleChange} value={queryDetails.patient_avatar} className="form-control" placeholder="Patient's Avatar URL" name="patient_avatar"  required/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <input type="text" onChange={handleChange} value={queryDetails.patient_age} className="form-control"  placeholder="Patient's Age" name="patient_age"  required/>
                    </div>
                    <div className="form-group col-md-4">
                        <select className="form-control" name="patient_gender"  onChange={handleChange} value={queryDetails.patient_gender} required>
                            <option  value="">Choose Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input type="text" onChange={(e)=> setMedicine(e.target.value)} value={medicine}  placeholder="Medicine's Name" className="form-control"/>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="text" value={quantity} onChange={(e)=> setQuantity(e.target.value)} className="form-control" placeholder="Medicine's Quantity" />
                    </div>
                    <div className="form-group col-md-2">
                        <div className="btn btn-secondary" onClick={handleMultipleMed}><AddBoxIcon /></div>
                    </div>
                    
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-outline-success border border-success btn-lg bg-0 m-2" ><PersonAddIcon/> Add</button>
                    <button type="submit" className="btn btn-outline-danger border border-danger  btn-lg bg-0 m-2" onClick={handleCancel}><CancelIcon/> Cancel</button>
                </div>
                </form>
            </div>
        </div>
        </div>
    )
}
