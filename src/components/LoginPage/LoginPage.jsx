import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  const [thisLogin, setThisLogin] = useState({
    u: '',
    p: ''
  })

  const fillC = () => {
    console.log('fill C');
    setThisLogin({ u: 'andrewK@hbff.org', p: 'hbffweb123'})
    // setUsername('andrewK@hbff.org')
    // setPassword('hbffweb123')
  }
  const fillR = () => {
    setThisLogin({ u: 'peterH@hbff.org', p: 'hbffweb123'})
    // setUsername('peterH@hbff.org')
    // setPassword('hbffweb123')
  }  
  const fillA = () => {
    setThisLogin({ u: 'admin@neurotype.io', p: 'hbffweb123'})
    // setUsername('admin@neurotype.io')
    // setPassword('hbffweb123')
  }

  return (
    <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            console.log('Register pushed')
            history.push('/registration');
          }}
        >
          Register
        </button>
        {/* <button type="button" onClick={() => fillC()}>C</button> */}
        {/* <div className="flex flex-col items-center">
          <br />
          <button className="fillC" onClick={() => fillC()}>C</button>
          <br />
          <button className="fillR" onClick={() => fillR()}>R</button>
          <br />
          <button className="fillA" onClick={() => fillA()}>A</button>
        </div> */}

      </center>
    </div>
  );
}

export default LoginPage;
