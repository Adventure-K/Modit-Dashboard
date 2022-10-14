import React, { useEffect } from 'react'
import { HashRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage'
import UserPage from '../UserPage/UserPage'
import InfoPage from '../InfoPage/InfoPage'
import LandingPage from '../LandingPage/LandingPage'
import LoginPage from '../LoginPage/LoginPage'
import RegisterPage from '../RegisterPage/RegisterPage'

import PatientDetailPage from '../PatientDetailPage/PatientDetailPage'
import AddPatientFormPage from '../AddPatientFormPage/AddPatientFormPage'
import ResearcherViewDashboard from '../ResearcherViewDashboard/ResearcherViewDashboard'
import InstitutionViewDashboard from '../InstitutionViewDashboard/InstitutionViewDashboard'
import InstitutionManageAccountsPage from '../InstitutionManageAccountsPage/InstitutionManageAccountsPage'
import InstitutionManageAccountsPageAdmin from '../InstitutionManageAccountsPageAdmin/InstitutionManageAccountsPageAdmin'
import InstitutionViewUserDetails from '../InstitutionViewUserDetails/InstitutionViewUserDetails'
import AdminInstitutionListPage from '../AdminInstitutionListPage/AdminInstitutionListPage'
import AdminNewInstitutionForm from '../AdminNewInstitutionForm/AdminNewInstitutionForm'
import AdditionalInfoRegistration from '../AdditionalInfoRegistration/AdditionalInfoRegistration'
import ResearcherTeamView from '../ResearcherTeamView/ResearcherTeamView'

import './App.css'

function App() {
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector((store) => store.user.userReducer)
  console.log(user)
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' })
  }, [dispatch])

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/login" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

          <Route exact path="/login">
            {user.id && user.user_level === 3 ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/adminInstitutionList" />
            ) : user.id && user.user_level === 2 ? (
              <Redirect to="/manageAccounts" />
            ) : user.id && user.user_level === 1 ? (
              <Redirect to="/researcherViewDashboard" />
            ) : user.id && user.user_level === 0 ? (
              <Redirect to="/patientDetail" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id && user.user_level === 3 ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/adminInstitutionList" />
            ) : user.id && user.user_level === 2 ? (
              <Redirect to="/manageAccounts" />
            ) : user.id && user.user_level === 1 ? (
              <Redirect to="/researcherViewDashboard" />
            ) : user.id && user.user_level === 0 ? (
              <Redirect to="/patientDetail" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id && user.user_level === 3 ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/adminInstitutionList" />
            ) : user.id && user.user_level === 2 ? (
              <Redirect to="/manageAccounts" />
            ) : user.id && user.user_level === 1 ? (
              <Redirect to="/researcherViewDashboard" />
            ) : user.id && user.user_level === 0 ? (
              <Redirect to="/patientDetail" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/patientDetail"
          >
            {user.user_level >= 3 ? (
              <InstitutionViewDashboard />
            ) : user.user_level >= 2 ? (
              <InstitutionManageAccountsPage />
            ) : user.user_level >= 1 ? (
              <ResearcherViewDashboard />
            ) : user.user_level === 0 ? (
              <PatientDetailPage />
            ) : (
              <LandingPage />
            )}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/addPatientForm"
          >
            <AddPatientFormPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/researcherViewDashboard/:id"
          >

            {user.user_level >= 3 ? (
              <ResearcherViewDashboard />
            ) : (
              <Redirect to="/home" />
            )}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/researcherViewDashboard"
          >

            {/* user.user_level >= 3 ? (
              <InstitutionViewUserDetails />
            ) : */}
            {/* {user.user_level >= 2 ? (
              <ResearcherTeamView />
            ) :  */}
            {user.user_level >= 1 ? (
              <ResearcherViewDashboard />
            ) : user.user_level === 0 ? (
              <PatientDetailPage />
            ) : (
              <LandingPage />
            )}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/researcherTeamView/:id"
          >
            {/* user.user_level >= 3 ? (
              <InstitutionViewUserDetails />
            ) : */}
            {/* {user.user_level >= 2 ? (
              <ResearcherTeamView />
            ) :  */}
            {user.user_level >= 1 ? (
              <ResearcherTeamView />
            ) : user.user_level === 0 ? (
              <PatientDetailPage />
            ) : (
              <LandingPage />
            )}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/institutionViewDashboard/:id"
          >
            {user.user_level >= 3 ? (
              <InstitutionViewDashboard />
            ) : user.user_level >= 2 ? (
              <InstitutionManageAccountsPage />
            ) : user.user_level >= 1 ? (
              <ResearcherViewDashboard />
            ) : user.user_level === 0 ? (
              <PatientDetailPage />
            ) : (
              <LandingPage />
            )}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/manageAccounts"
          >
            {user.user_level >= 3 ? (
              <InstitutionManageAccountsPageAdmin />
            ) : user.user_level == 2 ? (
              <InstitutionManageAccountsPage />
            ) : user.user_level >= 1 ? (
              <ResearcherViewDashboard />
            ) : user.user_level === 0 ? (
              <PatientDetailPage />
            ) : (
              <LandingPage />
            )}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/userDetails/:id"
          >
            {/* {user.user_level >= 3 ? (
              <InstitutionViewUserDetails />
            ) :  */}
            {user.user_level >= 2 ? (
              <InstitutionViewUserDetails />
            ) : user.user_level >= 1 ? (
              <ResearcherViewDashboard />
            ) : user.user_level === 0 ? (
              <PatientDetailPage />
            ) : (
              <LandingPage />
            )}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/adminInstitutionList"
          >
            {user.user_level >= 3 ? (
              <AdminInstitutionListPage />
            ) : user.user_level >= 2 ? (
              <InstitutionManageAccountsPage />
            ) : user.user_level >= 1 ? (
              <ResearcherViewDashboard />
            ) : user.user_level === 0 ? (
              <PatientDetailPage />
            ) : (
              <LandingPage />
            )}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/adminNewInstitutionForm"
          >
            {user.user_level >= 3 ? (
              <AdminNewInstitutionForm />
            ) : user.user_level >= 2 ? (
              <InstitutionManageAccountsPage />
            ) : user.user_level >= 1 ? (
              <ResearcherViewDashboard />
            ) : user.user_level === 0 ? (
              <PatientDetailPage />
            ) : (
              <LandingPage />
            )}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/manageAccountsAdmin/:id"
          >
            {user.user_level >= 3 ? (
              <InstitutionManageAccountsPageAdmin />
            ) : user.user_level == 2 ? (
              <InstitutionManageAccountsPage />
            ) : user.user_level >= 1 ? (
              <ResearcherViewDashboard />
            ) : user.user_level === 0 ? (
              <PatientDetailPage />
            ) : (
              <LandingPage />
            )}
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. 
              Change url path to look less fresher*/}
          {/* <Route exact path="/patientDetail">
            <PatientDetailPage />
          </Route>
          <Route exact path="/addPatientForm">
            <AddPatientFormPage />
          </Route>
          <Route exact path="/researcherViewDashboard">
            <ResearcherViewDashboard />
          </Route>
          <Route exact path="/researcherTeamView/:id">
            <ResearcherTeamView />
          </Route>
          <Route exact path="/institutionViewDashboard/:id">
            <InstitutionViewDashboard />
          </Route>
          <Route exact path="/manageAccounts">
            <InstitutionManageAccountsPage />
          </Route>
          <Route exact path="/userDetails/:id">
            <InstitutionViewUserDetails />
          </Route>
          <Route exact path="/adminInstitutionList">
            <AdminInstitutionListPage />
          </Route>
          <Route exact path="/adminNewInstitutionForm">
            <AdminNewInstitutionForm />
          </Route> */}
          <Route exact path="/additionalInfoRegistration">
            {user.id ? <Redirect to="/user" /> : <AdditionalInfoRegistration />}
          </Route>

          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
