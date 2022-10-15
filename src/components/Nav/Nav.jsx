import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';


function Nav() {
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector((store) => store.user.userReducer);

  let navClassByULevel;
  let navClassByULevelLink;
  let uLevel = user.user_level
  if (uLevel == 0 || uLevel == undefined || uLevel == null) {
    navClassByULevel = 'clinician';
    navClassByULevelLink = 'clinicianLink'
  } else if (uLevel == 1 || uLevel == 2) {
    navClassByULevel = 'researcher';
    navClassByULevelLink = 'researcherLink'
  } else {
    navClassByULevel = 'admin';
    navClassByULevelLink = 'adminLink'
  };

  const logOut = () => {
    dispatch({
      type: 'LOGOUT',
      callback: () => history.push('/login')
    })
  }

  return (
    <div className={[navClassByULevel, "nav relative w-full flex flex-wrap items-center justify-between text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-xl"].join(' ')}>
      <Link to="/home">
      <img className="object-scale-down h-12" src="./neurotype_logo2021.svg" alt="" />
        {/* <h2 className="nav-title">Neurotype Inc.</h2> */}

      </Link>
      {/* logged-in user display */}
      {/* {user.id && <p><span>{user.id} - {user.username} | level: {user.user_level} | inst: {user.inst_id}</span></p>} */}
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className={[navClassByULevelLink, "navLink"].join(' ')} to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className={[navClassByULevelLink, "navLink"].join(' ')} to="/home">
              Home
            </Link>

            <Link className={[navClassByULevelLink, "navLink"].join(' ')} to="/login" onClick={() => logOut()}>
              Logout
            </Link>
          </>
        )}


      </div>
    </div>
  );
}

export default Nav;
