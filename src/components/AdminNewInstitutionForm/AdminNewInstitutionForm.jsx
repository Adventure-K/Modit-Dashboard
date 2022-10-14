import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AdminNewInstitutionForm.css'

function AdminNewInstitutionForm() {
  const store = useSelector((store) => store);
  const [newInstitution, setNewInstitution] = useState({ name: '', street_address: '', city: '', state: '', zip: '' })
  // const [heading, setHeading] = useState('Institution Registration');

  const history = useHistory();
  const dispatch = useDispatch();

  const fillFields = () => {
    setNewInstitution({...newInstitution, name:'Alliance Clinic'})
    setNewInstitution({...newInstitution, street_address:'3329 University Ave SE,'})
    setNewInstitution({...newInstitution, city:'Minneapolis'})
    setNewInstitution({...newInstitution, state:'MN'})
    setNewInstitution({...newInstitution, zip:'55414'})
    // setPlant({...newPlant, name: event.target.value})
  }

  const handleAddInstitution = () => {
    event.preventDefault();
    if (!newInstitution.name || !newInstitution.street_address || !newInstitution.city || !newInstitution.state || !newInstitution.zip) {
      alert('Please complete all fields.');
      return;
    }
    dispatch({ type: 'ADD_INSTITUTION', payload: newInstitution })
    history.push('/adminInstitutionList');
  }

  const handleValUpdate = (event, key) => {
    setNewInstitution({
      ...newInstitution,
      [key]: event.target.value
    })
  }

  return (

    // <div className="displayContainer">
    <>
      <h2 className="heading" onClick={() => fillFields()}>Institution Registration</h2>
      <br />

      <form onSubmit={handleAddInstitution}>
        <div className="displayContainer">
          <div></div>
          <div className="inputsContainer">
            <div className="inputsLeft">
              <input className="adminInput" type="text" value={newInstitution.name} placeholder="Institution Name" onChange={(event) => handleValUpdate(event, 'name')} />
              <input className="adminInput" type="text" value={newInstitution.street_address} placeholder="Street Address" onChange={(event) => handleValUpdate(event, 'street_address')} />
              <input className="adminInput" type="text" value={newInstitution.city} placeholder="City" onChange={(event) => handleValUpdate(event, 'city')} />
            </div>
            <div className="inputsRight">
              <input className="adminInput" type="text" value={newInstitution.state} placeholder="State" onChange={(event) => handleValUpdate(event, 'state')} />
              <input className="adminInput" type="text" value={newInstitution.zip} placeholder="Zip" onChange={(event) => handleValUpdate(event, 'zip')} />
            </div>
          </div>
          <div></div>
        </div>
        <div className="btnDiv">
          <div></div>
          <button type="submit">Register</button>
          <div></div>
        </div>
        <div className="noteDiv">
          <div></div>
          <p className="newInstNote">Note: Add an institution to the app before adding users for that institution. <br/> A research head may be assigned after the user is created.</p>
          <div></div>
        </div>


      </form>

    </>
    // </div>

  );
}

export default AdminNewInstitutionForm;
