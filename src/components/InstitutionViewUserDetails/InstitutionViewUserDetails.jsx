import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function InstitutionViewUserDetails(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [heading, setHeading] = useState('User Detail');

  const dispatch = useDispatch();
  const userId = useParams();

  useEffect(() => {
    console.log('Fetching User ID using Params')
    dispatch({ type: 'GET_SELECTED_USER', payload: userId })
  }, [])

  const selectedUser = useSelector((store) => store.selectedUser);
  console.log('Selected user:', selectedUser);

  const [editMode, setEditMode] = useState(false);
  const [newPass, setNewPass] = useState('');

  const handleChangeView = () => {
    console.log('write me!');
  }

  const handleArchiveUser = () => {
    console.log('write me!');
  }

  const handleEditMode = (event) => {
    event.preventDefault();
    // some code that clears the input field
    setEditMode(!editMode);
  }

  const handlePassChange = (event) => {
    setNewPass(event.target.value)
  }

  const handleSubmit = () => {
    const pkg = [userId, newPass]
    dispatch({
      type: 'UPDATE_PASSWORD',
      payload: pkg
    })
    // some code that clears the input field
    setEditMode(!editMode);
  }

  return (
    <div>
      {editMode ? // Render for Edit Mode
        <div>
          <h2>{heading}</h2>
          <p>{selectedUser.first_name} {selectedUser.last_name}</p>
          <p>{selectedUser.email}</p>
          <button onClick={handleEditMode}>Cancel</button>
          <input type="text" onChange={(event) => handlePassChange(event)} placeholder="New Password" />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        : // Render for Not Edit Mode
        <div>
          <h2>{heading}</h2>
          <p>{selectedUser.first_name} {selectedUser.last_name}</p>
          <p>{selectedUser.email}</p>
          <button onClick={handleChangeView}>View Data</button>
          <button onClick={handleEditMode}>Change Password</button>
          <button onClick={handleArchiveUser}>Archive User</button>
        </div>
      }
    </div>
  );
}

export default InstitutionViewUserDetails;
