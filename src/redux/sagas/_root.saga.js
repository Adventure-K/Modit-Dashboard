import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import patientSaga from './patient.saga';
// import institutionSaga from './institution.saga';

// import institutionSaga from './institution.saga';
import institutionSaga from './institution.saga';
import manageUsersSaga from './manage_users.saga';
import approveUsersSaga from './approve_users.saga';
import researcherSaga from './researcher.saga';




// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    patientSaga(),
    institutionSaga(),

    manageUsersSaga(),
    approveUsersSaga(),
    researcherSaga(),

  ]);
}
