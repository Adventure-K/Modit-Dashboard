const institutionReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_INSTITUTIONS':
            return action.payload;
        default:
            return state;
    }
  }

  export default institutionReducer;
  