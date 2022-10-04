import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';



function PatientDetail() {

  const dispatch = useDispatch();
  const history = useHistory();


  const patients = useSelector((store) => store.patients);
  const patientData = useSelector((store) => store.patientData)
  const [patientId, setPatientId] = useState(' ');

  const getPatientData = () => {
    event.preventDefault();
    console.log("getPatientData", patientId);
    dispatch({
      type: 'FETCH_PATIENT_DATA',
      payload: patientId
    })
  }

  const toAddPatientForm = () => {
    history.push('/addPatientForm')
  }

  const deletePatient = () => {
    console.log('patient id', patientData.id)
    dispatch({
      type: 'DELETE_PATIENT',
      payload: patientData.id
    })
    getPatientData();
  }

  // const conditionalData = () => {
  //   if (patientData.is_active === true) {
  //     return 1;
  //   }
  // }

  useEffect(() => {
    dispatch({ type: 'FETCH_PATIENTS' });
  }, []);

  return (
    <div>
      {/* <h2>{heading}</h2> */}
      <form onSubmit={getPatientData}>
        <select onChange={(event) => setPatientId(event.target.value)} name="patient" id="patientSelect">
          <option value="initial">Select A Patient</option>

          {patients.map(patient => {// loops over all the institutions and displays them as options
            if (patient.is_active === true) {
              return (
                <option key={patient.id} value={patient.id}>{patient.first_name} {patient.last_name}</option>
              )
            }
          })}

        </select>
        <button type="submit">Get Data</button>
      </form>



      <button onClick={toAddPatientForm}>New Patient</button>
      <button onClick={deletePatient}>Delete Patient</button>
      <button>Export</button>
      {/* {JSON.stringify(patients)} */}
      <div>
        {/* {conditionalData} */}
        {patientData.is_active === true && JSON.stringify(patientData)}
      </div>
    </div >
  );
}

export default PatientDetail;
