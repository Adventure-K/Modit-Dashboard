import { put, take, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPatientData(action) {
    try {

        let response = yield axios.get(`/api/data/${action.payload}`)

        yield put({ type: 'STORE_PROCESSED_DATA', payload: response.data })
    }
    catch {
        console.log('DATA SAGA: error in retrieving patient data');
    }
}

function* fetchPatientAllData(action) {
    try {
        yield put({ type: 'RESET_PROCESSED_DATA' })// resets the store for the patient recent data
        let response = yield axios.get(`/api/data/${action.payload}`)
        let result = yield axios.get(`/api/data/avgData/${action.payload}`)
        yield put({ type: 'STORE_AVERAGE_PROCESSED_DATA', payload: result.data[0] })// for average data chart display
        yield put({ type: 'STORE_RECENT_PROCESSED_DATA', payload: response.data[response.data.length - 1] })// for most recent data chart display
        yield put({ type: 'STORE_ALL_PATIENT_SESSIONS', payload: response.data })

    }
    catch {
        console.log('DATA SAGA: error in retrieving all patient data');
    }
}

function* clearDataReducers() {
    try {
        yield put({ type: 'RESET_PROCESSED_DATA' })
        yield put({ type: 'RESET_AVERAGE_DATA' })
    }
    catch {
        console.log('DATA SAGA: error in clearing data reducers');
    }
}


function* dataSaga() {
    yield takeEvery('FETCH_PROCESSED_DATA', fetchPatientData)
    yield takeEvery('FETCH_PATIENT_ALL_DATA', fetchPatientAllData)
    yield takeEvery('CLEAR_PROCESSED_DATA_REDUCERS', clearDataReducers)

}

export default dataSaga;