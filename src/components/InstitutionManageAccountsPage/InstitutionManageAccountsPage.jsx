import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function InstitutionManageAccountsPage() {

  const dispatch = useDispatch();
  const history = useHistory();

  //this variable contains an array of all users within the organization of the logged-in user
  const users = useSelector((store) => store.usersToManage);

  //On page load, "GET_USERS" triggers the getUsers() function in the manage_users.saga file. It ultimately stores all users attached to the institution of the logged in user in the "users" variable (above)
  useEffect(() => {
    dispatch({ type: 'GET_USERS' });
  }, []);

  //when the user clicks the "Delete" button next to a clinician or researcher awaiting approval, this function is called. It dispatches the id of the deleted clinician or researcher to the deleteRequest function in the approve_users.saga file.
  const deleteRequest = (id) => {
    console.log("in deleteRequest", id)
    dispatch({
      type: 'DELETE_REQUEST',
      payload: id
    })
  }

  //when the user clicks the "Approve" button next to a clinician or researcher awaiting approval, this function is called. It dispatches the id of the approved clinician or researcher to the approveRequest function in the approve_users.saga file.
  const approveRequest = (id) => {
    console.log("in approveRequest", id)
    dispatch({
      type: 'APPROVE_REQUEST',
      payload: id
    })
  }

  //when the name of an approved clinician or researcher is clicked on, this function is called and it pushes the user that that user's detail page
  const toUserDetails = (id) => {
    history.push(`/userDetails/${id}`)
  }

  return (
    <div>

      <h3>Waiting for Approval</h3>
      {users.map(user => {
        if (user.is_approved === false) {
          return (
            <div>
              <p><span><button onClick={() => (deleteRequest(user.id))}>Delete</button></span><span><button onClick={() => (approveRequest(user.id))}>Approve</button></span>{user.first_name} {user.last_name}</p>
            </div>
          )
        }
      })}
      <h3>Researchers</h3>
      {users.map(user => {
        if (user.is_approved === true && user.user_level === 1) {
          return (
            <div onClick={() => (toUserDetails(user.id))}>
              <p>{user.first_name} {user.last_name}</p>
            </div>
          )
        }
      })}
      <h3>Clinicians</h3>
      {users.map(user => {
        if (user.is_approved === true && user.user_level === 0) {
          return (
            <div onClick={() => (toUserDetails(user.id))}>
              <p>{user.first_name} {user.last_name}</p>
            </div>
          )
        }
      })}
      {/* {JSON.stringify(users)} */}
    </div>
  );
}

export default InstitutionManageAccountsPage;
