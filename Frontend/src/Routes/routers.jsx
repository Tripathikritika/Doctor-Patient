import React from 'react'
import { Route ,Switch} from "react-router-dom"
import Dashboards from "../Components/Dashboards"
import AddData from '../Components/AddData'
import Description from '../Components/Description'

export default function routers() {
    return (
        <div>
            <Switch>
                <Route path='/' exact render={() => <Dashboards />}/>
                <Route path='/addNew' exact render={() => <AddData />}/>
                <Route path = '/description/:patient_name' render = {() => <Description />} />
            </Switch>
        </div>
    )
}
