import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AdminNewInstitutionForm() {
  const store = useSelector((store) => store);
  const [newInstitution, setNewInstitution] = useState({ name: '', street_address: '', city: '', state: '', zip: '' })
  const [heading, setHeading] = useState('Institution Registration');

  const history = useHistory();
  const dispatch = useDispatch();

  const handleAddInstitution = () => {
    event.preventDefault();
    if (!newInstitution.name || !newInstitution.street_address || !newInstitution.city || !newInstitution.state || !newInstitution.zip) {
      alert('Please complete all fields.');
      return;
    }
    dispatch({type: 'ADD_INSTITUTION', payload: newInstitution})
    history.push('/adminInstitutionList');
  }

  const handleValUpdate = (event, key) => {
    setNewInstitution({
      ...newInstitution,
      [key]: event.target.value
    })
  }

  return (
    <div>
      <h2>{heading}</h2>
      <form onSubmit={handleAddInstitution}>
        <input type="text" placeholder="Institution Name" onChange={(event) => handleValUpdate(event, 'name')} /> <br />
        <input type="text" placeholder="Street Address" onChange={(event) => handleValUpdate(event, 'street_address')} /> <br />
        <input type="text" placeholder="City" onChange={(event) => handleValUpdate(event, 'city')} /> <br />
        <input type="text" placeholder="State" onChange={(event) => handleValUpdate(event, 'state')} /> <br />
        <input type="text" placeholder="Zip" onChange={(event) => handleValUpdate(event, 'zip')} /> <br />
        <p>Note: an existing Researcher user may be assigned as this group's Research Head by an Admin after it has been registered.</p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default AdminNewInstitutionForm;
