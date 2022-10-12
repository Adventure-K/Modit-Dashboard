import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PieChart from './ResearcherViewAggregateChart';
import csvDownload from 'json-to-csv-export'

import './ResearcherViewDashboard.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.

// url route for this component is /researcherViewDashboard
function ResearcherView(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const clinicians = useSelector((store) => store.researcher.researcherReducer);
  const institution = useSelector((store) => store.researcher.researcherInstReducer);
  const teamData = useSelector((store) => store.patientData);
  const averageAggregateData = useSelector((store) => store.researcher.aggregateResearcherData[0])


  const [heading, setHeading] = useState('Researcher Dashboard');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'CLEAR_PROCESSED_DATA_REDUCERS' });
    dispatch({ type: 'FETCH_CLINICIANS' });// calls the researcher saga to run through the GET for the clinicians in the same institution
    dispatch({ type: 'FETCH_TEAM_DATA' });
    dispatch({ type: 'FETCH_RESEARCHER_INST' });// calls the researcher saga to run through the GET for the researcher's institution
  }, []);

  const dataToConvert = {
    data: [averageAggregateData],
    filename: 'patient_aggregate_data',
    delimiter: ',',
    headers: ['% time on drugs', '% time on controlled', '% time on neither']
  }

  const exportJsonData = () => {
    csvDownload(dataToConvert)
  }


  const clinicianDetails = (clinician) => {
    console.log('clicking on clinician for details', clinician.id);
    history.push(`/researcherTeamView/${clinician.id}`)
  }
  return (

    <div className="pageContainer">
      <h1 className='centeredHeaders'>{heading}</h1>
      <h4>Institution: <span className="institutionName">{institution.name}</span></h4>
      <div className="displayContainer">
        <div className="cliniciansList">
          <h4>Clinicians</h4>
          {clinicians.map(clinician => {
            return (
              <p key={clinician.id} onClick={() => clinicianDetails(clinician)}>{clinician.first_name} {clinician.last_name}</p>
            )
          })}
        </div>
        <div className="chartDiv">
          {/* {JSON.stringify(teamData)} */}
          <button onClick={() => exportJsonData()}>Export</button>
          <div className='chartWrapper'>
          {averageAggregateData && <PieChart />}
          </div>
        </div>
      </div>
    </div>

  );
}

export default ResearcherView;