import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addPatient(action) {
    console.log("in addPatient")
    try {
        yield axios.post('/api/patient', action.payload)
    } catch (err) {
        console.error('ERROR IN PATIENT REGISTRATION', err)
    }
}

function* getPatients() {
    console.log('in getPatients');
    try {
        const patients = yield axios.get('/api/patient');
        yield put({ type: 'SET_PATIENTS', payload: patients.data })
    } catch {
        console.log('SET_PATIENTS ERROR');
    }
}

function* patientSaga() {
    yield takeLatest('REGISTER_PATIENT', addPatient)
    yield takeLatest('FETCH_PATIENTS', getPatients)
}

export default patientSaga;