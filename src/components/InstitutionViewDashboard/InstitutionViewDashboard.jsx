import React, { useState } from 'react';
import {useSelector} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function InstitutionViewDashboard(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const institutions = useSelector((store) => store.institution);
  const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
      <h2>Institution Master List</h2>
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
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.street_address}, {i.city}, {i.state} {i.zip}</td>
                <td></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InstitutionViewDashboard;
