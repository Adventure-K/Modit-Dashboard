import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function InstitutionViewDashboard(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const i = useSelector((store) => store.activeInstitution);
  const [heading, setHeading] = useState('Institution Detail');

  return (
    <div>
      <h2>{heading}</h2>
      <p>{JSON.stringify(i)}</p>
    </div>
  );
}

export default InstitutionViewDashboard;
