import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// this function gets all users associated within the institution that the user is logged in under, to be displayed on the InstitutionManageAccounts page. It is called by the use effect on that page, and also by the changeHeadResearch function in this saga file. It stores it's payload in the usersToManage reducer in the manage_users.reducer file.
function* getUsers() {
    console.log('in getUsers');
    try {
        const users = yield axios.get('/api/manageAccounts');

        yield put({ type: 'SET_USERS_TO_MANAGE', payload: users.data });
    } catch (err) {
        console.error('ERROR IN GETUSERS', err)
    }
}

// this function is triggered when a user clicks the "promote" or "demote" button on the InstitutionManageAccountsPage. It sends the clicked-on user's id and user level to the router, where a query is run to change the user's user level. When the server responds with a 200 status, the getUsers function is triggered which refreshes the page to reflect the change. 
function* changeHeadResearcher(action) {
    console.log("in changeHeadResearcher")
    try {
        yield axios.put('/api/manageAccounts', action.payload);
        yield put({ type: 'GET_USERS' })
    } catch (err) {
        console.error('ERROR IN CHANGE HEAD RESEARCHER', err)
    }
}

function* adminSetInst(action) { // When admin clicks Manage Users on an institution's dashboard, sets admin's inst_id to that institution's id
    try {
        yield axios.put('/api/manageAccounts/admin_inst_id', action.payload);
    } catch (err) {
        console.error('Change Admin inst_id', err)
    }
}



function* manageUsersSaga() {
    yield takeLatest('GET_USERS', getUsers)
    yield takeLatest('SET/REMOVE_HEAD_RESEARCHER', changeHeadResearcher)
    yield takeLatest('ADMIN_SET_INST', adminSetInst)

}

export default manageUsersSaga;