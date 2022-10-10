import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AddPatient.css';


function AddPatient() {


  const dispatch = useDispatch();

  //these variables are set when values are entered into their respective input fields 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [patientId, setPatientId] = useState('');


  //this function dispatches the above variables to the addPatient() function in the patient.saga file. It then resets the input fields
  const registerPatient = (event) => {
    event.preventDefault();
    console.log(firstName, lastName, email, patientId)
    dispatch({
      type: "REGISTER_PATIENT",
      payload: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        patientId: patientId
      }
    })
    setFirstName('');
    setLastName('')
    setEmail('')
    setPatientId('')
  }

  return (
    <div className="patientFormDiv">
      <div></div>
      <div className="addPatientFormCard">
        <h2 className='addPatientHeading'>Add New Patient</h2>
        <div div="inputsDiv">
          <div>
            <input onChange={(event) => setFirstName(event.target.value)} value={firstName} placeholder="First Name" />
            <input onChange={(event) => setLastName(event.target.value)} value={lastName} placeholder="Last Name" />
          </div>
          <div>
            <input onChange={(event) => setEmail(event.target.value)} value={email} placeholder="Email (Optional)" />
            <input onChange={(event) => setPatientId(event.target.value)} value={patientId} placeholder="Patient Modit ID" />
          </div>
        </div>


        <div className="registerBtnContainer">
          <button onClick={registerPatient} type="submit">Register</button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default AddPatient;
