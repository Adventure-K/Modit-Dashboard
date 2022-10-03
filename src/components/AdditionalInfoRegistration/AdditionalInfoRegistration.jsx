import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './AdditionalInfoRegistration.css'
function AdditionalInfoRegistration () {
    const credentials = useSelector((store) => store.user.registrationReducer)
    const institutions = useSelector((store) => store.user.institutionReducer)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const dispatch = useDispatch()
    // console.log(institutions);

    useEffect(() => {
        dispatch({ type: 'FETCH_INSTITUTIONS' });
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
                {institutions.map(institution => {
                    return (
                        <option key={institution.name} value={institution.name}>{institution.name}</option>
                    )
                })}
            </select>
        </div>
        </>
    )
}

export default AdditionalInfoRegistration