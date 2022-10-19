import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import PieChart from './ResearcherViewAggregateChart'
import csvDownload from 'json-to-csv-export'

import './ResearcherViewDashboard.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.

// url route for this component is /researcherViewDashboard
function ResearcherView(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const clinicians = useSelector((store) => store.researcher.researcherReducer)
  // all clinicians in specific institution
  const institution = useSelector((store) => store.researcher.researcherInstReducer)
  // institution to be displayed at the top of the screen
  let averageAggregateData = useSelector((store) => store.researcher.aggregateResearcherData[0])
  // average data from all patients in an institution 
  const loggedInUser = useSelector((store) => store.user.userReducer)
  // user who is currently logged in 
  const allInstitutionPatientData = useSelector((store) => store.researcher.allInstitutionPatientData)

  const [heading, setHeading] = useState('Researcher Dashboard')
  const dispatch = useDispatch()
  const history = useHistory()
  const selectedUserInst = useParams()

  for (let prop in averageAggregateData) {
    prop = Number(`${averageAggregateData[prop]}`) * 100
    averageAggregateData.prop = prop
  }
  // went through average data object and multiplied all numbers by 100 for a percentage number instead of a decimal

  useEffect(() => {
    dispatch({ type: 'CLEAR_PROCESSED_DATA_REDUCERS' })
    // clears data reducers on page load
    if (loggedInUser.user_level <= 2) {
      dispatch({ type: 'FETCH_RESEARCHER_INST' }) // calls the researcher saga to run through the GET for the researcher's institution
      dispatch({ type: 'FETCH_CLINICIANS' }) // calls the researcher saga to run through the GET for the clinicians in the same institution
      dispatch({ type: 'FETCH_TEAM_DATA' })
    } else if (loggedInUser.user_level == 3) {
      dispatch({
        type: 'FETCH_RESEARCHER_INST_ADMIN',
        payload: selectedUserInst.id,
      })
      dispatch({ type: 'FETCH_CLINICIANS_ADMIN', payload: selectedUserInst.id })
      dispatch({ type: 'FETCH_TEAM_DATA_ADMIN', payload: selectedUserInst.id })
    }
  }, [])
  // page load determines user level and fetches data accordingly

  const dataToConvert = {
    data: [averageAggregateData],
    filename: 'patient_aggregate_data',
    delimiter: ',',
    headers: ['% time on drugs',
      '% time on controlled',
      '% time on neither'],
  }
  //export for average patient data

  const dataToConvert2 = {
    data: allInstitutionPatientData,
    filename: 'All Session Data',
    delimiter: ',',
    headers: [
      'Session ID',
      'Modit ID',
      '% time on drugs',
      '% time on controlled',
      '% time on neither',
    ]
  }
  // export for all patient sessions in an institution

  const exportJsonData = () => {
    csvDownload(dataToConvert)
    csvDownload(dataToConvert2)
  }
  // function that does the exporting

  const clinicianDetails = (clinician) => {
    history.push(`/researcherTeamView/${clinician.id}`)
  }
  return (
    <>
      <h1 className="mt-2 text-center">{heading}</h1>
      <div className="flex flex-row justify-center">
        <div className="basis-1/2 text-center">
          <h3 className="ml-5 w-auto h-auto text-xl font-bold text-center bg-white border-b-0">
            Institution:{' '}
            <span className="institutionName">{institution.name}</span>
          </h3>

          <h4 className="ml-5 text-xl font-extrabold w-auto h-auto px-4 py-2 bg-white border-b">
            Clinicians
          </h4>
          {clinicians.map((clinician) => {
            return (
              <div className="ml-5 bg-white border-b transition duration-300 ease-in-out hover:bg-gray-650">
                <p
                  key={clinician.id}
                  onClick={() => clinicianDetails(clinician)}
                  className="text-md text-gray-900 font-light px-4 py-2 whitespace-nowrap"
                >
                  {clinician.first_name} {clinician.last_name}
                </p>
              </div>
            )
          })}
        </div>

        <div className="basis-1/2 ml-3 mr-5">

          <div className="flex flex-col items-center block rounded-lg shadow-lg bg-gray-100 w-auto h-auto">
            {averageAggregateData && <PieChart />}
            {/* Pie chart only shows up if averageAggregateData exists in this component */}
          </div>
          <div>
            <button
              className="mt-2 rounded-lg bg-gray-500 text-white text-md leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out p-2 w-auto h-auto"
              onClick={() => exportJsonData()}
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResearcherView
