import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


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
    <div>
      <h2>Add New Patient</h2>
      <form onSubmit={registerPatient}>
        <input onChange={(event) => setFirstName(event.target.value)} value={firstName} placeholder="First Name" />
        <input onChange={(event) => setLastName(event.target.value)} value={lastName} placeholder="Last Name" />
        <input onChange={(event) => setEmail(event.target.value)} value={email} placeholder="Email (Optional)" />
        <input onChange={(event) => setPatientId(event.target.value)} value={patientId} placeholder="Patient Modit ID" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default AddPatient;
