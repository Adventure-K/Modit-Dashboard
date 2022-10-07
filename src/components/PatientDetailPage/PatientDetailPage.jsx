import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import csvDownload from 'json-to-csv-export'
import PieChart from '../PatientDetailCharts/PatientDetailCharts';



function PatientDetail() {

  const dispatch = useDispatch();
  const history = useHistory();


  // contains array of patients displayed in dropdown menu
  // const patients = useSelector((store) => store.patients);
  // // contains data for individual patient selected in dropdown menu
  // const patientData = useSelector((store) => store.patientData)
  // //contains the id of the patient selected in the dropdown menu
  // const [patientId, setPatientId] = useState(' ');

  // this function dispatches the id of the patient selected in the dropdown menu to the getPatientData() function in the patient.saga file


  const patients = useSelector((store) => store.patients);
  // const patientData = useSelector((store) => store.patientData.patientData)
  const processedData = useSelector((store) => store.patientData.processedData)
  // console.log(processedData);

  const [patientId, setPatientId] = useState(' ');
  // console.log(patientId);
  const dataToConvert = {
    data: [processedData],
    filename: 'processed_data',
    delimiter: ',',
    headers: ['ID', 'Session ID', '% time on drugs', '% time on controlled', '% time on neither', '% time on drugs no back', '% time non drugs no back']
  }

  const getPatientData = () => {
    event.preventDefault();
    // console.log("getPatientData", patientId);

    dispatch({
      type: 'FETCH_PATIENT_ALL_DATA',
      payload: patientId
    })
    // dispatch({ type: 'FETCH_PROCESSED_DATA', payload: patientId })
  }

  //this function is called when a user clicks the "Add Patient" button. It directs the user to the AddPatientFormPage.
  const toAddPatientForm = () => {
    history.push('/addPatientForm')
  }

  //this function sends the id of the selected user to be deleted to the deactivatePatient() function in the patient.saga file. It then calls getPatientData() which will clear the display until a new patient is selected.
  const deletePatient = () => {
    dispatch({
      type: 'DELETE_PATIENT',
      payload: processedData.id
    })
    getPatientData();
  }


  const exportJsonData = () => {
    csvDownload(dataToConvert)
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

          {patients && patients.map(patient => {// loops over all the patients and displays them as options
            if (patient.is_active === true) {
              return (
                <option key={patient.id} value={patient.id} >{patient.first_name} {patient.last_name}</option>
              )
            }
          })}

        </select>
        <button type="submit">Get Data</button>
      </form>



      <button onClick={toAddPatientForm}>New Patient</button>
      <button onClick={deletePatient}>Delete Patient</button>
      <button onClick={() => exportJsonData()}>Export</button>

      <div>
        {processedData && processedData.is_active === true && JSON.stringify(processedData)}

        {/* {JSON.stringify(patients)} */}
        <div>
          {/* {conditionalData} */}
          {/* {patientData && patientData && patientData.is_active === true && JSON.stringify(patientData)} */}
         {processedData && processedData.is_active === true && <PieChart />} 


        </div>
      </div >
    </div>
  );

}

export default PatientDetail;

