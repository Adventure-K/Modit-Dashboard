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
        yield axios.put(`./api/approveUsers/${action.payload}`);
        yield put({ type: 'GET_USERS' });
    } catch (err) {
        console.error('ERROR IN MANAGE ACCOUNTS PUT', err)
    }
}

function* approveUsersSaga() {
    yield takeLatest('DELETE_REQUEST', deleteRequest);
    yield takeLatest('APPROVE_REQUEST', approveRequest);
}



export default approveUsersSaga;