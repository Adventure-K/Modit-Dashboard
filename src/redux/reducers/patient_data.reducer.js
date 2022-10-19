import { combineReducers } from 'redux';
const patientData = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PATIENT_DATA':
            return action.payload;
        default:
            return state;
    }
}

const recentProcessedData = (state = {}, action) => {//patient's most recent session
    switch (action.type) {
        case 'STORE_RECENT_PROCESSED_DATA':
            return action.payload;
        case 'RESET_PROCESSED_DATA':
            return null;
        default:
            return state;
    }
}

const averagePatientProcessedData = (state = {}, action) => {//patient's average session data
    switch (action.type) {
        case 'STORE_AVERAGE_PROCESSED_DATA':
            return action.payload;
        case 'RESET_AVERAGE_DATA':
            return null;
        default:
            return state;
    }
}

const allPatientSessions = (state = [], action) => {// all sessions for a specific patient
    switch (action.type) {
        case 'STORE_ALL_PATIENT_SESSIONS':
            return action.payload
        default:
            return state;
    }
}

export default combineReducers({
    patientData,
    recentProcessedData,
    averagePatientProcessedData,
    allPatientSessions
});