import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function RegisterForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const errors = useSelector((store) => store.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  const registerUser = (event) => {
    event.preventDefault()
    if (role === '') {
      alert('Please select a role.')
    } else {
      dispatch({
        // stores register info in reducer to be retrieved on the next page
        type: 'STORE_USER_REGISTRATION_INFO',
        payload: {
          username: username,
          password: password,
          role: role,
        },
      })

      history.push('/additionalInfoRegistration')
    }
  } // end registerUser

  const dropDownChange = (e) => {
    setRole(e.target.value)
  }

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3
          className="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700"
          role="alert"
        >
          {errors.registrationMessage}
        </h3>
      )}
      <div className="flex flex-col items-center">
        <input
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
          className="placeholder-shown text-center w-full border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          placeholder="Email Address"
        />
      </div>
      <div className="flex flex-col items-center">
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
          className="placeholder-shown text-center w-full border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          placeholder="Password"
        />
      </div>
      <div className="flex flex-col items-center">
        <select
          name="role"
          id="roleSelection"
          value={role}
          onChange={dropDownChange}
          className="w-full text-center border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        >
          <option
            value="select"
            className="w-full border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          >
            Select a role
          </option>
          <option value={0}>Clinician</option>
          <option value={1}>Researcher</option>
        </select>
      </div>
      <div className="flex flex-col items-center">
        <input
          className="rounded-lg bg-cyan-500 text-white leading-normal uppercase shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-20 h-9"
          type="submit"
          name="submit"
          value="Register"
        />
      </div>
    </form>
  )
}

export default RegisterForm
