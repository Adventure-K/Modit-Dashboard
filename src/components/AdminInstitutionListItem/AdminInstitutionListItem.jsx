import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function AdminInstitutionListItem({ i }) {
  const history = useHistory()
  const dispatch = useDispatch()

  const goDetail = () => {
    history.push(`/institutionViewDashboard/${i.id}`)
    dispatch({
      type: 'ACTIVE_INSTITUTION',
      payload: i,
    })
  }

  return (
    <>
      <tr
        key={i.id}
        onClick={() => {
          goDetail(i)
        }}
        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-650"
      >
        <td
        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
        >{i.name}</td>
        <td
        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
        >
          {i.street_address}, {i.city}, {i.state} {i.zip}
        </td>
        <td
        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
        >
          {i.first_name} {i.last_name}
        </td>
      </tr>
    </>
  )
}

export default AdminInstitutionListItem
