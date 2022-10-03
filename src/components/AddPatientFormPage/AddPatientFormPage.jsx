import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function AddPatient() {

  // const store = useSelector((store) => store);

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [patientId, setPatientId] = useState('');

  const registerPatient = (event) => {
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
  }

  return (
    <div>
      <h2>Add New Patient</h2>
      <form onSubmit={registerPatient}>
        <input onChange={(event) => setFirstName(event.target.value)} placeholder="First Name" />
        <input onChange={(event) => setLastName(event.target.value)} placeholder="Last Name" />
        <input onChange={(event) => setEmail(event.target.value)} placeholder="Email (Optional)" />
        <input onChange={(event) => setPatientId(event.target.value)} placeholder="Patient ID" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default AddPatient;
