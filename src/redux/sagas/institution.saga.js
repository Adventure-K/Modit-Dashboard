import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchInstitutions() { // Retrieve all institutions from DB
    try {
        const institutions = yield axios.get('/api/institutions');
        console.log('institution saga', institutions.data),
            yield put({ type: 'SET_INSTITUTIONS', payload: institutions.data });
    } catch (err) {
        console.log('fetch institutions', err);
    }
}

function* addInstitution(action) {
    try {
        yield axios.post('/api/institutions', action.payload);
        yield put({ type: 'FETCH_INSTITUTIONS' })
    } catch (err) {
        console.log('add institution', err)
    }
}

function* institutionSaga() {
    yield takeEvery('FETCH_INSTITUTIONS', fetchInstitutions)
    yield takeLatest('ADD_INSTITUTION', addInstitution)
}

export default institutionSaga;