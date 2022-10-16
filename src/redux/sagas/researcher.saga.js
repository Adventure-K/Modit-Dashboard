import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* fetchClinicians() {
    // get clinicians from the DB
    try {
        const clinicians = yield axios.get('/api/researcher/clinicians');
        console.log('get clinicians for researcher view:', clinicians.data);
        yield put({ type: 'SET_CLINICIANS', payload: clinicians.data });
    } catch {
        console.log('RESEARCHER SAGA: error in fetching clinicians');
    }
}

function* fetchCliniciansAdmin(action) {
    try {
        const clinicians = yield axios.get(`/api/researcher/cliniciansAdmin/${action.payload}`);
        console.log('get clinicians for researcher view:', clinicians.data);
        yield put({ type: 'SET_CLINICIANS', payload: clinicians.data });
    } catch (err) {
        console.log('fetch researcher clinician list for admin saga', err);
    }
}

function* fetchResearcherInst() {
    // get institution associated with researcher from the DB
    try {
        const institution = yield axios.get('/api/researcher/researchInst');
        console.log('get institution for researcher view:', institution.data);
        yield put({ type: 'SET_RESEARCHER_INST', payload: institution.data[0] });
    } catch {
        console.log('fetch researcher inst saga error');
    }

}

function* fetchResearcherInstAdmin(action) {
    // get institution associated with researcher from the DB
    try {
        const institution = yield axios.get(`/api/researcher/researchInstAdmin/${action.payload}`);
        console.log('get institution for researcher view:', institution.data);
        yield put({ type: 'SET_RESEARCHER_INST', payload: institution.data[0] });
    } catch {
        console.log('fetch researcher inst saga error');
    }

}

function* getTeamPatients(action) {
    console.log('in getTeamPatients', action.payload);
    try {
        const patients = yield axios.get(`/api/researcher/researcherTeam/${action.payload}`);
        console.log("patients =", patients.data)
        yield put({ type: 'SET_PATIENTS', payload: patients.data })
    } catch {
        console.log('SET_PATIENTS ERROR');
    }
}

function* fetchTeamData() {
    // get aggregate data for research team from the DB and stores in patient reducer redux state
    try {
        const teamData = yield axios.get('/api/researcher/teamData');
        yield put({ type: 'SET_AGGREGATE_DATA', payload: teamData.data });
    } catch (err) {
        console.log('fetch researcher team data saga', err);
    }
}

function* fetchTeamDataAdmin(action) {
    // get aggregate data for research team from the DB and stores in patient reducer redux state
    try {
        const teamData = yield axios.get(`/api/researcher/teamDataAdmin/${action.payload}`);
        console.log('get aggregate data for researcher view:', teamData.data[0]);
        yield put({ type: 'SET_AGGREGATE_DATA', payload: teamData.data });
    } catch (err) {
        console.log('fetch researcher team data for admin saga', err);
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
        yield takeEvery('FETCH_CLINICIANS_ADMIN', fetchCliniciansAdmin)
    yield takeEvery('FETCH_RESEARCHER_INST', fetchResearcherInst),
        yield takeEvery('FETCH_RESEARCHER_INST_ADMIN', fetchResearcherInstAdmin)
    yield takeEvery('FETCH_TEAM_PATIENTS', getTeamPatients),
        yield takeEvery('FETCH_TEAM_DATA', fetchTeamData)
    yield takeEvery('FETCH_TEAM_DATA_ADMIN', fetchTeamDataAdmin);
    // yield takeEvery('APPROVE', approve)
}

export default researcherSaga