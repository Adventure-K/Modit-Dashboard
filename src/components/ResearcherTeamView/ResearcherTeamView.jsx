import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import csvDownload from 'json-to-csv-export'
import './ResearcherTeamView.css';
import PieChart1 from '../PatientDetailCharts/PatientDetailRecentChart';
import PieChart2 from '../PatientDetailCharts/PatientDetailAverageChart';



function ResearcherTeamView() {
  const dispatch = useDispatch()
  const history = useHistory()

  const params = useParams()
  const patients = useSelector((store) => store.patients)
  const patientData = useSelector((store) => store.patientData.patientData)

  const jsonData = useSelector((store) => store.patientData.processedData)
  console.log(jsonData);
  console.log(patientData);


  const processedData = useSelector((store) => store.patientData.recentProcessedData)

  // console.log(jsonData);
  // console.log(patientData);


  const [patientId, setPatientId] = useState(' ')

  const dataToConvert = {
    data: [processedData],
    filename: 'processed_data',
    delimiter: ',',
    headers: ['ID', 'Session ID', '% time on drugs', '% time on controlled', '% time on neither', '% time on drugs no back', '% time non drugs no back']
  }



  const getPatientData = () => {
    event.preventDefault();
    console.log("getPatientData", patientId);
    dispatch({
      type: 'FETCH_PATIENT_ALL_DATA',
      payload: patientId
    })
  }


  //this function sends the id of the selected user to be deleted to the deactivatePatient() function in the patient.saga file. It then calls getPatientData() which will clear the display until a new patient is selected.
  const deletePatient = () => {
    if (confirm('This will render patient\'s data inaccessible. Contact an admin to restore.')) {
      dispatch({
        type: 'DELETE_PATIENT',
        payload: processedData.id
      })
      getPatientData();
    } else {
      return;
    }
  }

  const exportJsonData = () => {
    csvDownload(dataToConvert)
  }


  useEffect(() => {
    dispatch({
      type: 'FETCH_TEAM_PATIENTS',
      payload: params.id,
    })
  }, [])

  return (
    <div>
      {/* <h2>{heading}</h2> */}
      <div className="btnRowDiv">
        <div className="selectMenu">
          <select
            onChange={(event) => setPatientId(event.target.value)}
            name="patient"
            id="patientSelect"
          >
            <option value="initial">Select A Patient</option>

            {patients.map((patient) => {
              // loops over all the institutions and displays them as options
              if (patient.is_active === true) {
                return (
                  <option key={patient.id} value={patient.modit_id}>
                    {patient.first_name} {patient.last_name}
                  </option>
                )
              }
            })}
          </select>
          <button className="getDataBtn" onClick={getPatientData}>Get Data</button>
        </div>

        <div className="patientDetailBtns">
          {/* <button className="patientDetailBtns" onClick={toAddPatientForm}>New Patient</button> */}
          <button className="deletePatientBtn" onClick={deletePatient}>Delete Patient</button>
        </div>
      </div>

      <div className="exportBtnDiv">
        <button onClick={() => exportJsonData()}>Export</button>
      </div>


      <div className='tester'>
        {/* {patientData.is_active === true && JSON.stringify(patientData)} */}
        <div className='filler'></div>
        <div className='chartWrapper'>
          <div></div>
          <div>
            {processedData && processedData.is_active === true && <PieChart1 />}
          </div>
          <div className='filler'></div>
          <div className="chartRight">
            {processedData && processedData.is_active === true && <PieChart2 />}
          </div>
          <div></div>
        </div>
        <div className='filler'></div>
      </div>
    </div>
  )
}

export default ResearcherTeamView
