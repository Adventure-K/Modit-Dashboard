import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



function PatientDetail() {

  const dispatch = useDispatch();



  const patients = useSelector((store) => store.patients);
  const [heading, setHeading] = useState('Functional Component');

  useEffect(() => {
    dispatch({ type: 'FETCH_PATIENTS' });
  }, [dispatch]);

  return (
    <div>
      <h2>{heading}</h2>
      <select name="patient" id="patientSelect">
        <option value="initial">Select A Patient</option>
        {patients.map(patient => {// loops over all the institutions and displays them as options
          return (
            <option key={patient.id} value={patient.id}>{patient.first_name} {patient.last_name}</option>
          )
        })}
      </select>



      <button>New Patient</button>
      <button>Delete Patient</button>
      <button>Export</button>
      {JSON.stringify(patients)}
    </div>
  );
}

export default PatientDetail;
