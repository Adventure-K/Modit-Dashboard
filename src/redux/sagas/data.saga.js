import { put, take, takeLates, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPatientData(action) {
    try {
        // console.log('test');
        let response = yield axios.get(`/api/data/${action.payload}`)
        // console.log(response.data);
        yield put({type: 'STORE_PROCESSED_DATA', payload: response.data})
    }
    catch {
        console.log('DATA SAGA: error in retrieving patient data');
    }
}

function* fetchPatientAllData(action) {
    try {
        let response = yield axios.get(`/api/data/${action.payload}`)
        yield put({type: 'STORE_PROCESSED_DATA', payload: response.data})
    }
    catch {
        console.log('DATA SAGA: error in retrieving all patient data');
    }
}

function* dataSaga() {
    yield takeEvery('FETCH_PROCESSED_DATA', fetchPatientData)
    yield takeEvery('FETCH_PATIENT_ALL_DATA', fetchPatientAllData)
}

export default dataSaga;