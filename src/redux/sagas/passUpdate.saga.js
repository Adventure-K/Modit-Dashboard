import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updatePassword(action) {
// saga that takes requests to update user passwords
    try {
        yield axios.put(`/api/user/updatePass/`, action.payload);
    } catch (err) {
        console.log('update password saga', err)
    }
}

function* passUpdateSaga() {
    yield takeLatest('UPDATE_PASSWORD', updatePassword);
}

export default passUpdateSaga;