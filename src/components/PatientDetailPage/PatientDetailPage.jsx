import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import csvDownload from 'json-to-csv-export'
import PieChart1 from '../PatientDetailCharts/PatientDetailRecentChart'
import PieChart2 from '../PatientDetailCharts/PatientDetailAverageChart'

import './PatientDetail.css'

function PatientDetail() {
  const dispatch = useDispatch()
  const history = useHistory()

  // contains array of patients displayed in dropdown menu
  const patients = useSelector((store) => store.patients)
  const patientData = useSelector((store) => store.patientData.patientData)
  const processedData = useSelector(
    (store) => store.patientData.recentProcessedData,
  )
  console.log(processedData)
  // console.log(patients);

  // //contains the id of the patient selected in the dropdown menu
  const [patientId, setPatientId] = useState(' ')
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

  // this function dispatches the id of the patient selected in the dropdown menu to the getPatientData() function in the patient.saga file
  const getPatientData = () => {
    event.preventDefault()
    console.log('getPatientData', patientId)

    dispatch({
      type: 'FETCH_PATIENT_ALL_DATA',
      payload: patientId,
    })
    // dispatch({ type: 'FETCH_PROCESSED_DATA', payload: patientId })
  }

  //this function is called when a user clicks the "Add Patient" button. It directs the user to the AddPatientFormPage.
  const toAddPatientForm = () => {
    history.push('/addPatientForm')
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

  //on page load, FETCH_PATIENTS is dispatched to get patients to populate dropdown menu
  useEffect(() => {
    dispatch({ type: 'FETCH_PATIENTS' })
  }, [])

  return (
    <div className="flex flex-wrap justify-center">
      {/* <div className="btnRowDiv"> */}
      <div className="basis-1/3 flex justify-center">
        <select
          onChange={(event) => setPatientId(event.target.value)}
          name="patient"
          id="patientSelect"
          className="text-center w-auto h-auto m-2 border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        >
          <option value="initial">Select A Patient</option>

          {patients &&
            patients.map((patient) => {
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
          className="m-2 rounded-lg bg-gray-500 text-white text-md leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out p-2 w-auto h-auto"
          onClick={getPatientData}
        >
          Get Data
        </button>
      </div>

      <div className="basis-1/3 flex justify-center">
        <button
          className="m-2 rounded-lg bg-gray-500 text-white text-md leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out p-2 w-auto h-auto"
          onClick={toAddPatientForm}
        >
          New Patient
        </button>
      </div>
      <div className="basis-1/3 flex justify-center">
        <button
          className="m-2 rounded-lg bg-gray-500 text-white text-md leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out p-2 w-auto h-auto"
          onClick={deletePatient}
        >
          Delete Patient
        </button>
      </div>
      {/* </div> */}
      {/* <br /> */}

      {/* {processedData && processedData.is_active === true && JSON.stringify(processedData)} */}
      {/* <div className="tester"> */}
      {/* <div className="filler"></div> */}
      <div className=" basis-1/2">
        {/* <div></div> */}
        <div className="m-8 block rounded-lg shadow-lg bg-gray-100 w-auto">
          {processedData && processedData.is_active === true && <PieChart1 />}
        </div>
      </div>
      <div className=" basis-1/2">
        {/* <div className="filler"></div> */}
        <div className="m-8 block rounded-lg shadow-lg bg-gray-100 w-auto">
          {processedData && processedData.is_active === true && <PieChart2 />}
        </div>
        {/* <div></div> */}
      </div>
      {/* <div className="filler"></div> */}
      {/* </div> */}
      <div>
        <button
          className="mr-2 rounded-lg bg-gray-500 text-white text-md leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out p-2 w-auto h-auto"
          onClick={() => exportJsonData()}
        >
          Export Data
        </button>
      </div>
    </div>
  )
}

export default PatientDetail
