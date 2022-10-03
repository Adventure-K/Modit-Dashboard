import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function PatientDetail() {

  const dispatch = useDispatch();


  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  useEffect(() => {
    dispatch({ type: 'FETCH_PATIENTS' });
  }, [dispatch]);

  return (
    <div>
      <h2>{heading}</h2>
      <label for="patients">Select Patient</label>
      <select name="patients">

      </select>



      <button>New Patient</button>
      <button>Delete Patient</button>
      <button>Export</button>
    </div>
  );
}

export default PatientDetail;
