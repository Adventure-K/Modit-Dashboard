import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './AdditionalInfoRegistration.css'
function AdditionalInfoRegistration () {

    const credentials = useSelector((store) => store.user.registrationReducer)// user registration credentials from previous page
    const institutions = useSelector((store) => store.user.institutionReducer)// institutions retrieved from the DB
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const dispatch = useDispatch()
    // console.log(institutions);

    useEffect(() => {
        dispatch({ type: 'FETCH_INSTITUTIONS' });// retrieves institution names from DB
      }, [dispatch]);

    return (
        <>
        <h1 className='centeredHeaders'>Additional Info</h1>
        <div className='inputDiv'>
            <input type="text" value={firstName}
            onChange={(event) => setFirstName(event.target.value)} placeholder='First name' />
            
            <input type="text" value={lastName}
            onChange={(event) => setLastName(event.target.value)} placeholder='Last name' />
            
            <br />
            
            <select name="institution" id="institutionSelect">
                <option value="initial">Select an institution</option>
                {institutions.map(institution => {// loops over all the institutions and displays them as options
                    return (
                        <option key={institution.name} value={institution.name}>{institution.name}</option>
                    )
                })}
            </select>
            <button>Submit</button>
        </div>
        </>
    )
}

export default AdditionalInfoRegistration