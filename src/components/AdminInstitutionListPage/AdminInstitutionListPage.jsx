import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import AdminInstitutionListItem from '../AdminInstitutionListItem/AdminInstitutionListItem.jsx'

function AdminInstitutionListPage() { // This page displays on login of an admin account. Displays the list of institutions registered in the app.

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch({ type: 'FETCH_INSTITUTIONS' }) // Retrieve all institutions from the DB and place in the store
  }, [])

  const institutions = useSelector((store) => store.institutions)
  const [heading, setHeading] = useState('Research Institutions')

  return (
    <div className="ml-5 mr-5">
      <h2>{heading}</h2>
      <button
        onClick={() => history.push('/adminNewInstitutionForm')}
        className="ml-1 rounded-lg bg-gray-500 text-white leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out w-36 h-9"
      >
        Add Institution
      </button>
      <table className="min-w-full mt-2">
        <thead className="bg-white border-b ">
          <tr>
            <th className="text-2xl font-bold text-gray-900 px-6 py-4 text-left">
              Name
            </th>
            <th className="text-2xl font-bold text-gray-900 px-6 py-4 text-left">
              Address
            </th>
            <th className="text-2xl font-bold text-gray-900 px-6 py-4 text-left">
              Research Head
            </th>
          </tr>
        </thead>
        <tbody>
          {institutions.map((i) => {
            return <AdminInstitutionListItem key={i.id} i={i} /> // Individual list items are rendered via this component
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminInstitutionListPage
