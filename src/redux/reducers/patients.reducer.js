
const patients = (state = [], action) => {
    console.log("in patients reducer")
    switch (action.type) {
        case 'SET_PATIENTS':
            return action.payload;
        default:
            return state;
    }
}

export default patients;