import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



function PatientDetail() {

  const dispatch = useDispatch();



  const patients = useSelector((store) => store.patients);
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
      {JSON.stringify(patients)}
    </div>
  );
}

export default PatientDetail;
