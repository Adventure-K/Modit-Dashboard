import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';



function PatientDetail() {

  const dispatch = useDispatch();
  const history = useHistory();

  // contains array of patients displayed in dropdown menu
  const patients = useSelector((store) => store.patients);
  // contains data for individual patient selected in dropdown menu
  const patientData = useSelector((store) => store.patientData)
  //contains the id of the patient selected in the dropdown menu
  const [patientId, setPatientId] = useState(' ');

  // this function dispatches the id of the patient selected in the dropdown menu to the getPatientData() function in the patient.saga file
  const getPatientData = () => {
    event.preventDefault();
    dispatch({
      type: 'FETCH_PATIENT_DATA',
      payload: patientId
    })
  }

  //this function is called when a user clicks the "Add Patient" button. It directs the user to the AddPatientFormPage.
  const toAddPatientForm = () => {
    history.push('/addPatientForm')
  }

  //this function sends the id of the selected user to be deleted to the deactivatePatient() function in the patient.saga file. It then calls getPatientData() which will clear the display until a new patient is selected.
  const deletePatient = () => {
    dispatch({
      type: 'DELETE_PATIENT',
      payload: patientData.id
    })
    getPatientData();
  }



  //on page load, FETCH_PATIENTS is dispatched to get patients to populate dropdown menu
  useEffect(() => {
    dispatch({ type: 'FETCH_PATIENTS' });
  }, []);

  return (
    <div>
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

      <div>

        {patientData.is_active === true && JSON.stringify(patientData)}
      </div>
    </div >
  );
}

export default PatientDetail;
