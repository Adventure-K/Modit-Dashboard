import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addPatient(action) {
    console.log("in addPatient")
    try {
        yield axios.post('/patient', action.payload)
    } catch (err) {
        console.error('ERROR IN PATIENT REGISTRATION', err)
    }
}

function* patientSaga() {
    yield takeLatest('REGISTER_PATIENT', addPatient)
}

export default patientSaga;