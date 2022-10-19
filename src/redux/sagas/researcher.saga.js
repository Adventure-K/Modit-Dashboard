import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* fetchClinicians() {

    try {
        const clinicians = yield axios.get('/api/researcher/clinicians');
        yield put({ type: 'SET_CLINICIANS', payload: clinicians.data });
    } catch {
        console.log('RESEARCHER SAGA: error in fetching clinicians');
    }
}


function* fetchCliniciansAdmin(action) {
    try {
        const clinicians = yield axios.get(`/api/researcher/cliniciansAdmin/${action.payload}`);
        yield put({ type: 'SET_CLINICIANS', payload: clinicians.data });
    } catch (err) {
        console.log('fetch researcher clinician list for admin saga', err);
    }
}

function* fetchResearcherInst() {
    // get institution associated with researcher from the DB
    try {
        const institution = yield axios.get('/api/researcher/researchInst');
        yield put({ type: 'SET_RESEARCHER_INST', payload: institution.data[0] });
    } catch {
        console.log('fetch researcher inst saga error');
    }

}

function* fetchResearcherInstAdmin(action) {
    // get institution associated with researcher from the DB
    try {
        const institution = yield axios.get(`/api/researcher/researchInstAdmin/${action.payload}`);
        yield put({ type: 'SET_RESEARCHER_INST', payload: institution.data[0] });
    } catch {
        console.log('fetch researcher inst saga error');
    }

}

function* getTeamPatients(action) {
    try {
        const patients = yield axios.get(`/api/researcher/researcherTeam/${action.payload}`);
        yield put({ type: 'SET_PATIENTS', payload: patients.data })
    } catch {
        console.log('SET_PATIENTS ERROR');
    }
}

function* fetchTeamData() {
    // get aggregate data for research team from the DB and stores in patient reducer redux state
    try {
        const teamData = yield axios.get('/api/researcher/teamData');
        const allPatientSessions = yield axios.get('/api/researcher/allSessionData')
        yield put({ type: 'SET_ALL_INSTITUTION_PATIENT_SESSIONS', payload: allPatientSessions.data })
        yield put({ type: 'SET_AGGREGATE_DATA', payload: teamData.data });
    } catch (err) {
        console.log('fetch researcher team data saga', err);
    }
}

function* fetchTeamDataAdmin(action) {
    // get aggregate data for research team from the DB and stores in patient reducer redux state
    try {
        const teamData = yield axios.get(`/api/researcher/teamDataAdmin/${action.payload}`);
        yield put({ type: 'SET_AGGREGATE_DATA', payload: teamData.data });
    } catch (err) {
        console.log('fetch researcher team data for admin saga', err);
    }
}



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