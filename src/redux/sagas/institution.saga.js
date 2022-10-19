import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

//this function gets triggered by the useEffect on the AdminInstitutionListPage. It sends it's GET request to the institutions.router file
function* fetchInstitutions() { // Retrieve all institutions from DB
    try {
        const institutions = yield axios.get('/api/institutions');
        yield put({ type: 'SET_INSTITUTIONS', payload: institutions.data });
    } catch (err) {
        console.log('fetch institutions', err);
    }
}

// this function is called when a user clicks the "register" button on the AdminNewInstitutionForm page. It sends the new institution data to the institutions.router file.
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