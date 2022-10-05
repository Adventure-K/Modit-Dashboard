//this reducer stores the clinician's patients to populate the patient dropdown menu on the PatientDetailPage when user is logged in as a clinician (clearance level 0)
const patients = (state = [], action) => {
    switch (action.type) {
        case 'SET_PATIENTS':
            return action.payload;
        default:
            return state;
    }
}

export default patients;