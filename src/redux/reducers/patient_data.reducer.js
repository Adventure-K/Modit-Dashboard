import { combineReducers } from 'redux';
const patientData = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PATIENT_DATA':
            return action.payload;
        default:
            return state;
    }
}

const jsonData = (state = {}, action) => {
    switch (action.type) {
        case 'STORE_JSON_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    patientData,
    jsonData
});