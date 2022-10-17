import { combineReducers } from 'redux';

// stores clinicians from researcher team in redux state
const researcherReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CLINICIANS':
        return action.payload;
      default:
        return state;
    }
  };

  const researcherInstReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_RESEARCHER_INST':
        return action.payload;
      default:
        return state;
    }
  };

  const aggregateResearcherData = (state = {}, action) => {
    switch (action.type) {
      case 'SET_AGGREGATE_DATA':
        return action.payload;
      default:
        return state;
    }
  }

  const allInstitutionPatientData = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_INSTITUTION_PATIENT_SESSIONS':
        return action.payload;
      default:
        return state;
    }
  }
  
  // user will be on the redux state at:
  // state.user
  export default combineReducers({
    researcherReducer,
    researcherInstReducer,
    aggregateResearcherData,
    allInstitutionPatientData
  });