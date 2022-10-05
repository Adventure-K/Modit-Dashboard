import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getUsers() {
    console.log('in getUsers');
    try {
        const users = yield axios.get('/api/manageAccounts');
        // console.log("users", users)
        yield put({ type: 'SET_USERS_TO_MANAGE', payload: users.data });
    } catch (err) {
        console.error('ERROR IN GETUSERS', err)
    }
}

function* manageUsersSaga() {
    yield takeLatest('GET_USERS', getUsers)
}

export default manageUsersSaga;