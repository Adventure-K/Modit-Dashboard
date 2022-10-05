import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function InstitutionManageAccountsPage() {

  const dispatch = useDispatch();

  const users = useSelector((store) => store.usersToManage);
  const [heading, setHeading] = useState('Functional Component');

  useEffect(() => {
    dispatch({ type: 'GET_USERS' });
  }, []);

  const deleteRequest = (id) => {
    console.log("in deleteRequest", id)
    dispatch({
      type: 'DELETE_REQUEST',
      payload: id
    })
  }

  return (
    <div>

      <h3>Waiting for Approval</h3>
      {users.map(user => {
        if (user.is_approved === false) {
          return (
            <div>
              <p><span><button onClick={() => (deleteRequest(user.id))}>Delete</button></span><span><button>Approve</button></span>{user.first_name} {user.last_name}</p>
            </div>
          )
        }
      })}
      <h3>Researchers</h3>
      {users.map(user => {
        if (user.is_approved === true && user.user_level === 1) {
          return (
            <p>{user.first_name} {user.last_name}</p>
          )
        }
      })}
      <h3>Clinicians</h3>
      {users.map(user => {
        if (user.is_approved === true && user.user_level === 0) {
          return (
            <p>{user.first_name} {user.last_name}</p>
          )
        }
      })}
      {/* {JSON.stringify(users)} */}
    </div>
  );
}

export default InstitutionManageAccountsPage;
