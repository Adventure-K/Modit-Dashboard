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

  const handleManage = () => {
    dispatch({ type: 'ADMIN_SET_INST', payload: {id: i.id} })
    history.push('/manageAccounts')
  }

  return (
    <div>
      <p>i.id:{JSON.stringify(i.id)}</p>
      <button onClick={() => handleManage()}>Manage Users</button>
      <button>Export</button>
      <h2>{heading}</h2>
      <h3><span>{i.name}<br/>
      {i.street_address}, {i.city}, {i.state} {i.zip}</span></h3>
      <h4>Research Head: {rh}</h4>
      <p>{JSON.stringify(i)}</p>
    </div>
  );
}

export default InstitutionViewDashboard;
