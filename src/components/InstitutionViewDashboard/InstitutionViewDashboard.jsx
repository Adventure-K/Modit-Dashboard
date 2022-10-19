import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function InstitutionViewDashboard(props) {

  // i is the institution
  const i = useSelector((store) => store.activeInstitution);
  // rh is the research head
  const rh = (`${i.first_name} ${i.last_name}`)

  const history = useHistory();
  const dispatch = useDispatch();

  //on page load, the institution info is sent to the activeInstitution.reducer
  useEffect(() => {
    dispatch({
      type: 'ACTIVE_INSTITUTION',
      payload: i
    });
  }, [])


  return (
    <div className="flex justify-center max-h-lg">
      {i.id &&
        <div className="flex flex-col items-center block p-6 rounded-lg shadow-lg bg-gray-100 max-w-lg">

          {/* <h2 className="text-xl mb-5">{heading}</h2> */}
          <h3 className="text-xl mb-2">{i.name}</h3>
          <h3>{i.street_address}, {i.city}, {i.state} {i.zip}</h3>
          {i.last_name &&
            <h4>Research Head: {rh}</h4>}
          <button onClick={() => history.push(`/manageAccountsAdmin/${i.id}`)}
            className="mt-5 rounded-lg bg-gray-500 text-white leading-normal uppercase shadow-md hover:bg-gray-550 hover:shadow-lg focus:bg-gray-550 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-650 active:shadow-lg transition duration-150 ease-in-out w-36 h-9"
          >Manage Users</button>
        </div>
      }
    </div>
  );
}

export default InstitutionViewDashboard;
