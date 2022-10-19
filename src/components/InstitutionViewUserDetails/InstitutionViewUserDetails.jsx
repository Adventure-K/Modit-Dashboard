import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import './InstitutionViewUserDetails.css'


function InstitutionViewUserDetails(props) {

  const [heading, setHeading] = useState('Manage User')

  const dispatch = useDispatch()

  //this variable stores the clicked on user's id from the Manage Users page that is sent this page over parameters
  const userId = useParams()
  const history = useHistory()

  //on page load, the logged in user's id is dispatched to the selectedUser.saga file
  useEffect(() => {
    dispatch({ type: 'GET_SELECTED_USER', payload: userId.id })
  }, [])

  const loggedInUser = useSelector((store) => store.user.userReducer)
  const selectedUser = useSelector((store) => store.selectedUser)


  const [editMode, setEditMode] = useState(false)
  const [newPass, setNewPass] = useState('')

  const handleChangeView = () => {
    if (selectedUser.user_level == 0) {
      history.push(`/researcherTeamView/${selectedUser.id}`)
    } else if (loggedInUser.user_level == 3) {

      history.push(`/researcherViewDashboard/${selectedUser.inst_id}`)
    } else {
      history.push(`/researcherViewDashboard`)
    }
  }

  const handleRetireUser = () => {
    if (confirm("This will disable the user's account. Proceed?")) {
      dispatch({
        type: 'RETIRE_USER',
        payload: selectedUser.id,
      })
      // window.location.reload();
      setTimeout(() => {
        if (loggedInUser.user_level == 2) {
          history.push('/manageAccounts')
        } else {
          history.push(`/manageAccountsAdmin/${selectedUser.inst_id}`)
        }
        console.log('Delayed for 1 second.')
      }, '300')
    } else {
      return
    }
  }

  const handleReinstateUser = () => {
    if (confirm("This will re-enable the user's account. Proceed?")) {
      dispatch({
        type: 'REINSTATE_USER',
        payload: selectedUser.id,
      })
      window.location.reload()
    } else {
      return
    }
  }

  const handleEditMode = (event) => {
    event.preventDefault()
    setEditMode(!editMode)
  }

  const handlePassChange = (event) => {
    setNewPass(event.target.value)
  }

  const handleSubmit = () => {
    const pkg = {
      id: userId.id,
      pass: newPass,
    }
    dispatch({
      type: 'UPDATE_PASSWORD',
      payload: pkg,
    })
    setEditMode(!editMode)
  }

  return (
    <>
      <h2 className="text-3xl font-bold">{heading}</h2>
      <div className="flex justify-center max-h-lg">
        {editMode ? ( // Render for Edit Mode
          <div className="flex flex-col items-center block p-6 mt-10 rounded-lg shadow-lg bg-gray-100 h-1/3 w-1/4 max-w-lg">
            <div></div>
            <div className="detailsCard">
              <p>
                {selectedUser.first_name} {selectedUser.last_name}
              </p>
              <p>{selectedUser.username}</p>
              <div className="resetForm">
                <input
                  className="placeholder-shown text-center w-full border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  type="password"
                  onChange={(event) => handlePassChange(event)}
                  placeholder="New Password"
                />
                <div>
                  <button
                    className="rounded-lg bg-gray-500 text-white leading-normal shadow-md hover:bg-gray-550 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out w-36 h-auto mr-1 mt-2"
                    onClick={handleSubmit}>Submit</button>
                  <button
                    className="rounded-lg bg-gray-500 text-white leading-normal shadow-md hover:bg-gray-550 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out w-36 h-auto ml-1 mt-2"
                    onClick={handleEditMode}>Cancel</button>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        ) : (
          // Render for Not Edit Mode

          <div className="flex flex-col items-center block p-6 mt-10 rounded-lg shadow-lg bg-gray-100 w-1/4 max-w-lg">
            <div></div>
            <div className="detailsCard">
              <p>
                {selectedUser.first_name} {selectedUser.last_name}
              </p>
              <p>{selectedUser.username}</p>
              <div className="cardBtnContainer">
                <div></div>
                <div className="cardBtns">
                  <button
                    className="rounded-lg bg-gray-500 text-white leading-normal shadow-md hover:bg-gray-550 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out w-36 h-auto mt-2"
                    onClick={handleChangeView}>
                    View Data
                  </button>
                  <button
                    className="rounded-lg bg-gray-500 text-white leading-normal shadow-md hover:bg-gray-550 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out w-36 h-auto mt-2"
                    onClick={handleEditMode}>
                    Change Password
                  </button>
                  {selectedUser.is_active ? (
                    <button
                      className="rounded-lg bg-gray-500 text-white leading-normal shadow-md hover:bg-gray-550 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out w-36 h-auto mt-2"
                      onClick={handleRetireUser}>
                      Retire User
                    </button>
                  ) : (
                    <button
                      className="rounded-lg bg-gray-500 text-white leading-normal shadow-md hover:bg-gray-550 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out w-36 h-auto mt-2"
                      onClick={handleReinstateUser}>
                      Reinstate User
                    </button>
                  )}
                </div>
                <div></div>
              </div>
            </div>
            <div></div>
          </div>
        )}
      </div>
    </>
  )
}

export default InstitutionViewUserDetails
