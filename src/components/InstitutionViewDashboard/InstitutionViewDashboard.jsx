import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function InstitutionViewDashboard(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const i = useSelector((store) => store.activeInstitution);
  console.log('activeInstitution:', i)
  const rh = (`${i.first_name} ${i.last_name}`)
  const [heading, setHeading] = useState('Institution Detail');
  console.log('i.id:', i.id)

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch({ type: 'ADMIN_CLEAR_INST' });
    dispatch({
      type: 'ACTIVE_INSTITUTION',
      payload: i
    });
  }, [])

  // const handleManage = () => { // Clears admin user's inst_id and sets it to the institution being viewed. This is used to allow the admin to manage users.
  //   dispatch({ type: 'ADMIN_SET_INST', payload: { id: i.id } })
  //   history.push(`/manageAccounts/${i.id}`)
  // }

  return (
    <div className="flex justify-center max-h-lg">
      {i.id &&
        <div className="flex flex-col items-center block p-6 rounded-lg shadow-lg bg-gray-100 max-w-lg">
          
          {/* <h2 className="text-xl mb-5">{heading}</h2> */}
          <h3 className="text-xl mb-2">{i.name}</h3>
            <h3>{i.street_address}, {i.city}, {i.state} {i.zip}</h3>
          {i.last_name && 
          <h4>Research Head: {rh}</h4>}
          <button  onClick={() => history.push(`/manageAccountsAdmin/${i.id}`)}
        className="mt-5 rounded-lg bg-gray-500 text-white leading-normal uppercase shadow-md hover:bg-yellow-650 hover:shadow-lg focus:bg-yellow-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-550 active:shadow-lg transition duration-150 ease-in-out w-36 h-9"
        >Manage Users</button>
        </div>
      }
    </div>
  );
}

export default InstitutionViewDashboard;
