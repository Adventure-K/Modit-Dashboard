import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './AdminNewInstitutionForm.css'

function AdminNewInstitutionForm() {
  const store = useSelector((store) => store)
  const [newInstitution, setNewInstitution] = useState({
    name: '',
    street_address: '',
    city: '',
    state: '',
    zip: '',
  })
  // const [heading, setHeading] = useState('Institution Registration');

  const history = useHistory()
  const dispatch = useDispatch()

  const fillFields = () => {
    setNewInstitution({ name: 'Alliance Clinic', street_address: '3329 University Ave SE', city: 'Minneapolis', state: 'MN', zip: '55414' })
    // setNewInstitution({
    //   ...newInstitution,
    //   street_address: '3329 University Ave SE,',
    // })
    // setNewInstitution({ ...newInstitution, city: 'Minneapolis' })
    // setNewInstitution({ ...newInstitution, state: 'MN' })
    // setNewInstitution({ ...newInstitution, zip: '55414' })
    // setPlant({...newPlant, name: event.target.value})
  }

  const handleAddInstitution = () => {
    event.preventDefault()
    if (
      !newInstitution.name ||
      !newInstitution.street_address ||
      !newInstitution.city ||
      !newInstitution.state ||
      !newInstitution.zip
    ) {
      alert('Please complete all fields.')
      return
    }
    dispatch({ type: 'ADD_INSTITUTION', payload: newInstitution })
    history.push('/adminInstitutionList')
  }

  const handleValUpdate = (event, key) => {
    setNewInstitution({
      ...newInstitution,
      [key]: event.target.value,
    })
  }

  return (
    // <div className="displayContainer">
    <>
      <h2 className="heading" onClick={() => fillFields()}>
        Institution Registration
      </h2>
      <br />

      <form
        className="flex flex-col items-center max-h-lg"
        onSubmit={handleAddInstitution}
      >
        <div className="flex flex-col items-center block p-6 mt-10 rounded-lg shadow-lg bg-gray-100 h-1/3 w-1/4 max-w-lg">
          {/* <div></div> */}
          {/* <div className="inputsContainer"> */}
          {/* <div className="inputsLeft"> */}
          <input
            className="placeholder-shown text-center w-full border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            type="text"
            value={newInstitution.name}
            placeholder="Institution Name"
            onChange={(event) => handleValUpdate(event, 'name')}
          />
          <input
            className="placeholder-shown text-center w-full border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            type="text"
            value={newInstitution.street_address}
            placeholder="Street Address"
            onChange={(event) => handleValUpdate(event, 'street_address')}
          />
          <input
            className="placeholder-shown text-center w-full border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            type="text"
            value={newInstitution.city}
            placeholder="City"
            onChange={(event) => handleValUpdate(event, 'city')}
          />
          {/* </div> */}
          {/* <div className="inputsRight"> */}
          <input
            className="placeholder-shown text-center w-full border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            type="text"
            value={newInstitution.state}
            placeholder="State"
            onChange={(event) => handleValUpdate(event, 'state')}
          />
          <input
            className="placeholder-shown text-center w-full border-gray-900 rounded-lg shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            type="text"
            value={newInstitution.zip}
            placeholder="Zip"
            onChange={(event) => handleValUpdate(event, 'zip')}
          />
          {/* </div> */}
          {/* </div> */}
          {/* <div></div> */}
          <button
            className="rounded-lg bg-gray-500 text-white leading-normal shadow-md hover:bg-gray-550 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out p-3 w-auto h-auto mt-2"
            type="submit"
          >
            Register
          </button>
        </div>
        {/* <div className="btnDiv">
          <div></div> */}

        {/* <div></div>
        </div> */}
        {/* <div className="noteDiv">
          <div></div> */}
        <div className="flex flex-col items-center mt-5">
          <p className="text-center">
            Note: Add an institution to the app before adding users for that
            institution. <br /> A research head may be assigned after the user
            is created.
          </p>
        </div>
        {/* <div></div>
        </div> */}
      </form>
    </>
    // </div>
  )
}

export default AdminNewInstitutionForm
