import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './AdditionalInfoRegistration.css'
function AdditionalInfoRegistration () {

    const credentials = useSelector((store) => store.user.registrationReducer)// user registration credentials from previous page
    const institutions = useSelector((store) => store.user.institutionReducer)// institutions retrieved from the DB
    const [selectedInstitution, setSelectedInstitution] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    // console.log(institutions);

    useEffect(() => {
        dispatch({ type: 'FETCH_INSTITUTIONS_FOR_REGISTRATION' });// retrieves institution names from DB
      }, [dispatch]);

      const submitRegistration = () => {
        dispatch ({
            type: 'REGISTER',
            payload: ({
                credentials,
                firstName, 
                lastName,
                selectedInstitution
            })
            
        })
        
        history.push('/researcherViewDashboard')
      }

      const dropDownChange = (e) => {
        setSelectedInstitution(e.target.value)
    
    }

    return (
        <>
        <h1 className='centeredHeaders'>Additional Info</h1>
        <div className='inputDiv'>
            <input type="text" value={firstName}
            onChange={(event) => setFirstName(event.target.value)} placeholder='First name' />
            
            <input type="text" value={lastName}
            onChange={(event) => setLastName(event.target.value)} placeholder='Last name' />
            
            <br />
            
            <select name="institution" id="institutionSelect" value={selectedInstitution} onChange={dropDownChange}>
                <option value="initial">Select an institution</option>
                {institutions.map(institution => {// loops over all the institutions and displays them as options
                    return (
                        <option key={institution.name} value={institution.name}>{institution.name}</option>
                    )
                })}
            </select>
            <br />
            <br />
            <button onClick={()=> submitRegistration()}>Submit</button>
        </div>
        </>
    )
}

export default AdditionalInfoRegistration