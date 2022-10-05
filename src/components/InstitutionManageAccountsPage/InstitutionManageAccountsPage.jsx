import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function InstitutionManageAccountsPage() {

  const dispatch = useDispatch();

  const users = useSelector((store) => store.usersToManage);
  const [heading, setHeading] = useState('Functional Component');

  useEffect(() => {
    dispatch({ type: 'GET_USERS' });
  }, []);

  return (
    <div>

      <h3>Waiting for Approval</h3>
      <h3>Researchers</h3>
      <h3>Clinicians</h3>
      {JSON.stringify(users)}
    </div>
  );
}

export default InstitutionManageAccountsPage;
