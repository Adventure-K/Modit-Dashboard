//this reducer is used by the InstitutionViewUserDetails page

const selectedUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_USER':
            return action.payload;
        case 'DESELECT_USER':
            return {};
        default:
            return state;
    }
}

export default selectedUserReducer;
