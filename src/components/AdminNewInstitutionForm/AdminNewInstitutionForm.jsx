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


  const history = useHistory()
  const dispatch = useDispatch()

  //this function dispatches the data input into the form to the institution.saga file
  const handleAddInstitution = () => {
    event.preventDefault()
    if ( // Input verification
      !newInstitution.name ||
      !newInstitution.street_address ||
      !newInstitution.city ||
      !newInstitution.state ||
      !newInstitution.zip
    ) {
      alert('Please complete all fields.')
      return
    }
    dispatch({ type: 'ADD_INSTITUTION', payload: newInstitution }) // Trigger POST in institutions.router.js via institution.saga.js
    history.push('/adminInstitutionList')
  }

  const handleValUpdate = (event, key) => {
    setNewInstitution({
      ...newInstitution,
      [key]: event.target.value,
    })
  }

  return (
    <>
      <h2 className="heading">
        Institution Registration
      </h2>
      <br />

      <form
        className="flex flex-col items-center max-h-lg"
        onSubmit={handleAddInstitution}
      >
        <div className="flex flex-col items-center block p-6 mt-10 rounded-lg shadow-lg bg-gray-100 h-1/3 w-1/4 max-w-lg">
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
          <button
            className="rounded-lg bg-gray-500 text-white leading-normal shadow-md hover:bg-gray-550 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out p-3 w-auto h-auto mt-2"
            type="submit"
          >
            Register
          </button>
        </div>
        <div className="flex flex-col items-center mt-5">
          <p className="text-center">
            Note: Add an institution to the app before adding users for that
            institution. <br /> A research head may be assigned after the user
            is created.
          </p>
        </div>
      </form>
    </>
  )
}

export default AdminNewInstitutionForm;
