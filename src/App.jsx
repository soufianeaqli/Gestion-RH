import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Employe from './Mil/Employe';
import Table from './Mil/Table';
import Header from './Head/Header';
import Conger from './Mil/Conger';
import Recrutement from './Mil/Recrutement';
import Paie from './Mil/Paie';
import { employees, candidatures as initialCandidatures } from './Mil/Data';

function App() {
  const [employee, setEmployees] = useState(employees);
  const [candidatures, setCandidatures] = useState(initialCandidatures);

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const removeEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.id !== id));
  };

  const addCandidature = (newCandidat) => {
    setCandidatures((prevCandidatures) => [...prevCandidatures, newCandidat]);
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route 
          path="empl" 
          element={<Employe employees={employee} addEmployee={addEmployee} removeEmployee={removeEmployee} />} 
        />
        <Route 
          path="/" 
          element={<Table employees={employee} candidatures={candidatures} />} 
        />
        <Route 
          path='/con' 
          element={<Conger />} 
        />
        <Route 
          path='/rec' 
          element={<Recrutement addCandidature={addCandidature} />} 
        />
        <Route 
          path='/pai' 
          element={<Paie employees={employee} />} 
        />
      </Routes>
    </div>
  );
}

export default App;
