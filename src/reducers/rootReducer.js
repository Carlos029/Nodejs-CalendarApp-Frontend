import {combineReducers} from 'redux'
import { authReducer } from './authReducer'
import { calendarReducer } from './calendarReducer'
import { uiReducer } from './uiReducer'

//combinacion de todos mis reducers (el de autenticacion, el del calendario y el del UI)

export const rootReducers = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
})