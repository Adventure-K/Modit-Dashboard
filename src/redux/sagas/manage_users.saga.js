import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// this function gets all users associated within the institution that the user is logged in under, to be displayed on the InstitutionManageAccounts page. It is called by the use effect on that page, and also by the changeHeadResearch function in this saga file. It stores it's payload in the usersToManage reducer in the manage_users.reducer file.
function* getUsers(action) {
    console.log('in getUsers');
    try {
        const users = yield axios.get(`/api/manageAccounts/`);
        yield put({ type: 'SET_USERS_TO_MANAGE', payload: users.data });
    } catch (err) {
        console.error('ERROR IN GET_USERS', err)
    }
}

function* getUsersAdmin(action) {
    console.log('in getUsers saga with inst_id', action.payload);
    try {
        const users = yield axios.get(`/api/manageAccounts/admin/${action.payload}`);
        yield put({ type: 'SET_USERS_TO_MANAGE', payload: users.data });
    } catch (err) {
        console.error('ERROR IN GET_USERS_ADMIN', err)
    }
}

// this function is triggered when a user clicks the "promote" or "demote" button on the InstitutionManageAccountsPage. It sends the clicked-on user's id and user level to the router, where a query is run to change the user's user level. When the server responds with a 200 status, the getUsers function is triggered which refreshes the page to reflect the change. 
function* changeHeadResearcher(action) {
    console.log("in changeHeadResearcher, action.payload:", action.payload)
    try {
        yield axios.put('/api/manageAccounts', action.payload);
        yield put({ type: 'GET_USERS_ADMIN', payload: action.payload.inst_id })
    } catch (err) {
        console.error('ERROR IN CHANGE HEAD RESEARCHER', err)
    }
}

// function* adminSetInst(action) { // When admin clicks Manage Users on an institution's dashboard, sets admin's inst_id to that institution's id
//     try {
//         yield axios.put('/api/manageAccounts/admin_inst_id', action.payload);
//     } catch (err) {
//         console.error('Change Admin inst_id', err)
//     }
// }

// function* adminClearInst() {
//     try {
//         yield axios.put('/api/manageAccounts/admin_clear_inst_id')
//     } catch (err) {
//         console.error('admin clear inst', err)
//     }
// }

function* reinstateClinician(action) {
    console.log("reinstate clinician", action.payload)
    try {
        yield axios.put('/api/manageAccounts/reinstate', action.payload);
        yield put({ type: 'GET_USERS' })
    } catch (err) {
        console.error('error in reinstate clinician')
    }
}

function* manageUsersSaga() {
    yield takeLatest('GET_USERS', getUsers)
    yield takeLatest('GET_USERS_ADMIN', getUsersAdmin)
    yield takeLatest('SET/REMOVE_HEAD_RESEARCHER', changeHeadResearcher)
    yield takeLatest('REINSTATE_CLINICIAN', reinstateClinician)

    // yield takeLatest('ADMIN_SET_INST', adminSetInst)
    // yield takeLatest('ADMIN_CLEAR_INST', adminClearInst)
}

export default manageUsersSaga;