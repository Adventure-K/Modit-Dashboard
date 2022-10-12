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
    <div>
      {i.id &&
        <>
          <button onClick={() => history.push(`/manageAccountsAdmin/${i.id}`)}>Manage Users</button>
          <button>Export</button>
          <h2>{heading}</h2>
          <h3><span>{i.name}<br />
            {i.street_address}, {i.city}, {i.state} {i.zip}</span></h3>
          {i.last_name && <h4>Research Head: {rh}</h4>}
        </>
      }
    </div>
  );
}

export default InstitutionViewDashboard;
