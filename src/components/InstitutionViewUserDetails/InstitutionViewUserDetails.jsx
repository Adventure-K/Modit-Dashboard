import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './InstitutionViewUserDetails.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function InstitutionViewUserDetails(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [heading, setHeading] = useState('Manage User');

  const dispatch = useDispatch();
  const userId = useParams();
  const history = useHistory();

  useEffect(() => {
    console.log('Fetching User ID using Params', userId)
    dispatch({ type: 'GET_SELECTED_USER', payload: userId.id })
  }, [])

  const loggedInUser = useSelector(store => store.user.userReducer)
  const selectedUser = useSelector((store) => store.selectedUser);
  console.log('Selected user:', selectedUser);
  console.log('Selected user inst ID:', selectedUser.inst_id);

  const [editMode, setEditMode] = useState(false);
  const [newPass, setNewPass] = useState('');

  const handleChangeView = () => {
    if (selectedUser.user_level == 0) {
      history.push(`/researcherTeamView/${selectedUser.id}`);
    } else if (loggedInUser.user_level == 3) {
      console.log('you must be an admin!')
      history.push(`/researcherViewDashboard/${selectedUser.inst_id}`);
    } else {
      history.push(`/researcherViewDashboard`);
    }
  }

  const handleRetireUser = () => {
    if (confirm('This will disable the user\'s account. Proceed?')) {
      dispatch({
        type: 'RETIRE_USER',
        payload: selectedUser.id
      })
      window.location.reload();
    } else {
      return;
    }
  }

  const handleReinstateUser = () => {
    if (confirm('This will re-enable the user\'s account. Proceed?')) {
      dispatch({
        type: 'REINSTATE_USER',
        payload: selectedUser.id
      })
      window.location.reload();
    } else {
      return;
    }
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
    const pkg = {
      id: userId.id,
      pass: newPass
    }
    dispatch({
      type: 'UPDATE_PASSWORD',
      payload: pkg
    })
    // some code that clears the input field
    setEditMode(!editMode);
  }

  return (
    <div>
      <h2>{heading}</h2>
      {editMode ? // Render for Edit Mode
        <div className="editModeContainer">
          <div></div>
          <div className="detailsCard">
            <p>{selectedUser.first_name} {selectedUser.last_name}</p>
            <p>{selectedUser.username}</p>
            <div className="resetForm">
              <input type="password" onChange={(event) => handlePassChange(event)} placeholder="New Password" />
              <div>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleEditMode}>Cancel</button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        : // Render for Not Edit Mode

        <div className="notEditModeContainer">
          <div></div>
          <div className="detailsCard">
            <p>{selectedUser.first_name} {selectedUser.last_name}</p>
            <p>{selectedUser.username}</p>
            <div className="cardBtnContainer">
              <div></div>
              <div className="cardBtns">
                <button className="cardBtn" onClick={handleChangeView}>View Data</button>
                <button className="cardBtn" onClick={handleEditMode}>Change Password</button>
                {selectedUser.is_active ?
                  <button className="cardBtn" onClick={handleRetireUser}>Retire User</button>
                  :
                  <button className="cardBtn" onClick={handleReinstateUser}>Reinstate User</button>
                }

              </div>
              <div></div>
            </div>
          </div>
          <div></div>
        </div>


      }
    </div>
  );
}

export default InstitutionViewUserDetails;
