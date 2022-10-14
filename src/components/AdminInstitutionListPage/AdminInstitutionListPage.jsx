import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import AdminInstitutionListItem from '../AdminInstitutionListItem/AdminInstitutionListItem.jsx'

function AdminInstitutionListPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch({ type: 'FETCH_INSTITUTIONS' })
  }, [])

  const institutions = useSelector((store) => store.institutions)
  const [heading, setHeading] = useState('Research Institutions')
  console.log('Institutions from store:', institutions)

  return (
    <div>
      <h2>{heading}</h2>
      <button
        onClick={() => history.push('/adminNewInstitutionForm')}
        className="rounded-lg bg-cyan-750 text-white leading-normal uppercase shadow-md hover:bg-cyan-650 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-850 active:shadow-lg transition duration-150 ease-in-out w-36 h-9"
      >
        Add Institution
      </button>
      <table className="min-w-full mt-2">
        <thead className="bg-white border-b ">
          <tr>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Name
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Address
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Research Head
            </th>
          </tr>
        </thead>
        <tbody>
          {institutions.map((i) => {
            return <AdminInstitutionListItem key={i.id} i={i} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminInstitutionListPage
