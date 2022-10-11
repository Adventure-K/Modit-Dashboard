import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import csvDownload from 'json-to-csv-export'
import './ResearcherTeamView.css';


function ResearcherTeamView() {
  const dispatch = useDispatch()
  const history = useHistory()

  const params = useParams()
  const patients = useSelector((store) => store.patients)
  const patientData = useSelector((store) => store.patientData.patientData)
  const jsonData = useSelector((store) => store.patientData.processedData)
  console.log(jsonData);
  console.log(patientData);
  
  const [patientId, setPatientId] = useState(' ')

  const dataToConvert = {
    data: jsonData,
    filename: 'calculated_data',
    delimiter: ',',
    headers: ['ID', 'Session ID', '% time on drugs', '% time on controlled', '% time on neither', '% time on drugs no back', '% time non drugs no back']
  }

  const getPatientData = () => {
    event.preventDefault()
    console.log('getPatientData', patientId)
    dispatch({
      type: 'FETCH_PATIENT_DATA',
      payload: patientId,
    })
    dispatch({ type: 'FETCH_PROCESSED_DATA', payload: patientId})
  }

  // const toAddPatientForm = () => {
  //   history.push('/addPatientForm')
  // }

  const deletePatient = () => {
    console.log('patient id', patientData.id)
    dispatch({
      type: 'DELETE_PATIENT',
      payload: patientData.id,
    })
    getPatientData()
  }

  const exportJsonData = () => {
    csvDownload(dataToConvert)
  }

  // const conditionalData = () => {
  //   if (patientData.is_active === true) {
  //     return 1;
  //   }
  // }

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
                  <option key={patient.id} value={patient.id}>
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
      {/* {JSON.stringify(patients)} */}
      <div>
        {/* {conditionalData} */}
        {patientData.is_active === true && JSON.stringify(patientData)}
      </div>
    </div>
  )
}

export default ResearcherTeamView
