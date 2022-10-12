import { combineReducers } from 'redux';
const patientData = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PATIENT_DATA':
            return action.payload;
        default:
            return state;
    }
}

const recentProcessedData = (state = {}, action) => {
    switch (action.type) {
        case 'STORE_RECENT_PROCESSED_DATA':
            return action.payload;
        case 'RESET_PROCESSED_DATA':
            return null;
        default:
            return state;
    }
}

const averagePatientProcessedData = (state = {}, action) => {
    switch (action.type) {
        case 'STORE_AVERAGE_PROCESSED_DATA':
            return action.payload;
        case 'RESET_AVERAGE_DATA':
            return null;
        default:
            return state;
    }
}

export default combineReducers({
    patientData,
    recentProcessedData,
    averagePatientProcessedData
});