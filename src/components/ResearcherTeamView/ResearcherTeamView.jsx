import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import csvDownload from 'json-to-csv-export'
import './ResearcherTeamView.css'
import PieChart1 from '../PatientDetailCharts/PatientDetailRecentChart'
import PieChart2 from '../PatientDetailCharts/PatientDetailAverageChart'

function ResearcherTeamView() {
  const dispatch = useDispatch()

  const params = useParams()
  const patients = useSelector((store) => store.patients)
  const patientData = useSelector((store) => store.patientData.patientData)

  const jsonData = useSelector((store) => store.patientData.processedData)
  console.log(jsonData)
  console.log(patientData)

  const processedData = useSelector(
    (store) => store.patientData.recentProcessedData,
  )

  // console.log(jsonData);
  // console.log(patientData);

  const [patientId, setPatientId] = useState(' ')

  useEffect(() => {
    dispatch({
      type: 'FETCH_TEAM_PATIENTS',
      payload: params.id,
    })
  }, [])

  const dataToConvert = {
    data: [processedData],
    filename: 'processed_data',
    delimiter: ',',
    headers: [
      'ID',
      'Session ID',
      '% time on drugs',
      '% time on controlled',
      '% time on neither',
      '% time on drugs no back',
      '% time non drugs no back',
    ],
  }

  const getPatientData = () => {
    event.preventDefault()
    console.log('getPatientData', patientId)
    dispatch({
      type: 'FETCH_PATIENT_ALL_DATA',
      payload: patientId,
    })
  }

  //this function sends the id of the selected user to be deleted to the deactivatePatient() function in the patient.saga file. It then calls getPatientData() which will clear the display until a new patient is selected.
  const deletePatient = () => {
    if (
      confirm(
        "This will render patient's data inaccessible. Contact an admin to restore.",
      )
    ) {
      dispatch({
        type: 'DELETE_PATIENT',
        payload: processedData.id,
      })
      getPatientData()
    } else {
      return
    }
  }

  const exportJsonData = () => {
    csvDownload(dataToConvert)
  }

  return (
    <div className="flex flex-wrap justify-center">
      {/* <h2>{heading}</h2> */}
      {/* <div className=""> */}
      <div className="basis-1/2 flex justify-center">
        <select
          onChange={(event) => setPatientId(event.target.value)}
          name="patient"
          id="patientSelect"
          className="text-center w-auto h-auto m-2 border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
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
        <button
          className="m-2 rounded-lg bg-gray-500 text-white text-md leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out p-2 w-auto h-auto"
          onClick={getPatientData}
        >
          Get Data
        </button>
      </div>

      <div className="basis-1/2 flex justify-center">
        {/* <button className="patientDetailBtns" onClick={toAddPatientForm}>New Patient</button> */}
        <button
          className="m-2 rounded-lg bg-gray-500 text-white text-md leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out p-2 w-auto h-auto"
          onClick={deletePatient}
        >
          Delete Patient
        </button>
      </div>
      {/* </div> */}

      {/* <div className="tester"> */}
      {/* {patientData.is_active === true && JSON.stringify(patientData)} */}
      {/* <div className="filler"></div> */}
      <div className=" basis-1/2">
        {/* <div></div> */}
        <div className="m-8 flex flex-col items-center block rounded-lg shadow-lg bg-gray-100 w-auto">
          {processedData && processedData.is_active === true && <PieChart1 />}
        </div>
      </div>
      {/* <div className="filler"></div> */}
      <div className=" basis-1/2">
        <div className="m-8 flex flex-col items-center block rounded-lg shadow-lg bg-gray-100 w-auto">
          {processedData && processedData.is_active === true && <PieChart2 />}
        </div>
        {/* <div></div> */}
      </div>
      {/* <div className="filler"></div> */}
      <div>
        <button
          className="m-2 rounded-lg bg-gray-500 text-white text-md leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out p-2 w-auto h-auto"
          onClick={() => exportJsonData()}
        >
          Export
        </button>
      </div>
      {/* </div> */}
    </div>
  )
}

export default ResearcherTeamView
