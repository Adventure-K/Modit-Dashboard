import { put, take, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//addPatient() gets called when registerPatient() dispatches 'REGISTER_PATIENT' in the AddPatientFormPage file. It sends the new patient's data to the post route in the patient.router file to be posted to the database.
function* addPatient(action) {

    try {
        yield axios.post('/api/patient', action.payload)
    } catch (err) {
        console.error('ERROR IN PATIENT REGISTRATION', err)
    }
}

//getPatients makes a get request to the server for patient data of all patients attached to the logged in clinician user, it then sends that data to the patients.reducer 
function* getPatients() {
    try {
        const patients = yield axios.get('/api/patient');
        yield put({ type: 'SET_PATIENTS', payload: patients.data })
    } catch {
        console.log('SET_PATIENTS ERROR');
    }
}

//getPatientData makes a request to the server for the data of the individual patient that the clinician selected in the dropdown menu. Dispatch to this function is made by getPatientData() in the PatientDetailPage file. Returned data is send to the patientData reducer in the patient_data.reducer file.
function* getPatientData(action) {
    try {
        const patientData = yield axios.get(`/api/patient/${action.payload}`)
        yield put({ type: 'SET_PATIENT_DATA', payload: patientData.data[0] })
    } catch {
        console.log('SET_PATIENT_DATA ERROR');

    }
}

//deactivatePatient sends the id of the deleted patient to the patient.router file so that the specified patient can be deactivated. Dispatch to this function is made by deletePatient() in the PatientDetailPage file. getPatients() (in this file) is called when 'FETCH_PATIENTS' is dispatched to refresh the dropdown menu after a patient is deactivated.
function* deactivatePatient(action) {
    try {
        yield put({ type: 'CLEAR_PROCESSED_DATA_REDUCERS' })
        yield axios.put(`/api/patient/${action.payload}`)
        yield put({ type: 'FETCH_PATIENTS' })
        // yield put({ try: 'FETCH_PATIENT_DATA' })
    } catch (err) {
        console.error('ERROR IN DELETE', err)
    }
}

function* patientSaga() {
    yield takeLatest('REGISTER_PATIENT', addPatient)
    yield takeEvery('FETCH_PATIENTS', getPatients)
    yield takeLatest('FETCH_PATIENT_DATA', getPatientData)
    yield takeLatest('DELETE_PATIENT', deactivatePatient)
}

export default patientSaga;