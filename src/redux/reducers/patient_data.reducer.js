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
        case 'RESET_STORE':
            return null;
        default:
            return state;
    }
}

const allPatientProcessedData = (state = {}, action) => {
    switch (action.type) {
        case 'STORE_ALL_PROCESSED_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    patientData,
    recentProcessedData,
    allPatientProcessedData
});