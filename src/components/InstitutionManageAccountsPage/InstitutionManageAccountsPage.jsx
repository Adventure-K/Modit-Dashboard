import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './InstitutionManageAccounts.css'

function InstitutionManageAccountsPage() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [clinicianId, setClinicianToReinstate] = useState(' ')

  // this variable contains logged in user's institution info or the institution that an admin user has scoped into if logged in user is admin-level.
  const i = useSelector((store) => store.activeInstitution)

  //this variable contains an array of all users within the organization of the logged-in user
  const loggedInUser = useSelector((store) => store.user.userReducer)

  const users = useSelector((store) => store.usersToManage)

  // On page load, "GET_USERS" triggers the getUsers() function in the manage_users.saga file. It ultimately stores all users attached to the institution of the logged in user in the "users" variable (above)
  // Admins may view this page for any institution, so the inst_id is retrieved from the URL instead of the logged in user's inst_id as with a research head.
  if (loggedInUser.user_level >= 3) {
    useEffect(() => {
      dispatch({
        type: 'GET_USERS_ADMIN',
        payload: i.id,
      })
    }, [])
  } else {
    useEffect(() => {
      dispatch({
        type: 'GET_USERS',
      })
    }, [])
  }

  //when the user clicks the "Delete" button next to a clinician or researcher awaiting approval, this function is called. It dispatches the id of the deleted clinician or researcher to the deleteRequest function in the approve_users.saga file.
  const deleteRequest = (id) => {

    dispatch({
      type: 'DELETE_REQUEST',
      payload: id,
    })
  }

  //when the user clicks the "Approve" button next to a clinician or researcher awaiting approval, this function is called. It dispatches the id of the approved clinician or researcher to the approveRequest function in the approve_users.saga file.
  const approveRequest = (id) => {

    dispatch({
      type: 'APPROVE_REQUEST',
      payload: id,
    })
  }

  //checks to see if the user does or does not have a head researcher already assigned
  let headResearcher = false
  const isHeadResearcher = () => {
    for (let user of users) {
      if (user.user_level == 2) {
        headResearcher = true
      }
    }
  }

  {
    users && isHeadResearcher()
  }
  // console.log(headResearcher);

  //when the name of an approved clinician or researcher is clicked on, this function is called and it pushes the logged-user that clinician's detail page
  const toUserDetails = (id) => {
    history.push(`/userDetails/${id}`)
  }

  const promoteUser = (id, userLevel) => {

    dispatch({
      type: 'SET/REMOVE_HEAD_RESEARCHER',
      payload: {
        id: id,
        userLevel: userLevel,
      },
    })
  }

  const reinstateClinician = () => {

    dispatch({
      type: 'REINSTATE_CLINICIAN',
      payload: {
        id: clinicianId,
      },
    })
    setClinicianToReinstate(' ')
  }

  return (
    <>
      <div className="flex flex-row">
        <div className="basis-1/3 ml-5 mt-2 text-center">
          <h3 className="text-xl bg-white border-b">Waiting for Approval</h3>
          {users.map((user) => {
            if (user.is_approved === false && loggedInUser.user_level == 2) {
              return (
                <div className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-650">
                  <p className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {user.first_name} {user.last_name}
                    <span>
                      <button
                        onClick={() => deleteRequest(user.id)}
                        className="ml-2 mr-2 rounded-lg bg-gray-500 text-white text-xs leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out px-2 w-max h-5"
                      >
                        Delete
                      </button>
                    </span>
                    <span>
                      <button
                        onClick={() => approveRequest(user.id)}
                        className="mr-2 rounded-lg bg-gray-500 text-white text-xs leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out px-2 w-max h-5"
                      >
                        Approve
                      </button>
                    </span>
                  </p>
                </div>
              )
            } else if (
              user.is_approved === false &&
              loggedInUser.user_level == 3
            ) {
              return (
                <div>
                  <p>
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              )
            }
          })}
        </div>

        {/* if there is a head researcher assigned to this institution, this block of code runs */}
        {headResearcher ? (
          <>
            <div className="basis-1/3 mt-2 text-center">
              <h3 className="text-xl bg-white border-b">Researchers</h3>
              {users.map((user) => {
                if (
                  user.is_active === true &&
                  user.is_approved === true &&
                  (user.user_level === 1 || user.user_level === 2)
                ) {
                  return (
                    <div className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-650">
                      <p className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <span onClick={() => toUserDetails(user.id)}>
                          {user.first_name} {user.last_name}
                        </span>
                        <span>
                          {user.user_level == 2 &&
                            loggedInUser.user_level == 3 ? (
                            <button
                              onClick={() =>
                                promoteUser(user.id, user.user_level)
                              }
                              className="ml-2 rounded-lg bg-gray-500 text-white text-xs leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out px-2 w-max h-5"
                            >
                              Demote
                            </button>
                          ) : (
                            <></>
                          )}
                        </span>
                      </p>
                    </div>
                  )
                }
              })}
            </div>
            <div className="basis-1/3 mr-5 mt-2 text-center">
              <h3 className="text-xl bg-white border-b">Clinicians</h3>
              {users.map((user) => {
                if (
                  user.is_active === true &&
                  user.is_approved === true &&
                  user.user_level == 0
                ) {
                  return (
                    <div
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-650"
                      onClick={() => toUserDetails(user.id)}
                    >
                      <p className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.first_name} {user.last_name}
                      </p>
                    </div>
                  )
                }
              })}
            </div>
          </>
        ) : (
          // if there is no research head, this block of code runs
          <>
            <div className="basis-1/3 mt-2 text-center">
              <h3 className="text-xl bg-white border-b">Researchers</h3>
              {users.map((user) => {
                if (
                  user.is_approved === true &&
                  (user.user_level === 1 || user.user_level === 2)
                ) {
                  return (
                    <div className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-650">
                      <p className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <span onClick={() => toUserDetails(user.id)}>
                          {user.first_name} {user.last_name}
                        </span>
                        <span>
                          {user.user_level == 1 &&
                            loggedInUser.user_level == 3 ? (
                            <button
                              onClick={() =>
                                promoteUser(user.id, user.user_level)
                              }
                              className="ml-2 rounded-lg bg-gray-500 text-white text-xs leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out px-2 w-max h-5"
                            >
                              Promote
                            </button>
                          ) : (
                            <></>
                          )}
                        </span>
                      </p>
                    </div>
                  )
                }
              })}
            </div>
            <div className="basis-1/3 mt-2 text-center">
              <h3 className="text-xl bg-white border-b">Clinicians</h3>
              {users.map((user) => {
                if (user.is_approved === true && user.user_level == 0) {
                  return (
                    <div
                      onClick={() => toUserDetails(user.id)}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-650"
                    >
                      <p className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.first_name} {user.last_name}
                      </p>
                    </div>
                  )
                }
              })}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col items-center mt-10">
        {/* <h3 className="text-center">Reinstate User</h3> */}
        <select
          onChange={(event) => setClinicianToReinstate(event.target.value)}
          name="clinician"
          id="reinstateClinicianSelect"
          className="w-1/3 text-center border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        >
          <option
            value="initial"
            className="w-full border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          >
            Reinstate User
          </option>
          {users &&
            users.map((clinician) => {
              if (clinician.is_active === false) {
                return (
                  <option key={clinician.id} value={clinician.id}>
                    {clinician.first_name} {clinician.last_name}
                  </option>
                )
              }
            })}
        </select>
        <button
          className="mt-2 rounded-lg bg-gray-500 text-white text-md leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out p-2 w-auto h-auto"
          onClick={reinstateClinician}
        >
          Reinstate
        </button>
      </div>
    </>
  )
}

export default InstitutionManageAccountsPage
