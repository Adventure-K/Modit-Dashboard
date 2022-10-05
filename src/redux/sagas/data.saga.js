import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPatientData(action) {
    try {
        console.log('test');
        let response = yield axios.get(`/api/data/${action.payload}`)
        console.log(response.data);
        yield put({type: 'STORE_JSON_DATA', payload: response.data})
    }
    catch {
        console.log('DATA SAGA: error in retrieving patient data');
    }
}

function* dataSaga() {
    yield takeLatest('FETCH_JSON_DATA', fetchPatientData)
}

export default dataSaga;