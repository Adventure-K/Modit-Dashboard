const usersToManage = (state = [], action) => {
    switch (action.type) {
        case 'SET_USERS_TO_MANAGE':
            return action.payload;
        default:
            return state;
    }
}

export default usersToManage;