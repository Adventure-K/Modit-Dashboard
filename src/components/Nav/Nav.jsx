import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user.userReducer);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Neurotype</h2>
      </Link>
      <p><span>{user.id} - {user.username} | level: {user.user_level} | inst: {user.inst_id}</span></p>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/home">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" to="/login"/>
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
