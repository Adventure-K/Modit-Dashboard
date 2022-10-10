import { combineReducers } from 'redux';
const patientData = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PATIENT_DATA':
            return action.payload;
        default:
            return state;
    }
}

const processedData = (state = {}, action) => {
    switch (action.type) {
        case 'STORE_PROCESSED_DATA':
            return action.payload;
        case 'RESET_STORE':
            return null;
        default:
            return state;
    }
}

export default combineReducers({
    patientData,
    processedData
});