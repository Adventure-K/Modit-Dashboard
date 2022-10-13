import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert">
          {errors.loginMessage}
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
      <div className="flex flex-col items-center" >
        <input className="rounded-lg bg-cyan-500 text-white leading-normal uppercase shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-20 h-9" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  );
}

export default LoginForm;
