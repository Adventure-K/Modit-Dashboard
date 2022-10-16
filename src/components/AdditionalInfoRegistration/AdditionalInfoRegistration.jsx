import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './AdditionalInfoRegistration.css'
function AdditionalInfoRegistration() {
  const credentials = useSelector((store) => store.user.registrationReducer) // user registration credentials from previous page
  const institutions = useSelector((store) => store.user.institutionReducer) // institutions retrieved from the DB
  const [selectedInstitution, setSelectedInstitution] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch({ type: 'FETCH_INSTITUTIONS_FOR_REGISTRATION' }) // retrieves institution names from DB
  }, [dispatch])

  const submitRegistration = () => {
    if (firstName === '' || lastName === '' || selectedInstitution === '') {
      alert('Please fill out all fields')
    } else {
      dispatch({
        type: 'REGISTER',
        payload: {
          credentials,
          firstName,
          lastName,
          selectedInstitution,
          is_approved: false,
        },
      })
      history.push('/login')
    }
  }

  const dropDownChange = (e) => {
    setSelectedInstitution(e.target.value)
  }

  return (
    <>
      <h1 className="centeredHeaders">Additional Info</h1>
      <div className="formPanel flex flex-col items-center">
        <input
          type="text"
          value={firstName}
          className="placeholder-shown text-center w-full border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="First name"
        />

        <input
          type="text"
          value={lastName}
          className="placeholder-shown text-center w-full border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          onChange={(event) => setLastName(event.target.value)}
          placeholder="Last name"
        />

        <br />

        <select
          name="institution"
          id="institutionSelect"
          value={selectedInstitution}
          className="text-center w-full border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          onChange={dropDownChange}
        >
          <option value="initial">Select an institution</option>
          {institutions.map((institution) => {
            // loops over all the institutions and displays them as options
            return (
              <option key={institution.name} value={institution.name}>
                {institution.name}
              </option>
            )
          })}
        </select>
        <br />
        <br />
        <button
          className="rounded-lg bg-cyan-650 text-white leading-normal uppercase shadow-md hover:bg-cyan-750 hover:shadow-lg focus:bg-cyan-750 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-850 active:shadow-lg transition duration-150 ease-in-out w-20 h-9"
          onClick={() => submitRegistration()}
        >
          Submit
        </button>
      </div>
    </>
  )
}

export default AdditionalInfoRegistration
