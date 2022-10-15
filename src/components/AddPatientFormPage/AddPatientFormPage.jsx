import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './AddPatient.css'

function AddPatient() {
  const dispatch = useDispatch()
  const history = useHistory()

  //these variables are set when values are entered into their respective input fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [patientId, setPatientId] = useState('')

  useEffect(() => {
    dispatch({ type: 'CLEAR_PROCESSED_DATA_REDUCERS' })
  }, [])

  //this function dispatches the above variables to the addPatient() function in the patient.saga file. It then resets the input fields
  const registerPatient = (event) => {
    event.preventDefault()
    console.log(firstName, lastName, email, patientId)
    dispatch({
      type: 'REGISTER_PATIENT',
      payload: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        patientId: patientId,
      },
    })
    setFirstName('')
    setLastName('')
    setEmail('')
    setPatientId('')

    history.push('/patientDetail')
    dispatch({ type: 'FETCH_PATIENTS' })
  }

  return (
    <div className="patientFormDiv">
      <div></div>
      <div className="addPatientFormCard">
        <h2 className="addPatientHeading">Add New Patient</h2>
        <div div="inputsDiv">
          <div>
            <input
              required
              onChange={(event) => setFirstName(event.target.value)}
              value={firstName}
              placeholder="First Name"
            />
            <input
              required
              onChange={(event) => setLastName(event.target.value)}
              value={lastName}
              placeholder="Last Name"
            />
          </div>
          <div>
            <input
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              placeholder="Email (Optional)"
            />
            <input
              required
              onChange={(event) => setPatientId(event.target.value)}
              value={patientId}
              placeholder="Patient Modit ID"
            />
          </div>
        </div>

        <div className="registerBtnContainer">
          <button
            className="rounded-lg bg-gray-500 text-white leading-normal shadow-md hover:bg-gray-550 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out p-3 w-auto h-auto mr-1 mt-2"
            onClick={registerPatient}
            type="submit"
          >
            Register
          </button>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default AddPatient
