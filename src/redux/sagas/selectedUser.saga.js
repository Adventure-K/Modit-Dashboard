import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getSelectedUser() {
    try {
        const selectedUser = yield axios.get('/api/selectedUser/:id')
        yield put({ type: 'SET_SELECTED_USER', payload: selectedUser.data })
    } catch (err) {
        console.log('fetch selected user', err)
    }
}

function* selectedUserSaga() {
    yield takeLatest('GET_SELECTED_USER', getSelectedUser);
}

export default selectedUserSaga;
