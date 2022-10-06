const activeInstitutionReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ACTIVE_INSTITUTION':
            return action.payload;
        case 'DESELECT_INSTITUTION':
            return {};
        default:
            return state;
    }
}

export default activeInstitutionReducer;
