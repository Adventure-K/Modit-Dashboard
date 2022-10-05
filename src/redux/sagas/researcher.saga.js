import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* fetchClinicians() {
    // get clinicians from the DB
    try {
        const clinicians = yield axios.get('/api/user/clinicians');
        console.log('get clinicians for researcher view:', clinicians.data);
        yield put({ type: 'SET_CLINICIANS', payload: clinicians.data });
    } catch {
        console.log('fetch researcher clinician list saga error');
    }

}

function* fetchResearcherInst() {
    // get institution associated with researcher from the DB
    try {
        const institution = yield axios.get('/api/institutions/researchInst');
        console.log('get institution for researcher view:', institution.data);
        yield put({ type: 'SET_RESEARCHERINST', payload: institution.data[0] });
    } catch {
        console.log('fetch researcher inst saga error');
    }

}

// function* approve(action) {
//     // Approve user
//     try {
//         yield axios.put(`/api/user/approve/${action.payload}`);
//         console.log('Approved user', action.payload);
//         yield put({ type: 'FETCH_USERS'});
//     } catch {
//         console.log('approve saga error');
//     }

// }


function* researcherSaga() {
    yield takeEvery('FETCH_CLINICIANS', fetchClinicians),
    yield takeEvery('FETCH_RESEARCHERINST', fetchResearcherInst)
    // yield takeEvery('APPROVE', approve)
}

export default researcherSaga