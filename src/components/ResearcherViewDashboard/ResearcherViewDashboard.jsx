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
  const institution = useSelector(
    (store) => store.researcher.researcherInstReducer,
  )
  const teamData = useSelector((store) => store.patientData)
  let averageAggregateData = useSelector(
    (store) => store.researcher.aggregateResearcherData[0],
  )
  const loggedInUser = useSelector((store) => store.user.userReducer)

  const [heading, setHeading] = useState('Researcher Dashboard')
  const dispatch = useDispatch()
  const history = useHistory()
  const selectedUserInst = useParams()
  // console.log(averageAggregateData);

  for (let prop in averageAggregateData) {
    prop = Number(`${averageAggregateData[prop]}`)
  }
  console.log(averageAggregateData)

  useEffect(() => {
    dispatch({ type: 'CLEAR_PROCESSED_DATA_REDUCERS' })
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

  const dataToConvert = {
    data: [averageAggregateData],
    filename: 'patient_aggregate_data',
    delimiter: ',',
    headers: ['% time on drugs', '% time on controlled', '% time on neither'],
  }

  const exportJsonData = () => {
    csvDownload(dataToConvert)
  }

  const clinicianDetails = (clinician) => {
    console.log('clicking on clinician for details', clinician.id)
    history.push(`/researcherTeamView/${clinician.id}`)
  }
  return (
    <>
      <h1 className="mt-2 text-center">{heading}</h1>
      <div className="flex flex-row justify-center">
        <div className="basis-1/2 text-center">
          <h3 className="ml-5 w-auto h-auto text-xl text-center bg-white border-b-0">
            Institution:{' '}
            <span className="institutionName">{institution.name}</span>
          </h3>
          {/* <div className="basis-1/4 text-center"> */}
          <h4 className="ml-5 text-lg w-auto h-auto px-4 py-2 bg-white border-b">
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
          {/* </div> */}
        </div>

        <div className="basis-1/2 ml-3 mr-5">
          {/* {JSON.stringify(teamData)} */}

          <div className="flex flex-col items-center block rounded-lg shadow-lg bg-gray-100 w-auto h-auto">
            {averageAggregateData && <PieChart />}
          </div>
          <div>
            <button
              className="m-2 rounded-lg bg-gray-500 text-white text-md leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out p-2 w-auto h-auto"
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
