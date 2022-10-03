import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addPatient(action) {
    console.log("in addPatient")
}

function* patientSaga() {
    yield takeLatest('REGISTER_PATIENT', addPatient)
}

export default patientSaga;