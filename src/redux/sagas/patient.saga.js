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
    // console.log('in getPatients');
    try {
        const patients = yield axios.get('/api/patient');
        console.log("patients =", patients.data)
        yield put({ type: 'SET_PATIENTS', payload: patients.data })
    } catch {
        console.log('SET_PATIENTS ERROR');
    }
}

function* getPatientData(action) {
    // console.log("in getPatientData")
    try {
        const patientData = yield axios.get(`/api/patient/${action.payload}`)
        console.log('patientData', patientData.data[0])
        yield put({ type: 'SET_PATIENT_DATA', payload: patientData.data[0] })
    } catch {
        console.log('SET_PATIENT_DATA ERROR');

    }
}

function* deactivatePatient(action) {
    try {
        yield axios.put(`/api/patient/${action.payload}`)
        yield put({ type: 'FETCH_PATIENTS' })
        // yield put({ try: 'FETCH_PATIENT_DATA' })
    } catch (err) {
        console.error('ERROR IN DELETE', err)
    }
}

function* patientSaga() {
    yield takeLatest('REGISTER_PATIENT', addPatient)
    yield takeLatest('FETCH_PATIENTS', getPatients)
    yield takeLatest('FETCH_PATIENT_DATA', getPatientData)
    yield takeLatest('DELETE_PATIENT', deactivatePatient)
}

export default patientSaga;