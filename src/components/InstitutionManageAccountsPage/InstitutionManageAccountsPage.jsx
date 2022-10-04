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
      <h2>{heading}</h2>
      {JSON.stringify(users)}
    </div>
  );
}

export default InstitutionManageAccountsPage;
