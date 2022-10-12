import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();
    if (role === '') {
      alert('Please select a role.')
    }
    else {
      dispatch({// stores register info in reducer to be retrieved on the next page
        type: 'STORE_USER_REGISTRATION_INFO',
        payload: {
          username: username,
          password: password,
          role: role
        },
      });

      history.push('/additionalInfoRegistration')
    }

  }; // end registerUser

  const dropDownChange = (e) => {
    setRole(e.target.value)

  }

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div className="flex flex-col items-center" >
        <select name="role" id="roleSelection" value={role} onChange={dropDownChange}>
          <option value="select">Select a role</option>
          <option value={0}>Clinician</option>
          <option value={1}>Researcher</option>
        </select>
      </div>
      <div className="flex flex-col items-center" >
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
