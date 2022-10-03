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

    dispatch({
      type: 'STORE_USER_REGISTRATION_INFO',
      payload: {
        username: username,
        password: password,
        role: role
      },
    });

    history.push('/additionalInfoRegistration')
  }; // end registerUser

  const dropDownChange = (e) => {
    setRole(e.target.value)

}

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
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
      <div>
        <select name="role" id="roleSelection" value={role} onChange={dropDownChange}>
          <option value="select">Select a role</option>
          <option value={0}>Clinician</option>
          <option value={1}>Researcher</option>
        </select>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
