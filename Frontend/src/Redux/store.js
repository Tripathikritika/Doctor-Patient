import { combineReducers ,  createStore , applyMiddleware , compose } from 'redux'
import thunk from 'redux-thunk'
import patientReducer from './PatientsRedux/reducer'

let composeEnhancers = compose

const rootReducer = combineReducers({ patientReducer })

if( process.env.NODE_END !== 'production'){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
}

const enchancer = composeEnhancers( applyMiddleware(thunk))

const store = createStore( rootReducer , enchancer )

export default store