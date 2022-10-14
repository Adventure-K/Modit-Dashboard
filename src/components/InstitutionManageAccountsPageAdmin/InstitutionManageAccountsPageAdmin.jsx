import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './InstitutionManageAccounts.css';


function InstitutionManageAccountsPageAdmin() {

  const dispatch = useDispatch();
  const history = useHistory();
  const i = useParams();

  // const i = useSelector((store) => store.activeInstitution);

  //this variable contains an array of all users within the organization of the logged-in user
  const loggedInUser = useSelector((store) => store.user.userReducer);
  //this variable contains all users within the logged-in user's institution
  const users = useSelector((store) => store.usersToManage);



  // On page load, "GET_USERS" triggers the getUsers() function in the manage_users.saga file. It ultimately stores all users attached to the institution of the logged in user in the "users" variable (above)
  // Admins may view this page for any institution, so the inst_id is retrieved from the URL instead of the logged in user's inst_id as with a research head.
  if (loggedInUser.user_level >= 3) {
    useEffect(() => {
      dispatch({
        type: 'GET_USERS_ADMIN',
        payload: i.id
      });
    }, []);
  } else {
    useEffect(() => {
      dispatch({
        type: 'GET_USERS'
      });
    }, [])
  }


  //when the user clicks the "Delete" button next to a clinician or researcher awaiting approval, this function is called. It dispatches the id of the deleted clinician or researcher to the deleteRequest function in the approve_users.saga file.
  const deleteRequest = (id) => {
    console.log("in deleteRequest", id)
    dispatch({
      type: 'DELETE_REQUEST_ADMIN',
      payload: { 
        uid: id,
        iid: i.id
    }})
    // window.location.reload();
  }

  //when the user clicks the "Approve" button next to a clinician or researcher awaiting approval, this function is called. It dispatches the id of the approved clinician or researcher to the approveRequest function in the approve_users.saga file.
  const approveRequest = (id) => {
    const pkg = { 
      uid: id,
      iid: i.id
    }
    console.log("in approveRequestAdmin", pkg)
    dispatch({
      type: 'APPROVE_REQUEST_ADMIN',
      payload: pkg })
    // window.location.reload();
  }

  let headResearcher = false;
  const isHeadResearcher = () => {
    for (let user of users) {
      if (user.user_level == 2) {
        headResearcher = true;
      }
    }
  }


  { users && isHeadResearcher() }
  // console.log(headResearcher);

  //when the name of an approved clinician or researcher is clicked on, this function is called and it pushes the user that that user's detail page
  const toUserDetails = (id) => {
    history.push(`/userDetails/${id}`)
  }

  const promoteUser = (id, userLevel, inst_id) => {
    console.log("in promoteUser", id, userLevel, inst_id)
    dispatch({
      type: 'SET/REMOVE_HEAD_RESEARCHER',
      payload: {
        id: id,
        userLevel: userLevel,
        inst_id: inst_id
      }
    })
  }


  return (
    <>

      < div className="displayDiv" >
        <div className="awaitingApprovalDiv">
          <h3>Waiting for Approval</h3>
          {users.map(user => {
            if (user.is_approved === false && loggedInUser.user_level == 3) {
              return (
                <div>
                  <p><span><button onClick={() => (deleteRequest(user.id))}>Delete</button></span><span><button onClick={() => (approveRequest(user.id))}>Approve</button></span>{user.first_name} {user.last_name}</p>
                </div>
              )
              }
          })}


        </div>

        {/* if there is a head researcher assigned to this institution, this block of code runs */}
        {
          headResearcher ? <>
            <div className="researchersDiv">
              <h3>Researchers</h3>
              {users.map(user => {
                if (user.is_approved === true && (user.user_level === 1 || user.user_level === 2)) {
                  return (

                    <div key={user.id}>
                      <p>
                        <span onClick={() => (toUserDetails(user.id))}>
                         {user.user_level == 2 && loggedInUser.user_level == 3 ?
                        <div className='kingOfResearchers'> <p className='kingOfResearchers'>👑&nbsp;</p> {user.first_name} {user.last_name}&nbsp;</div> 
                        : <div>{user.first_name} {user.last_name}&nbsp;</div>} 
                        </span>
                        <span>
                          {user.user_level == 2 && loggedInUser.user_level == 3 ? <button onClick={() => promoteUser(user.id, user.user_level, user.inst_id)}>Demote</button> : <></>}
                        </span>
                      </p>

                    </div>
                  )
                }
              })
              }
            </div>
            <div className="cliniciansDiv">
              <h3>Clinicians</h3>
              {
                users.map(user => {
                  if (user.is_approved === true && user.user_level === 0) {
                    return (
                      <div key={user.id} onClick={() => (toUserDetails(user.id))}>
                        <p>{user.first_name} {user.last_name}</p>
                      </div>
                    )
                  }
                })
              }
            </div>

          </> :
            // if there is no research head, this block of code runs
            <>
              <div className="researchersDiv">
                <h3>Researchers</h3>
                {users.map(user => {
                  if (user.is_approved === true && (user.user_level === 1 || user.user_level === 2)) {
                    return (

                      <div key={user.id}>
                        <p>
                          <span onClick={() => (toUserDetails(user.id))}>
                            {user.first_name} {user.last_name}&nbsp;
                          </span>
                          <span>
                            {user.user_level == 1 && loggedInUser.user_level == 3 ? <button onClick={() => promoteUser(user.id, user.user_level, user.inst_id)}>Promote</button> : <></>}
                          </span>
                        </p>

                      </div>
                    )
                  }
                })
                }
              </div>
              <div className="cliniciansDiv">
                <h3>Clinicians</h3>
                {
                  users.map(user => {
                    if (user.is_approved === true && user.user_level === 0) {
                      return (
                        <div key={user.id} onClick={() => (toUserDetails(user.id))}>
                          <p>{user.first_name} {user.last_name}</p>
                        </div>
                      )
                    }
                  })
                }
              </div>
            </>
        }

      </div >
    </>
  );

}

export default InstitutionManageAccountsPageAdmin;
