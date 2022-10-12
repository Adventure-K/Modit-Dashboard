import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AdminInstitutionListItem from '../AdminInstitutionListItem/AdminInstitutionListItem.jsx'

function AdminInstitutionListPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_INSTITUTIONS' })
  }, [])

  const institutions = useSelector((store) => store.institutions);
  const [heading, setHeading] = useState('Research Institutions');
  console.log('Institutions from store:', institutions)

  return (
    <div>
      <h2>{heading}</h2>
      <button onClick={() => history.push('/adminNewInstitutionForm')}>Add Institution</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Research Head</th>
          </tr>
        </thead>
        <tbody>
          {institutions.map(i => {
            return (
              <AdminInstitutionListItem key={i.id} i={i} />
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminInstitutionListPage;
