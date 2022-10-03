import { combineReducers } from 'redux';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

const registrationReducer = (state = {}, action) => {
  switch(action.type) {
    case 'STORE_USER_REGISTRATION_INFO':
      return action.payload;
    default:
      return state;
  }
}

const institutionReducer = (state = [], action) => {
  switch(action.type) {
    case 'STORE_INSTITUTIONS':
      return action.payload;
    default:
      return state;
  }
}


// user will be on the redux state at:
// state.user
export default combineReducers({
  userReducer,
  registrationReducer,
  institutionReducer
});
