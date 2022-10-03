import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchInstitutions() { // Retrieve all institutions from DB
    try {
        const institutions = yield axios.get('/api/institutions');
        yield put({type: 'SET_INSTITUTIONS', payload: institutions.data});
    } catch(err) {
        console.log('fetch institutions', err);
    }
}

function* institutionSaga() {
    yield takeLatest('FETCH_INSTITUTIONS', fetchInstitutions)
}

export default institutionSaga;