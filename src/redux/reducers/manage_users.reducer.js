
// This reducer holds the users that are displayed on the InstitutionManageAccountsPage. 
// It is populated by the getUsers function in the manage_users.saga file 
const usersToManage = (state = [], action) => {
    switch (action.type) {
        case 'SET_USERS_TO_MANAGE':
            return action.payload;
        default:
            return state;
    }
}

export default usersToManage;