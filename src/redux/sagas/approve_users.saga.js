import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteRequest(action) {
    console.log('in deleteRequest', action.payload)
    try {
        yield axios.delete(`/api/approveUsers/${action.payload}`);
        yield put({ type: 'GET_USERS' });
    } catch (err) {
        console.error('ERROR IN MANAGE ACCOUNTS DELETE', err)
    }
}

function* approveRequest(action) {
    try {
        yield axios.put(`/api/approveUsers/${action.payload}`);
        yield put({ type: 'GET_USERS' });
    } catch (err) {
        console.error('ERROR IN MANAGE ACCOUNTS PUT', err)
    }
}

function* deleteRequestAdmin(action) {
    console.log('in deleteRequest', action.payload)
    try {
        yield axios.delete(`/api/approveUsers/admin/${action.payload.uid}`);
        yield put({ type: 'GET_USERS_ADMIN' });
    } catch (err) {
        console.error('ERROR IN MANAGE ACCOUNTS ADMIN DELETE', err)
    }
}

function* approveRequestAdmin(action) {
    console.log('in approveRequestAdmin. uid:', action.payload.uid)
    try {
        yield axios.put(`/api/approveUsers/admin/${action.payload.uid}`);
        yield put({ type: 'GET_USERS_ADMIN', payload: action.payload.iid });
    } catch (err) {
        console.error('ERROR IN MANAGE ACCOUNTS ADMIN PUT', err)
    }
}

function* approveUsersSaga() {
    yield takeLatest('DELETE_REQUEST', deleteRequest);
    yield takeLatest('APPROVE_REQUEST', approveRequest);
    yield takeLatest('DELETE_REQUEST_ADMIN', deleteRequestAdmin);
    yield takeLatest('APPROVE_REQUEST_ADMIN', approveRequestAdmin);
}



export default approveUsersSaga;