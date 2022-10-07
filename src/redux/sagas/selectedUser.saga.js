import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getSelectedUser(action) {
    console.log('selectedUser saga get payload:', action.payload)
    try {
        const selectedUser = yield axios.get(`/api/selectedUser/${action.payload}`)
        yield put({ type: 'SET_SELECTED_USER', payload: selectedUser.data })
    } catch (err) {
        console.log('fetch selected user', err)
    }
}

function* selectedUserSaga() {
    yield takeLatest('GET_SELECTED_USER', getSelectedUser);
}

export default selectedUserSaga;
