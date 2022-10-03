import React, { useState } from 'react';
import { useSelector } from 'react-redux';


function PatientDetail() {


  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

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
