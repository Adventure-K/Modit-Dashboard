import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//this function receives a user id from the useEffect on the InstitutionViewDetailsPage, and sends in to the selectedUser.router file. It then dispatches the returned selectedUser.data to the selectedUser.reducer
function* getSelectedUser(action) {
    try {
        yield put({ type: 'CLEAR_PROCESSED_DATA_REDUCERS' })
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
